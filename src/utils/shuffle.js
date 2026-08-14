/* ===========================================================================
 * PENGACAKAN URUTAN TAMPIL
 * ===========================================================================
 * Semua logika pengacakan isi scene ada di berkas ini. Berlaku untuk ketiga
 * bentuk interaksi:
 *
 *   'choice' — urutan tampil tiga pilihan jawaban.
 *   'match'  — urutan tampil kartu tindakan (bagian kanan).
 *   'sort'   — urutan tampil kartu yang harus diletakkan.
 *
 * CARA KERJANYA
 * Yang diacak hanya URUTAN TAMPIL-nya. Isi tidak pernah diubah, dan setiap
 * bagian tetap membawa `id` miliknya sendiri. Jawaban paling bijak ditentukan
 * lewat `scenario.bestChoiceId` untuk pilihan ganda, lewat id pasangan untuk
 * memasangkan, dan lewat `card.category` untuk drag-and-drop — cocokkan dengan
 * id, JANGAN PERNAH dengan nomor urut atau posisi tampil. Kalau nanti ada kode
 * yang menilai jawaban berdasarkan index, penilaiannya akan keliru begitu
 * urutannya teracak.
 *
 * Huruf A, B, C di layar diambil dari posisi tampil (lihat ChoiceButton),
 * jadi hurufnya otomatis mengikuti urutan hasil acakan ini.
 *
 * KAPAN DIACAK ULANG
 * Hasil acakan disimpan sebagai peta { idSkenario: [id, ...] } di Level.jsx.
 * Peta itu hanya dibuat ulang saat pemain MEMULAI atau MENGULANG sebuah level.
 * Selama pemain masih mengerjakan scene yang sama — termasuk saat berganti
 * bahasa atau saat umpan balik muncul — urutannya tidak berubah, karena
 * petanya hanya berisi id yang sama di kedua bahasa.
 * ======================================================================== */

/* Fisher-Yates: setiap urutan punya peluang yang sama.
 * Menyalin dulu supaya array aslinya (data level) tidak ikut berubah. */
export function shuffle(items) {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/* Daftar id yang perlu diacak untuk sebuah scene, sesuai bentuk interaksinya. */
function shuffleTargets(scenario) {
  if (scenario.type === 'match') return scenario.pairs.map((pair) => pair.id)
  if (scenario.type === 'sort') return scenario.cards.map((card) => card.id)
  return scenario.choices.map((choice) => choice.id)
}

/* Membuat satu peta urutan untuk seluruh scene dalam sebuah level:
 *   { 'l1-s1': ['b', 'a', 'c'], 'l1-s2': ['p3', 'p1', 'p2'], ... }
 * Yang disimpan hanya id, bukan objeknya, supaya peta ini tetap sah dipakai
 * walau pemain berganti bahasa di tengah permainan. */
export function makeSceneOrder(level) {
  if (!level) return {}
  const order = {}
  for (const scenario of level.scenarios) {
    order[scenario.id] = shuffle(shuffleTargets(scenario))
  }
  return order
}

/* Menyusun ulang sekumpulan item ber-id mengikuti daftar urutan di atas.
 * Kalau daftarnya belum ada atau tidak cocok (misalnya data level berubah),
 * urutan aslinya dipakai apa adanya supaya scene tetap bisa dimainkan. */
export function orderById(items, wanted) {
  if (!wanted) return items
  const ordered = wanted.map((id) => items.find((item) => item.id === id)).filter(Boolean)
  if (ordered.length !== items.length) return items
  return ordered
}

/* Khusus pilihan ganda: mengembalikan salinan skenario dengan pilihan
 * yang sudah diurutkan sesuai peta. */
export function applyChoiceOrder(scenario, order) {
  if (!scenario || scenario.type !== 'choice') return scenario
  const choices = orderById(scenario.choices, order?.[scenario.id])
  if (choices === scenario.choices) return scenario
  return { ...scenario, choices }
}
