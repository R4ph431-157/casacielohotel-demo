import { useLanguage } from '../context/LanguageContext';
import PageFooter from '../components/layout/PageFooter';

const B = '/assets/imgs/';

export default function AttractionsPage() {
  const { t } = useLanguage();
  const a = t.attractions;

  return (
    <>
      {/* ── Hero ── */}
      <div className="page-hero attractions-hero">
        <span className="sec-eyebrow">{a.eyebrow}</span>
        <h1 className="sec-title display">
          {a.title1} <span className="it">{a.titleItalic}</span>
        </h1>
        <p className="page-hero-lead">{a.lead}</p>
      </div>

      {/* ── Attractions grid ── */}
      <section className="attractions-section">
        <div className="attractions-grid">
          {a.items.map((item, i) => (
            <div key={i} className="attraction-card">
              <div className="attraction-dist">{item.dist}</div>
              <h3 className="attraction-name">{item.name}</h3>
              <p className="attraction-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Pool image as ambient backdrop */}
        <div className="attractions-img-strip">
          <img src={`${B}1631266654PISCINE-D.png`} alt="Piscine La Casa Cielo" loading="lazy" />
          <div className="attractions-img-overlay">
            <p className="attractions-img-caption">Fidjrossè · Cotonou · Bénin</p>
          </div>
        </div>
      </section>

      <PageFooter />
    </>
  );
}
