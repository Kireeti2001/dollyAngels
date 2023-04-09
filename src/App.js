import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AboutUs from './components/aboutUs/AboutUs'
// import Footer from './components/footer/Footer'
// import HomeD from './components/backStars/homeStar'
// import Animals from './components/animals/Animals'
// import LandingPage from './components/landingPage/LandingPage'
import Clouds from './components/clouds/Clouds'
import ContactUs from './components/contact/ContactUs'
import GalleryCarousel from './components/gallery/Gallery'
import Header from './components/header/Header'
import HomePage from './components/home/home'
import WaveEffectLandingPage from './components/wave/waves'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<WaveEffectLandingPage/>} />
          <Route path="/home" element={<Header/>} />
          <Route path='/about' element={<AboutUs/>}/>
            <Route path="/gallery" element={<GalleryCarousel/>} />
            <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
