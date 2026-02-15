import { useAtomValue } from 'jotai'
import { navigationAtom } from '../state/navigationAtom'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'

export function ScreenRouter() {
  const route = useAtomValue(navigationAtom);

  let SectionComponent;
  let label;
  switch (route) {
    case 'about':
      SectionComponent = About;
      label = 'About';
      break;
    case 'projects':
      SectionComponent = Projects;
      label = 'Projects';
      break;
    case 'contact':
      SectionComponent = Contact;
      label = 'Contact';
      break;
    case 'hero':
    default:
      SectionComponent = Hero;
      label = 'Hero';
      break;
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        style={{
          textAlign: 'center',
          fontSize: 72,
          fontWeight: 900,
          color: '#e87d2f',
          marginBottom: 48,
          letterSpacing: 4,
          textTransform: 'uppercase',
          textShadow: '0 4px 32px #000a, 0 1px 0 #fff2',
          lineHeight: 1.1,
          userSelect: 'none',
        }}
      >
        {label}
      </div>
      <SectionComponent />
    </div>
  );
}
