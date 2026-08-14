/**
 * @file library.js
 * @description Library content data for Petualangan Arif & Safira di Hutan Internet.
 * Contains articles, stories, and downloadable resources in bilingual format.
 */

export const CATEGORIES = {
  id: { all: 'Semua', articles: 'Artikel & Cerita', toolkits: 'Toolkit & Materi' },
  en: { all: 'All', articles: 'Articles & Stories', toolkits: 'Toolkit & Resources' },
};

export const AUDIENCE_LABELS = {
  id: { anak: 'Untuk Anak', guru: 'Untuk Guru', 'orang-tua': 'Untuk Orang Tua' },
  en: { anak: 'For Kids', guru: 'For Teachers', 'orang-tua': 'For Parents' },
};

export const libraryData = {
  id: {
    articles: [
      {
        id: 'art-01',
        slug: 'seminar-literasi-digital-sdn-kalibaru-05',
        category: 'kegiatan',
        date: '2026-08-13',
        thumbnail: '/images/library/seminar-literasi.jpg',
        tags: ['Literasi Digital', 'Sekolah', 'Kegiatan'],
        audience: ['anak', 'guru', 'orang-tua'],
        title: '25 Penjaga Baru dari SDN Kalibaru 05! 🌟',
        excerpt: 'Hore! Hutan Internet kedatangan pahlawan-pahlawan baru yang siap bertualang dengan aman.',
        content: `
          <p>Wah, ada kabar gembira dari pinggiran Hutan Internet! 🌳 Pada 13 Agustus 2026 kemarin, Hutan Internet kita kedatangan 25 calon penjaga baru yang luar biasa dari SDN Kalibaru 05 Pagi (kelas 4-6). Mereka baru saja menyelesaikan petualangan seru di seminar literasi digital! 🎉</p>
          <p>Bersama-sama, teman-teman hebat ini belajar jurus-jurus rahasia untuk menjelajahi dunia digital dengan aman dan penuh senyuman. Mulai dari cara melindungi data pribadi dari monster peretas, sampai cara memilah buah informasi yang matang dan bebas hoaks! 🛡️</p>
          <p>Petualangan ini sangat pas dengan misi sekolah untuk mencetak penjelajah masa depan yang tangguh dan cerdas teknologi. Bahkan, kegiatan seru ini juga terhubung dengan program Literapedia di sekolah mereka, loh! 📚✨</p>
          <p>Sekarang, dengan perlengkapan yang lengkap dan semangat yang menyala, ke-25 teman baru kita ini sudah siap bertualang di Hutan Internet yang luas. Mari kita sambut mereka dengan tepuk tangan meriah! Siapa tahu, besok sekolahmu yang akan jadi tempat petualangan selanjutnya! 🚀</p>
        `
      },
      {
        id: 'art-02',
        slug: '5-jurus-aman-di-internet',
        category: 'tips',
        date: '2026-08-10',
        thumbnail: '/images/library/tips-aman.jpg',
        tags: ['Tips', 'Keamanan Digital'],
        audience: ['anak'],
        title: '5 Jurus Jitu Menjelajahi Hutan Internet 🛡️',
        excerpt: 'Ingin berpetualang dengan aman di dunia maya? Pelajari 5 jurus rahasia ini!',
        content: `
          <p>Halo, Penjelajah Cilik! Hutan Internet itu luas dan penuh keajaiban, tapi kadang ada rintangan yang mengintai. Jangan khawatir! Dengan 5 jurus jitu ini, kamu bisa bertualang dengan super aman dan menyenangkan! ✨</p>
          <p>Jurus pertama adalah "Perisai Kata Sandi". Buatlah kata sandi yang kuat seperti benteng, gabungkan huruf, angka, dan simbol ajaib! Jurus kedua, "Mata Elang". Selalu periksa apakah tautan atau buah informasi yang kamu temukan itu aman dan bukan jebakan. Jurus ketiga adalah "Jubah Privasi", jangan sembarangan membagikan rahasiamu kepada orang asing di hutan! 🦉</p>
          <p>Jurus keempat, "Pesan Damai". Bicaralah yang sopan dan baik kepada teman-teman penjelajah lainnya. Terakhir, jurus kelima, "Panggil Penjaga Senior". Kalau kamu tersesat atau melihat hal yang menakutkan, segera lapor ke orang tua atau gurumu ya! Selamat berpetualang! 🗺️</p>
        `
      },
      {
        id: 'art-03',
        slug: 'panduan-orang-tua-literasi-digital-anak',
        category: 'panduan',
        date: '2026-08-08',
        thumbnail: '/images/library/panduan-ortu.jpg',
        tags: ['Panduan', 'Orang Tua'],
        audience: ['orang-tua'],
        title: 'Ngobrol Seru tentang Internet Bersama Anak 💬',
        excerpt: 'Tips praktis bagi Ayah dan Ibu untuk memulai obrolan hangat tentang keamanan digital dengan si kecil.',
        content: `
          <p>Ayah, Ibu, Hutan Internet adalah tempat bermain yang sangat luas bagi anak-anak kita. Seperti halnya taman bermain di dunia nyata, mereka butuh bimbingan kita agar bisa bermain dengan aman dan nyaman. Mari kita mulai dari hal sederhana: ngobrol bareng! ☕</p>
          <p>Cobalah untuk menjadikan obrolan tentang internet sebagai rutinitas yang menyenangkan, bukan saat sedang memarahi. Tanyakan pada mereka, apa game favorit mereka minggu ini, atau video lucu apa yang baru saja mereka tonton. Jadilah pendengar yang antusias! Dengan begitu, anak akan merasa nyaman untuk bercerita jika mereka menemukan hal yang kurang menyenangkan di dunia maya. 🌱</p>
          <p>Selain itu, ajak anak untuk bersepakat membuat aturan bermain bersama. Kapan waktu yang tepat untuk bermain gadget, dan kapan waktunya istirahat. Ingat, jadilah teladan yang baik dengan juga meletakkan ponsel saat sedang makan atau berkumpul keluarga. Yuk, sama-sama jadi pemandu yang asyik bagi petualang kecil kita! 🧭</p>
        `
      }
    ],
    toolkits: [
      {
        id: 'tk-01',
        type: 'Panduan',
        audience: 'guru',
        link: '/guru',
        icon: '📖',
        title: 'Panduan Guru: Literasi Digital Kelas 4-6',
        description: 'Materi lengkap untuk mengajarkan keamanan berinternet di kelas.',
        actionText: 'Buka Halaman Guru',
      },
      {
        id: 'tk-02',
        type: 'Panduan',
        audience: 'orang-tua',
        link: '/orang-tua',
        icon: '👪',
        title: 'Panduan Orang Tua: Mendampingi Anak di Dunia Digital',
        description: 'Tips mendampingi petualangan anak di Hutan Internet.',
        actionText: 'Buka Halaman Orang Tua',
      },
      {
        id: 'tk-04',
        type: 'PDF',
        audience: 'guru',
        fileUrl: '/materials/Paparan_Hutan_Internet_FINAL.pdf',
        icon: '📊',
        title: 'Materi Presentasi Literasi Digital',
        description: 'Slide interaktif untuk mengajar literasi digital format PDF.',
        actionText: 'Buka / Unduh Paparan (PDF)',
      },
    ]
  },
  en: {
    articles: [
      {
        id: 'art-01',
        slug: 'seminar-literasi-digital-sdn-kalibaru-05',
        category: 'event',
        date: '2026-08-13',
        thumbnail: '/images/library/seminar-literasi.jpg',
        tags: ['Digital Literacy', 'School', 'Event'],
        audience: ['anak', 'guru', 'orang-tua'],
        title: '25 New Guardians from SDN Kalibaru 05! 🌟',
        excerpt: 'Hooray! The Internet Forest welcomes new heroes ready for safe adventures.',
        content: `
          <p>Wow, great news from the edges of the Internet Forest! 🌳 On August 13, 2026, our Internet Forest welcomed 25 amazing new guardian candidates from SDN Kalibaru 05 Pagi (grades 4-6). They just completed an exciting adventure at a digital literacy seminar! 🎉</p>
          <p>Together, these incredible friends learned secret moves to navigate the digital world safely and with smiles. From protecting personal data from hacker monsters to sorting out ripe, hoax-free information fruits! 🛡️</p>
          <p>This adventure perfectly aligns with the school's mission to shape tough, tech-savvy explorers of the future. In fact, this fun activity also connects with the Literapedia program at their school! 📚✨</p>
          <p>Now, fully equipped and with blazing enthusiasm, our 25 new friends are ready to explore the vast Internet Forest. Let's give them a big round of applause! Who knows, tomorrow your school might be the next adventure spot! 🚀</p>
        `
      },
      {
        id: 'art-02',
        slug: '5-jurus-aman-di-internet',
        category: 'tips',
        date: '2026-08-10',
        thumbnail: '/images/library/tips-aman.jpg',
        tags: ['Tips', 'Digital Safety'],
        audience: ['anak'],
        title: '5 Ultimate Moves to Explore the Internet Forest 🛡️',
        excerpt: 'Want to adventure safely in cyberspace? Master these 5 secret moves!',
        content: `
          <p>Hello, Little Explorers! The Internet Forest is vast and full of wonders, but sometimes obstacles lurk. Do not worry! With these 5 ultimate moves, you can adventure super safely and joyfully! ✨</p>
          <p>The first move is "Password Shield". Create a strong password like a fortress, combine letters, numbers, and magic symbols! The second move, "Eagle Eye". Always check if the links or information fruits you find are safe and not traps. The third move is "Privacy Cloak", don't carelessly share your secrets with strangers in the forest! 🦉</p>
          <p>The fourth move, "Message of Peace". Speak politely and kindly to other fellow explorers. Lastly, the fifth move, "Call the Senior Guard". If you are lost or see something scary, immediately report to your parents or teachers! Happy adventuring! 🗺️</p>
        `
      },
      {
        id: 'art-03',
        slug: 'panduan-orang-tua-literasi-digital-anak',
        category: 'guide',
        date: '2026-08-08',
        thumbnail: '/images/library/panduan-ortu.jpg',
        tags: ['Guide', 'Parents'],
        audience: ['orang-tua'],
        title: 'Fun Chats About the Internet with Your Kids 💬',
        excerpt: 'Practical tips for Moms and Dads to start warm conversations about digital safety with the little ones.',
        content: `
          <p>Moms and Dads, the Internet Forest is a massive playground for our children. Just like a real-world playground, they need our guidance to play safely and comfortably. Let's start with something simple: having a chat! ☕</p>
          <p>Try to make conversations about the internet a fun routine, not a time for scolding. Ask them what their favorite game is this week, or what funny video they just watched. Be an enthusiastic listener! That way, children will feel comfortable talking if they encounter something unpleasant in cyberspace. 🌱</p>
          <p>Also, invite your children to agree on playing rules together. When is the right time to play with gadgets, and when is it time to rest. Remember, be a good role model by also putting down your phone while eating or gathering with family. Let's become fun guides for our little adventurers together! 🧭</p>
        `
      }
    ],
    toolkits: [
      {
        id: 'tk-01',
        type: 'Guide',
        audience: 'guru',
        link: '/guru',
        icon: '📖',
        title: 'Teacher Guide: Digital Literacy for Grades 4-6',
        description: 'Complete material to teach internet safety in the classroom.',
        actionText: 'Open Teacher Page',
      },
      {
        id: 'tk-02',
        type: 'Guide',
        audience: 'orang-tua',
        link: '/orang-tua',
        icon: '👪',
        title: 'Parent Guide: Accompanying Kids in the Digital World',
        description: 'Tips for guiding your child\'s adventure in the Internet Forest.',
        actionText: 'Open Parent Page',
      },
      {
        id: 'tk-04',
        type: 'PDF',
        audience: 'guru',
        fileUrl: '/materials/Paparan_Hutan_Internet_FINAL.pdf',
        icon: '📊',
        title: 'Digital Literacy Presentation Materials',
        description: 'Interactive presentation slides in PDF format for teaching digital literacy.',
        actionText: 'Open / Download Slides (PDF)',
      },
    ]
  }
};

/**
 * Retrieves library data for the specified language.
 * @param {string} lang - The language code ('id' or 'en').
 * @returns {object} The library data containing articles and toolkits.
 */
export function getLibrary(lang) {
  return libraryData[lang] || libraryData['id'];
}
