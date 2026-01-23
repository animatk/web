import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.scss'
import App from './Apps/App.tsx'
import PointerParallaxScene from './Apps/PointerParallaxScene.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
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
