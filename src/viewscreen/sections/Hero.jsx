export function Hero() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 8, color: '#fff' }}>
        Captain's Log
      </h1>
      <p style={{ fontSize: 14, opacity: 0.9 }}>
        Personal portfolio — Star Trek Bridge
      </p>
    </div>
  )
}
