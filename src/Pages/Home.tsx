import '../Apps/App.scss'
import { GlassElement } from '../Components/GlassElement/GlassElement'
import useWindowSize from '../Helpers/useWindowSize'
import inlogo from '../assets/linkedin.webp'
import patreonlogo from '../assets/patreon.webp'

function Home() {
  const { width } = useWindowSize()
  const viewportWidth = width ?? 0
  const startingPoint: number = 2010
  const currentYear: number = new Date().getFullYear()

  return (
    <div className="about-container">
      <GlassElement
        width={viewportWidth < 768 ? 300 : 450}
        height={viewportWidth < 768 ? 480 : 380}
        radius={20}
        depth={10}
        blur={1}
        chromaticAberration={1}
        debug={false}
      >
        <div className="about-content">
          <p>
            <b>animatk</b> is a creative space where software, interaction, and imagination come
            together.
          </p>
          <p>
            With over <b>{currentYear - startingPoint} years of experience in software development</b>,
            I build thoughtful digital experiences across web and mobile, blending solid engineering
            with playful design.
          </p>
          <p>This is where experiments, apps, and interactive projects live.</p>
          <p>
            Connect with me on LinkedIn for professional updates, or support ongoing work and early
            releases on Patreon.
          </p>
        </div>
      </GlassElement>

      <div className="about-links">
        <GlassElement
          width={viewportWidth < 768 ? 140 : 180}
          height={viewportWidth < 768 ? 140 : 180}
          radius={20}
          depth={10}
          blur={1}
          chromaticAberration={1}
          debug={false}
        >
          <a
            href="https://www.linkedin.com/in/alejandro-st/"
            className="about-links__anchor"
            target="_blank"
          >
            <img src={inlogo} className="about-links__image" title="Linkedin Alejandro St" />
          </a>
        </GlassElement>
        <GlassElement
          width={viewportWidth < 768 ? 140 : 180}
          height={viewportWidth < 768 ? 140 : 180}
          radius={20}
          depth={10}
          blur={1}
          chromaticAberration={1}
          debug={false}
        >
          <a
            href="https://patreon.com/animatk?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
            className="about-links__anchor"
            target="_blank"
          >
            <img
              src={patreonlogo}
              className="about-links__image about-links__image--patreon"
              title="Patreon animatk"
            />
          </a>
        </GlassElement>
      </div>
    </div>
  )
}

export default Home
