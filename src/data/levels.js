/* ===========================================================================
 * ISI PERMAINAN — DUA BAHASA (INDONESIA & INGGRIS)
 * ===========================================================================
 *
 * File ini terbagi dua bagian:
 *
 *   1. KERANGKA (base) — logika permainan yang SAMA untuk semua bahasa:
 *      id level, id skenario, bentuk interaksi, id pilihan/pasangan/kartu,
 *      poin, kategori pilihan (tone), jawaban paling bijak, simbol & warna
 *      harta karun, dan emoji lencana.
 *      Karena kemajuan pemain disimpan berdasarkan id ini, mengganti bahasa
 *      tidak pernah mengubah skor atau level yang sudah selesai.
 *
 *   2. TEKS (copy.id / copy.en) — seluruh kalimat yang dibaca pemain.
 *      Untuk menyunting cerita, cukup ubah bagian ini.
 *
 * TIGA BENTUK INTERAKSI (lihat `type` pada tiap skenario):
 *   'choice' — pilihan ganda tiga jawaban.
 *   'match'  — memasangkan awal kalimat (kiri) dengan tindakan (kanan).
 *   'sort'   — menyeret/mengetuk kartu ke kotak kategori yang tepat.
 * Setiap level berisi satu scene tiap bentuk, jadi seluruh permainan punya
 * 5 pilihan ganda, 5 memasangkan, dan 5 drag-and-drop. Semuanya bernilai
 * maksimal 10 poin, sehingga skor tertinggi tetap 150.
 *
 * PENTING — HUBUNGAN DENGAN PRE-TEST/POST-TEST:
 * Skenario di sini SENGAJA dibuat berbeda dari instrumen pre-test dan
 * post-test (redaksi, tokoh, dan situasinya), walaupun topik serta
 * kemampuan yang diukur tetap sama. Jangan menyalin skenario instrumen
 * ke dalam file ini, misalnya Roblox ditutup, jalan-jalan ke Ancol,
 * hadiah top up, atau menunjukkan bagian depan rumah saat siaran langsung.
 *
 * ATURAN BAHASA: kalimat pendek, hangat, dan tidak menghakimi. Jangan
 * memakai kata "salah", "bodoh", atau "gagal". Jelaskan akibat pilihan,
 * bukan menyalahkan anak yang memilihnya.
 * ======================================================================== */

/* ------------------------------------------------------------------ */
/* 1. KERANGKA PERMAINAN (jangan ubah id & poin sembarangan)          */
/* ------------------------------------------------------------------ */

const base = [
  {
    id: 1,
    slug: 'gerbang-rahasia',
    badgeEmoji: '🔐',
    treasureSymbol: '🗝️',
    treasureColor: '#f4b942',
    scenarios: [
      {
        id: 'l1-s1',
        type: 'choice',
        image: 'scene_gerbang',
        bestChoiceId: 'c',
        choices: [
          { id: 'a', points: 0, tone: 'unsafe' },
          { id: 'b', points: 0, tone: 'unsafe' },
          { id: 'c', points: 10, tone: 'best' },
        ],
      },
      {
        id: 'l1-s2',
        type: 'match',
        image: 'scene_kunci',
        pairs: [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }],
      },
      {
        id: 'l1-s3',
        type: 'sort',
        image: 'scene_formulir',
        categories: [
          { id: 'share', icon: '📢' },
          { id: 'secret', icon: '🔒' },
        ],
        cards: [
          { id: 'c1', category: 'share' },
          { id: 'c2', category: 'secret' },
          { id: 'c3', category: 'secret' },
          { id: 'c4', category: 'share' },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'sungai-berita-berisik',
    badgeEmoji: '🔎',
    treasureSymbol: '🧭',
    treasureColor: '#4aa3df',
    scenarios: [
      {
        id: 'l2-s1',
        type: 'choice',
        image: 'scene_sungai',
        bestChoiceId: 'b',
        choices: [
          { id: 'a', points: 0, tone: 'unsafe' },
          { id: 'b', points: 10, tone: 'best' },
          { id: 'c', points: 0, tone: 'unsafe' },
        ],
      },
      {
        id: 'l2-s2',
        type: 'match',
        image: 'scene_judul',
        pairs: [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }],
      },
      {
        id: 'l2-s3',
        type: 'sort',
        image: 'scene_dua_berita',
        categories: [
          { id: 'check', icon: '🔎' },
          { id: 'go', icon: '✅' },
        ],
        cards: [
          { id: 'c1', category: 'go' },
          { id: 'c2', category: 'check' },
          { id: 'c3', category: 'check' },
          { id: 'c4', category: 'go' },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: 'gua-sang-peniru',
    badgeEmoji: '🪞',
    treasureSymbol: '🔍',
    treasureColor: '#8b6cd8',
    scenarios: [
      {
        id: 'l3-s1',
        type: 'choice',
        image: 'scene_gua',
        bestChoiceId: 'b',
        choices: [
          { id: 'a', points: 0, tone: 'unsafe' },
          { id: 'b', points: 10, tone: 'best' },
          { id: 'c', points: 0, tone: 'unsafe' },
        ],
      },
      {
        id: 'l3-s2',
        type: 'match',
        image: 'scene_suara',
        pairs: [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }],
      },
      {
        id: 'l3-s3',
        type: 'sort',
        image: 'scene_video',
        categories: [
          { id: 'verify', icon: '🔎' },
          { id: 'trust', icon: '✅' },
        ],
        cards: [
          { id: 'c1', category: 'verify' },
          { id: 'c2', category: 'verify' },
          { id: 'c3', category: 'trust' },
          { id: 'c4', category: 'trust' },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: 'jembatan-komentar',
    badgeEmoji: '💚',
    treasureSymbol: '🛡️',
    treasureColor: '#2f9e6f',
    scenarios: [
      {
        id: 'l4-s1',
        type: 'choice',
        image: 'scene_jembatan',
        bestChoiceId: 'b',
        choices: [
          { id: 'a', points: 0, tone: 'unsafe' },
          { id: 'b', points: 10, tone: 'best' },
          { id: 'c', points: 0, tone: 'unsafe' },
        ],
      },
      {
        id: 'l4-s2',
        type: 'match',
        image: 'scene_marah',
        pairs: [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }],
      },
      {
        id: 'l4-s3',
        type: 'sort',
        image: 'scene_izin',
        categories: [
          { id: 'kind', icon: '💚' },
          { id: 'hurt', icon: '💔' },
        ],
        cards: [
          { id: 'c1', category: 'kind' },
          { id: 'c2', category: 'hurt' },
          { id: 'c3', category: 'hurt' },
          { id: 'c4', category: 'kind' },
        ],
      },
    ],
  },
  {
    id: 5,
    slug: 'istana-penjaga-internet',
    badgeEmoji: '🏅',
    treasureSymbol: '👑',
    treasureColor: '#ffd166',
    scenarios: [
      {
        id: 'l5-s1',
        type: 'choice',
        image: 'scene_istana',
        bestChoiceId: 'b',
        choices: [
          { id: 'a', points: 0, tone: 'unsafe' },
          { id: 'b', points: 10, tone: 'best' },
          { id: 'c', points: 0, tone: 'unsafe' },
        ],
      },
      {
        id: 'l5-s2',
        type: 'match',
        image: 'scene_grup',
        pairs: [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }],
      },
      {
        id: 'l5-s3',
        type: 'sort',
        image: 'scene_mahkota',
        categories: [
          { id: 'safe', icon: '👍' },
          { id: 'keep', icon: '🔒' },
        ],
        cards: [
          { id: 'c1', category: 'safe' },
          { id: 'c2', category: 'keep' },
          { id: 'c3', category: 'safe' },
          { id: 'c4', category: 'keep' },
        ],
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* 2a. TEKS BAHASA INDONESIA                                          */
/* ------------------------------------------------------------------ */

const copyId = {
  levels: {
    1: {
      title: 'Gerbang Rahasia',
      topic: 'Data pribadi, kata sandi, dan pesan dari orang asing',
      summary: 'Gerbang tua ini hanya terbuka untuk anak yang pandai menjaga rahasianya sendiri.',
      intro:
        'Di depan Arif dan Safira berdiri gerbang batu berlumut. Dari celah-celahnya, akar-akar berbisik, "Ceritakan tentang dirimu…" Piko mengepakkan sayap. "Waspada, ya. Di sini, rahasia adalah kuncimu."',
      badge: { name: 'Penjaga Rahasia', description: 'Kamu tahu informasi mana yang harus disimpan rapat-rapat.' },
      treasure: {
        name: 'Kunci Kewaspadaan',
        description: 'Mengingatkanmu untuk berpikir sebelum membagikan informasi pribadi.',
      },
    },
    2: {
      title: 'Sungai Berita Berisik',
      topic: 'Informasi menyesatkan, judul berita, dan memeriksa sumber',
      summary: 'Airnya riuh oleh kabar yang saling berteriak. Mana yang benar, ya?',
      intro:
        'Sungai ini penuh pesan yang mengapung dan berteriak, "Sebarkan aku! Sebarkan aku!" Safira menggenggam tangan Arif. "Tunggu dulu," katanya. "Kita periksa satu per satu."',
      badge: { name: 'Detektif Informasi', description: 'Kamu terbiasa memeriksa dulu sebelum percaya dan membagikan.' },
      treasure: {
        name: 'Kompas Kebenaran',
        description: 'Menunjukkan arah menuju informasi yang dapat dipercaya.',
      },
    },
    3: {
      title: 'Gua Sang Peniru',
      topic: 'Konten buatan AI, foto suntingan, serta suara dan video palsu',
      summary: 'Di gua ini semua bisa ditiru: wajah, suara, bahkan cerita.',
      intro:
        'Dinding gua memantulkan bayangan yang bergerak sendiri. Ada suara guru Safira, ada wajah tetangga Arif, padahal tak ada seorang pun di sana. "Selamat datang di rumah Sang Peniru," bisik Piko.',
      badge: { name: 'Pemburu Jejak AI', description: 'Kamu tahu gambar, suara, dan video bisa dibuat atau diubah.' },
      treasure: {
        name: 'Lensa Ketelitian',
        description: 'Membantumu melihat kejanggalan dalam gambar, suara, dan video.',
      },
    },
    4: {
      title: 'Jembatan Komentar',
      topic: 'Perundungan siber, empati, dan cara melapor',
      summary: 'Setiap kata yang ditulis di sini bisa menjadi papan jembatan atau justru lubang.',
      intro:
        'Jembatan gantung ini terbuat dari komentar. Papan berisi kata-kata baik terasa kokoh, sedangkan papan berisi ejekan mulai lapuk dan retak. Arif menelan ludah. "Ternyata kata-kata seberat itu, ya."',
      badge: { name: 'Sahabat Digital', description: 'Kamu memilih kata yang menguatkan, bukan yang melukai.' },
      treasure: {
        name: 'Perisai Kebaikan',
        description: 'Menjadi semakin kuat setiap kali kamu membela dan menghargai orang lain.',
      },
    },
    5: {
      title: 'Istana Penjaga Internet',
      topic: 'Keamanan bermain, siaran langsung, dan meminta bantuan',
      summary: 'Tantangan terakhir: tunjukkan bahwa kamu siap menjadi penjaga.',
      intro:
        'Di puncak bukit berdiri istana dari akar dan cahaya. Empat harta karun sudah kembali ke tempatnya. Piko hinggap di bahumu. "Tinggal satu lagi. Tunjukkan bahwa kamu bisa menjaga dirimu dan teman-temanmu."',
      badge: {
        name: 'Penjaga Hutan Internet',
        description: 'Kamu siap menjaga dirimu sendiri dan menolong teman di dunia digital.',
      },
      treasure: {
        name: 'Mahkota Kebijaksanaan',
        description:
          'Harta karun terakhir yang melambangkan pilihan digital yang aman, benar, baik, dan bertanggung jawab.',
      },
    },
  },

  scenarios: {
    /* ---------------- Level 1 — data pribadi & kata sandi ---------------- */
    'l1-s1': {
      title: 'Pop-up Stiker Gratis',
      story:
        'Arif sedang memakai aplikasi menggambar gratis. Tiba-tiba muncul kotak berkedip: "Isi nama lengkap, tanggal lahir, dan nomor HP ibumu untuk mendapat 100 stiker gratis!"',
      imageAlt:
        'Arif berdiri di depan gerbang hutan sambil menatap kotak pop-up berkedip di layar tabletnya.',
      choices: {
        a: {
          label: 'Mengisi semuanya supaya stikernya cepat didapat',
          feedback:
            'Kotak berhadiah seperti ini sering dipakai untuk mengumpulkan data. Tanggal lahir dan nomor HP ibu sebaiknya tidak diisi di sana.',
        },
        b: {
          label: 'Mengisi nama lengkap dan tanggal lahir saja',
          feedback:
            'Walau hanya sebagian, data itu tetap bisa dipakai orang lain untuk menebak akun atau menghubungimu. Lebih baik tidak diisi.',
        },
        c: {
          label: 'Menutup kotak itu, lalu menunjukkannya kepada orang tua atau guru',
          feedback:
            'Tepat! Menutup pop-up dan bertanya kepada orang dewasa adalah langkah paling aman. Stiker gratis tidak sebanding dengan data keluargamu.',
        },
      },
      explanation:
        'Tanggal lahir dan nomor HP keluarga adalah data pribadi. Aplikasi yang baik tidak pernah memintanya sebagai syarat mendapat hadiah.',
      tip: 'Pop-up berhadiah? Tutup dulu, lalu tanya orang dewasa.',
    },
    'l1-s2': {
      title: 'Bengkel Kunci Piko',
      story:
        'Safira membuat akun untuk aplikasi baca buku kelas. Piko membentangkan tiga papan kunci di depan gerbang. "Sambungkan setiap kejadian dengan tindakan yang tepat, ya."',
      imageAlt: 'Safira memasangkan papan kunci bersama Piko di depan gerbang bercahaya.',
      prompt: 'Pasangkan setiap kalimat di kiri dengan tindakan yang tepat di kanan.',
      pairs: {
        p1: {
          left: 'Kalau membuat kata sandi baru…',
          right: 'gabungkan kata, angka, dan tanda baca',
        },
        p2: {
          left: 'Kalau ada yang mengintip saat kamu mengetik sandi…',
          right: 'berhenti dulu, ketik setelah aman',
        },
        p3: {
          left: 'Kalau kamu lupa kata sandi…',
          right: 'minta bantuan orang tua, jangan menulisnya di grup kelas',
        },
      },
      explanation:
        'Kata sandi yang kuat itu panjang dan sulit ditebak. Kata sandi juga hanya disimpan olehmu dan orang tuamu.',
      tip: 'Kata sandi itu seperti sikat gigi: dipakai sendiri, tidak dipinjamkan.',
    },
    'l1-s3': {
      title: 'Kartu Profil di Aplikasi Kuis',
      story:
        'Kelas Arif memakai aplikasi kuis baru. Aplikasi itu meminta beberapa keterangan untuk kartu profil. Arif menimbang, mana yang boleh diisi dan mana yang harus disimpan sendiri.',
      imageAlt: 'Piko berdiri di depan gerbang sambil menunjuk empat kartu keterangan profil.',
      prompt: 'Letakkan setiap kartu di tempat yang cocok.',
      categories: {
        share: { label: 'Boleh Dibagikan' },
        secret: { label: 'Rahasia' },
      },
      cards: {
        c1: { label: 'Nama panggilan' },
        c2: { label: 'Nomor HP ibu' },
        c3: { label: 'Kata sandi akun belajar' },
        c4: { label: 'Warna kesukaan' },
      },
      explanation:
        'Nama panggilan dan warna kesukaan tidak menunjukkan siapa dan di mana kamu berada. Nomor HP keluarga dan kata sandi menunjukkannya, jadi disimpan sendiri.',
      tip: 'Kalau bisa dipakai untuk mencariku, berarti rahasia.',
    },

    /* ---------------- Level 2 — memeriksa berita & pesan ----------------- */
    'l2-s1': {
      title: 'Pesan Berantai tentang Gempa',
      story:
        'Safira menerima pesan berantai: "Besok pukul 10 akan ada gempa besar di kota kita. Sebarkan ke sepuluh grup sekarang juga!" Pengirimnya tidak dikenal, tetapi sudah banyak yang meneruskannya.',
      imageAlt: 'Pesan berantai berputar-putar di arus Sungai Berita Berisik.',
      choices: {
        a: {
          label: 'Meneruskan ke sepuluh grup supaya semua orang bersiap',
          feedback:
            'Meneruskan pesan yang belum diperiksa bisa membuat banyak orang panik. Berhenti dulu sebelum menekan tombol kirim.',
        },
        b: {
          label: 'Berhenti dulu, lalu memeriksa pengumuman resmi bersama orang dewasa',
          feedback:
            'Tepat! Kabar bencana hanya bisa dipastikan lewat lembaga resmi. Memeriksanya bersama orang dewasa adalah langkah paling tenang.',
        },
        c: {
          label: 'Percaya karena banyak teman mengirim pesan yang sama',
          feedback:
            'Banyaknya orang yang mengirim bukan bukti. Pesan yang sama bisa disalin ribuan kali tanpa ada yang memeriksanya.',
        },
      },
      explanation:
        'Sampai hari ini belum ada yang bisa memastikan jam terjadinya gempa. Kabar bencana selalu bisa dicek pada lembaga resmi bersama orang dewasa.',
      tip: 'Pesan yang menyuruh buru-buru menyebar justru perlu diperiksa.',
    },
    'l2-s2': {
      title: 'Papan-Papan di Tepi Sungai',
      story:
        'Di tepi sungai berdiri papan-papan berisi kabar. Piko menunjuk tiga papan yang paling ramai. "Ayo pasangkan, apa yang sebaiknya dilakukan."',
      imageAlt: 'Arif membaca papan-papan kabar di tepi sungai bersama Piko.',
      prompt: 'Pasangkan setiap kalimat di kiri dengan tindakan yang tepat di kanan.',
      pairs: {
        p1: { left: 'Kalau judulnya membuat kaget…', right: 'baca dulu isinya sampai selesai' },
        p2: {
          left: 'Kalau kabar itu tidak menyebut sumber…',
          right: 'cari kabar yang sama di sumber tepercaya',
        },
        p3: {
          left: 'Kalau tiga sumber tepercaya menulis hal yang sama…',
          right: 'kabar itu lebih mungkin benar',
        },
      },
      explanation:
        'Judul dibuat supaya menarik perhatian. Yang menentukan benar atau tidaknya sebuah kabar adalah isi dan sumbernya.',
      tip: 'Satu sumber itu cerita. Tiga sumber tepercaya itu bukti.',
    },
    'l2-s3': {
      title: 'Kabar Lomba Menggambar',
      story:
        'Menjelang lomba menggambar, banyak kabar beredar di kelas Arif. Sebagian datang dari sumber yang jelas, sebagian tidak.',
      imageAlt: 'Dua papan kabar berdiri berdampingan sementara Piko menunjuk kartu-kartu kabar.',
      prompt: 'Letakkan setiap kartu di tempat yang cocok.',
      categories: {
        check: { label: 'Cek Dahulu' },
        go: { label: 'Boleh Dilanjutkan' },
      },
      cards: {
        c1: { label: 'Poster lomba dari laman resmi sekolah' },
        c2: { label: 'Pesan berantai: "Sebarkan ke 10 teman atau kamu sial"' },
        c3: { label: 'Tangkapan layar tanpa nama pengirim tentang hadiah sepeda' },
        c4: { label: 'Jadwal lomba yang dibacakan guru di kelas' },
      },
      explanation:
        'Kabar dari sumber resmi bisa langsung dipakai. Kabar tanpa nama pengirim, atau yang memaksa cepat menyebar, perlu diperiksa dulu.',
      tip: 'Sebelum ikut menyebarkan, cek dulu siapa sumbernya.',
    },

    /* ---------------- Level 3 — gambar, suara, dan video AI -------------- */
    'l3-s1': {
      title: 'Video Gajah Sebesar Kucing',
      story:
        'Sebuah video pendek menampilkan gajah mungil seukuran kucing yang berjalan di kebun sekolah. Tulisannya: "Rekaman asli pagi tadi!" Videonya mulus, tetapi bayangan gajah itu menghadap arah yang berbeda dari bayangan pohon.',
      imageAlt: 'Bayangan gajah mungil bergerak sendiri di dinding Gua Sang Peniru.',
      choices: {
        a: {
          label: 'Ikut membagikan karena videonya lucu',
          feedback:
            'Membagikan "karena lucu" tetap membuat video buatan itu semakin dipercaya orang lain.',
        },
        b: {
          label: 'Memperhatikan bagian yang janggal, lalu memastikannya kepada orang dewasa',
          feedback:
            'Hebat! Bayangan yang tidak cocok adalah tanda video mungkin dibuat dengan AI. Memastikannya dulu adalah langkah yang tepat.',
        },
        c: {
          label: 'Percaya karena videonya jernih dan ditonton ribuan orang',
          feedback:
            'Video yang jernih dan ramai ditonton tetap bisa dibuat dengan komputer. Jumlah penonton bukan bukti.',
        },
      },
      explanation:
        'Video bisa dibuat dengan AI. Carilah bagian yang janggal, misalnya bayangan yang arahnya berbeda, gerakan yang terlalu mulus, atau tulisan yang berantakan.',
      tip: 'Terlihat nyata belum tentu nyata.',
    },
    'l3-s2': {
      title: 'Tiga Bayangan di Dinding Gua',
      story:
        'Sang Peniru memantulkan tiga bayangan sekaligus: sebuah foto, sebuah pesan suara, dan sebuah gambar bertulisan. Piko menunggu di depan. "Kamu tahu harus berbuat apa?"',
      imageAlt: 'Safira berdiri di depan tiga bayangan yang bergerak di dinding gua.',
      prompt: 'Pasangkan setiap kalimat di kiri dengan tindakan yang tepat di kanan.',
      pairs: {
        p1: {
          left: 'Kalau jari tangan di dalam foto jumlahnya aneh…',
          right: 'periksa lagi, foto itu mungkin dibuat AI',
        },
        p2: {
          left: 'Kalau suara di pesan mirip orang yang kamu kenal dan meminta buru-buru…',
          right: 'hubungi orang itu lewat nomor yang sudah kamu kenal',
        },
        p3: {
          left: 'Kalau tulisan di dalam gambar terlihat berantakan…',
          right: 'cari sumber aslinya sebelum percaya',
        },
      },
      explanation:
        'AI bisa meniru wajah, suara, dan tulisan. Tanda kecil yang janggal membantu kita berhenti sebentar dan memeriksa.',
      tip: 'Wajah dan suara bisa ditiru. Jalur yang sudah kukenal tidak.',
    },
    'l3-s3': {
      title: 'Menimbang Isi Gua',
      story:
        'Sebelum keluar dari gua, Piko menyodorkan empat kartu. "Mana yang perlu diperiksa dulu, dan mana yang lebih bisa dipercaya?"',
      imageAlt: 'Piko menunjukkan empat kartu bergambar di depan layar-layar gua.',
      prompt: 'Letakkan setiap kartu di tempat yang cocok.',
      categories: {
        verify: { label: 'Perlu Diperiksa' },
        trust: { label: 'Lebih Dapat Dipercaya' },
      },
      cards: {
        c1: { label: 'Foto badak berjalan di lorong sekolah, tanpa sumber' },
        c2: { label: 'Pesan suara mirip suara pamanmu, meminta uang cepat-cepat' },
        c3: { label: 'Video kegiatan kelas dari akun resmi sekolah' },
        c4: { label: 'Foto kerja kelompok yang dipotret Safira sendiri' },
      },
      explanation:
        'Gambar dan suara yang datang tanpa sumber perlu diperiksa. Yang kita rekam sendiri, atau yang berasal dari akun resmi, lebih bisa dipercaya.',
      tip: 'Sebelum percaya, tanyakan: ini datang dari mana?',
    },

    /* ---------------- Level 4 — ejekan dan interaksi tidak baik ---------- */
    'l4-s1': {
      title: 'Obrolan di Tengah Permainan',
      story:
        'Saat bermain permainan daring bersama tim, seorang teman satu tim terus disoraki di kolom obrolan: "Payah! Keluar saja sana!" Teman itu lalu berhenti menjawab.',
      imageAlt: 'Jembatan komentar berayun sementara kata-kata kasar muncul di papan obrolan.',
      choices: {
        a: {
          label: 'Ikut menulis sorakan supaya tidak dianggap lemah',
          feedback:
            'Ikut menyoraki menambah luka teman satu tim, walaupun kita hanya menulis satu kali.',
        },
        b: {
          label:
            'Menulis kalimat yang menyemangati, keluar dari obrolan itu, lalu bercerita kepada orang dewasa',
          feedback:
            'Tepat! Satu kalimat baik bisa mengubah suasana. Bercerita kepada orang dewasa membuat kejadian seperti ini tidak berulang.',
        },
        c: {
          label: 'Diam saja dan membiarkan obrolannya berjalan',
          feedback:
            'Diam terasa aman untuk kita, tetapi teman yang disoraki tetap sendirian. Dukungan kecil sangat berarti baginya.',
        },
      },
      explanation:
        'Kata-kata di kolom obrolan tetap terasa, walaupun hanya berupa tulisan. Mendukung teman dan bercerita kepada orang dewasa adalah cara yang paling menolong.',
      tip: 'Satu kalimat baik bisa menahan sepuluh sorakan.',
    },
    'l4-s2': {
      title: 'Papan-Papan Jembatan',
      story:
        'Papan jembatan berderit. Tiga papan bertuliskan kejadian yang sering terjadi di kelas Arif. "Pilih tindakan yang membuat papannya kokoh," kata Piko.',
      imageAlt: 'Arif berdiri di atas jembatan komentar sambil membaca papan-papan bertulisan.',
      prompt: 'Pasangkan setiap kalimat di kiri dengan tindakan yang tepat di kanan.',
      pairs: {
        p1: {
          left: 'Kalau kamu kesal setelah kalah bermain…',
          right: 'letakkan dulu ponselnya sampai tenang',
        },
        p2: {
          left: 'Kalau ada teman diejek di kolom komentar…',
          right: 'tulis kalimat yang menguatkan dan laporkan komentarnya',
        },
        p3: {
          left: 'Kalau kamu ingin mengunggah foto temanmu…',
          right: 'tanyakan dulu, boleh atau tidak',
        },
      },
      explanation:
        'Kata dan foto di internet sulit ditarik kembali. Berhenti sebentar dan bertanya lebih dulu selalu menolong.',
      tip: 'Saat kesal, berhenti dulu sebelum mengetik.',
    },
    'l4-s3': {
      title: 'Kata-Kata di Ujung Jembatan',
      story:
        'Di ujung jembatan ada empat kartu berisi tindakan anak-anak di kelas Safira. Papan jembatan hanya kokoh kalau kartunya diletakkan di tempat yang tepat.',
      imageAlt: 'Arif dan Safira memegang ponsel sambil memilah kartu di ujung jembatan.',
      prompt: 'Letakkan setiap kartu di tempat yang cocok.',
      categories: {
        kind: { label: 'Tindakan Baik' },
        hurt: { label: 'Tindakan yang Menyakiti' },
      },
      cards: {
        c1: { label: 'Menulis "tadi kamu sudah berusaha, semangat!"' },
        c2: { label: 'Membuat stiker lucu dari wajah teman lalu menyebarkannya' },
        c3: { label: 'Mengajak teman lain ikut menyoraki di kolom komentar' },
        c4: { label: 'Mengirim pesan pribadi untuk menemani teman yang sedang sedih' },
      },
      explanation:
        'Tindakan baik membuat teman merasa ditemani. Tindakan yang menyakiti menyebar cepat dan sulit dihapus.',
      tip: 'Sebelum mengirim, bayangkan wajah temanku saat membacanya.',
    },

    /* ---------------- Level 5 — bermain, siaran, dan minta bantuan ------- */
    'l5-s1': {
      title: 'Permintaan Saat Siaran Bermain Game',
      story:
        'Arif sedang menyiarkan permainannya secara langsung. Seorang penonton menulis berkali-kali: "Nyalakan fitur lokasimu, biar kita bisa main bareng di dekat rumahmu."',
      imageAlt: 'Arif menyiarkan permainannya secara langsung di aula istana.',
      choices: {
        a: {
          label: 'Menyalakan fitur lokasi supaya bisa bermain bersama',
          feedback:
            'Fitur lokasi menunjukkan tempatmu berada saat itu juga. Orang yang belum pernah kamu temui tidak perlu mengetahuinya.',
        },
        b: {
          label: 'Tidak menyalakannya, mengakhiri siaran, lalu bercerita kepada orang tua',
          feedback:
            'Aman! Kamu tidak perlu menuruti permintaan penonton. Mengakhiri siaran dan bercerita kepada orang dewasa adalah langkah yang tepat.',
        },
        c: {
          label: 'Menyebutkan nama kompleks perumahannya saja',
          feedback:
            'Nama kompleks sudah cukup untuk mempersempit pencarian. Lebih baik tidak disebutkan sama sekali.',
        },
      },
      explanation:
        'Saat siaran langsung, lokasi tidak perlu dibagikan kepada siapa pun yang belum kamu kenal di dunia nyata.',
      tip: 'Lokasiku bukan untuk penonton yang belum kukenal.',
    },
    'l5-s2': {
      title: 'Tiga Gerbang Terakhir',
      story:
        'Tiga gerbang kecil berjajar di aula istana. Setiap gerbang hanya terbuka kalau dipasangkan dengan tindakan penjaga yang tepat.',
      imageAlt: 'Piko berdiri tegas di depan tiga gerbang kecil di aula istana.',
      prompt: 'Pasangkan setiap kalimat di kiri dengan tindakan yang tepat di kanan.',
      pairs: {
        p1: {
          left: 'Kalau ada pemain yang memaksamu terus mengobrol di luar permainan…',
          right: 'hentikan obrolannya dan ceritakan kepada orang dewasa',
        },
        p2: {
          left: 'Kalau orang yang belum pernah kamu temui meminta kamera dinyalakan…',
          right: 'tolak permintaannya dan minta bantuan orang dewasa',
        },
        p3: {
          left: 'Sebelum mengunggah video buatanmu…',
          right: 'periksa apakah seragam, alamat, atau nama sekolah ikut terlihat',
        },
      },
      explanation:
        'Penjaga tidak menghadapi permintaan yang tidak nyaman sendirian, dan selalu memeriksa videonya sebelum diunggah.',
      tip: 'Kalau ada yang terasa tidak nyaman, aku boleh berhenti dan bercerita.',
    },
    'l5-s3': {
      title: 'Mahkota dan Empat Pertanyaan',
      story:
        'Mahkota Kebijaksanaan melayang keemasan. "Ujian terakhir," kata Piko. "Saat siaran langsung atau mengunggah sesuatu, mana yang aman ditampilkan dan mana yang disimpan sendiri?"',
      imageAlt: 'Mahkota Kebijaksanaan bercahaya di atas empat kartu di aula istana.',
      prompt: 'Letakkan setiap kartu di tempat yang cocok.',
      categories: {
        safe: { label: 'Aman Ditampilkan' },
        keep: { label: 'Disimpan Sendiri' },
      },
      cards: {
        c1: { label: 'Layar permainan dan skormu' },
        c2: { label: 'Kartu pelajar yang ada nama sekolahnya' },
        c3: { label: 'Nama panggilan di dalam permainan' },
        c4: { label: 'Nomor telepon yang tertempel di kulkas' },
      },
      explanation:
        'Sebelum menampilkan apa pun, tanyakan empat hal: aman? benar? baik? perlu? Kalau sesuatu bisa menunjukkan tempatmu berada, simpan sendiri saja.',
      tip: 'Sebelum kirim: aman? benar? baik? perlu?',
    },
  },

  feedbackLabels: {
    best: 'Pilihan yang paling bijak',
    partial: 'Pilihan aman, tapi ada yang lebih baik',
    unsafe: 'Coba pikirkan lagi',
  },

  resultTiers: [
    {
      min: 80,
      title: 'Penjaga Hebat',
      message: 'Kamu sudah mampu membuat banyak pilihan digital yang aman dan bijak. Ajak teman-temanmu ikut berlatih, ya.',
      emoji: '🌟',
    },
    {
      min: 60,
      title: 'Penjelajah Cermat',
      message: 'Kamu sudah memahami banyak hal. Terus berlatih memeriksa informasi dan meminta bantuan saat ragu.',
      emoji: '🧭',
    },
    {
      min: 0,
      title: 'Petualang Pemberani',
      message: 'Setiap penjaga hebat selalu belajar. Mainkan kembali petualangan ini dan temukan pilihan yang lebih aman.',
      emoji: '🌱',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* 2b. ENGLISH COPY                                                   */
/* ------------------------------------------------------------------ */

const copyEn = {
  levels: {
    1: {
      title: 'The Secret Gate',
      topic: 'Personal information, passwords, and messages from strangers',
      summary: 'This old gate only opens for children who can keep their own secrets.',
      intro:
        'A mossy stone gate stands before Arif and Safira. Roots whisper through its cracks: "Tell us about yourself…" Piko flutters her wings. "Careful. In here, your secrets are your key."',
      badge: { name: 'Secret Keeper', description: 'You know which information should stay private.' },
      treasure: {
        name: 'Key of Caution',
        description: 'Reminds you to think before sharing personal information.',
      },
    },
    2: {
      title: 'The Noisy News River',
      topic: 'Misleading information, headlines, and checking sources',
      summary: 'The water roars with stories all shouting at once. Which one is true?',
      intro:
        'This river is full of floating messages shouting, "Share me! Share me!" Safira takes Arif\'s hand. "Wait," she says. "Let\'s check them one by one."',
      badge: { name: 'Information Detective', description: 'You check first before believing and sharing.' },
      treasure: {
        name: 'Compass of Truth',
        description: 'Points you towards information you can trust.',
      },
    },
    3: {
      title: "The Mimic's Cave",
      topic: 'Content generated by AI, edited photos, and fake voices and videos',
      summary: 'In this cave, anything can be copied: faces, voices, even stories.',
      intro:
        'The cave walls reflect shadows that move on their own. There is the voice of Safira\'s teacher, the face of Arif\'s neighbour, yet no one is there. "Welcome to the Mimic\'s home," whispers Piko.',
      badge: { name: 'AI Spotter', description: 'You know that pictures, voices, and videos can be made or changed.' },
      treasure: {
        name: 'Lens of Clarity',
        description: 'Helps you spot unusual details in pictures, voices, and videos.',
      },
    },
    4: {
      title: 'The Comment Bridge',
      topic: 'Cyberbullying, empathy, and how to report',
      summary: 'Every word written here becomes a plank in the bridge, or a hole in it.',
      intro:
        'This rope bridge is built from comments. Planks made of kind words feel solid, while planks full of insults are cracked and rotting. Arif gulps. "So words really are that heavy."',
      badge: { name: 'Digital Friend', description: 'You choose words that lift people up, not words that hurt.' },
      treasure: {
        name: 'Shield of Kindness',
        description: 'Grows stronger whenever you support and respect others.',
      },
    },
    5: {
      title: "The Guardian's Palace",
      topic: 'Safe gaming, livestreaming, and asking for help',
      summary: 'The final challenge: show that you are ready to be a guardian.',
      intro:
        'On the hilltop stands a palace of roots and light. Four treasures are back in their places. Piko lands on your shoulder. "One more to go. Show that you can look after yourself and your friends."',
      badge: {
        name: 'Guardian of the Internet Forest',
        description: 'You are ready to look after yourself and help your friends online.',
      },
      treasure: {
        name: 'Crown of Wisdom',
        description: 'The final treasure, representing choices that are safe, truthful, kind, and responsible.',
      },
    },
  },

  scenarios: {
    /* ---------------- Level 1 — personal data & passwords ---------------- */
    'l1-s1': {
      title: 'The Free Sticker Pop-Up',
      story:
        'Arif is using a free drawing app. A flashing box suddenly appears: "Type your full name, date of birth, and your mum\'s phone number to get 100 free stickers!"',
      imageAlt: 'Arif stands in front of the forest gate, staring at a flashing pop-up box on his tablet.',
      choices: {
        a: {
          label: 'Fill everything in so the stickers arrive quickly',
          feedback:
            'Prize boxes like this are often used to collect data. A birth date and a parent\'s phone number should not be typed in there.',
        },
        b: {
          label: 'Fill in only the full name and date of birth',
          feedback:
            'Even a part of it can help someone guess your account or contact you. It is better not to fill it in at all.',
        },
        c: {
          label: 'Close the box, then show it to a parent or teacher',
          feedback:
            'Exactly! Closing the pop-up and asking an adult is the safest step. Free stickers are not worth your family\'s information.',
        },
      },
      explanation:
        'A birth date and a family phone number are private information. A good app never asks for them in exchange for a prize.',
      tip: 'A prize pop-up? Close it first, then ask an adult.',
    },
    'l1-s2': {
      title: "Piko's Key Workshop",
      story:
        'Safira is making an account for the class reading app. Piko lays out three key boards in front of the gate. "Match each situation with the right action."',
      imageAlt: 'Safira matches key boards with Piko in front of the glowing gate.',
      prompt: 'Match each sentence on the left with the right action on the right.',
      pairs: {
        p1: {
          left: 'When you create a new password…',
          right: 'mix words, numbers, and punctuation',
        },
        p2: {
          left: 'When someone peeks while you type your password…',
          right: 'pause, and type it when nobody is watching',
        },
        p3: {
          left: 'When you forget your password…',
          right: 'ask a parent for help, never post it in the class group',
        },
      },
      explanation:
        'A strong password is long and hard to guess. It also stays between you and your parents.',
      tip: 'A password is like a toothbrush: use it yourself, never share it.',
    },
    'l1-s3': {
      title: 'A Profile Card in the Quiz App',
      story:
        'Arif\'s class is trying a new quiz app. It asks for a few details for a profile card. Arif thinks about which ones he can fill in and which ones stay with him.',
      imageAlt: 'Piko stands in front of the gate, pointing at four profile detail cards.',
      prompt: 'Put each card where it belongs.',
      categories: {
        share: { label: 'Okay to Share' },
        secret: { label: 'Private' },
      },
      cards: {
        c1: { label: 'My nickname' },
        c2: { label: "Mum's phone number" },
        c3: { label: 'My learning account password' },
        c4: { label: 'My favourite colour' },
      },
      explanation:
        'A nickname and a favourite colour do not show who or where you are. A family phone number and a password do, so they stay with you.',
      tip: 'If it can be used to find me, it is private.',
    },

    /* ---------------- Level 2 — checking news and messages --------------- */
    'l2-s1': {
      title: 'A Chain Message About an Earthquake',
      story:
        'Safira gets a chain message: "Tomorrow at 10 a big earthquake will hit our city. Forward this to ten groups right now!" The sender is unknown, but many people have already passed it on.',
      imageAlt: 'A chain message swirls in the current of the Noisy News River.',
      choices: {
        a: {
          label: 'Forward it to ten groups so everyone is ready',
          feedback:
            'Forwarding a message you have not checked can frighten a lot of people. Pause before you press send.',
        },
        b: {
          label: 'Pause first, then check official announcements with an adult',
          feedback:
            'Exactly! Disaster news can only be confirmed by official agencies. Checking it with an adult is the calmest step.',
        },
        c: {
          label: 'Believe it because many friends sent the same message',
          feedback:
            'A lot of senders is not proof. The very same message can be copied thousands of times without anyone checking it.',
        },
      },
      explanation:
        'Nobody can yet predict the exact hour of an earthquake. Disaster news can always be checked with an official agency, together with an adult.',
      tip: 'A message that rushes you to share is the one to check.',
    },
    'l2-s2': {
      title: 'The Boards by the River',
      story:
        'News boards line the riverbank. Piko points at the three noisiest ones. "Match each one with what you should do."',
      imageAlt: 'Arif reads the news boards by the river with Piko.',
      prompt: 'Match each sentence on the left with the right action on the right.',
      pairs: {
        p1: { left: 'When a headline gives you a shock…', right: 'read the whole story first' },
        p2: {
          left: 'When a story names no source…',
          right: 'look for the same news in a trusted source',
        },
        p3: {
          left: 'When three trusted sources say the same thing…',
          right: 'the news is much more likely to be true',
        },
      },
      explanation:
        'Headlines are written to grab attention. What decides whether news is true is the story itself and its source.',
      tip: 'One source is a story. Three trusted sources are proof.',
    },
    'l2-s3': {
      title: 'News About the Drawing Contest',
      story:
        'As the drawing contest gets closer, all kinds of news reach Arif\'s class. Some of it comes from a clear source, some of it does not.',
      imageAlt: 'Two news boards stand side by side while Piko points at news cards.',
      prompt: 'Put each card where it belongs.',
      categories: {
        check: { label: 'Check First' },
        go: { label: 'Okay to Continue' },
      },
      cards: {
        c1: { label: 'A contest poster from the official school website' },
        c2: { label: 'A chain message: "Share to 10 friends or bad luck will find you"' },
        c3: { label: 'A screenshot with no sender\'s name about a free bicycle' },
        c4: { label: 'The contest schedule read out by the teacher in class' },
      },
      explanation:
        'News from an official source is ready to use. News with no sender, or news that pushes you to share fast, needs checking first.',
      tip: 'Before I pass it on, I check where it came from.',
    },

    /* ---------------- Level 3 — AI pictures, voices, and video ----------- */
    'l3-s1': {
      title: 'The Video of a Cat-Sized Elephant',
      story:
        'A short video shows a tiny elephant the size of a cat walking in the school garden. The caption says, "Real footage from this morning!" The video is smooth, but the elephant\'s shadow falls the opposite way from the trees\' shadows.',
      imageAlt: "The shadow of a tiny elephant moves by itself on the wall of the Mimic's Cave.",
      choices: {
        a: {
          label: 'Share it because the video is funny',
          feedback: 'Sharing it "just for fun" still helps more people believe a made-up video.',
        },
        b: {
          label: 'Look closely at the odd detail, then check with an adult',
          feedback:
            'Excellent! Shadows that do not match are a clue that a video may be made with AI. Checking first is exactly right.',
        },
        c: {
          label: 'Believe it because the video is sharp and has thousands of views',
          feedback:
            'A sharp, popular video can still be made by a computer. The number of views is not proof.',
        },
      },
      explanation:
        'Videos can be made with AI. Look for odd details: shadows falling in different directions, movements that are too smooth, or jumbled writing.',
      tip: "Looking real doesn't make it real.",
    },
    'l3-s2': {
      title: 'Three Shadows on the Cave Wall',
      story:
        'The Mimic throws up three shadows at once: a photo, a voice message, and a picture with writing on it. Piko waits in front. "Do you know what to do?"',
      imageAlt: 'Safira stands before three moving shadows on the cave wall.',
      prompt: 'Match each sentence on the left with the right action on the right.',
      pairs: {
        p1: {
          left: 'When the fingers in a photo look odd in number…',
          right: 'look again, the photo may be made by AI',
        },
        p2: {
          left: 'When a voice sounds like someone you know and rushes you…',
          right: 'call that person on the number you already know',
        },
        p3: {
          left: 'When the writing inside a picture looks jumbled…',
          right: 'find the original source before believing it',
        },
      },
      explanation:
        'AI can copy faces, voices, and writing. Small odd details help us stop for a moment and check.',
      tip: 'Faces and voices can be copied. A channel I already know cannot.',
    },
    'l3-s3': {
      title: 'Weighing Up the Cave',
      story:
        'Before leaving the cave, Piko holds out four cards. "Which ones need checking first, and which ones can be trusted more?"',
      imageAlt: 'Piko holds up four picture cards in front of the cave screens.',
      prompt: 'Put each card where it belongs.',
      categories: {
        verify: { label: 'Needs Checking' },
        trust: { label: 'More Trustworthy' },
      },
      cards: {
        c1: { label: 'A photo of a rhino in the school corridor, with no source' },
        c2: { label: 'A voice message like your uncle\'s, asking for money in a hurry' },
        c3: { label: 'A video of a class activity from the official school account' },
        c4: { label: 'A photo of group work that Safira took herself' },
      },
      explanation:
        'Pictures and sounds that arrive without a source need checking. Things we record ourselves, or that come from an official account, can be trusted more.',
      tip: 'Before I believe it, I ask: where did this come from?',
    },

    /* ---------------- Level 4 — mocking and unkind interaction ----------- */
    'l4-s1': {
      title: 'The Chat in the Middle of a Game',
      story:
        'While playing an online game with a team, one teammate keeps getting jeered at in the chat: "Useless! Just quit!" The teammate then stops replying.',
      imageAlt: 'The comment bridge sways while harsh words appear on the chat board.',
      choices: {
        a: {
          label: 'Join the jeering so nobody calls you weak',
          feedback:
            'Joining in adds to your teammate\'s hurt, even if you only type once.',
        },
        b: {
          label: 'Write something encouraging, leave that chat, then tell an adult',
          feedback:
            'Exactly! One kind sentence can change the mood. Telling an adult helps stop this from happening again.',
        },
        c: {
          label: 'Stay quiet and let the chat carry on',
          feedback:
            'Staying quiet feels safe for us, but the teammate is still alone. A little support means a lot to them.',
        },
      },
      explanation:
        'Words in a chat are still felt, even as plain text. Supporting your friend and telling an adult helps the most.',
      tip: 'One kind sentence can hold back ten jeers.',
    },
    'l4-s2': {
      title: 'The Planks of the Bridge',
      story:
        'The bridge planks creak. Three of them carry things that often happen in Arif\'s class. "Pick the action that makes the plank solid," says Piko.',
      imageAlt: 'Arif stands on the comment bridge reading planks with writing on them.',
      prompt: 'Match each sentence on the left with the right action on the right.',
      pairs: {
        p1: {
          left: 'When you are upset after losing a game…',
          right: 'put the phone down until you feel calm',
        },
        p2: {
          left: 'When a friend is mocked in the comments…',
          right: 'write something supportive and report the comment',
        },
        p3: {
          left: 'When you want to post a photo of your friend…',
          right: 'ask them first whether it is okay',
        },
      },
      explanation:
        'Words and photos online are hard to take back. Pausing and asking first always helps.',
      tip: 'When I am upset, I pause before I type.',
    },
    'l4-s3': {
      title: 'Words at the End of the Bridge',
      story:
        'At the end of the bridge lie four cards showing things children in Safira\'s class have done. The planks only hold if the cards go in the right place.',
      imageAlt: 'Arif and Safira hold a phone while sorting cards at the end of the bridge.',
      prompt: 'Put each card where it belongs.',
      categories: {
        kind: { label: 'Kind Actions' },
        hurt: { label: 'Actions That Hurt' },
      },
      cards: {
        c1: { label: 'Writing "you really tried out there, keep going!"' },
        c2: { label: "Turning a friend's face into a funny sticker and spreading it" },
        c3: { label: 'Asking other friends to join the jeering in the comments' },
        c4: { label: 'Sending a private message to keep a sad friend company' },
      },
      explanation:
        'Kind actions make a friend feel accompanied. Hurtful ones spread fast and are hard to delete.',
      tip: "Before I send it, I picture my friend's face reading it.",
    },

    /* ---------------- Level 5 — gaming, streaming, asking for help ------- */
    'l5-s1': {
      title: 'A Request During a Game Livestream',
      story:
        'Arif is livestreaming his game. One viewer keeps typing: "Turn on your location so we can play together near your house."',
      imageAlt: 'Arif livestreams his game in the palace hall.',
      choices: {
        a: {
          label: 'Turn the location feature on so they can play together',
          feedback:
            'The location feature shows exactly where you are right now. Someone you have never met does not need to know that.',
        },
        b: {
          label: 'Leave it off, end the stream, then tell a parent',
          feedback:
            'Safe! You never have to do what a viewer asks. Ending the stream and telling an adult is exactly right.',
        },
        c: {
          label: 'Only mention the name of the housing complex',
          feedback:
            'A neighbourhood name already narrows the search a lot. It is better not to say it at all.',
        },
      },
      explanation:
        'During a livestream, your location is not for anyone you have not met in real life.',
      tip: 'My location is not for viewers I do not know.',
    },
    'l5-s2': {
      title: 'The Last Three Gates',
      story:
        'Three small gates stand in a row in the palace hall. Each one opens only when it is matched with the right guardian action.',
      imageAlt: 'Piko stands firmly in front of three small gates in the palace hall.',
      prompt: 'Match each sentence on the left with the right action on the right.',
      pairs: {
        p1: {
          left: 'When a player pushes you to keep chatting outside the game…',
          right: 'stop the chat and tell a trusted adult',
        },
        p2: {
          left: 'When someone you have never met asks you to turn the camera on…',
          right: 'say no and ask an adult for help',
        },
        p3: {
          left: 'Before you upload a video you made…',
          right: 'check whether a uniform, address, or school name is visible',
        },
      },
      explanation:
        'A guardian never faces uncomfortable requests alone, and always checks a video before uploading it.',
      tip: 'If something feels uncomfortable, I can stop and tell someone.',
    },
    'l5-s3': {
      title: 'The Crown and the Four Questions',
      story:
        'The Crown of Wisdom floats, glowing gold. "One last test," says Piko. "While livestreaming or posting something, which things are safe to show and which stay with you?"',
      imageAlt: 'The Crown of Wisdom glows above four cards in the palace hall.',
      prompt: 'Put each card where it belongs.',
      categories: {
        safe: { label: 'Safe to Show' },
        keep: { label: 'Keep to Myself' },
      },
      cards: {
        c1: { label: 'Your game screen and your score' },
        c2: { label: "A student card showing your school's name" },
        c3: { label: 'Your nickname inside the game' },
        c4: { label: 'The phone number stuck on the fridge' },
      },
      explanation:
        'Before you show anything, ask four questions: is it safe, true, kind, and worth sharing? If something can show where you are, keep it to yourself.',
      tip: 'Before you share: is it safe, true, kind, and worth sharing?',
    },
  },

  feedbackLabels: {
    best: 'The wisest choice',
    partial: 'A safe choice, but there is a better one',
    unsafe: "Let's think again",
  },

  resultTiers: [
    {
      min: 80,
      title: 'Great Guardian',
      message: 'You already make safe, wise choices online. Invite your friends to practise with you!',
      emoji: '🌟',
    },
    {
      min: 60,
      title: 'Careful Explorer',
      message: 'You understand a lot already. Keep practising checking information and asking for help when unsure.',
      emoji: '🧭',
    },
    {
      min: 0,
      title: 'Brave Adventurer',
      message: 'Every great guardian keeps learning. Play the adventure again and look for the safer choices.',
      emoji: '🌱',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* 3. PENGGABUNG — jangan diubah                                       */
/* ------------------------------------------------------------------ */

const copyByLang = { id: copyId, en: copyEn }

/* Semua scene bernilai sama, apa pun bentuk interaksinya. */
export const POINTS_PER_SCENE = 10

function buildScenario(scenario, scenarioCopy) {
  const common = {
    id: scenario.id,
    type: scenario.type,
    image: scenario.image,
    title: scenarioCopy.title,
    story: scenarioCopy.story,
    imageAlt: scenarioCopy.imageAlt,
    explanation: scenarioCopy.explanation,
    guardianTip: scenarioCopy.tip,
    maxPoints: POINTS_PER_SCENE,
  }

  if (scenario.type === 'match') {
    return {
      ...common,
      prompt: scenarioCopy.prompt,
      pairs: scenario.pairs.map((pair) => ({ id: pair.id, ...scenarioCopy.pairs[pair.id] })),
    }
  }

  if (scenario.type === 'sort') {
    return {
      ...common,
      prompt: scenarioCopy.prompt,
      categories: scenario.categories.map((category) => ({
        id: category.id,
        icon: category.icon,
        ...scenarioCopy.categories[category.id],
      })),
      cards: scenario.cards.map((card) => ({
        id: card.id,
        category: card.category,
        ...scenarioCopy.cards[card.id],
      })),
    }
  }

  return {
    ...common,
    bestChoiceId: scenario.bestChoiceId,
    choices: scenario.choices.map((choice) => ({
      ...choice,
      ...scenarioCopy.choices[choice.id],
    })),
  }
}

function buildLevels(lang) {
  const copy = copyByLang[lang]
  return base.map((level) => {
    const levelCopy = copy.levels[level.id]
    return {
      id: level.id,
      slug: level.slug,
      title: levelCopy.title,
      topic: levelCopy.topic,
      summary: levelCopy.summary,
      intro: levelCopy.intro,
      badge: { emoji: level.badgeEmoji, ...levelCopy.badge },
      treasure: {
        symbol: level.treasureSymbol,
        color: level.treasureColor,
        ...levelCopy.treasure,
      },
      scenarios: level.scenarios.map((scenario) =>
        buildScenario(scenario, copy.scenarios[scenario.id]),
      ),
    }
  })
}

const levelsCache = { id: buildLevels('id'), en: buildLevels('en') }

export function getLevels(lang = 'id') {
  return levelsCache[lang] ?? levelsCache.id
}

export function getLevelById(id, lang = 'id') {
  return getLevels(lang).find((level) => level.id === Number(id))
}

/* Versi kanonik untuk logika skor (bahasa apa pun, poinnya sama). */
export const levels = levelsCache.id

export const MAX_SCORE = levels.reduce(
  (total, level) => total + level.scenarios.length * POINTS_PER_SCENE,
  0,
)

export const TOTAL_SCENARIOS = levels.reduce((total, level) => total + level.scenarios.length, 0)

export function getFeedbackLabels(lang = 'id') {
  return copyByLang[lang]?.feedbackLabels ?? copyId.feedbackLabels
}

export function getResultTier(percentage, lang = 'id') {
  const tiers = copyByLang[lang]?.resultTiers ?? copyId.resultTiers
  return tiers.find((tier) => percentage >= tier.min) ?? tiers[tiers.length - 1]
}
