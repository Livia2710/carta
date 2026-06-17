import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Definindo a estrutura de uma memória para o TypeScript
interface Memory {
  date: string
  title: string
  body: string
  image: string
  imageCaption: string
}

// ─────────────────────────────────────────────
// EDITE AQUI — sua linha do tempo
// ─────────────────────────────────────────────
const memories: Memory[] = [
  {
    date: '1998',
    title: 'Onde tudo começou',
    body: 'Você sempre contou que naquele dia chovia muito. Mas pra você, dizem, o sol apareceu assim que me viu pela primeira vez.',
    image: '/assets/fotos/foto1.jpg',
    imageCaption: 'O começo de tudo',
  },
  {
    date: '2005',
    title: 'As tardes na cozinha',
    body: 'O cheiro do seu bolo de laranja ainda é o cheiro de casa. Eu ficava no banco esperando a massa sobrar pra lamber a colher.',
    image: '/assets/fotos/foto2.jpg',
    imageCaption: 'A cozinha que era nosso world',
  },
  {
    date: '2012',
    title: 'Quando precisei mais de você',
    body: 'Você não disse uma palavra. Só me abraçou. E foi suficiente. Sempre foi.',
    image: '/assets/fotos/foto3.jpg',
    imageCaption: 'Força que vem de você',
  },
  {
    date: 'Hoje',
    title: 'O que eu quero que você saiba',
    body: 'Que eu te admiro. Que eu aprendo com você todo dia. Que nenhum presente vai traduzir o que você representa — mas eu tento assim mesmo.\n\nFeliz aniversário, mãe.',
    image: '/assets/fotos/foto4.jpg',
    imageCaption: 'Nós, agora',
  },
]

// ─────────────────────────────────────────────
// Animação de entrada por scroll
// ─────────────────────────────────────────────
interface FadeInWhenVisibleProps {
  children: React.ReactNode
  delay?: number
}

function FadeInWhenVisible({ children, delay = 0 }: FadeInWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Separador floral SVG
// ─────────────────────────────────────────────
function FloralDivider() {
  return (
    <div style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--rose-400)', opacity: 0.7, fontSize: '1.2rem', letterSpacing: '0.5rem' }}>
      ✦ ❀ ✦
    </div>
  )
}

// ─────────────────────────────────────────────
// Foto estilo polaroid
// ─────────────────────────────────────────────
interface PolaroidProps {
  src: string
  caption?: string
}

function Polaroid({ src, caption }: PolaroidProps) {
  if (!src) return null

  return (
    <div style={{
      background: 'rgba(255,255,255,0.85)',
      padding: '12px 12px 40px',
      boxShadow: 'var(--shadow-md)',
      maxWidth: 280,
      margin: '1.5rem auto',
      transform: 'rotate(-1.5deg)',
    }}>
      <img
        src={src}
        alt={caption || ''}
        style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
      />
      {caption && (
        <p style={{
          fontFamily: 'var(--font-title)',
          fontSize: '1rem',
          color: 'var(--ink-400)',
          textAlign: 'center',
          marginTop: 8,
        }}>
          {caption}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// Item da linha do tempo
// ─────────────────────────────────────────────
interface MemoryItemProps {
  memory: Memory
  index: number
}

function MemoryItem({ memory, index }: MemoryItemProps) {
  const isLast = index === memories.length - 1

  return (
    <FadeInWhenVisible delay={0.1}>
      <div style={{ marginBottom: '3rem' }}>

        {/* Data */}
        <FadeInWhenVisible delay={0.15}>
          <p style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.1rem',
            color: 'var(--rose-400)',
            marginBottom: '0.25rem',
            letterSpacing: '0.08em',
          }}>
            {memory.date}
          </p>
        </FadeInWhenVisible>

        {/* Título */}
        <FadeInWhenVisible delay={0.2}>
          <h2 style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '1.35rem',
            color: 'var(--ink-700)',
            marginBottom: '0.75rem',
            fontStyle: 'italic',
          }}>
            {memory.title}
          </h2>
        </FadeInWhenVisible>

        {/* Foto polaroid */}
        <FadeInWhenVisible delay={0.25}>
          <Polaroid src={memory.image} caption={memory.imageCaption} />
        </FadeInWhenVisible>

        {/* Corpo do texto */}
        <FadeInWhenVisible delay={0.3}>
          {memory.body.split('\n\n').map((paragraph: string, i: number) => (
            <p key={i} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              lineHeight: 1.9,
              color: isLast ? 'var(--ink-700)' : 'var(--ink-400)',
              fontWeight: isLast ? 400 : 300,
              marginBottom: '1rem',
            }}>
              {paragraph}
            </p>
          ))}
        </FadeInWhenVisible>

        {/* Separador */}
        {!isLast && <FloralDivider />}
      </div>
    </FadeInWhenVisible>
  )
}

// ─────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────
export default function LetterText() {
  return (
    <div style={{
      maxWidth: 560,
      width: '100%',
      padding: '5rem 2.5rem 6rem',
      boxSizing: 'border-box',
    }}>

      {/* Saudação inicial */}
      <FadeInWhenVisible>
        <p className='font-title'>
          Mãe querida,
        </p>
      </FadeInWhenVisible>

      {/* Memórias */}
      {memories.map((memory: Memory, index: number) => (
        <MemoryItem key={index} memory={memory} index={index} />
      ))}

      {/* Assinatura */}
      <FadeInWhenVisible delay={0.2}>
        <div style={{ textAlign: 'right', marginTop: '2rem' }}>
          <p style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.6rem',
            color: 'var(--ink-700)',
            fontStyle: 'italic',
          }}>
            Com todo o meu amor,
          </p>
          <p style={{
            fontFamily: 'var(--font-title)',
            fontSize: '2rem',
            color: 'var(--rose-700)',
            marginTop: '0.5rem',
          }}>
            Seu filho(a) 🌸
          </p>
        </div>
      </FadeInWhenVisible>

    </div>
  )
}
