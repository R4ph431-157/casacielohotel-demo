import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const h = t.home.hero;

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-eyebrow">{h.eyebrow}</div>
        <h1 className="display">
          {h.title1}
          <span className="it">{h.title2}</span>
        </h1>
        <p className="lead">{h.lead}</p>
        <div className="hero-cta-row">
          <button className="btn-gold" onClick={scrollToBooking}>
            {h.bookStay}
          </button>
        </div>
      </div>
    </section>
  );
}
