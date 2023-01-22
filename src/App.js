import React from 'react'
import { BrowserRouter } from "react-router-dom"
import { Routers } from './routes'
import "./App.scss"
const App = () => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  )
}

export default App