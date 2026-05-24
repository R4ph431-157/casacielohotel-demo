import PageFooter from '../components/layout/PageFooter';
import { useLanguage } from '../context/LanguageContext';

export default function HotelPage() {
  const { t } = useLanguage();
  const h = t.hotel;

  return (
    <>
      <div className="page-hero">
        <span className="sec-eyebrow">{h.eyebrow}</span>
        <h1 className="sec-title display">
          {h.title1} <span className="it">{h.titleItalic}</span>
        </h1>
      </div>

      <section className="experience" style={{ paddingTop: '100px' }}>
        <div className="exp-grid">
          <div className="exp-img">
            <div className="exp-img-main" />
            <div className="exp-img-overlay">
              <div className="exp-quote">{h.quote}</div>
            </div>
          </div>
          <div className="exp-content">
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--ink-soft)', fontWeight: 300, maxWidth: '480px' }}>
              {h.lead}
            </p>
            <div className="exp-features">
              {h.features.map(f => (
                <div key={f.num} className="exp-feature">
                  <div className="exp-feature-num">{f.num}</div>
                  <div className="exp-feature-name">{f.name}</div>
                  <div className="exp-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageFooter />
    </>
  );
}
