import { useState } from 'react'
import GameManager from './components/getTo100Components/GameManager'
import TextEditor from './components/textEditorComponents/TextEditor'
import './App.css'

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null)

  const renderComponent = () => {
    if (selectedComponent === 'gameManager') {
      return (
        <>
          <GameManager />
          <button onClick={() => setSelectedComponent(null)}>Back</button>
        </>
      )
    }
    if (selectedComponent === 'textEditor') {
      return (
        <>
          <TextEditor />
          <button onClick={() => setSelectedComponent(null)}>Back</button>
        </>
      )
    }
    return (
      <div className="button-container">
        <button onClick={() => setSelectedComponent('gameManager')}>Game Manager</button>
        <button onClick={() => setSelectedComponent('textEditor')}>Text Editor</button>
      </div>
    )
  }

  return (
    <div className="App">
      {renderComponent()}
    </div>
  )
}  

export default App
