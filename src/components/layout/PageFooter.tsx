import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const QUICK_LINK_PATHS = ['/', '/about', '/rooms', '/services', '/gallery', '/contact'];

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TripadvisorIcon = () => (
  <svg width="18" height="16" viewBox="0 0 32 28" fill="currentColor" aria-hidden="true">
    <path d="M16 6.5C10 6.5 4.5 9 1 13.2l4.2-.1a6.8 6.8 0 1 1 0 2H1.5A14.9 14.9 0 0 0 16 21.5c5.2 0 9.8-2.6 12.6-6.6l-4.4.1a6.8 6.8 0 1 1 0-2l4.2-.1A14.9 14.9 0 0 0 16 6.5zM9 14.8a4.8 4.8 0 1 0 0 .4V14.8zm14 0a4.8 4.8 0 1 0 0 .4V14.8z" />
  </svg>
);

export default function PageFooter() {
  const { t } = useLanguage();
  const { copyright, socials, quickLinks, aboutUs } = t.pageFooter;

  return (
    <footer className="page-footer">
      <div className="page-footer-body">

        {/* Brand + socials */}
        <div className="pf-brand">
          <img src="/assets/imgs/logo.png" alt="La Casa Cielo" className="pf-logo-img" loading="lazy" />
          <p className="pf-tagline">Fidjrossè · Cotonou</p>
          <div className="pf-socials">
            <a href="#" className="pf-social-icon" aria-label={socials.facebook}>
              <FacebookIcon />
            </a>
            <a href="#" className="pf-social-icon" aria-label={socials.instagram}>
              <InstagramIcon />
            </a>
            <a href="#" className="pf-social-icon" aria-label={socials.tripadvisor}>
              <TripadvisorIcon />
            </a>
          </div>
        </div>

        {/* About Us */}
        <div className="pf-about">
          <p className="pf-col-label">{aboutUs.title}</p>
          <div className="pf-about-rule" />
          <p className="pf-about-text">{aboutUs.text}</p>
        </div>

        {/* Quick links */}
        <div className="pf-links-col">
          {quickLinks.links.map((label, i) => (
            <Link key={i} to={QUICK_LINK_PATHS[i]} className="pf-link">{label}</Link>
          ))}
        </div>

      </div>

      <div className="page-footer-bottom">
        <span>{copyright}</span>
      </div>
    </footer>
  );
}
