import React from 'react';
import './waves.css';
import {  useNavigate } from 'react-router-dom';

function WaveEffectLandingPage() {
    let navigate = useNavigate();
    const handleClick=()=>{
        navigate("/home");
    }


  return (
    <div className="wave-effect-landing-page">
         <div className="content-container">
      <h1>Welcome to DOLLY ANGELS</h1>
      <p>Learn, Grow, and Excel with Us!</p>
      <button onClick={handleClick}>Enter</button>
    </div>
    <div className="wave-container">
      <div className="wave"></div>
      <div className="wave wave2"></div>
    </div>
  </div>
  );
}

export default WaveEffectLandingPage;