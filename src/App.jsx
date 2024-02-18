import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Navigation from './Navigation'
import Home from './Home'
import { Link } from 'react-router-dom'

function App() {
 

  return (
    <div id = "grid-container">
      <Navigation/>
    </div>
  )
}

export default App
