import PageFooter from '../components/layout/PageFooter';
import { useLanguage } from '../context/LanguageContext';

const roomClasses = ['room-1', 'room-2', 'room-3', 'room-4'];
const BOOKING_URL = 'https://live.ipms247.com/booking/book-rooms-hotellacasacielo';

export default function RoomsPage() {
  const { t } = useLanguage();
  const r = t.rooms;

  return (
    <>
      <div className="page-hero">
        <span className="sec-eyebrow">{r.eyebrow}</span>
        <h1 className="sec-title display">
          {r.title1} <span className="it">{r.titleItalic}</span>
        </h1>
        <p className="page-hero-lead">{r.lead}</p>
      </div>

      <section className="rooms" style={{ paddingTop: '80px' }}>
        <div className="rooms-grid">
          {r.cards.map((card, i) => (
            <div key={card.name} className={`room-card ${roomClasses[i]}`}>
              <div className="room-img">
                <div className="room-tag">{card.tag}</div>
                <div className="room-img-inner" />
              </div>
              <div className="room-info">
                <div>
                  <div className="room-name">{card.name}</div>
                  <div className="room-feat">{card.feat}</div>
                </div>
                <div className="room-price">
                  <div className="from">{r.from}</div>
                  <div className="amount">{card.price}</div>
                  <div className="per">{r.perNight}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <button className="btn-gold" onClick={() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')}>
            {r.bookRoom}
          </button>
        </div>
      </section>

      <PageFooter />
    </>
  );
}
