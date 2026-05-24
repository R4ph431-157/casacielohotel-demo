import Ornament from '../ui/Ornament';
import { useLanguage } from '../../context/LanguageContext';

export default function Testimonial() {
  const { t } = useLanguage();
  const tm = t.home.testimonial;

  return (
    <section className="testimonial">
      <Ornament />
      <span className="sec-eyebrow">{tm.eyebrow}</span>
      <div className="testimonial-quote">{tm.quote}</div>
      <div className="testimonial-author">
        <span className="stars">★ ★ ★ ★ ★</span>
        {tm.author}
      </div>
    </section>
  );
}
