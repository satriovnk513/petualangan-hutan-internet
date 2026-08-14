/* ===========================================================================
 * RETRIEVAL ENGINE — HUTAN INTERNET CHATBOT
 * ===========================================================================
 * Pure functions — tanpa side effects, tanpa akses internet, tanpa LLM.
 * Retrieval dilakukan sepenuhnya dengan keyword/topic scoring.
 *
 * Cara kerja:
 * 1. Query dinormalisasi (huruf kecil, strip tanda baca, token).
 * 2. Setiap KB entry mendapat skor berdasarkan:
 *    - jumlah keyword yang cocok dengan token query
 *    - panjang keyword (keyword panjang mendapat bobot lebih tinggi)
 *    - apakah keyword muncul pada token persis vs sebagai substring
 * 3. Entri diurutkan dari skor tertinggi; entri di bawah RELEVANCE_THRESHOLD
 *    diabaikan.
 * 4. Maksimal MAX_ENTRIES entri dikembalikan untuk membatasi konteks.
 *
 * Catatan keamanan: fungsi ini TIDAK memanggil internet, API, atau LLM.
 * ======================================================================== */

import { knowledgeBase, FALLBACK } from './knowledgeBase.js'

/** Skor minimum agar sebuah entri dianggap relevan. */
const RELEVANCE_THRESHOLD = 2

/** Maksimal entri KB yang dikembalikan per query. */
const MAX_ENTRIES = 3

/** Hapus tanda baca dan normalkan ke huruf kecil. */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?;:()"'""''«»\-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Pecah teks menjadi array token unik. */
function tokenize(text) {
  return [...new Set(normalize(text).split(' ').filter(Boolean))]
}

/**
 * Hitung skor relevansi sebuah KB entry terhadap array token query.
 * Mengembalikan angka ≥ 0.
 */
function scoreEntry(entry, queryTokens) {
  let score = 0
  const queryNorm = queryTokens.join(' ')

  for (const kw of entry.keywords) {
    const kwNorm = normalize(kw)
    const kwTokens = kwNorm.split(' ').filter(Boolean)

    // Cocok persis kata kunci multi-kata di dalam query gabungan → bobot tinggi
    if (kwTokens.length > 1 && queryNorm.includes(kwNorm)) {
      score += kwTokens.length * 3
      continue
    }

    // Cocok setiap token kata kunci sebagai token persis dalam query
    let tokenMatches = 0
    for (const t of kwTokens) {
      if (queryTokens.includes(t)) tokenMatches++
    }
    if (tokenMatches === kwTokens.length && tokenMatches > 0) {
      score += tokenMatches * 2
      continue
    }

    // Cocok sebagai substring (bobot lebih rendah)
    for (const t of kwTokens) {
      if (queryNorm.includes(t) && t.length >= 4) {
        score += 1
      }
    }
  }

  return score
}

/**
 * Cari dan kembalikan entri KB yang relevan untuk query.
 *
 * @param {string} query - Teks pertanyaan pengguna.
 * @returns {{ entries: Array, totalScore: number, hasSufficientContext: boolean }}
 */
export function retrieveContext(query) {
  const queryTokens = tokenize(query)

  if (queryTokens.length === 0) {
    return { entries: [], totalScore: 0, hasSufficientContext: false }
  }

  const scored = knowledgeBase.map((entry) => ({
    entry,
    score: scoreEntry(entry, queryTokens),
  }))

  const relevant = scored
    .filter((s) => s.score >= RELEVANCE_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_ENTRIES)

  const totalScore = relevant.reduce((sum, s) => sum + s.score, 0)

  return {
    entries: relevant.map((s) => s.entry),
    totalScore,
    hasSufficientContext: relevant.length > 0,
  }
}

/**
 * Deteksi bahasa dari query secara sederhana.
 * Hanya mengenali sinyal kuat (kata-kata Inggris umum).
 * Default selalu ke 'id'.
 */
export function detectQueryLang(query) {
  const EN_SIGNALS = [
    'what', 'how', 'why', 'when', 'where', 'who', 'can', 'should',
    'is', 'are', 'my', 'your', 'the', 'and', 'for', 'do', 'does',
    'password', 'friend', 'photo', 'news', 'safe', 'help', 'block',
    'share', 'data', 'account', 'post', 'image', 'video', 'ai',
    'scary', 'afraid', 'school',
  ]
  const tokens = tokenize(query)
  const enCount = tokens.filter((t) => EN_SIGNALS.includes(t)).length
  return enCount >= 2 ? 'en' : 'id'
}

/**
 * Kembalikan teks fallback resmi sesuai bahasa.
 * Selalu gunakan ini — JANGAN buat jawaban karangan.
 */
export function getFallback(lang) {
  return FALLBACK[lang] ?? FALLBACK.id
}
