/* ===========================================================================
 * LATAR ADEGAN BERGAMBAR
 * ===========================================================================
 * Lima latar hutan tropis digambar langsung dengan SVG supaya ringan,
 * tajam di layar besar, dan mudah diganti.
 *
 * MENGGANTI DENGAN ILUSTRASI ASLI:
 *   Simpan gambar di src/assets/backgrounds/, impor di src/utils/assets.js,
 *   lalu tambahkan properti `photo` pada sceneConfig. Komponen ini akan
 *   memakai gambar itu dan mengabaikan gambar SVG di bawah.
 * ======================================================================== */

const variants = {
  gate: {
    label: 'Gerbang Rahasia',
    sky: ['#ffe3a8', '#ffd166'],
    ground: '#4a8f5f',
    canopy: '#1c6b4a',
    canopyFar: '#2f9e6f',
  },
  river: {
    label: 'Sungai Berita Berisik',
    sky: ['#cfeafb', '#a8d5f2'],
    ground: '#5aa06c',
    canopy: '#1f6f5a',
    canopyFar: '#3f9d7c',
  },
  cave: {
    label: 'Gua Sang Peniru',
    sky: ['#e6dbfa', '#c6b5ec'],
    ground: '#5b6b7a',
    canopy: '#3d3160',
    canopyFar: '#5a4a86',
  },
  bridge: {
    label: 'Jembatan Komentar',
    sky: ['#ffdcc4', '#f7b98e'],
    ground: '#4f8d64',
    canopy: '#215c47',
    canopyFar: '#3d8b6b',
  },
  palace: {
    label: 'Istana Penjaga Internet',
    sky: ['#fff0c2', '#ffd166'],
    ground: '#4e9463',
    canopy: '#1c6b4a',
    canopyFar: '#37a17a',
  },
}

export default function SceneArt({ variant = 'gate', className = '' }) {
  const v = variants[variant] ?? variants.gate
  const uid = `scene-${variant}`

  return (
    <svg
      className={`scene__art ${className}`}
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={v.sky[0]} />
          <stop offset="100%" stopColor={v.sky[1]} />
        </linearGradient>
        <radialGradient id={`${uid}-sun`} cx="0.2" cy="0.15" r="0.4">
          <stop offset="0%" stopColor="#fff8dc" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff8dc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ec8e8" />
          <stop offset="100%" stopColor="#2a92b3" />
        </linearGradient>
      </defs>

      {/* Langit dan cahaya matahari */}
      <rect width="800" height="400" fill={`url(#${uid}-sky)`} />
      <circle cx="150" cy="60" r="180" fill={`url(#${uid}-sun)`} />

      {/* Kanopi jauh */}
      <path
        d="M0 150 Q60 100 130 138 Q190 92 260 132 Q330 88 400 130 Q470 86 545 128 Q615 92 680 134 Q740 104 800 146 L800 250 L0 250 Z"
        fill={v.canopyFar}
        opacity="0.55"
      />
      {/* Kanopi dekat */}
      <path
        d="M0 190 Q70 140 140 178 Q210 132 285 174 Q355 134 430 176 Q505 136 580 178 Q655 142 720 182 Q765 160 800 186 L800 300 L0 300 Z"
        fill={v.canopy}
        opacity="0.9"
      />

      {/* Batang pohon di tepi */}
      <rect x="24" y="150" width="26" height="250" rx="12" fill="#5b3a26" opacity="0.85" />
      <rect x="742" y="140" width="30" height="260" rx="14" fill="#5b3a26" opacity="0.85" />

      {/* Tanah */}
      <path d="M0 296 Q200 268 400 292 Q600 316 800 286 L800 400 L0 400 Z" fill={v.ground} />
      <path
        d="M0 330 Q200 306 400 328 Q600 350 800 322 L800 400 L0 400 Z"
        fill="#3d7a51"
        opacity="0.5"
      />

      {variant === 'gate' && (
        <g>
          {/* Dua pilar gerbang batu berlumut */}
          <rect x="196" y="120" width="72" height="190" rx="14" fill="#8d9a86" />
          <rect x="196" y="120" width="72" height="26" rx="12" fill="#6f7d69" />
          <rect x="452" y="120" width="72" height="190" rx="14" fill="#8d9a86" />
          <rect x="452" y="120" width="72" height="26" rx="12" fill="#6f7d69" />
          <path
            d="M232 122 Q360 52 488 122"
            stroke="#6f7d69"
            strokeWidth="26"
            fill="none"
            strokeLinecap="round"
          />
          {/* Cahaya di dalam gerbang */}
          <path d="M268 310 L268 152 Q360 96 452 152 L452 310 Z" fill="#fff3cd" opacity="0.75" />
          <path d="M268 310 L268 190 Q360 150 452 190 L452 310 Z" fill="#ffe08a" opacity="0.6" />
          {/* Sulur */}
          <path
            d="M204 150 q26 30 -4 56 q-24 24 6 52 q26 24 -2 48"
            stroke="#2f9e6f"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M516 154 q-26 30 4 56 q24 24 -6 52"
            stroke="#2f9e6f"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Lubang kunci */}
          <circle cx="360" cy="212" r="20" fill="#f4b942" />
          <rect x="352" y="222" width="16" height="30" rx="6" fill="#f4b942" />
        </g>
      )}

      {variant === 'river' && (
        <g>
          {/* Aliran sungai */}
          <path
            d="M-20 400 Q160 300 250 246 Q340 194 320 130 L520 130 Q516 210 596 262 Q690 320 820 400 Z"
            fill={`url(#${uid}-water)`}
          />
          <path
            d="M120 356 q40 -16 80 0 M240 300 q36 -14 72 0 M330 244 q34 -12 68 0 M430 300 q36 -14 72 0 M540 350 q40 -16 80 0"
            stroke="#e3f1fb"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Kertas pesan mengapung */}
          <g>
            <rect x="286" y="228" width="58" height="42" rx="6" fill="#fffdf6" transform="rotate(-8 315 249)" />
            <path d="M296 242 h38 M296 252 h30 M296 262 h34" stroke="#c0b39a" strokeWidth="4" transform="rotate(-8 315 249)" />
          </g>
          <g>
            <rect x="452" y="296" width="66" height="46" rx="6" fill="#fffdf6" transform="rotate(7 485 319)" />
            <path d="M462 312 h44 M462 324 h34 M462 336 h40" stroke="#c0b39a" strokeWidth="4" transform="rotate(7 485 319)" />
          </g>
          {/* Batu di tepian */}
          <ellipse cx="120" cy="330" rx="46" ry="24" fill="#8d9a86" />
          <ellipse cx="672" cy="344" rx="52" ry="26" fill="#8d9a86" />
        </g>
      )}

      {variant === 'cave' && (
        <g>
          {/* Bukit batu tempat gua berada */}
          <path d="M120 400 Q160 150 400 132 Q640 150 680 400 Z" fill="#6f6499" />
          {/* Mulut gua */}
          <path d="M204 400 Q204 186 400 172 Q596 186 596 400 Z" fill="#4a3f74" />
          <path d="M244 400 Q244 216 400 204 Q556 216 556 400 Z" fill="#332b5c" />
          {/* Cahaya lembut dari dalam gua supaya tidak menakutkan */}
          <ellipse cx="400" cy="330" rx="120" ry="80" fill="#8b6cd8" opacity="0.45" />
          <ellipse cx="400" cy="352" rx="72" ry="46" fill="#c6b5ec" opacity="0.4" />
          {/* Stalaktit menggantung di dalam mulut gua */}
          <path
            d="M264 216 l14 44 l14 -44 Z M320 204 l12 38 l12 -38 Z M462 204 l13 40 l13 -40 Z M516 214 l13 38 l13 -38 Z"
            fill="#4a3f74"
          />
          {/* Pantulan Sang Peniru: dua bayangan kembar */}
          <path d="M318 292 l34 -58 l34 58 l-34 58 Z" fill="#a88fe8" opacity="0.85" />
          <path d="M414 292 l34 -58 l34 58 l-34 58 Z" fill="#a88fe8" opacity="0.5" />
          {/* Batu berkilau di mulut gua (hiasan) */}
          <path d="M228 380 l15 -44 l15 44 Z" fill="#ddd2f5" />
          <path d="M556 386 l13 -38 l13 38 Z" fill="#ddd2f5" />
        </g>
      )}

      {variant === 'bridge' && (
        <g>
          {/* Jurang berkabut */}
          <path d="M150 400 Q230 300 260 250 L540 250 Q572 302 650 400 Z" fill="#2f6b57" opacity="0.55" />
          <path d="M180 400 q120 -40 240 0 q120 -40 200 0 Z" fill="#dff2e8" opacity="0.5" />
          {/* Tali jembatan */}
          <path d="M120 214 Q400 300 680 214" stroke="#8a5a3b" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M120 168 Q400 252 680 168" stroke="#8a5a3b" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* Papan komentar */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const t = i / 8
            const x = 120 + t * 560
            const y = 214 + Math.sin(Math.PI * t) * 44
            const cracked = i === 3 || i === 6
            return (
              <rect
                key={i}
                x={x - 26}
                y={y - 7}
                width="52"
                height="15"
                rx="5"
                fill={cracked ? '#b98b6c' : '#c39270'}
                opacity={cracked ? 0.7 : 1}
              />
            )
          })}
          {/* Tiang jembatan */}
          <rect x="104" y="150" width="20" height="150" rx="8" fill="#5b3a26" />
          <rect x="676" y="150" width="20" height="150" rx="8" fill="#5b3a26" />
        </g>
      )}

      {variant === 'palace' && (
        <g>
          {/* Bukit istana */}
          <path d="M120 400 Q400 210 680 400 Z" fill="#3d7a51" />
          {/* Menara */}
          <rect x="352" y="126" width="96" height="150" rx="12" fill="#f6ead3" />
          <path d="M348 126 L400 62 L452 126 Z" fill="#1c6b4a" />
          <rect x="272" y="176" width="64" height="102" rx="10" fill="#ecdcc0" />
          <path d="M268 176 L304 128 L340 176 Z" fill="#2f9e6f" />
          <rect x="464" y="176" width="64" height="102" rx="10" fill="#ecdcc0" />
          <path d="M460 176 L496 128 L532 176 Z" fill="#2f9e6f" />
          {/* Pintu dan jendela */}
          <path d="M378 276 L378 214 Q400 194 422 214 L422 276 Z" fill="#8a5a3b" />
          <circle cx="400" cy="164" r="15" fill="#4aa3df" />
          {/* Lima dudukan harta karun: kunci, kompas, lensa, perisai, mahkota */}
          {[
            ['🗝️', 232],
            ['🧭', 316],
            ['🔍', 400],
            ['🛡️', 484],
            ['👑', 568],
          ].map(([symbol, x]) => (
            <g key={x}>
              <rect x={x - 18} y="316" width="36" height="18" rx="5" fill="#c39270" />
              <text x={x} y="310" textAnchor="middle" fontSize="34">
                {symbol}
              </text>
            </g>
          ))}
        </g>
      )}

      {/* Daun melayang di depan */}
      <path d="M60 356 q22 -20 44 0 q-22 20 -44 0" fill="#52b788" opacity="0.85" />
      <path d="M700 372 q20 -18 40 0 q-20 18 -40 0" fill="#52b788" opacity="0.85" />
      <path d="M400 384 q18 -16 36 0 q-18 16 -36 0" fill="#3d7a51" opacity="0.6" />
    </svg>
  )
}
