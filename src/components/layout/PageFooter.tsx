import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const QUICK_LINK_PATHS = ['/', '/about', '/rooms', '/services', '/gallery', '/contact'];

export default function PageFooter() {
  const { t } = useLanguage();
  const { copyright, socials, aboutUs, quickLinks } = t.pageFooter;

  return (
    <footer className="page-footer">
      <div className="page-footer-body">

        {/* Brand */}
        <div className="pf-brand">
          <div className="pf-logo">La Casa Cielo</div>
          <p className="pf-tagline">Hôtel · Fidjrossè · Cotonou</p>
          <div className="pf-socials">
            <a href="#" className="pf-social-link">{socials.facebook}</a>
            <a href="#" className="pf-social-link">{socials.instagram}</a>
            <a href="#" className="pf-social-link">{socials.tripadvisor}</a>
          </div>
        </div>

        {/* About Us */}
        <div className="pf-col">
          <h4 className="pf-col-title">{aboutUs.title}</h4>
          <p className="pf-col-text">{aboutUs.text}</p>
        </div>

        {/* Quick links */}
        <div className="pf-col">
          <h4 className="pf-col-title">{quickLinks.title}</h4>
          <ul className="pf-links">
            {quickLinks.links.map((label, i) => (
              <li key={i}>
                <Link to={QUICK_LINK_PATHS[i]} className="pf-link">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="page-footer-bottom">
        <span>{copyright}</span>
      </div>
    </footer>
  );
}
