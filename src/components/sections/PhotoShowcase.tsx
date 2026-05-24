import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Ornament from '../ui/Ornament';

const B = '/assets/imgs/';

export default function PhotoShowcase() {
  const { t } = useLanguage();
  const s = t.home.showcase;

  const [inView,  setInView]  = useState(false);
  const [mouse,   setMouse]   = useState({ x: 0, y: 0 });
  const [cursor,  setCursor]  = useState({ x: -400, y: -400 });

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  /* ── Scroll-triggered reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Mouse tracking ── */
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = gridRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setCursor({ x, y });
    setMouse({
      x: (x - r.width  / 2) / r.width,
      y: (y - r.height / 2) / r.height,
    });
  };
  const onLeave = () => {
    setMouse({ x: 0, y: 0 });
    setCursor({ x: -400, y: -400 });
  };

  const px = (mx: number, my: number): CSSProperties => ({
    transform: `translate(${mouse.x * mx}px, ${mouse.y * my}px)`,
  });

  return (
    <section className={`showcase${inView ? ' in-view' : ''}`} ref={sectionRef}>
      <div className="showcase-header">
        <Ornament />
        <span className="sec-eyebrow">{s.eyebrow}</span>
        <h2 className="sec-title display">
          {s.title1} <span className="it">{s.titleItalic}</span>
        </h2>
      </div>

      <div
        className="showcase-grid"
        ref={gridRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ '--cx': `${cursor.x}px`, '--cy': `${cursor.y}px` } as CSSProperties}
      >
        {/* ── Pool aerial — dominant left ── */}
        <div
          className={`sc-wrap sc-main${inView ? ' in' : ''}`}
          style={{ '--rd': '0s', ...px(-14, -9) } as CSSProperties}
        >
          <div className="sc-inner">
            <img src={`${B}1631266654PISCINE-D.png`} alt="Piscine" loading="lazy" />
          </div>
          {/* Editorial text overlay — always visible once revealed */}
          <div className="sc-text-overlay">
            <span className="sc-text-eyebrow">Fidjrossè · Cotonou</span>
            <p className="sc-text-quote">Un écrin au bord du Golfe.</p>
          </div>
          <span className="sc-label">{s.labels.pool}</span>
        </div>

        {/* ── Room — top right ── */}
        <div
          className={`sc-wrap sc-top${inView ? ' in' : ''}`}
          style={{ '--rd': '.22s', ...px(16, 11) } as CSSProperties}
        >
          <div className="sc-inner">
            <img src={`${B}1631256612CHAMBRE-303-B.png`} alt="Chambre" loading="lazy" />
          </div>
          <span className="sc-label">{s.labels.room}</span>
        </div>

        {/* ── Entrance — mid right ── */}
        <div
          className={`sc-wrap sc-mid${inView ? ' in' : ''}`}
          style={{ '--rd': '.4s', ...px(10, 15) } as CSSProperties}
        >
          <div className="sc-inner">
            <img src={`${B}1631255788IMG_3695.png`} alt="Entrée" loading="lazy" />
          </div>
          <span className="sc-label">{s.labels.entrance}</span>
        </div>

        {/* ── Restaurant — full-width strip ── */}
        <div
          className={`sc-wrap sc-wide${inView ? ' in' : ''}`}
          style={{ '--rd': '.58s', ...px(-7, -11) } as CSSProperties}
        >
          <div className="sc-inner">
            <img src={`${B}1631266967RESTAURANT-B.png`} alt="Restaurant" loading="lazy" />
          </div>
          <span className="sc-label">{s.labels.restaurant}</span>
        </div>

        {/* ── Floating polaroid badge ── */}
        <div className={`sc-badge${inView ? ' in' : ''}`}>
          <img src={`${B}1631266654PISCINE-B.png`} alt="Piscine" loading="lazy" />
        </div>

        {/* ── Cursor gold glow ── */}
        <div className="showcase-glow" aria-hidden="true" />
      </div>

      <div className="showcase-cta-row">
        <Link to="/gallery" className="showcase-cta">
          <span className="showcase-cta-line" />
          {s.cta}
          <span className="showcase-cta-line" />
        </Link>
      </div>
    </section>
  );
}
