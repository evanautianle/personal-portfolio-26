import { useAtomValue } from 'jotai';
import { navigationAtom } from '../state/navigationAtom';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

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

  const titleStyle = {
    textAlign: 'center',
    fontSize: 120, // sized up
    fontWeight: 900,
    color: '#e87d2f',
    marginBottom: 64,
    letterSpacing: 6,
    textTransform: 'uppercase',
    textShadow: '0 6px 48px #000a, 0 2px 0 #fff2',
    lineHeight: 1.1,
    userSelect: 'none',
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10, // ensure it's above the canvas
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto', // allow clicks
      }}
    >
      <SectionComponent />
    </div>
  );
}
