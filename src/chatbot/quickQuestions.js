/* ===========================================================================
 * BANK PERTANYAAN CEPAT (QUICK QUESTIONS POOL)
 * ===========================================================================
 * Kumpulan ide pertanyaan yang mencakup seluruh topik KB-00 s/d KB-10:
 * - Data Pribadi (nama, sekolah, alamat, kelas, top up/hadiah)
 * - Password (kunci digital, berbagi ke teman, tanggal lahir)
 * - Pikir Sebelum Posting (live stream, foto/video, lokasi)
 * - Cek Kabar (besok libur, berita heboh/viral, verifikasi)
 * - Gambar & Video AI (foto terlihat nyata, audio/video AI)
 * - Jadi Teman yang Baik (ejekan foto, komentar jahat, cyberbullying)
 * - Cari Bantuan (pesan menakutkan, blokir akun, lapor orang dewasa)
 * - Jurus Utama (Berhenti, Cek, Cerita)
 * ======================================================================== */

export const QUICK_QUESTIONS_ID = [
  // KB-00: Jurus Utama
  'Apa arti jurus Berhenti, Cek, Cerita?',
  'Kenapa kita harus hati-hati saat menjelajahi internet?',

  // KB-01: Internet Seperti Hutan
  'Kenapa internet diibaratkan seperti hutan?',
  'Apa itu "peta aman" di internet?',

  // KB-02: Data Pribadi
  'Apa itu data pribadi dan contohnya?',
  'Boleh nggak kasih nama sekolah demi dapat top up game?',
  'Kalau ada orang baru kenal minta alamat rumah, aku harus apa?',
  'Kenapa data pribadi adalah rahasia penting?',

  // KB-03: Pikir Sebelum Posting
  'Apa yang harus diperhatikan sebelum upload foto atau video?',
  'Boleh nggak live game sambil memperlihatkan lokasi rumah?',
  'Kalau ragu mau posting sesuatu, tanya ke siapa?',

  // KB-04: Password
  'Boleh kasih password akun ke sahabat dekat?',
  'Bagaimana contoh password yang aman dan susah ditebak?',
  'Kenapa password diibaratkan seperti kunci rumah digital?',
  'Kalau lupa atau bingung soal akun, minta tolong ke siapa?',

  // KB-05: Cek Kabar
  'Ada pesan "besok sekolah libur", langsung dishare nggak?',
  'Bagaimana cara mengecek apakah suatu kabar itu benar atau hoaks?',
  'Kenapa berita yang heboh dan viral belum tentu benar?',

  // KB-06: Gambar dan Video AI
  'Apakah foto yang terlihat sangat nyata pasti benar?',
  'Apa itu gambar atau video AI?',
  'Bagaimana kalau melihat video atau suara yang terasa aneh?',

  // KB-07: Jadi Teman yang Baik
  'Temanku diejek lewat foto di internet, aku harus apa?',
  'Boleh nggak nulis komentar ejekan saat lagi marah?',
  'Bagaimana cara menjadi teman yang baik di dunia digital?',

  // KB-08: Cari Bantuan
  'Ada akun kirim pesan menakutkan, apa 3 langkah yang harus kulakukan?',
  'Bagaimana cara memblokir akun yang mengganggu?',
  'Kenapa kita tidak boleh menghadapi gangguan di internet sendirian?',

  // KB-09 & KB-10: Ringkasan & Penjaga
  'Apa 5 hal penting yang harus selalu kuingat di internet?',
  'Bagaimana cara menjadi Penjaga Hutan Internet yang pintar?',
]

export const QUICK_QUESTIONS_EN = [
  // KB-00: Main Moves
  'What is the Stop, Check, Tell rule?',
  'Why do we need to be careful when exploring the internet?',

  // KB-01: Internet Like a Forest
  'Why is the internet compared to a forest?',
  'What is a "safety map" for the internet?',

  // KB-02: Personal Data
  'What is personal data and what are some examples?',
  'Can I share my school name to get game top-ups or gifts?',
  'What should I do if a stranger online asks for my address?',
  'Why is personal data an important secret?',

  // KB-03: Think Before Posting
  'What should I check before posting photos or videos?',
  'Can I live stream while showing my home location?',
  'Who should I ask if I am unsure about posting something?',

  // KB-04: Passwords
  'Can I share my password with my best friend?',
  'What makes a strong password that is hard to guess?',
  'Why is a password like a digital house key?',
  'Who should I ask for help if I am confused about my account?',

  // KB-05: Checking News
  'If a message says "no school tomorrow", should I forward it right away?',
  'How do I check if online news is true or fake?',
  'Why is sensational or viral news not always true?',

  // KB-06: AI Images & Videos
  'Does a realistic-looking photo mean it is definitely true?',
  'What are AI-generated images and videos?',
  'What should I do if a video or voice recording seems strange?',

  // KB-07: Being a Good Friend
  'My friend is being mocked with a photo online, what should I do?',
  'Is it okay to post mean comments when I am angry?',
  'How can I be a kind friend on the internet?',

  // KB-08: Seeking Help
  'What are the 3 steps if someone sends me a scary message?',
  'How do I block an account that is bothering me?',
  'Why shouldn\'t I deal with online harassment alone?',

  // KB-09 & KB-10: Summary & Guardian
  'What are the 5 key rules to remember on the internet?',
  'How can I become a smart Guardian of the Internet Forest?',
]

/**
 * Mengambil N pertanyaan acak dari pool pertanyaan sesuai bahasa.
 *
 * @param {'id' | 'en'} lang - Bahasa ('id' atau 'en')
 * @param {number} count - Jumlah pertanyaan yang ingin ditampilkan (default 4)
 * @param {string[]} excludeList - Pertanyaan yang sedang tampil agar tidak muncul lagi
 * @returns {string[]}
 */
export function getRandomQuestions(lang = 'id', count = 4, excludeList = []) {
  const pool = lang === 'en' ? QUICK_QUESTIONS_EN : QUICK_QUESTIONS_ID
  const available = pool.filter((q) => !excludeList.includes(q))
  const source = available.length >= count ? available : pool

  // Fisher-Yates shuffle
  const shuffled = [...source]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, count)
}
