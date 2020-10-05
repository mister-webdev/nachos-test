import React from 'react'
import { Hero } from './components/Hero'
import { Winners } from './components/Winners'
import { Footer } from './components/Footer'
import './App.css'

export const App = () => {
  return (
    <div className="App">
      <Hero />
      <Winners />
      <Footer />
    </div>
  )
}
