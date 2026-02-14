import { useAtomValue } from 'jotai'
import { navigationAtom } from '../state/navigationAtom'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'

export function ScreenRouter() {
  const route = useAtomValue(navigationAtom)

  switch (route) {
    case 'about':
      return <About />
    case 'projects':
      return <Projects />
    case 'contact':
      return <Contact />
    case 'hero':
    default:
      return <Hero />
  }
}
