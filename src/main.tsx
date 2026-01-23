import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './Apps/App.tsx'
import PointerParallaxScene from './Apps/PointerParallaxScene.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
createRoot(document.getElementById('pointerParallax')!).render(
  <StrictMode>
    <PointerParallaxScene />
  </StrictMode>,
)

if (!navigator.userAgent.includes("Chrome")) {
    document.documentElement.classList.add("not-chrome");
}
