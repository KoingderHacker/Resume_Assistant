// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ResumeAssistant from "./pages/ResumeAssistant"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant" element={<ResumeAssistant />} />
      </Routes>
    </Router>
  )
}
