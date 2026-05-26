import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { BOOKING_URL } from '../../lib/constants';

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
    >
      <span className="nav-item-label">{label}</span>
    </NavLink>
  );
}

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handle = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('nav') && !target.closest('.mobile-dropdown')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [menuOpen]);

  const navLinks = [
    { to: '/',            label: t.nav.home },
    { to: '/about',       label: t.nav.about },
    { to: '/rooms',       label: t.nav.rooms },
    { to: '/services',    label: t.nav.services },
    { to: '/gallery',     label: t.nav.gallery },
    { to: '/attractions', label: t.nav.attractions },
    { to: '/contact',     label: t.nav.contact },
  ] as const;

  return (
    <>
      <nav>
        {/* ── Left ── */}
        <div className="nav-left">
          <NavItem to="/"       label={t.nav.home} />
          <NavItem to="/about"  label={t.nav.about} />
          <NavItem to="/rooms"  label={t.nav.rooms} />
          <NavItem to="/services" label={t.nav.services} />
        </div>

        {/* ── Centered logo ── */}
        <Link to="/" className="logo">
          <picture>
            <source srcSet="/assets/imgs/logo.webp" type="image/webp" />
            <img src="/assets/imgs/logo.png" alt="La Casa Cielo" className="logo-img" fetchPriority="high" width="126" height="84" />
          </picture>
        </Link>

        {/* ── Right ── */}
        <div className="nav-right-group">
          <NavItem to="/gallery"     label={t.nav.gallery} />
          <NavItem to="/attractions" label={t.nav.attractions} />
          <NavItem to="/contact"     label={t.nav.contact} />
          <div className="nav-divider" />
          <div className="nav-actions">
            <button className="lang-btn" onClick={toggleLanguage} aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}>
              <svg className="lang-globe" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <circle cx="9" cy="9" r="7.5" />
                <ellipse cx="9" cy="9" rx="3" ry="7.5" />
                <line x1="1.5" y1="6.5" x2="16.5" y2="6.5" />
                <line x1="1.5" y1="11.5" x2="16.5" y2="11.5" />
              </svg>
              <span className="lang-label">{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>
            <button className="nav-cta" onClick={() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')}>
              {t.nav.book}
            </button>
          </div>
        </div>

        {/* ── Hamburger (mobile only) ── */}
        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── Dropdown menu (mobile/tablet) ── */}
      <div className={`mobile-dropdown${menuOpen ? ' open' : ''}`}>
        <div className="mobile-dropdown-links">
          {navLinks.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="mobile-dropdown-link"
              onClick={close}
            >
              <span className="mobile-dropdown-label">{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="mobile-dropdown-footer">
          <button className="lang-btn" onClick={toggleLanguage} aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}>
            <svg className="lang-globe" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <circle cx="9" cy="9" r="7.5" />
              <ellipse cx="9" cy="9" rx="3" ry="7.5" />
              <line x1="1.5" y1="6.5" x2="16.5" y2="6.5" />
              <line x1="1.5" y1="11.5" x2="16.5" y2="11.5" />
            </svg>
            <span className="lang-label">{language === 'fr' ? 'EN' : 'FR'}</span>
          </button>
          <button
            className="mobile-book-btn"
            onClick={() => { window.open(BOOKING_URL, '_blank', 'noopener,noreferrer'); close(); }}
          >
            {t.nav.book}
          </button>
        </div>
      </div>
    </>
  );
}
