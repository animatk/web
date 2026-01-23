import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import YourLittleFarm from '../Pages/YourLittleFarm'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/your-little-farm" element={<YourLittleFarm />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App
