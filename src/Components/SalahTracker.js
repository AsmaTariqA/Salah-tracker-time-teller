import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "../App.css";

const SalahTracker = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [salahTimes, setSalahTimes] = useState(null);
  const [fetching, setFetching] = useState(false);

  const fetchData = async () => {
    setFetching(true);
    const response = await axios.get('http://api.aladhan.com/v1/timingsByCity', {
      params: {
        city: city,
        country: country,
        method: '2'
      }
    });
    setSalahTimes(response.data.data.timings);
    setFetching(false);
  };

  const handleButtonClick = () => {
    if (city && country) {
      fetchData();
    }
  };

  const convertSalahTimesToChartData = (salahTimes) => {
    return {
      labels: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
      datasets: [
        {
          data: [
            salahTimes.Fajr.split(':').reduce((acc, val) => 60 * acc + +val),
            salahTimes.Dhuhr.split(':').reduce((acc, val) => 60 * acc + +val),
            salahTimes.Asr.split(':').reduce((acc, val) => 60 * acc + +val),
            salahTimes.Maghrib.split(':').reduce((acc, val) => 60 * acc + +val),
            salahTimes.Isha.split(':').reduce((acc, val) => 60 * acc + +val)
          ],
          backgroundColor: [
            'rgba(255, 165, 0, 0.6)', // Fajr
            'rgba(255, 140, 0, 0.6)', // Dhuhr
            'rgba(255, 127, 80, 0.6)', // Asr
            'rgba(255, 99, 71, 0.6)', // Maghrib
            'rgba(255, 69, 0, 0.6)' // Isha
          ],
          hoverBackgroundColor: [
            'rgba(255, 165, 0, 1)', // Fajr
            'rgba(255, 140, 0, 1)', // Dhuhr
            'rgba(255, 127, 80, 1)', // Asr
            'rgba(255, 99, 71, 1)', // Maghrib
            'rgba(255, 69, 0, 1)' // Isha
          ]
        }
      ]
    };
  };
  
  return (
    <div className="salah-tracker">
      <input
        type="text"
        className="city-input"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        className="country-input"
        placeholder="Enter country name"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button className="enter-button" onClick={handleButtonClick} disabled={fetching}>
        {fetching ? 'Fetching...' : 'Enter'}
      </button>
      {salahTimes && (
        <div className="salah-times">
          <h2>Salah Times for Today</h2>
          <p>City: {city}</p>
          <p>Country: {country}</p>
          <ul>
            <li>Fajr: {salahTimes.Fajr}</li>
            <li>Dhuhr: {salahTimes.Dhuhr}</li>
            <li>Asr: {salahTimes.Asr}</li>
            <li>Maghrib: {salahTimes.Maghrib}</li>
            <li>Isha: {salahTimes.Isha}</li>
          </ul>
          <Chart type="pie" data={convertSalahTimesToChartData(salahTimes)} />
        </div>
      )}
    </div>
  );
};

export default SalahTracker;




