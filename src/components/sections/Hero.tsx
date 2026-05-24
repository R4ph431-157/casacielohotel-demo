import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const h = t.home.hero;
  const navigate = useNavigate();

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
          <button className="btn-gold" onClick={() => navigate('/reservations')}>
            {h.bookStay}
          </button>
          <button className="btn-outline" onClick={() => navigate('/hotel')}>
            {h.discover}
          </button>
        </div>
      </div>
      <div className="scroll-hint" onClick={scrollToBooking} style={{ cursor: 'pointer' }}>
        <div>{h.scroll}</div>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
