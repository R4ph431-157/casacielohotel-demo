import { useEffect, useState, type CSSProperties } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PageFooter from '../components/layout/PageFooter';

const B = '/assets/imgs/';

type Category = 'exterior' | 'interior' | 'rooms' | 'pool' | 'restaurant' | 'hall';

interface Photo {
  file: string;
  alt: string;
  category: Category;
}

const PHOTOS: Photo[] = [
  // Extérieur
  { file: '1631255788IMG_3695.png',                          alt: "Entrée de l'hôtel",          category: 'exterior' },
  { file: '1631266653IMG_3707.png',                          alt: 'Vue de la rue',              category: 'exterior' },
  { file: '1631255788IMG_3823.png',                          alt: 'Façade extérieure',           category: 'exterior' },
  // Intérieur
  { file: '1631266653BAR-A.png',                             alt: 'Bar terrasse',               category: 'interior' },
  { file: '1631266653BAR-C.png',                             alt: 'Bar lounge',                 category: 'interior' },
  // Chambres
  { file: '1631256612CHAMBRE-303-B.png',                     alt: 'Chambre 303',                category: 'rooms' },
  { file: '1631267022CHAMBRE-305-C.png',                     alt: 'Chambre 305',                category: 'rooms' },
  { file: '613b0079e45e4_940.png',                           alt: 'Chambre lit double',          category: 'rooms' },
  { file: '613afd09d76bf_CHAMBRE-303-B.png',                 alt: 'Chambre Deluxe',             category: 'rooms' },
  { file: '613b0040aec45_new.png',                           alt: 'Chambre confort',            category: 'rooms' },
  { file: '613b01c9a2128_400.png',                           alt: 'Chambre standard',           category: 'rooms' },
  // Piscine
  { file: '1631266654PISCINE-D.png',                         alt: 'Piscine vue aérienne',        category: 'pool' },
  { file: '1631266654PISCINE-B.png',                         alt: 'Piscine & transats',         category: 'pool' },
  { file: '1631266653PISCINE-A.png',                         alt: 'Piscine extérieure',          category: 'pool' },
  // Restaurant
  { file: '1631266967RESTAURANT-B.png',                      alt: 'Salle de restaurant',         category: 'restaurant' },
  { file: '1631256984RESTAURANT-A.png',                      alt: 'Restaurant, mise en place',  category: 'restaurant' },
  { file: '1631267209RESTAURANT-C.png',                      alt: 'Restaurant, vue ensemble',   category: 'restaurant' },
  // Salles
  { file: '1631266967GRANDE-SALLE-DE-CONFERENCE-B.png',      alt: 'Grande salle de réception',  category: 'hall' },
  { file: '1631256984GRANDE-SALLE-DE-CONFERENCE-D.png',      alt: 'Salle de conférence',         category: 'hall' },
  { file: '1631266967PETITE-SALLE-DE-CONFERENCE-C.png',      alt: 'Salle de réunion',            category: 'hall' },
];

function spanClass(i: number) {
  if (i % 7 === 0) return 'gc2';
  if ((i + 4) % 7 === 0) return 'gr2';
  return '';
}

export default function GalleryPage() {
  const { t } = useLanguage();
  const g = t.gallery;

  const [active, setActive] = useState<Category>('exterior');
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const visible = PHOTOS.filter(p => p.category === active);

  const cats: { key: Category; label: string }[] = [
    { key: 'exterior',   label: g.categories.exterior },
    { key: 'interior',   label: g.categories.interior },
    { key: 'rooms',      label: g.categories.rooms },
    { key: 'pool',       label: g.categories.pool },
    { key: 'restaurant', label: g.categories.restaurant },
    { key: 'hall',       label: g.categories.hall },
  ];

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  /* navigate lightbox prev/next */
  const lightboxNav = (dir: 1 | -1) => {
    if (!lightbox) return;
    const idx = visible.findIndex(p => p.file === lightbox.file);
    const next = visible[(idx + dir + visible.length) % visible.length];
    setLightbox(next);
  };

  return (
    <>
      {/* ── Page hero ── */}
      <div className="page-hero gallery-hero">
        <span className="sec-eyebrow">{g.eyebrow}</span>
        <h1 className="sec-title display">
          {g.title1} <span className="it">{g.titleItalic}</span>
        </h1>
        <p className="page-hero-lead">{g.lead}</p>
      </div>

      {/* ── Gallery body ── */}
      <section className="gallery-section">

        {/* ── Tab nav ── */}
        <nav className="gallery-nav">
          {cats.map(c => (
            <button
              key={c.key}
              className={`gallery-tab${active === c.key ? ' active' : ''}`}
              onClick={() => setActive(c.key)}
            >
              {c.label}
              <span className="gallery-tab-count">
                {PHOTOS.filter(p => p.category === c.key).length}
              </span>
            </button>
          ))}
        </nav>

        {/* ── Editorial grid ── */}
        <div className="gallery-grid" key={active}>
          {visible.map((photo, i) => (
            <div
              key={photo.file}
              className={`gallery-card${spanClass(i) ? ` ${spanClass(i)}` : ''}`}
              style={{ '--cd': `${Math.min(i * 0.06, 0.48)}s` } as CSSProperties}
              onClick={() => setLightbox(photo)}
            >
              <span className="gallery-card-num">{String(i + 1).padStart(2, '0')}</span>
              <img src={`${B}${photo.file}`} alt={photo.alt} loading="lazy" />
              <div className="gallery-card-info">
                <span className="gallery-card-line" />
                <p className="gallery-card-name">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Fermer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          {/* prev */}
          <button
            className="lightbox-arrow lightbox-prev"
            onClick={e => { e.stopPropagation(); lightboxNav(-1); }}
            aria-label="Précédent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <img src={`${B}${lightbox.file}`} alt={lightbox.alt} />
            <p className="lightbox-caption">{lightbox.alt}</p>
          </div>
          {/* next */}
          <button
            className="lightbox-arrow lightbox-next"
            onClick={e => { e.stopPropagation(); lightboxNav(1); }}
            aria-label="Suivant"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      <PageFooter />
    </>
  );
}
