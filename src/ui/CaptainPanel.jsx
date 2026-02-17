import { ControlButton } from './ControlButton'

export function CaptainPanel({ side }) {
  const spacing = 0.1
  const startY = 0.06
  const startZ = -0.12

  const buttons = [
     { label: 'Home', route: 'home' },
    { label: 'About', route: 'about' },
    { label: 'Projects', route: 'projects' },
    { label: 'Contact', route: 'contact' },
  ]

  return (
    <group>
      {buttons.map(({ label, route }, i) => (
        <ControlButton
          key={route}
          label={label}
          route={route}
          position={[0, startY - i * spacing, startZ]}
        />
      ))}
    </group>
  )
}
