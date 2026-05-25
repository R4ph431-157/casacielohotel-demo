import PageFooter from '../components/layout/PageFooter';
import { useLanguage } from '../context/LanguageContext';

export default function LocationPage() {
  const { t } = useLanguage();
  const l = t.location;

  return (
    <>
      <div className="page-hero">
        <span className="sec-eyebrow">{l.eyebrow}</span>
        <h1 className="sec-title display">
          {l.title1} <span className="it">{l.titleItalic}</span>
        </h1>
        <p className="page-hero-lead">{l.lead}</p>
      </div>

      <section className="location" style={{ paddingTop: '100px' }}>
        <div className="loc-grid">
          <div>
            <div className="loc-list">
              {l.distances.map(d => (
                <div key={d.name} className="loc-item">
                  <div className="loc-item-name">{d.name}</div>
                  <div className="loc-item-dist">{d.dist}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="map-frame map-real">
            <iframe
              src="https://maps.google.com/maps?q=H%C3%B4tel+La+Casa+Cielo+Fidjross%C3%A8+Cotonou+B%C3%A9nin&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={l.mapPin}
            />
          </div>
        </div>
      </section>

      <PageFooter />
    </>
  );
}
