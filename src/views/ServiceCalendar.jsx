import React, { useState } from 'react';
import './BookingGrid.css';
import {
  format,
  startOfYear,
  endOfYear,
  addDays,
  isSameDay
} from 'date-fns';

const ServiceCalendar = () => {
 const [selectedDate, setSelectedDate] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({});
  const [selectedTime, setSelectedTime] = useState('');

  const yearStart = startOfYear(new Date());
  const yearEnd = endOfYear(new Date());

  const days = [];
  for (let d = yearStart; d <= yearEnd; d = addDays(d, 1)) {
    days.push(d);
  }

  const timeSlots = ['9AM', '10AM', '11AM', '1PM', '2PM', '3PM', '4PM'];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;

    const key = format(selectedDate, 'yyyy-MM-dd');
    const current = bookedSlots[key] || [];
    if (!current.includes(selectedTime)) {
      setBookedSlots({
        ...bookedSlots,
        [key]: [...current, selectedTime],
      });
    }

    alert(`Booked ${selectedTime} on ${key}`);
    setSelectedTime('');
    setSelectedDate(null);
  };

  return (
    <div className="calendar-wrapper">
      <h2>📅 Calendar</h2>
      <div className="calendar-grid">
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd');
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div
              key={key}
              className={`calendar-day ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedDate(day)}
            >
              <div>{format(day, 'EEE')}</div>
              <div>{format(day, 'MMM d')}</div>
              {bookedSlots[key]?.length > 0 && (
                <div className="booked-label">Booked</div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="booking-panel">
          <h3>
            Book a time for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="time-options">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                className={`time-slot ${
                  bookedSlots[format(selectedDate, 'yyyy-MM-dd')]?.includes(slot)
                    ? 'disabled'
                    : selectedTime === slot
                    ? 'selected-time'
                    : ''
                }`}
                disabled={bookedSlots[format(selectedDate, 'yyyy-MM-dd')]?.includes(slot)}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
          <button className="confirm-btn" onClick={handleBooking}>
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}

export default ServiceCalendar