import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useWindowSize from '../Helpers/useWindowSize'
import { GlassElement } from '../Components/GlassElement/GlassElement'

type LegalSection = {
  title?: string
  text: string
  updated?: string
}

type LegalDoc = {
  updated?: string
  [locale: string]: LegalSection[] | string | undefined
}

type LegalData = {
  terms?: LegalDoc
  privacy?: LegalDoc
}

const BASE_VARS: Record<string, string> = {
  AppName: 'Your Little Farm™',
  storeApple: 'Apple App Store',
  storeAndroid: 'Google Play',
  legalOwner: 'Diego Alejandro Santos Santamaria',
  devbrand: 'animatk™',
  contactEmail: 'animatk@live.com',
}

const normalizeLocale = (value: string) => value.toLowerCase()

const pickLocale = (available: string[], preferred?: string) => {
  if (available.length === 0) return ''
  const candidates = []

  if (preferred) candidates.push(preferred)
  if (typeof navigator !== 'undefined') {
    candidates.push(...(navigator.languages ?? []))
    candidates.push(navigator.language)
  }

  for (const candidate of candidates) {
    if (!candidate) continue
    const exact = available.find((item) => normalizeLocale(item) === normalizeLocale(candidate))
    if (exact) return exact
    const base = candidate.split('-')[0]
    const byBase = available.find((item) => normalizeLocale(item).startsWith(base.toLowerCase()))
    if (byBase) return byBase
  }

  return available[0]
}

const buildVars = (updated: string | undefined, storeParam: string | 'apple') => ({
    ...BASE_VARS,
    updated: updated ?? '',
    store: storeParam === 'android' ? BASE_VARS.storeAndroid : BASE_VARS.storeApple  
})

const replaceVars = (input: string, vars: Record<string, string>) =>
  input.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? `{${key}}`)

function YourLittleFarm() {
  const { width } = useWindowSize()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const docParam = searchParams.get('doc')
  const storeParam = searchParams.get('store') ?? 'apple'
  const localeParam = searchParams.get('locale') ?? searchParams.get('lang') ?? undefined

  const [data, setData] = useState<LegalData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [textContainerWidth, setTextContainerWidth] = useState<number>(300)
  const [textContainerHeight, setTextContainerHeight] = useState<number>(480)

  useEffect(() => {
    console.log('Width', width)
    if (width >= 768 && width < 1024) {
      setTextContainerWidth(480)
      setTextContainerHeight(380)
    } else if (width >= 1024 && width < 1200) {
      setTextContainerWidth(640)
      setTextContainerHeight(480)
    } else if (width >= 1200) {
      setTextContainerWidth(1024)
      setTextContainerHeight(550)
    }
  }, [width])

  useEffect(() => {
    let isActive = true

    fetch('/ylf-legal.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load legal content.')
        }
        return response.json()
      })
      .then((json: LegalData) => {
        if (isActive) {
          setData(json)
          setError(null)
        }
      })
      .catch((err: Error) => {
        if (isActive) {
          setError(err.message)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  const docKey = docParam === 'privacy' ? 'privacy' : 'terms'
  const doc = data?.[docKey]
  const localeKeys = useMemo(
    () => (doc ? Object.keys(doc).filter((key) => Array.isArray(doc[key])) : []),
    [doc],
  )
  const localeKey = useMemo(() => pickLocale(localeKeys, localeParam), [localeKeys, localeParam])
  const sections = (doc && localeKey ? doc[localeKey] : []) as LegalSection[]
  const vars = useMemo(() => buildVars(doc?.updated, storeParam), [doc?.updated])

  if (error) {
    return <div>Unable to load legal content.</div>
  }

  if (!data || !doc || !localeKey) {
    return <div>Loading...</div>
  }

  const pageTitle = docKey === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'


  

  return (

    <GlassElement
            width={textContainerWidth}
            height={textContainerHeight}
            radius={20}
            depth={10}
            blur={1}
            chromaticAberration={1}
            debug={false}
          >
            <div className="ylf-legal">
              <h2>{pageTitle}</h2>
              {sections.map((section, index) => {
                const title = section.title ? replaceVars(section.title, vars) : ''
                const updated = section.updated ? replaceVars(section.updated, vars) : ''
                const text = replaceVars(section.text, vars)

                return (
                  <section className="ylf-legal__section" key={`${docKey}-${index}`}>
                    {title && <h3>{title}</h3>}
                    {updated && <p className="ylf-legal__updated">{updated}</p>}
                    <div className="ylf-legal__text" dangerouslySetInnerHTML={{ __html: text }} />
                  </section>
                )
              })}
            </div>
          </GlassElement>
    
  )
}

export default YourLittleFarm
