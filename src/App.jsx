import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pokemons from './components/pokemons/pokemons'

function App() {

  return (
    <div className='main-container'>
      < Pokemons />
    </div>
  )
}

export default App
