/* ===========================================================================
 * CHAT SERVICE — HUTAN INTERNET CHATBOT
 * ===========================================================================
 * Orkestrator yang menggabungkan retrieval + pemformatan jawaban.
 *
 * Mode saat ini: LOKAL / DETERMINISTIK
 * Jawaban diformat langsung dari konten KB yang ditemukan retrieval.
 * Tidak ada panggilan ke internet, API, atau LLM.
 *
 * --- TITIK INTEGRASI LLM (OPSIONAL) ---
 * Jika ingin upgrade ke LLM di masa depan:
 * 1. Buat API route / serverless function (JANGAN di frontend).
 * 2. Di API route tersebut, baca key dari env var server-side, misalnya:
 *    process.env.CHATBOT_API_KEY (jangan gunakan VITE_ — itu terbuka di bundle)
 * 3. Ganti bagian "FORMAT JAWABAN LOKAL" di bawah dengan fetch ke API route.
 * 4. Kirim hanya: system instruction + query + context entries (bukan seluruh KB).
 * 5. System instruction wajib memuat:
 *    "Jawab hanya dari KONTEKS yang diberikan. Jangan pakai pengetahuan umum
 *     atau internet. Jika konteks tidak memuat jawaban, gunakan fallback resmi."
 * Env var yang perlu didokumentasikan di .env.example:
 *   CHATBOT_API_URL  — endpoint backend/serverless
 *   CHATBOT_MODEL    — nama model (opsional)
 * ======================================================================== */

import { retrieveContext, getFallback } from './retrievalEngine.js'

/** Batas panjang input pengguna (karakter). */
const MAX_INPUT_LENGTH = 500

/** Rate limiting sederhana berbasis sesi: maks pesan per jendela waktu. */
const RATE_LIMIT = { maxMessages: 10, windowMs: 30_000 }
let rateBucket = { count: 0, resetAt: Date.now() + RATE_LIMIT.windowMs }

/**
 * Sanitasi teks dari pengguna.
 * Potong terlalu panjang dan hapus karakter kontrol.
 */
function sanitizeInput(text) {
  // Hapus karakter kontrol tanpa memakai regex (menghindari peringatan lint no-control-regex)
  const cleaned = [...text]
    .map((ch) => {
      const code = ch.charCodeAt(0)
      return code < 32 || code === 127 ? ' ' : ch
    })
    .join('')
  return cleaned.trim().slice(0, MAX_INPUT_LENGTH)
}

/**
 * Periksa dan perbarui rate limit. Kembalikan true jika masih boleh.
 */
function checkRateLimit() {
  const now = Date.now()
  if (now > rateBucket.resetAt) {
    rateBucket = { count: 0, resetAt: now + RATE_LIMIT.windowMs }
  }
  if (rateBucket.count >= RATE_LIMIT.maxMessages) return false
  rateBucket.count++
  return true
}

/**
 * Deteksi apakah query mencoba prompt injection atau keluar dari materi.
 * Kembalikan true jika terdeteksi injeksi.
 */
function detectPromptInjection(queryNorm) {
  const INJECTION_SIGNALS = [
    'abaikan', 'ignore', 'forget', 'lupakan', 'bypass',
    'system prompt', 'instruksi', 'pretend', 'berpura',
    'jawab dari internet', 'answer from internet', 'pakai internet',
    'use internet', 'web search', 'browsing', 'buka aturan',
    'reveal prompt', 'show prompt', 'keluar dari materi',
    'jangan ikuti', 'stop following', 'act as', 'bertindak sebagai',
  ]
  return INJECTION_SIGNALS.some((sig) => queryNorm.includes(sig))
}

/**
 * Format jawaban dari entri KB.
 * Jawaban terdiri dari:
 * - Teks konten KB yang ditemukan (satu atau gabungan beberapa entri)
 * - Label sumber
 */
function formatLocalAnswer(entries, lang) {
  // Gabungkan konten jika ada beberapa entri relevan
  const parts = entries.map((entry) => {
    const content = lang === 'en' ? entry.contentEn : entry.contentId
    return content.trim()
  })

  // Ambil label sumber dari entri dengan skor teratas (entries[0])
  const sourceLabel = lang === 'en'
    ? entries[0].sourceLabelEn
    : entries[0].sourceLabelId

  return {
    text: parts.join('\n\n'),
    sourceLabel,
    isError: false,
    isFallback: false,
  }
}

/**
 * Hasilkan jawaban untuk query pengguna.
 *
 * @param {string} rawQuery - Teks pertanyaan pengguna.
 * @param {string} lang - Bahasa aktif: 'id' | 'en'
 * @returns {Promise<{ text: string, sourceLabel: string|null, isError: boolean, isFallback: boolean }>}
 */
export async function generateAnswer(rawQuery, lang = 'id') {
  // 1. Sanitasi input
  const query = sanitizeInput(rawQuery)

  if (!query) {
    return {
      text: lang === 'en'
        ? 'Please type a question first.'
        : 'Silakan ketik pertanyaanmu dulu.',
      sourceLabel: null,
      isError: false,
      isFallback: true,
    }
  }

  // 2. Rate limiting
  if (!checkRateLimit()) {
    return {
      text: lang === 'en'
        ? 'You are sending messages too quickly. Please wait a moment.'
        : 'Kamu mengirim pesan terlalu cepat. Tunggu sebentar, ya.',
      sourceLabel: null,
      isError: false,
      isFallback: true,
    }
  }

  const queryLower = query.toLowerCase()

  // 3. Deteksi prompt injection
  if (detectPromptInjection(queryLower)) {
    return {
      text: getFallback(lang),
      sourceLabel: null,
      isError: false,
      isFallback: true,
    }
  }

  // 4. Retrieval
  const { entries, hasSufficientContext } = retrieveContext(query)

  // 5. Fallback jika tidak ada konteks cukup relevan
  if (!hasSufficientContext) {
    return {
      text: getFallback(lang),
      sourceLabel: null,
      isError: false,
      isFallback: true,
    }
  }

  // 6. Hubungkan ke LLM proxy (/api/chat) bila tersedia, dengan fallback lokal
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, context: entries, lang }),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.ok && data.answer) {
        return {
          text: data.answer,
          sourceLabel: data.sourceLabel || (lang === 'en' ? entries[0].sourceLabelEn : entries[0].sourceLabelId),
          isError: false,
          isFallback: false,
        }
      }
    }
  } catch {
    // Mode offline atau static host tanpa backend (misalnya GitHub Pages) -> gunakan mode lokal
  }

  // 7. Format jawaban deterministik lokal berbasis KB-00 s/d KB-10
  try {
    return formatLocalAnswer(entries, lang)
  } catch {
    return {
      text: lang === 'en'
        ? 'Something went wrong. Please try again.'
        : 'Ada gangguan. Coba lagi, ya.',
      sourceLabel: null,
      isError: true,
      isFallback: false,
    }
  }
}
