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
    fontSize: 72,
    fontWeight: 900,
    color: '#e87d2f',
    marginBottom: 48,
    letterSpacing: 4,
    textTransform: 'uppercase',
    textShadow: '0 4px 32px #000a, 0 1px 0 #fff2',
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
      <div style={titleStyle}>{label}</div>
      <SectionComponent />
    </div>
  );
}
