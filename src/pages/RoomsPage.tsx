import { useState } from 'react';
import PageFooter from '../components/layout/PageFooter';
import { useLanguage } from '../context/LanguageContext';

const BOOKING_URL = 'https://live.ipms247.com/booking/book-rooms-hotellacasacielo';

const ROOM_IMAGES = [
  [
    '/assets/rooms/presidential-royal-suite/20215_20210810122408_0458143001628598248_744_CHAMBRE_306_A.png',
    '/assets/rooms/presidential-royal-suite/20215_20210810122409_0397327001628598249_35_CHAMBRE_306_B.png',
    '/assets/rooms/presidential-royal-suite/20215_20210810122410_0266255001628598250_260_CHAMBRE_306_C.png',
    '/assets/rooms/presidential-royal-suite/20215_20210810122411_0121924001628598251_184_CHAMBRE_306_D.png',
  ],
  [
    '/assets/rooms/prestige-room/20215_20250624101858_0464011001750760338_777_DSC_0135_copie.jpg',
    '/assets/rooms/prestige-room/20215_20250624101859_0294533001750760339_709_DSC_0141_copie.jpg',
    '/assets/rooms/prestige-room/20215_20250624101900_0233718001750760340_746_DSC_0152_copie.jpg',
    '/assets/rooms/prestige-room/20215_20250624101901_0153739001750760341_37_DSC_0161_copie.jpg',
    '/assets/rooms/prestige-room/thumb_20215_20210810130458_0700352001628600698_878_CHAMBRE_303_A.png',
  ],
  [
    '/assets/rooms/prestige-double-room-with-sea-view/20215_20250624101631_0280120001750760191_211_DSC_0226_copie.jpg',
    '/assets/rooms/prestige-double-room-with-sea-view/20215_20250624101632_0255259001750760192_724_DSC_0234_copie.jpg',
    '/assets/rooms/prestige-double-room-with-sea-view/20215_20250624101711_0754854001750760231_835_CHAMBRE_218_C.jpg',
  ],
];

const ROOM_NUMS = ['01', '02', '03'];

export default function RoomsPage() {
  const { t } = useLanguage();
  const r = t.rooms;
  const [activeImgs, setActiveImgs] = useState([0, 0, 0]);
  const [loaded, setLoaded] = useState<Set<string>>(
    () => new Set(ROOM_IMAGES.map((_, i) => `${i}-0`))
  );

  const markLoaded = (roomIdx: number, imgIdx: number) =>
    setLoaded(s => new Set(s).add(`${roomIdx}-${imgIdx}`));

  const go = (roomIdx: number, dir: number) => {
    setActiveImgs(prev => {
      const next = [...prev];
      const len = ROOM_IMAGES[roomIdx].length;
      const nextIdx = (prev[roomIdx] + dir + len) % len;
      next[roomIdx] = nextIdx;
      markLoaded(roomIdx, nextIdx);
      return next;
    });
  };

  const setImg = (roomIdx: number, imgIdx: number) => {
    markLoaded(roomIdx, imgIdx);
    setActiveImgs(prev => {
      const next = [...prev];
      next[roomIdx] = imgIdx;
      return next;
    });
  };

  return (
    <>
      <div className="page-hero">
        <span className="sec-eyebrow">{r.eyebrow}</span>
        <h1 className="sec-title display">
          {r.title1} <span className="it">{r.titleItalic}</span>
        </h1>
        <p className="page-hero-lead">{r.lead}</p>
      </div>

      <section className="rooms-section">
        <div className="rooms-list">
          {r.cards.map((card, i) => (
            <article key={card.name} className="rch">

              {/* Image pane */}
              <div className="rch-img">
                {ROOM_IMAGES[i].map((src, di) => (
                  <div
                    key={src}
                    className={`rch-img-layer${di === activeImgs[i] ? ' rch-img-layer--on' : ''}`}
                    style={loaded.has(`${i}-${di}`) ? { backgroundImage: `url('${src}')` } : undefined}
                  />
                ))}
                <div className="rch-img-overlay" />

                {ROOM_IMAGES[i].length > 1 && (
                  <>
                    <button className="rch-arrow rch-arrow--prev" onClick={() => go(i, -1)} aria-label="Previous">
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button className="rch-arrow rch-arrow--next" onClick={() => go(i, 1)} aria-label="Next">
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className="rch-dots">
                      {ROOM_IMAGES[i].map((_, di) => (
                        <button
                          key={di}
                          className={`rch-dot${di === activeImgs[i] ? ' rch-dot--on' : ''}`}
                          onClick={() => setImg(i, di)}
                          aria-label={`Photo ${di + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="rch-img-num">{ROOM_NUMS[i]}</div>
              </div>

              {/* Info pane */}
              <div className="rch-info">
                <div className="rch-info-inner">
                  <p className="rch-desc">{card.desc}</p>
                  <h2 className="rch-name">{card.name}</h2>
                  <div className="rch-rule" />
                  <div className="rch-capacity">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {card.capacity}
                  </div>
                  <div className="rch-amenity-groups">
                    <div className="rch-amenity-group">
                      <span className="rch-amenity-group-label">{r.roomAmenitiesLabel}</span>
                      <div className="rch-pills">
                        {card.roomAmenities.map(a => (
                          <span key={a} className="rch-pill rch-pill--gold">{a}</span>
                        ))}
                      </div>
                    </div>
                    <div className="rch-amenity-group">
                      <span className="rch-amenity-group-label">{r.hotelAmenitiesLabel}</span>
                      <div className="rch-pills">
                        {card.hotelAmenities.map(a => (
                          <span key={a} className="rch-pill">{a}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rch-bottom">
                    <div className="rch-price-block">
                      <span className="rch-from">{r.from}</span>
                      <span className="rch-price">{card.price}</span>
                      <span className="rch-per">{r.perNight}</span>
                    </div>
                    <button
                      className="btn-gold"
                      onClick={() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')}
                    >
                      {r.bookRoom}
                    </button>
                  </div>
                </div>
              </div>

            </article>
          ))}
        </div>
      </section>

      <PageFooter />
    </>
  );
}
