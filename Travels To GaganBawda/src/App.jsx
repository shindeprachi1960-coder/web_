import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import SubviewPoints from "./pages/SubviewPoints"
import Booking from "./pages/Booking"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/subviewpoints" element={<SubviewPoints />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;