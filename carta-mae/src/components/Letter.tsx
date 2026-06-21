import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LetterText from './LetterText'
import Paper from './Paper'

type Stage = 'sealed' | 'opening' | 'rising' | 'reading'

export default function Letter() {
  const [stage, setStage] = useState<Stage>('sealed')
  const scrollRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/assets/photograph.mpeg')
    audio.loop = false
    audio.volume = 0.55
    audioRef.current = audio
    return () => { audio.pause(); audio.src = '' }
  }, [])

  // Para a música quando scroll chega ao fim do conteúdo
  useEffect(() => {
    if (stage !== 'reading') return
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const atBottom = scrollTop + clientHeight >= scrollHeight - 20 // 20px de margem
      if (atBottom && audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [stage])

  function handleSealClick() {
    audioRef.current?.play().catch(() => {})
    setStage('opening')
    setTimeout(() => setStage('rising'), 600)
    setTimeout(() => setStage('reading'), 2000)
  }

  const envelopeImg = stage === 'sealed' ? '/assets/carta-fechada.png' : '/assets/carta-vazia.png'

  return (
    <div className="relative flex items-center justify-center overflow-hidden" style={{ width: '100vw', height: 680 }}>

      {/* ── TEXTOS "Para Carolina" e "Clique para abrir" ── */}
      <AnimatePresence>
        {stage === 'sealed' && (
          <motion.div
            key="texts"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 z-[35] flex flex-col items-center pointer-events-none"
          >
            <div className="mt-20 text-center">
              <p className="text-base tracking-[0.15em] text-[#fdf8f0] opacity-85 mb-1">Para</p>
              <p className="text-[#fdf8f0] font-title m-0 text-[2.4rem]"> Carolina </p>
            </div>
            <p className="absolute bottom-8 italic text-[#fdf8f0]  opacity-75 tracking-[0.08em] text-[0.95rem]">Clique para abrir a carta </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ENVELOPE FUNDO ── */}
      {stage !== 'reading' && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <img src={envelopeImg} alt="envelope fundo" className="w-full h-full object-contain" />
        </div>
      )}

      {/* ── PAPEL ── */}
      <AnimatePresence>
        {(stage === 'opening' || stage === 'rising' || stage === 'reading') && (
          <motion.div
            key="paper-container"
            initial={
              stage === 'rising'
                ? { y: -110, scale: 0.62, opacity: 1, x: '-50%' }
                : { y: 95, scale: 0.58, opacity: 1, x: '-50%' }
            }
            animate={
              stage === 'rising'
                ? { y: [95, -110, 40], scale: 0.62, opacity: 1 }
                : stage === 'reading'
                ? { y: -20, scale: 1, opacity: 1, zIndex: 50 }
                : { y: 95, scale: 0.58, opacity: 1, zIndex: 15 }
            }
            transition={{ duration: stage === 'rising' ? 1.4 : 0.5, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: 'absolute',
              top: stage === 'reading' ? '3%' : '15%',
              left: '50%',
              width: stage === 'reading' ? '85vw' : 340,
              height: stage === 'reading' ? '100vh' : 460,
              transformOrigin: 'center center',
              zIndex: stage === 'opening' ? 15 : 50,
              clipPath: stage === 'opening' ? 'inset(0px -150px 95px -150px)' : 'none',
            }}
          >
            <Paper ref={scrollRef}>
              <AnimatePresence>
                {stage === 'reading' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <LetterText scrollContainer={scrollRef} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ENVELOPE ABA FRENTE ── */}
      {stage !== 'reading' && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ clipPath: 'inset(62% 0px 0px 0px)' }}
        >
          <img src={envelopeImg} alt="envelope frente" className="w-full h-full object-contain" />
        </div>
      )}

      {/* ── LACRE ── */}
      <AnimatePresence>
        {stage === 'sealed' && (
          <motion.button
            key="seal"
            initial={{ scale: 1, x: '-50%' }}
            whileHover={{ scale: 1.12, x: '-50%' }}
            whileTap={{ scale: 0.88, x: '-50%' }}
            exit={{ scale: 0, rotate: 180, opacity: 0, transition: { duration: 0.45 } }}
            onClick={handleSealClick}
            className="absolute cursor-pointer bg-transparent border-0 p-0 z-30"
            style={{ bottom: '28%', left: '50%' }}
          >
            <img src="/assets/cera.png" alt="lacre" className="w-[84px] h-[84px] object-contain" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}