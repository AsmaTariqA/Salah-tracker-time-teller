import React from 'react';
import SalahTracker from './Components/SalahTracker';
import PrayerStatus from './Components/PrayerStatus'; // Import PrayerStatus component
import { PrayerStatusProvider } from './Components/PrayerStatusContext';
import "./App.css";

//Added LocomotiveScroll v5 for smooth scrolling and better UX.
import LocomotiveScroll from 'locomotive-scroll';
const locomotiveScroll = new LocomotiveScroll();

const App = () => {
  return (
    <PrayerStatusProvider>
      <div>
        <h1 className='heading'>Salah Time Teller and Tracker</h1>
       
        <SalahTracker />
        <PrayerStatus /> {/* Include PrayerStatus component */}
      </div>
    </PrayerStatusProvider>
  );
};

export default App;


