import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PageFooter from '../components/layout/PageFooter';

const B = '/assets/imgs/';

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;
  const navigate = useNavigate();

  const [inView, setInView] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (contentRef.current) obs.observe(contentRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <div className="about-hero">
        <img
          src={`${B}1631255788IMG_3695.png`}
          alt="Hôtel La Casa Cielo — Entrée"
          className="about-hero-img"
        />
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <span className="about-hero-eyebrow">{a.eyebrow}</span>
          <h1 className="about-hero-title">{a.heroTitle}</h1>
        </div>
      </div>

      {/* ── Content ── */}
      <section className="about-content" ref={contentRef}>
        <div className={`about-text-block${inView ? ' in' : ''}`}>
          <span className="sec-eyebrow">{a.eyebrow}</span>
          <h2 className="about-content-title display">
            {a.contentTitle}
          </h2>
          <div className="about-paragraphs">
            {a.paragraphs.map((p, i) => (
              <p key={i} className="about-para">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature image ── */}
      <div className={`about-feature-img-wrap${inView ? ' in' : ''}`}>
        <div className="about-feature-img">
          <img
            src={`${B}1631257438IMG_3745.png`}
            alt={a.imgCaption}
            loading="lazy"
          />
          <div className="about-feature-caption">
            <span className="about-feature-line" />
            <p>{a.imgCaption}</p>
          </div>
        </div>
      </div>

      {/* ── Reviews ── */}
      <section className="about-reviews">
        <div className="about-reviews-header">
          <span className="sec-eyebrow">{a.reviewsTitle}</span>
        </div>
        <div className="about-reviews-grid">
          {a.reviews.map((r, i) => (
            <div key={i} className="about-review-card">
              <div className="about-review-stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d="M6 .5l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8l-2.9 1.5.6-3.2L1.2 4l3.3-.5z" />
                  </svg>
                ))}
              </div>
              <p className="about-review-quote">"{r.quote}"</p>
              <div className="about-review-author">
                <span className="about-review-name">{r.author}</span>
                <span className="about-review-origin">{r.origin}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="about-reviews-cta">
          <button className="nav-cta" onClick={() => navigate('/reservations')}>
            {t.nav.book}
          </button>
        </div>
      </section>

      <PageFooter />
    </>
  );
}
