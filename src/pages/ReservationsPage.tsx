import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageFooter from '../components/layout/PageFooter';
import { useLanguage } from '../context/LanguageContext';

export default function ReservationsPage() {
  const { t } = useLanguage();
  const r = t.reservations;
  const f = r.form;
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    arrival: params.get('arrival') ?? '',
    departure: params.get('departure') ?? '',
    guests: params.get('guests') ?? f.guestsOptions[1],
    room: params.get('room') ?? f.roomOptions[0],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setForm(prev => ({
      ...prev,
      arrival: p.get('arrival') ?? prev.arrival,
      departure: p.get('departure') ?? prev.departure,
      guests: p.get('guests') ?? prev.guests,
      room: p.get('room') ?? prev.room,
    }));
  }, [location.search]);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div className="reservations-hero">
        <span className="sec-eyebrow">{r.eyebrow}</span>
        <h1 className="sec-title display">
          {r.title1} <span className="it">{r.titleItalic}</span>
        </h1>
        <p className="page-hero-lead">{r.lead}</p>
      </div>

      <div className="reservations-form-section">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <span className="sec-eyebrow">{f.successTitle}</span>
            <p style={{ fontSize: '18px', color: 'var(--ink-soft)', marginTop: '16px', lineHeight: 1.8 }}>
              {f.successMsg}
            </p>
          </div>
        ) : (
          <form className="reservations-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>{f.firstName}</label>
              <input type="text" required value={form.firstName} onChange={update('firstName')} />
            </div>
            <div className="form-field">
              <label>{f.lastName}</label>
              <input type="text" required value={form.lastName} onChange={update('lastName')} />
            </div>
            <div className="form-field">
              <label>{f.email}</label>
              <input type="email" required value={form.email} onChange={update('email')} />
            </div>
            <div className="form-field">
              <label>{f.phone}</label>
              <input type="tel" value={form.phone} onChange={update('phone')} />
            </div>
            <div className="form-field">
              <label>{f.arrival}</label>
              <input type="date" required value={form.arrival} onChange={update('arrival')} />
            </div>
            <div className="form-field">
              <label>{f.departure}</label>
              <input type="date" required value={form.departure} onChange={update('departure')} />
            </div>
            <div className="form-field">
              <label>{f.guests}</label>
              <select value={form.guests} onChange={update('guests')}>
                {f.guestsOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label>{f.room}</label>
              <select value={form.room} onChange={update('room')}>
                {f.roomOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="form-field full">
              <label>{f.message}</label>
              <textarea rows={4} value={form.message} onChange={update('message')} />
            </div>
            <div className="form-field full">
              <button type="submit" className="form-submit">{f.submit}</button>
            </div>
          </form>
        )}
      </div>

      <PageFooter />
    </>
  );
}
