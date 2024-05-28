import { useState } from 'react'
import GameManager from './componnents/GameManager'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GameManager/>
    </>
  )
}  

export default App
