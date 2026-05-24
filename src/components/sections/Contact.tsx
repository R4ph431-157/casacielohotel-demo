import { useLanguage } from '../../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const c = t.home.contact;

  return (
    <section id="contact" className="visit">
      <div className="visit-grid">
        <div className="visit-brand">
          <h2 className="display">
            La Casa Cielo
            <small>{c.subtitle}</small>
          </h2>
          <p>{c.lead}</p>
        </div>

        <div className="visit-block">
          <h5 className="address-heading">
            <svg className="loc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22C12 22 4.5 15 4.5 9a7.5 7.5 0 0 1 15 0c0 6-7.5 13-7.5 13z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {c.address.title}
          </h5>
          {c.address.lines.map(line => <p key={line}>{line}</p>)}
          <a
            className="directions-link"
            href="https://www.google.com/maps/search/Hotel+La+Casa+Cielo+Fidjrosse+Plage+Cotonou+Benin"
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.address.directions}
          </a>
        </div>

        <div className="visit-block">
          <h5>{c.reservations.title}</h5>
          <a href="tel:+22967867272">+229 67 86 72 72</a>
          <a href="mailto:reservations@casacielohotel.com">
            reservations@<br />casacielohotel.com
          </a>
          <a
            href="https://wa.me/22967867272"
            style={{ color: 'var(--gold-light)', marginTop: '8px' }}
          >
            {c.reservations.whatsapp}
          </a>
        </div>

        <div className="visit-block">
          <h5>{c.hours.title}</h5>
          {c.hours.lines.map(line => <p key={line}>{line}</p>)}
        </div>
      </div>

      <div className="footer-bottom">
        <div>{c.copyright}</div>
        <div className="socials">
          <a href="#">{c.socials.facebook}</a>
          <a href="#">{c.socials.instagram}</a>
          <a href="#">{c.socials.tripadvisor}</a>
        </div>
      </div>
    </section>
  );
}
