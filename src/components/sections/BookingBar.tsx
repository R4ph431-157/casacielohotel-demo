import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const BOOKING_URL = 'https://live.ipms247.com/booking/book-rooms-hotellacasacielo';

export default function BookingBar() {
  const { t } = useLanguage();
  const b = t.home.booking;

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [arrival, setArrival] = useState(today);
  const [departure, setDeparture] = useState(tomorrow);
  const [guests, setGuests] = useState(b.guestsOptions[1]);
  const [room, setRoom] = useState(b.roomOptions[0]);

  const handleCheck = () => {
    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="booking" className="booking-bar">
      <div className="booking-field">
        <label>{b.arrival}</label>
        <input type="date" value={arrival} min={today} onChange={e => setArrival(e.target.value)} />
      </div>
      <div className="booking-field">
        <label>{b.departure}</label>
        <input type="date" value={departure} min={arrival} onChange={e => setDeparture(e.target.value)} />
      </div>
      <div className="booking-field">
        <label>{b.guests}</label>
        <select value={guests} onChange={e => setGuests(e.target.value)}>
          {b.guestsOptions.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="booking-field">
        <label>{b.room}</label>
        <select value={room} onChange={e => setRoom(e.target.value)}>
          {b.roomOptions.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
      <button className="book-now" onClick={handleCheck}>
        {b.checkAvailability}
      </button>
    </div>
  );
}
