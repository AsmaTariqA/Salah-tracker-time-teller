import React, { createContext, useContext, useState } from 'react';

const PrayerStatusContext = createContext();

export const usePrayerStatus = () => {
  return useContext(PrayerStatusContext);
};

export const PrayerStatusProvider = ({ children }) => {
  const [prayerStatus, setPrayerStatus] = useState({
    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false
  });

  const togglePrayerStatus = (prayer) => {
    setPrayerStatus({ ...prayerStatus, [prayer]: !prayerStatus[prayer] });
  };

  return (
    <PrayerStatusContext.Provider value={{ prayerStatus, togglePrayerStatus }}>
      {children}
    </PrayerStatusContext.Provider>
  );
};



