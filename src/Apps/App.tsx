import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import { GlassElement } from '../Components/GlassElement/GlassElement'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GlassElement
            width={320}
            height={200}
            radius={20}
            depth={10}
            blur={1}
            chromaticAberration={1}
            debug={false}>
      <h2>Site under construction. </h2>
      <p>Let's follow the development process on Github: </p>
      <a href="https://github.com/animatk/web" target="_blank">
        GitHub.com/animatk
      </a>
      </GlassElement>
    </>
  )
}

export default App
