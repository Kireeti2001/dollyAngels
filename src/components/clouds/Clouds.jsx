import React from 'react'
import { useNavigate } from 'react-router-dom'
import './clouds.css'

export default function Clouds() {
  let nav = useNavigate()
  return (
    <>
      <div className="hero">
        <p className="text-center">DOLLY ANGELS SCHOOL </p>
        <div className="heroClouds"></div>
        <button  className='cloudBtn' type="button" onClick={() => nav('/home')}>
          Enter
        </button>
      </div>
    </>
  )
}
