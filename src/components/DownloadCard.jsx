/* Kartu unduhan panduan.
 * CATATAN: berkas PDF di public/materials/ masih berupa berkas contoh.
 * Ganti dengan panduan asli memakai nama berkas yang sama. */
export default function DownloadCard({ title, note, href, label, emoji = '📄' }) {
  const url = `${import.meta.env.BASE_URL}${href}`

  return (
    <div className="download">
      <span className="download__icon" aria-hidden="true">
        {emoji}
      </span>
      <div>
        <span className="download__title">{title}</span>
        <p className="download__note">{note}</p>
        <a className="btn btn--ghost" href={url} download>
          <span aria-hidden="true">⬇️</span> {label}
        </a>
      </div>
    </div>
  )
}
