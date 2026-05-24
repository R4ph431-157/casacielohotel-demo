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
          <div className="map-frame">
            <div className="wave wave-1" />
            <div className="wave wave-2" />
            <div className="wave wave-3" />
            <div className="map-pin">
              <div>{l.mapPin}</div>
              <div className="pin-dot" />
            </div>
          </div>
        </div>
      </section>

      <PageFooter />
    </>
  );
}
