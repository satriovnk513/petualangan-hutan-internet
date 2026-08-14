/* ===========================================================================
 * ISI HALAMAN NON-PERMAINAN — DUA BAHASA
 * ===========================================================================
 * Teks panjang untuk Beranda (poin belajar & cara bermain), halaman Guru,
 * Orang Tua, Tentang, dan Privasi. Teks antarmuka pendek ada di ui.js,
 * cerita permainan ada di levels.js.
 *
 * CATATAN: jangan menuliskan nama orang, sekolah, surel, atau organisasi
 * yang belum pasti. Bagian yang datanya belum ada sengaja tidak ditampilkan
 * — tambahkan kembali setelah datanya nyata.
 * ======================================================================== */

const contentId = {
  learningPoints: [
    {
      emoji: '🔐',
      title: 'Jaga informasi pribadi',
      text: 'Anak belajar mengenali data yang tidak boleh dibagikan kepada orang asing.',
    },
    {
      emoji: '🔎',
      title: 'Periksa sebelum percaya',
      text: 'Anak berlatih mencari sumber sebelum mempercayai atau membagikan kabar.',
    },
    {
      emoji: '🪞',
      title: 'Kenali konten buatan AI',
      text: 'Anak memahami bahwa gambar, suara, dan video bisa dibuat atau diubah.',
    },
    {
      emoji: '💚',
      title: 'Bersikap baik di internet',
      text: 'Anak berlatih memilih kata yang menguatkan dan membela teman.',
    },
    {
      emoji: '🤝',
      title: 'Minta bantuan saat tidak aman',
      text: 'Anak tahu bahwa bercerita kepada orang dewasa tepercaya adalah hal yang berani.',
    },
  ],

  howToPlaySteps: [
    {
      step: 1,
      emoji: '🙋',
      title: 'Pilih teman petualanganmu',
      text: 'Jelajahi Hutan Internet bersama Arif atau Safira.',
    },
    {
      step: 2,
      emoji: '🗺️',
      title: 'Jelajahi peta',
      text: 'Kunjungi lima tempat dan selesaikan tantangannya secara berurutan.',
    },
    {
      step: 3,
      emoji: '🤔',
      title: 'Tentukan pilihanmu',
      text: 'Baca setiap cerita, lalu pilih jawaban, pasangkan kalimat, atau letakkan kartu di kotak yang tepat.',
    },
    {
      step: 4,
      emoji: '💡',
      title: 'Pelajari jawabannya',
      text: 'Setelah memilih, kamu akan mendapatkan penjelasan dan tip yang mudah diingat.',
    },
    {
      step: 5,
      emoji: '🏆',
      title: 'Temukan harta karun',
      text: 'Selesaikan seluruh tantangan, kumpulkan lima lencana dan lima harta karun, lalu buka Sertifikat Literasi Media dan Informasi Digital.',
    },
  ],

  teacher: {
    title: 'Panduan untuk Guru',
    eyebrow: 'Untuk Guru',
    intro:
      'Petualangan Arif & Safira di Hutan Internet adalah media pembelajaran interaktif literasi media dan informasi (Media and Information Literacy). Siswa berlatih mengambil keputusan digital melalui 15 situasi cerita yang dekat dengan keseharian mereka.',
    audienceLabel: 'Sasaran',
    audience: 'Siswa sekolah dasar kelas 4 sampai 6, usia sekitar 9 sampai 12 tahun.',
    durationLabel: 'Perkiraan waktu',
    duration: 'Sekitar 25 menit bermain, atau 60 menit untuk satu sesi pembelajaran lengkap.',
    objectivesTitle: 'Tujuan pembelajaran',
    objectivesIntro: 'Setelah menyelesaikan kegiatan ini, siswa diharapkan mampu:',
    objectives: [
      'Mengidentifikasi informasi pribadi yang tidak boleh dibagikan.',
      'Menyadari pentingnya memeriksa informasi sebelum mempercayai dan membagikannya.',
      'Memahami bahwa gambar, suara, dan video digital dapat dimanipulasi, termasuk dengan AI.',
      'Menunjukkan perilaku saling menghormati saat berkomunikasi di internet.',
      'Menyebutkan orang dewasa tepercaya yang dapat dimintai bantuan.',
    ],
    contentTitle: 'Isi permainan',
    contentIntro: 'Lima tempat, masing-masing berisi tiga situasi cerita. Totalnya 15 keputusan digital.',
    badgeLabel: 'Lencana',
    usageTitle: 'Cara memakai di kelas',
    classroomOptions: [
      {
        emoji: '📽️',
        title: 'Pilihan 1: Bermain bersama',
        text: 'Tampilkan permainan lewat proyektor. Guru membacakan cerita, lalu kelas memilih jawaban bersama sambil berdiskusi singkat sebelum tombol ditekan.',
      },
      {
        emoji: '💻',
        title: 'Pilihan 2: Bermain mandiri',
        text: 'Siswa bermain sendiri atau berkelompok 2 sampai 3 orang menggunakan tablet, komputer, atau ponsel. Guru berkeliling mendampingi.',
      },
    ],
    sessionTitle: 'Rencana sesi 60 menit',
    sessionPlan: [
      { time: '5 menit', activity: 'Diskusi pembuka: "Apa yang biasa kamu lakukan di internet?"' },
      { time: '5 menit', activity: 'Tes awal singkat, 3 sampai 5 pertanyaan lisan atau tertulis.' },
      { time: '25 menit', activity: 'Bermain Petualangan Hutan Internet.' },
      { time: '15 menit', activity: 'Diskusi terbimbing memakai pertanyaan di bawah.' },
      { time: '5 menit', activity: 'Tes akhir dengan pertanyaan yang sama seperti tes awal.' },
      { time: '5 menit', activity: 'Refleksi: satu hal baru yang akan siswa lakukan mulai hari ini.' },
    ],
    discussionTitle: 'Pertanyaan diskusi',
    discussionQuestions: [
      'Informasi apa yang tidak boleh dibagikan kepada orang asing?',
      'Mengapa judul berita belum tentu menceritakan seluruh isinya?',
      'Bagaimana kita tahu sebuah gambar mungkin telah diubah?',
      'Apa yang bisa dilakukan saat melihat teman dirundung di internet?',
      'Siapa orang dewasa tepercaya yang dapat membantu?',
    ],
    notesTitle: 'Catatan penting untuk guru',
    notes: [
      'Hindari meminta siswa menceritakan pengalaman pribadi atau menyakitkan di internet di depan kelas. Sediakan cara lain, misalnya menulis di kertas tanpa nama.',
      'Jangan menyalahkan siswa yang memilih jawaban kurang aman. Permainan ini sengaja dirancang agar semua pilihan bisa dilanjutkan, supaya siswa berani mencoba dan belajar.',
      'Kalau seorang siswa terlihat terganggu setelah membahas topik perundungan, dampingi secara pribadi setelah kelas selesai.',
      'Permainan tidak menyimpan data apa pun di server. Kemajuan tersimpan di perangkat masing-masing dan bisa dihapus lewat tombol "Atur ulang kemajuan".',
    ],
    tryBtn: 'Coba permainannya',
    otherGuideBtn: 'Lihat Panduan Orang Tua',
  },

  parent: {
    title: 'Panduan untuk Orang Tua',
    eyebrow: 'Untuk Orang Tua',
    intro:
      'Terima kasih sudah menemani anak belajar. Panduan ini bukan daftar aturan, melainkan bahan obrolan santai supaya anak merasa aman bercerita kepada Anda tentang apa pun yang ia temui di internet.',
    habitsTitle: 'Lima kebiasaan keluarga digital',
    habits: [
      {
        number: 1,
        title: 'Jangan membagikan informasi pribadi sembarangan.',
        text: 'Sepakati bersama data apa saja yang menjadi rahasia keluarga: alamat, nama sekolah, nomor telepon, dan foto pribadi.',
      },
      {
        number: 2,
        title: 'Periksa informasi sebelum mempercayai atau membagikannya.',
        text: 'Ajak anak mencari sumber bersama-sama. Tunjukkan bahwa orang dewasa pun perlu mengecek.',
      },
      {
        number: 3,
        title: 'Ingat bahwa gambar, suara, dan video dapat dimanipulasi.',
        text: 'Sesekali tunjukkan contoh gambar buatan AI dan cari bersama bagian yang terlihat janggal.',
      },
      {
        number: 4,
        title: 'Bersikap baik dan meminta izin sebelum mengunggah foto orang lain.',
        text: 'Berlakukan juga untuk orang dewasa: tanyakan pada anak sebelum mengunggah fotonya.',
      },
      {
        number: 5,
        title: 'Ceritakan kepada orang dewasa jika sesuatu terasa menakutkan.',
        text: 'Pastikan anak tahu ia tidak akan dimarahi atau kehilangan gawainya karena bercerita jujur.',
      },
    ],
    startersTitle: 'Bahan obrolan santai',
    startersIntro:
      'Cobalah salah satu pertanyaan ini sambil makan malam atau di perjalanan pulang sekolah. Dengarkan dulu, jangan buru-buru menasihati.',
    conversationStarters: [
      'Hari ini kamu melihat apa di internet?',
      'Apakah ada informasi yang membuatmu ragu?',
      'Bagaimana cara memeriksa apakah sesuatu benar?',
      'Apa yang harus dilakukan jika orang asing mengirim pesan?',
      'Siapa saja orang yang bisa kamu hubungi saat butuh bantuan?',
    ],
    reminderTitle: 'Catatan hangat untuk Ayah dan Bunda',
    reminder:
      'Anak belajar paling banyak saat merasa aman, bukan saat merasa diawasi. Anda tidak perlu menjadi petugas pengawas. Cukup jadi tempat bertanya yang tidak menghakimi. Kalau anak salah langkah, tenangkan dulu perasaannya, baru bicarakan pelajarannya. Belajarlah bersama. Tidak apa-apa kalau Anda pun belum tahu jawabannya.',
    pikoParent: 'Ayah dan Bunda boleh ikut bermain, lho! Anak biasanya senang kalau orang tuanya juga belajar bersama.',
    playBtn: 'Main bersama anak',
    otherGuideBtn: 'Lihat Panduan Guru',
  },

  about: {
    title: 'Tentang Petualangan Ini',
    eyebrow: 'Tentang Kami',
    intro: [
      'Petualangan Arif & Safira di Hutan Internet adalah media pembelajaran interaktif yang membantu anak-anak berlatih mengambil keputusan saat menghadapi berbagai situasi digital.',
      'Permainan ini dikembangkan sebagai sumber belajar terbuka untuk mendukung pendidikan Media and Information Literacy bagi anak, guru, dan orang tua.',
    ],
    sections: [
      {
        id: 'mengapa',
        emoji: '🌱',
        title: 'Mengapa proyek ini dibuat',
        style: 'paragraphs',
        items: [
          'Anak-anak Indonesia mulai memakai internet sejak usia sangat muda, sering kali lebih dulu daripada pelajaran tentang cara memakainya dengan aman. Materi literasi digital yang ada umumnya berbentuk ceramah atau kuis pilihan ganda, sehingga terasa jauh dari pengalaman anak sehari-hari.',
          'Kami percaya anak belajar paling baik lewat cerita. Karena itu, setiap pelajaran di sini dibungkus dalam petualangan: anak tidak diberi tahu apa yang benar, melainkan diajak mengambil keputusan dan melihat akibatnya di dunia cerita yang aman.',
        ],
      },
      {
        id: 'siapa',
        emoji: '👩‍🏫',
        title: 'Siapa yang dapat menggunakannya',
        style: 'list',
        items: [
          'Guru sekolah dasar, sebagai bahan ajar di kelas, lewat proyektor maupun perangkat siswa.',
          'Orang tua yang ingin mendampingi anak belajar di rumah.',
          'Komunitas, taman baca, pustakawan, dan organisasi kepemudaan yang menjalankan kegiatan literasi digital.',
          'Anak-anak sendiri, karena permainan bisa dimainkan tanpa bantuan orang dewasa.',
        ],
      },
      {
        id: 'perlindungan',
        emoji: '🛡️',
        title: 'Prinsip perlindungan anak',
        style: 'list',
        items: [
          'Tidak ada pendaftaran akun, tidak ada iklan, dan tidak ada pelacakan.',
          'Permainan tidak pernah meminta anak menceritakan pengalaman pribadi atau data dirinya.',
          'Semua cerita memakai tokoh rekaan, bukan kejadian nyata milik anak tertentu.',
          'Ilustrasi dibuat ramah anak: tidak ada gambar menyeramkan, kekerasan, atau adegan yang membuat cemas.',
          'Setiap umpan balik disampaikan tanpa menyalahkan. Anak tetap bisa melanjutkan permainan setelah memilih jawaban yang kurang aman.',
        ],
      },
      {
        id: 'sumber',
        emoji: '📚',
        title: 'Sumber dan referensi',
        style: 'paragraphs',
        items: [
          'Kerangka materi disusun mengacu pada prinsip Media and Information Literacy UNESCO, khususnya kemampuan mengakses, mengevaluasi, dan menggunakan informasi secara bertanggung jawab.',
          'Topik keselamatan anak daring mengacu pada praktik umum yang dianjurkan lembaga perlindungan anak dan pendidikan digital.',
        ],
      },
      {
        id: 'akses',
        emoji: '🔓',
        title: 'Akses terbuka',
        style: 'paragraphs',
        items: [
          'Kode dan materi proyek ini tersedia secara terbuka agar dapat digunakan, dipelajari, dan dikembangkan oleh sekolah, pendidik, komunitas, dan organisasi kepemudaan.',
          'Kode sumber memakai Lisensi MIT. Teks pembelajaran dan ilustrasi asli dapat memakai lisensi Creative Commons yang akan dicantumkan kemudian.',
        ],
      },
    ],
    hackathonTitle: 'UNESCO Youth Hackathon 2026',
    hackathonText:
      'Proyek ini dikembangkan sebagai proposal peserta UNESCO Youth Hackathon 2026. Proyek ini bukan produk resmi UNESCO serta tidak didukung atau disahkan secara resmi oleh UNESCO.',
    startBtn: 'Mulai Petualangan',
    privacyBtn: 'Baca Kebijakan Privasi',
  },

  privacy: {
    title: 'Privasi dan Keamanan Anak',
    eyebrow: 'Privasi',
    intro:
      'Permainan ini dibuat untuk anak-anak, jadi perlindungan data mereka adalah hal pertama yang kami pikirkan. Berikut penjelasan singkat dan jujur tentang apa yang terjadi dengan data saat permainan digunakan.',
    points: [
      {
        emoji: '🙅',
        title: 'Tidak perlu akun',
        text: 'Tidak ada pendaftaran, tidak ada kata sandi, dan tidak ada surel yang diminta.',
      },
      {
        emoji: '🚫',
        title: 'Tidak ada iklan',
        text: 'Tidak ada iklan, tidak ada tawaran berbayar, dan tidak ada tautan ke toko daring.',
      },
      {
        emoji: '👣',
        title: 'Tidak ada pelacakan',
        text: 'Secara bawaan tidak ada layanan analitik, piksel pelacak, maupun kuki pihak ketiga.',
      },
      {
        emoji: '🗄️',
        title: 'Tidak ada data di server',
        text: 'Permainan ini tidak memiliki server penyimpanan. Tidak ada data anak yang dikirim ke mana pun.',
      },
      {
        emoji: '📱',
        title: 'Kemajuan tersimpan di perangkat',
        text: 'Skor, lencana, dan harta karun disimpan di penyimpanan lokal (localStorage) peramban yang dipakai. Data itu tidak pernah keluar dari perangkat.',
      },
      {
        emoji: '✍️',
        title: 'Nama di sertifikat tetap di perangkat',
        text: 'Nama yang diketik untuk sertifikat hanya dipakai untuk menampilkan dan mencetak sertifikat. Nama itu tidak dikirim ke mana pun dan ikut terhapus saat kemajuan diatur ulang.',
      },
      {
        emoji: '🤫',
        title: 'Anak tidak diminta bercerita tentang dirinya',
        text: 'Permainan tidak pernah menanyakan pengalaman pribadi, masalah keluarga, atau kejadian menyakitkan yang dialami anak.',
      },
      {
        emoji: '📊',
        title: 'Kalau nanti ada analitik',
        text: 'Layanan analitik hanya boleh ditambahkan jika ramah privasi, tanpa kuki, tanpa mengenali orang per orang, dan dinyatakan secara terbuka di halaman ini.',
      },
    ],
    resetTitle: 'Menghapus data di perangkat ini',
    resetText:
      'Ingin menghapus semua kemajuan di perangkat ini? Tekan tombol "Atur ulang kemajuan" di bawah, atau lewat bagian bawah halaman mana pun. Kamu akan diminta memastikan lebih dulu sebelum data dihapus.',
    storageBlocked:
      'Peramban di perangkat ini sedang memblokir penyimpanan lokal. Permainan tetap bisa dimainkan, tetapi kemajuannya akan hilang saat halaman ditutup.',
  },
}

/* ------------------------------------------------------------------ */

const contentEn = {
  learningPoints: [
    {
      emoji: '🔐',
      title: 'Protect personal information',
      text: 'Children learn to recognise which details should never be shared with strangers.',
    },
    {
      emoji: '🔎',
      title: 'Check before believing',
      text: 'Children practise looking for sources before trusting or sharing a story.',
    },
    {
      emoji: '🪞',
      title: 'Recognise content made by AI',
      text: 'Children understand that pictures, voices, and videos can be created or altered.',
    },
    {
      emoji: '💚',
      title: 'Be kind online',
      text: 'Children practise choosing words that lift others up and standing by their friends.',
    },
    {
      emoji: '🤝',
      title: 'Ask for help when unsafe',
      text: 'Children learn that telling a trusted adult is a brave thing to do.',
    },
  ],

  howToPlaySteps: [
    {
      step: 1,
      emoji: '🙋',
      title: 'Choose your adventure companion',
      text: 'Explore the Internet Forest with Arif or Safira.',
    },
    {
      step: 2,
      emoji: '🗺️',
      title: 'Explore the map',
      text: 'Visit five locations and complete each challenge in order.',
    },
    {
      step: 3,
      emoji: '🤔',
      title: 'Make your choice',
      text: 'Read each story, then pick an answer, match the sentences, or place the cards in the right box.',
    },
    {
      step: 4,
      emoji: '💡',
      title: 'Learn from your answer',
      text: 'After choosing, you will receive a short explanation and an easy tip to remember.',
    },
    {
      step: 5,
      emoji: '🏆',
      title: 'Find the treasures',
      text: 'Complete every challenge, collect five badges and five treasures, then unlock your Digital Media and Information Literacy Certificate.',
    },
  ],

  teacher: {
    title: 'Guide for Teachers',
    eyebrow: 'For Teachers',
    intro:
      "Arif & Safira's Adventure in the Internet Forest is an interactive Media and Information Literacy learning tool. Students practise making digital decisions through 15 story situations drawn from their everyday lives.",
    audienceLabel: 'Audience',
    audience: 'Primary school students in grades 4 to 6, around ages 9 to 12.',
    durationLabel: 'Estimated time',
    duration: 'About 25 minutes of play, or 60 minutes for a full lesson.',
    objectivesTitle: 'Learning objectives',
    objectivesIntro: 'After completing the activity, students are expected to be able to:',
    objectives: [
      'Identify personal information that should not be shared.',
      'Recognise the importance of verifying information before believing or sharing it.',
      'Understand that digital images, audio, and video can be manipulated, including with AI.',
      'Demonstrate respectful behaviour when communicating online.',
      'Name trusted adults who can help.',
    ],
    contentTitle: 'What the game covers',
    contentIntro: 'Five places, each with three story situations. That is 15 digital decisions in total.',
    badgeLabel: 'Badge',
    usageTitle: 'How to use it in class',
    classroomOptions: [
      {
        emoji: '📽️',
        title: 'Option 1: Play together',
        text: 'Show the game on a projector. The teacher reads the story aloud, and the class discusses briefly before choosing an answer together.',
      },
      {
        emoji: '💻',
        title: 'Option 2: Play independently',
        text: 'Students play alone or in groups of 2 or 3 using tablets, computers, or phones, with the teacher circulating to support.',
      },
    ],
    sessionTitle: 'A session plan for 60 minutes',
    sessionPlan: [
      { time: '5 min', activity: 'Opening discussion: "What do you usually do on the internet?"' },
      { time: '5 min', activity: 'A short test before you start, with 3 to 5 spoken or written questions.' },
      { time: '25 min', activity: 'Play the Internet Forest Adventure.' },
      { time: '15 min', activity: 'Guided discussion using the questions below.' },
      { time: '5 min', activity: 'A test at the end using the same questions.' },
      { time: '5 min', activity: 'Reflection: one new thing each student will start doing today.' },
    ],
    discussionTitle: 'Discussion questions',
    discussionQuestions: [
      'What information should never be shared with strangers?',
      "Why doesn't a headline always tell the whole story?",
      'How can we tell that a picture may have been altered?',
      'What can we do when we see a friend being bullied online?',
      'Who are the trusted adults who can help?',
    ],
    notesTitle: 'Important notes for teachers',
    notes: [
      'Avoid asking students to share personal or painful online experiences in front of the class. Offer another way, such as writing anonymously on paper.',
      'Do not blame students who choose a less safe answer. The game is deliberately designed so every choice can continue, so students feel safe to try and learn.',
      'If a student seems upset after the bullying topic, check in with them privately after class.',
      'The game stores nothing on any server. Progress is saved on each device and can be cleared with the "Reset progress" button.',
    ],
    tryBtn: 'Try the game',
    otherGuideBtn: 'See the Parent Guide',
  },

  parent: {
    title: 'Guide for Parents',
    eyebrow: 'For Parents',
    intro:
      'Thank you for learning alongside your child. This guide is not a list of rules. It is a set of relaxed conversation starters, so your child feels safe telling you about anything they meet on the internet.',
    habitsTitle: 'Five digital family habits',
    habits: [
      {
        number: 1,
        title: "Don't share personal information carelessly.",
        text: 'Agree together on what counts as family secrets: your address, school name, phone numbers, and private photos.',
      },
      {
        number: 2,
        title: 'Check information before believing or sharing it.',
        text: 'Look up sources together. Show your child that adults need to check twice too.',
      },
      {
        number: 3,
        title: 'Remember that pictures, voices, and videos can be manipulated.',
        text: 'Now and then, look at an image made by AI together and hunt for the odd details.',
      },
      {
        number: 4,
        title: "Be kind, and ask permission before posting someone else's photo.",
        text: "This goes for adults too: ask your child before posting their photo.",
      },
      {
        number: 5,
        title: 'Tell an adult when something feels scary.',
        text: 'Make sure your child knows they will not be scolded or lose their device for being honest.',
      },
    ],
    startersTitle: 'Easy conversation starters',
    startersIntro:
      'Try one of these over dinner or on the way home from school. Listen first, and resist the urge to lecture.',
    conversationStarters: [
      'What did you see on the internet today?',
      'Was there anything that made you unsure?',
      'How can we check whether something is true?',
      'What should you do if a stranger sends you a message?',
      'Who could you reach out to if you needed help?',
    ],
    reminderTitle: 'A warm note for mums and dads',
    reminder:
      'Children learn most when they feel safe, not when they feel watched. You do not need to be a security guard. Just be the person they can ask anything without being judged. If your child slips up, settle their feelings first, then talk about the lesson. Learn together; it is perfectly fine not to know every answer yourself.',
    pikoParent: 'Mums and dads are welcome to play too! Children usually love it when their parents learn alongside them.',
    playBtn: 'Play with your child',
    otherGuideBtn: 'See the Teacher Guide',
  },

  about: {
    title: 'About This Adventure',
    eyebrow: 'About Us',
    intro: [
      "Arif & Safira's Adventure in the Internet Forest is an interactive learning tool that helps children practise making decisions in everyday digital situations.",
      'The game was developed as an open learning resource to support Media and Information Literacy education for children, teachers, and parents.',
    ],
    sections: [
      {
        id: 'mengapa',
        emoji: '🌱',
        title: 'Why this project exists',
        style: 'paragraphs',
        items: [
          'Indonesian children start using the internet from a very young age, often before anyone teaches them how to use it safely. Most digital literacy materials come as lectures or quizzes with multiple choices, far removed from what children actually experience online.',
          'We believe children learn best through stories. So every lesson here is wrapped in an adventure: instead of being told what is right, children make decisions and see the consequences unfold in a safe, fictional world.',
        ],
      },
      {
        id: 'siapa',
        emoji: '👩‍🏫',
        title: 'Who can use it',
        style: 'list',
        items: [
          'Primary school teachers, as classroom material, on a projector or on student devices.',
          'Parents who want to learn alongside their children at home.',
          'Communities, reading centres, librarians, and youth organisations running digital literacy activities.',
          'Children themselves, since the game can be played without adult help.',
        ],
      },
      {
        id: 'perlindungan',
        emoji: '🛡️',
        title: 'Child protection principles',
        style: 'list',
        items: [
          'No account registration, no advertising, and no tracking.',
          'The game never asks children to share personal experiences or personal data.',
          'Every story uses fictional characters, never real events belonging to a real child.',
          'The illustrations are suitable for children, with no frightening imagery, violence, or distressing scenes.',
          'All feedback is given without blame. Children can always continue playing after choosing a less safe answer.',
        ],
      },
      {
        id: 'sumber',
        emoji: '📚',
        title: 'Sources and references',
        style: 'paragraphs',
        items: [
          "The learning framework draws on UNESCO's Media and Information Literacy principles, in particular the ability to access, evaluate, and use information responsibly.",
          'The online child safety topics follow practices commonly recommended by child protection and digital education organisations.',
        ],
      },
      {
        id: 'akses',
        emoji: '🔓',
        title: 'Open access',
        style: 'paragraphs',
        items: [
          'The code and materials of this project are openly available for schools, educators, communities, and youth organisations to use, study, and build upon.',
          'The source code uses the MIT Licence. The learning texts and original illustrations may later use a Creative Commons licence, to be announced.',
        ],
      },
    ],
    hackathonTitle: 'UNESCO Youth Hackathon 2026',
    hackathonText:
      'This project was developed as a submission for the UNESCO Youth Hackathon 2026. It is not an official UNESCO product and has not been officially endorsed or approved by UNESCO.',
    startBtn: 'Start the Adventure',
    privacyBtn: 'Read the Privacy Policy',
  },

  privacy: {
    title: "Children's Privacy and Safety",
    eyebrow: 'Privacy',
    intro:
      'This game is made for children, so protecting their data comes first. Here is a short, honest explanation of what happens, and what does not happen, with data while the game is used.',
    points: [
      {
        emoji: '🙅',
        title: 'No account needed',
        text: 'No registration, no passwords, and no email addresses are ever requested.',
      },
      {
        emoji: '🚫',
        title: 'No advertising',
        text: 'No ads, no paid offers, and no links to online shops.',
      },
      {
        emoji: '👣',
        title: 'No tracking',
        text: 'By default there are no analytics services, tracking pixels, or cookies from other companies.',
      },
      {
        emoji: '🗄️',
        title: 'No data on any server',
        text: "This game has no storage server. No child's data is sent anywhere.",
      },
      {
        emoji: '📱',
        title: 'Progress stays on the device',
        text: "Scores, badges, and treasures are saved in the browser's local storage (localStorage). That data never leaves the device.",
      },
      {
        emoji: '✍️',
        title: 'The certificate name stays on the device',
        text: 'The name typed for the certificate is used only to display and print it. It is never sent anywhere and is deleted when progress is reset.',
      },
      {
        emoji: '🤫',
        title: 'Children are never asked about themselves',
        text: 'The game never asks about personal experiences, family matters, or painful events a child may have been through.',
      },
      {
        emoji: '📊',
        title: 'If analytics are ever added',
        text: 'An analytics service may only be added if it respects privacy, uses no cookies, cannot identify individuals, and openly declared on this page.',
      },
    ],
    resetTitle: 'Deleting data on this device',
    resetText:
      'Want to erase all progress on this device? Press the "Reset progress" button below, or at the bottom of any page. You will be asked to confirm before anything is deleted.',
    storageBlocked:
      'The browser on this device is currently blocking local storage. The game still works, but progress will be lost when the page is closed.',
  },
}

const contentByLang = { id: contentId, en: contentEn }

export function getContent(lang = 'id') {
  return contentByLang[lang] ?? contentId
}
