import { forwardRef, ReactNode } from 'react'

interface PaperProps {
  children?: ReactNode
}

const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper({ children }, scrollRef) {
  const yPositions = [120, 200, 280, 360, 440, 520]

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── SVG de fundo: papel com ornamentos florais ── */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        viewBox="0 0 420 640"
        preserveAspectRatio="none"
      >
        {/* Fundo pergaminho */}
        <rect x="0" y="0" width="420" height="640"
          rx="4" ry="4"
          fill="#fdf6e8"
          stroke="#d4b483"
          strokeWidth="1.5"
        />

        {/* Vinheta interna suave */}
        <rect x="0" y="0" width="420" height="640"
          rx="4" ry="4"
          fill="none"
          stroke="#c9a96e"
          strokeWidth="8"
          strokeOpacity="0.10"
        />

        {/* Linhas decorativas horizontais */}
        <line x1="28" y1="68" x2="392" y2="68"
          stroke="#c9848a" strokeWidth="0.7" strokeOpacity="0.45"
        />
        <line x1="28" y1="72" x2="392" y2="72"
          stroke="#c9848a" strokeWidth="0.3" strokeOpacity="0.25"
        />
        <line x1="28" y1="568" x2="392" y2="568"
          stroke="#c9848a" strokeWidth="0.7" strokeOpacity="0.45"
        />
        <line x1="28" y1="572" x2="392" y2="572"
          stroke="#c9848a" strokeWidth="0.3" strokeOpacity="0.25"
        />

        {/* Ornamento de canto — função inline via array */}
        {([
          [14, 14, 1, 1],
          [406, 14, -1, 1],
          [14, 626, 1, -1],
          [406, 626, -1, -1],
        ] as [number, number, number, number][]).map(([cx, cy, sx, sy], i) => (
          <g key={i} transform={`translate(${cx}, ${cy}) scale(${sx}, ${sy})`} opacity="0.6">
            <circle cx="0" cy="0" r="3" fill="#c9848a" />
            <ellipse cx="11" cy="-4" rx="6" ry="2.5" fill="#c9848a" transform="rotate(-30)" />
            <ellipse cx="-4" cy="11" rx="6" ry="2.5" fill="#c9848a" transform="rotate(60)" />
            <ellipse cx="13" cy="5" rx="4.5" ry="2" fill="#8b3a42" transform="rotate(-10)" />
            <ellipse cx="5" cy="13" rx="4.5" ry="2" fill="#8b3a42" transform="rotate(80)" />
            <circle cx="9" cy="9" r="2" fill="#d4b483" />
            {/* Hastes */}
            <line x1="0" y1="0" x2="8" y2="-6" stroke="#c9848a" strokeWidth="0.7" strokeOpacity="0.6" />
            <line x1="0" y1="0" x2="-6" y2="8" stroke="#c9848a" strokeWidth="0.7" strokeOpacity="0.6" />
            <line x1="0" y1="0" x2="11" y2="3" stroke="#8b3a42" strokeWidth="0.5" strokeOpacity="0.5" />
          </g>
        ))}

        {/* Florzinhas laterais */}
        {yPositions.map((y) => (
          <g key={y}>
            {/* Esquerda */}
            <circle cx="10" cy={y} r="2.2" fill="#c9848a" opacity="0.38" />
            <ellipse cx="10" cy={y - 8} rx="3.5" ry="1.6" fill="#c9848a" opacity="0.22" />
            <ellipse cx="10" cy={y + 8} rx="3.5" ry="1.6" fill="#c9848a" opacity="0.22" />
            <circle cx="10" cy={y} r="1" fill="#d4b483" opacity="0.5" />
            {/* Direita */}
            <circle cx="410" cy={y} r="2.2" fill="#c9848a" opacity="0.38" />
            <ellipse cx="410" cy={y - 8} rx="3.5" ry="1.6" fill="#c9848a" opacity="0.22" />
            <ellipse cx="410" cy={y + 8} rx="3.5" ry="1.6" fill="#c9848a" opacity="0.22" />
            <circle cx="410" cy={y} r="1" fill="#d4b483" opacity="0.5" />
          </g>
        ))}

        {/* Pequeno motivo central superior */}
        <g transform="translate(210, 40)" opacity="0.45">
          <circle cx="0" cy="0" r="2.5" fill="#8b3a42" />
          <ellipse cx="-10" cy="0" rx="5" ry="2" fill="#c9848a" />
          <ellipse cx="10" cy="0" rx="5" ry="2" fill="#c9848a" />
          <ellipse cx="0" cy="-8" rx="2" ry="4.5" fill="#c9848a" />
          <circle cx="0" cy="0" r="1.2" fill="#fdf6e8" />
        </g>

        {/* Pequeno motivo central inferior */}
        <g transform="translate(210, 600)" opacity="0.45">
          <circle cx="0" cy="0" r="2.5" fill="#8b3a42" />
          <ellipse cx="-10" cy="0" rx="5" ry="2" fill="#c9848a" />
          <ellipse cx="10" cy="0" rx="5" ry="2" fill="#c9848a" />
          <ellipse cx="0" cy="8" rx="2" ry="4.5" fill="#c9848a" />
          <circle cx="0" cy="0" r="1.2" fill="#fdf6e8" />
        </g>
      </svg>

      {/* ── Área de conteúdo scrollável sobre o SVG ── */}
      <div
        ref={scrollRef}
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          overflowY: 'auto',
          padding: '4.5rem 3rem 4rem',
          boxSizing: 'border-box',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none' as React.CSSProperties['msOverflowStyle'],
        }}
      >
        {children}
      </div>
    </div>
  )
})

Paper.displayName = 'Paper'
export default Paper