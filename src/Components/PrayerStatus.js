import React, { useState, useEffect } from 'react';
import { usePrayerStatus } from './PrayerStatusContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

const PrayerStatus = () => {
  const { prayerStatus, togglePrayerStatus } = usePrayerStatus();
  const [date, setDate] = useState(new Date());
  const [savedStatus, setSavedStatus] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('prayerStatus');
    if (savedData) {
      setSavedStatus(JSON.parse(savedData));
    }
  }, []);

  const onChange = (date) => {
    setDate(date);
  };

  const handleCheckboxChange = (prayer) => {
    const currentDate = date.toISOString().slice(0, 10);
    const currentStatus = savedStatus[currentDate] || {};
    const newStatus = {
      ...savedStatus,
      [currentDate]: {
        ...currentStatus,
        [prayer]: !currentStatus[prayer],
      },
    };
    setSavedStatus(newStatus);
    localStorage.setItem('prayerStatus', JSON.stringify(newStatus));
  };

  const getPrayerCount = (date) => {
    const currentDate = date.toISOString().slice(0, 10);
    const currentStatus = savedStatus[currentDate] || {};
    return Object.values(currentStatus).filter((prayed) => prayed).length;
  };

  const tileContent = ({ date }) => {
    const prayedCount = getPrayerCount(date);
    const classNames = [
      'tile-content',
      prayedCount === 0 ? 'light-gray' :
      prayedCount >= 1 && prayedCount <= 2 ? 'light-orange' :
      prayedCount >= 3 && prayedCount <= 4 ? 'medium-orange' :
      prayedCount === 5 ? 'dark-orange' : ''
    ];
    return <div className={classNames.join(' ')}>{prayedCount}</div>;
  };

  return (
    <div className="prayer-status">
      <h2 className='prayer-heading'>Prayer Status</h2>
      <Calendar className="react-calender"
  onChange={onChange}
  value={date}
  tileContent={tileContent}

/>

      <ul className='prayer-list'>
        <h2>Salah tracker</h2>
       <li >
          Fajr:
          <input
            type="checkbox"
            checked={savedStatus[date.toISOString().slice(0, 10)]?.Fajr || false}
            onChange={() => handleCheckboxChange('Fajr')}
          />
        </li>
        <li>
          Dhuhr:
          <input
            type="checkbox"
            checked={savedStatus[date.toISOString().slice(0, 10)]?.Dhuhr || false}
            onChange={() => handleCheckboxChange('Dhuhr')}
          />
        </li>
        <li>
          Asr:
          <input
            type="checkbox"
            checked={savedStatus[date.toISOString().slice(0, 10)]?.Asr || false}
            onChange={() => handleCheckboxChange('Asr')}
          />
        </li>
        <li>
          Maghrib:
          <input
            type="checkbox"
            checked={savedStatus[date.toISOString().slice(0, 10)]?.Maghrib || false}
            onChange={() => handleCheckboxChange('Maghrib')}
          />
        </li>
        <li>
          Isha:
          <input
            type="checkbox"
            checked={savedStatus[date.toISOString().slice(0, 10)]?.Isha || false}
            onChange={() => handleCheckboxChange('Isha')}
          />
        </li>
        </ul> 
    </div>
  );
};

export default PrayerStatus;
