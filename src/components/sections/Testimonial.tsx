import Ornament from '../ui/Ornament';
import { useLanguage } from '../../context/LanguageContext';

export default function Testimonial() {
  const { t } = useLanguage();
  const tm = t.home.testimonial;

  return (
    <section className="testimonial">
      <Ornament />
      <span className="sec-eyebrow">{tm.eyebrow}</span>
      <div className="testimonial-score-row">
        <div className="score-badge">
          <span className="score-value">{tm.score}</span>
          <span className="score-denom">/10</span>
        </div>
        <div className="score-meta">
          <span className="score-label">{tm.scoreLabel}</span>
          <span className="score-src">{tm.scoreSrc}</span>
        </div>
      </div>
      <div className="testimonial-reviews">
        {tm.reviews.map((r, i) => (
          <div key={i} className="testimonial-card">
            <span className="stars">★ ★ ★ ★ ★</span>
            <div className="testimonial-quote">{r.quote}</div>
            <div className="testimonial-author">{r.author} — {r.origin}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
