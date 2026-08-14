# Kebijakan Privasi — Petualangan Arif & Safira di Hutan Internet

Terakhir diperbarui: 6 Agustus 2026

Permainan ini dibuat untuk anak-anak sekolah dasar, jadi perlindungan data mereka adalah hal pertama yang kami pikirkan. Dokumen ini menjelaskan secara jujur apa yang terjadi — dan tidak terjadi — dengan data saat aplikasi dipakai.

## Ringkasan singkat

Aplikasi ini **tidak mengumpulkan data apa pun tentang penggunanya**. Tidak ada server, tidak ada basis data, tidak ada akun, tidak ada iklan, dan tidak ada pelacakan.

## Yang tidak kami lakukan

- **Tidak meminta pendaftaran akun.** Tidak ada nama pengguna, kata sandi, surel, atau nomor telepon.
- **Tidak menampilkan iklan.** Tidak ada iklan, tawaran berbayar, maupun tautan ke toko daring.
- **Tidak melakukan pelacakan.** Secara bawaan tidak ada layanan analitik, kuki pihak ketiga, piksel pelacak, sidik jari perangkat, atau skrip dari luar.
- **Tidak mengirim data ke server.** Aplikasi ini hanya berupa berkas statis. Tidak ada permintaan jaringan ke layanan mana pun setelah halaman selesai dimuat.
- **Tidak meminta anak bercerita tentang dirinya.** Permainan tidak pernah menanyakan pengalaman pribadi, masalah keluarga, atau kejadian menyakitkan yang dialami anak.
- **Tidak memakai data lokasi, kamera, mikrofon, atau kontak.**

## Data yang disimpan di perangkat

Agar kemajuan bermain tidak hilang saat halaman disegarkan, aplikasi menyimpan beberapa hal di `localStorage` peramban, dengan kunci `hutan-internet:v1`:

| Data | Contoh | Keterangan |
| --- | --- | --- |
| Tokoh pilihan | `"arif"` | Hanya menentukan avatar yang tampil. |
| Jawaban tiap skenario | `{ "l1-s1": { "choiceId": "b", "points": 10 } }` | Dipakai untuk menghitung skor. |
| Level yang sudah selesai | `[1, 2]` | Menentukan level mana yang terbuka. |
| Nama di sertifikat | `"Rara"` | Hanya untuk mencetak sertifikat. |
| Pengaturan suara | `false` | Bawaannya mati. |

Satu hal lagi disimpan terpisah dengan kunci `hutan-internet:lang`: pilihan bahasa (`"id"` atau `"en"`). Nilainya sengaja dipisah agar mengatur ulang kemajuan tidak ikut mengubah bahasa yang sedang dipakai.

Semua data ini:

- **tetap berada di perangkat pemain** dan tidak pernah dikirim ke mana pun;
- **tidak dapat dilihat** oleh pengembang, guru, sekolah, maupun pihak lain;
- **hilang** kalau pemain menghapus data peramban atau menekan tombol "Atur ulang kemajuan".

## Nama di sertifikat

Anak boleh mengetik **nama panggilan** untuk dicetak di sertifikat. Kolom ini sengaja dibuat untuk nama panggilan saja, bukan nama lengkap, dan dibatasi 28 huruf.

Nama tersebut hanya dipakai untuk menampilkan dan mencetak sertifikat di perangkat itu sendiri. Nama tidak dikirim, tidak dicatat, dan ikut terhapus saat kemajuan diatur ulang.

## Cara menghapus semua data

Buka halaman mana pun, lalu tekan tombol **"Atur ulang kemajuan"** di bagian bawah halaman. Akan muncul konfirmasi lebih dulu. Setelah dikonfirmasi, seluruh data di perangkat itu terhapus.

Cara lain: hapus data situs lewat pengaturan peramban.

## Kalau nanti analitik ditambahkan

Kami tidak memasang analitik apa pun. Kalau di kemudian hari data penggunaan dibutuhkan untuk evaluasi program, layanan yang dipakai harus:

1. ramah privasi dan tanpa kuki;
2. tidak mengenali orang per orang;
3. tidak mengumpulkan data apa pun dari anak;
4. dinyatakan secara terbuka di dokumen ini dan di halaman Privasi aplikasi sebelum dipasang.

## Catatan untuk sekolah

Karena aplikasi ini tidak mengumpulkan data siswa sama sekali, pemakaiannya di kelas tidak memerlukan pengumpulan izin pengolahan data pribadi. Kemajuan bermain tersimpan di setiap perangkat, sehingga di komputer bersama sebaiknya kemajuan diatur ulang setelah sesi selesai.

## Pertanyaan

Silakan hubungi tim proyek melalui alamat surel yang tercantum di halaman "Tentang Kami".
