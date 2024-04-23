import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<Game />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
