import { useEffect, useState, type CSSProperties } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PageFooter from '../components/layout/PageFooter';

const B = '/assets/imgs/';

type Category = 'exterior' | 'interior' | 'rooms' | 'pool' | 'restaurant' | 'hall';

interface Photo {
  file: string;
  nameKey: string;
  category: Category;
}

const PHOTOS: Photo[] = [
  // Extérieur
  { file: '1631255788IMG_3695.png',                          nameKey: 'hotelEntrance',          category: 'exterior' },
  { file: '1631266653IMG_3707.png',                          nameKey: 'streetView',             category: 'exterior' },
  { file: '1631255788IMG_3823.png',                          nameKey: 'hotelFacade',            category: 'exterior' },
  { file: 'display.jpg',                                     nameKey: 'hotelNight',             category: 'exterior' },
  // Intérieur
  { file: '1631266653BAR-A.png',                             nameKey: 'barTerrace',             category: 'interior' },
  { file: '1631266653BAR-C.png',                             nameKey: 'barLounge',              category: 'interior' },
  { file: 'photo_2026-05-26_04-04-32.jpg',                   nameKey: 'barLoungeInterior',      category: 'interior' },
  // Chambres
  { file: '1631256612CHAMBRE-303-B.png',                     nameKey: 'prestigeRoomA',          category: 'rooms' },
  { file: '1631267022CHAMBRE-305-C.png',                     nameKey: 'prestigeSeaViewA',       category: 'rooms' },
  { file: '613b0079e45e4_940.png',                           nameKey: 'presidentialSuiteA',     category: 'rooms' },
  { file: '613afd09d76bf_CHAMBRE-303-B.png',                 nameKey: 'prestigeRoomB',          category: 'rooms' },
  { file: '613b0040aec45_new.png',                           nameKey: 'prestigeSeaViewB',       category: 'rooms' },
  { file: '613b01c9a2128_400.png',                           nameKey: 'presidentialSuiteB',     category: 'rooms' },
  { file: 'photo_2026-05-26_04-04-59.jpg',                   nameKey: 'prestigeRoomC',          category: 'rooms' },
  // Piscine
  { file: '1631266654PISCINE-D.png',                         nameKey: 'poolAerial',             category: 'pool' },
  { file: '1631266654PISCINE-B.png',                         nameKey: 'poolSunbeds',            category: 'pool' },
  { file: '1631266653PISCINE-A.png',                         nameKey: 'poolExterior',           category: 'pool' },
  { file: 'photo_2026-05-26_04-05-05.jpg',                   nameKey: 'poolTerrace',            category: 'pool' },
  // Restaurant
  { file: '1631266967RESTAURANT-B.png',                      nameKey: 'restaurantDining',       category: 'restaurant' },
  { file: '1631256984RESTAURANT-A.png',                      nameKey: 'restaurantSetup',        category: 'restaurant' },
  { file: '1631267209RESTAURANT-C.png',                      nameKey: 'restaurantOverview',     category: 'restaurant' },
  { file: 'photo_2026-05-26_04-04-37.jpg',                   nameKey: 'dishLambChops',          category: 'restaurant' },
  { file: 'photo_2026-05-26_04-04-40.jpg',                   nameKey: 'dishChicken',            category: 'restaurant' },
  { file: 'photo_2026-05-26_04-04-43.jpg',                   nameKey: 'dishCreamMeat',          category: 'restaurant' },
  { file: 'photo_2026-05-26_04-04-46.jpg',                   nameKey: 'dishFish',               category: 'restaurant' },
  { file: 'photo_2026-05-26_04-04-49.jpg',                   nameKey: 'dishPrawns',             category: 'restaurant' },
  { file: 'photo_2026-05-26_04-04-53.jpg',                   nameKey: 'dishBrochettes',         category: 'restaurant' },
  // Salles
  { file: '1631266967GRANDE-SALLE-DE-CONFERENCE-B.png',      nameKey: 'largeConferenceRoom',    category: 'hall' },
  { file: '1631256984GRANDE-SALLE-DE-CONFERENCE-D.png',      nameKey: 'conferenceRoom',         category: 'hall' },
  { file: '1631266967PETITE-SALLE-DE-CONFERENCE-C.png',      nameKey: 'meetingRoom',            category: 'hall' },
  { file: 'photo_2026-05-26_04-05-02.jpg',                   nameKey: 'conferenceClassroom',    category: 'hall' },
  { file: 'photo_2026-05-26_04-05-08.jpg',                   nameKey: 'conferenceUShape',       category: 'hall' },
  { file: 'photo_2026-05-26_04-05-11.jpg',                   nameKey: 'seminarHall',            category: 'hall' },
  { file: 'photo_2026-05-26_04-05-14.jpg',                   nameKey: 'eventHallLive',          category: 'hall' },
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

        {/* ── Filter nav ── */}
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
              <img src={`${B}${photo.file}`} alt={(g.photoNames as Record<string, string>)[photo.nameKey]} loading="lazy" />
              <div className="gallery-card-info">
                <span className="gallery-card-line" />
                <p className="gallery-card-name">{(g.photoNames as Record<string, string>)[photo.nameKey]}</p>
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
            <img src={`${B}${lightbox.file}`} alt={(g.photoNames as Record<string, string>)[lightbox.nameKey]} loading="lazy" />
            <p className="lightbox-caption">{(g.photoNames as Record<string, string>)[lightbox.nameKey]}</p>
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
