import PageFooter from '../components/layout/PageFooter';
import Ornament from '../components/ui/Ornament';
import { useLanguage } from '../context/LanguageContext';

const icons = [
  <path d="M5 12.55a11 11 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M12 20h.01" />,
  <path d="M5 21v-7l4-4 4 4 6-6v13M3 21h18" />,
  <path d="M12 2a10 10 0 1 0 10 10M12 2v10l7 7" />,
  <path d="M3 12h2l2-9 4 18 4-13 2 4h4" />,
];

export default function ServicesPage() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <>
      <div className="page-hero">
        <span className="sec-eyebrow">{s.eyebrow}</span>
        <h1 className="sec-title display">
          {s.title1} <span className="it">{s.titleItalic}</span>
        </h1>
      </div>

      <section className="amenities">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <Ornament />
        </div>
        <div className="amenities-grid">
          {s.items.map((item, i) => (
            <div key={item.name} className="amenity">
              <div className="amenity-icon">
                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  {icons[i]}
                </svg>
              </div>
              <h4>{item.name}</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <PageFooter />
    </>
  );
}
