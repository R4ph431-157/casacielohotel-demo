import { useLanguage } from '../context/LanguageContext';
import PageFooter from '../components/layout/PageFooter';

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.home.contact;

  return (
    <>
      <div className="page-hero">
        <span className="sec-eyebrow">{c.reservations.title}</span>
        <h1 className="sec-title display">
          La Casa <span className="it">Cielo.</span>
        </h1>
        <p className="page-hero-lead">{c.lead}</p>
      </div>

      <section className="visit" style={{ padding: '100px 56px 80px' }}>
        <div className="visit-grid">
          <div className="visit-brand">
            <h2 className="display">
              La Casa Cielo
              <small>{c.subtitle}</small>
            </h2>
            <p>{c.lead}</p>
          </div>

          <div className="visit-block">
            <h5>{c.address.title}</h5>
            {c.address.lines.map(line => <p key={line}>{line}</p>)}
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
      </section>

      <PageFooter />
    </>
  );
}
