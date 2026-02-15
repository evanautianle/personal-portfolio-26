
import { Html } from '@react-three/drei'
import { Viewscreen } from '../viewscreen/Viewscreen'
import { ScreenRouter } from '../viewscreen/ScreenRouter'

// Simple frame for the main viewscreen, with a slot for the screen content
export function ViewscreenFrame({ position = [0, 1.5, 20] }) {
	// Frame colors
	const frameColor = '#2d2d2d';
	const innerColor = '#b8956e';
	// The position prop allows flexible placement
	return (
		<group position={position}>
			{/* Outer frame */}
			<mesh>
				<boxGeometry args={[4.2, 2.2, 0.18]} />
				<meshStandardMaterial color={frameColor} />
			</mesh>
			{/* Inner bevel */}
			<mesh position={[0, 0, 0.03]}>
				<boxGeometry args={[3.8, 1.8, 0.08]} />
				<meshStandardMaterial color={innerColor} />
			</mesh>
			{/* The actual viewscreen (HTML overlay) */}
			<group position={[0, 0, 0.09]}>
				<Viewscreen />
				<Html
					transform
					position={[0, 0, 0.06]}
					center
					style={{ width: 1200, height: 480, pointerEvents: 'auto' }}
				>
					<div style={{ width: '100%', height: '100%' }}>
						<ScreenRouter />
					</div>
				</Html>
			</group>
		</group>
	);
}
