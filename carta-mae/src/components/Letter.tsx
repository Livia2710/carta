import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LetterText from './LetterText'
import Paper from './Paper'

type Stage = 'sealed' | 'opening' | 'rising' | 'reading'

export default function Letter() {
  const [stage, setStage] = useState<Stage>('sealed')
  const scrollRef = useRef<HTMLDivElement>(null)

  function handleSealClick() {
    setStage('opening')
    setTimeout(() => setStage('rising'), 600) 
    setTimeout(() => setStage('reading'), 2000)  
  }

  const envelopeImg = stage === 'sealed' ? '/assets/carta-fechada.png' : '/assets/carta-vazia.png'

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ width: '100vw', height: 680 }}
    >
      {/* ── 1. ENVELOPE (FUNDO) ── */}
      {stage !== 'reading' && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <img src={envelopeImg} alt="envelope fundo" className="w-full h-full object-contain" />
        </div>
      )}

      {/* ── 2. O PAPEL (Totalmente escondido no bolso no início -> Sobe -> Zoom) ── */}
      <AnimatePresence>
        {(stage === 'opening' || stage === 'rising' || stage === 'reading') && (
          <motion.div
            key="paper-container"
            initial={
              stage === 'rising' 
                ? { y: -110, scale: 0.62, opacity: 1, x: '-50%' } // Se já estiver travado em rising, nasce direto no lugar correto
                : { y: 95, scale: 0.58, opacity: 1, x: '-50%' }
            }
            animate={
              stage === 'rising'
                ? { 
                    y:[ 95, -110, 40],
                    scale: 0.62,
                    opacity: 1,
                  }
                : stage === 'reading'
                ? { 
                    y: -20,    
                    scale: 1,
                    opacity: 1,
                    zIndex: 50
                  }
                : { 
                    y: 95,     
                    scale: 0.58,
                    opacity: 1,
                    zIndex: 15
                  }
            }
            transition={{ 
              duration: stage === 'rising' ? 1.4 : 0.5, 
              ease: [0.25, 1, 0.5, 1] ,
            }}
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
                    <LetterText {...({ scrollContainer: scrollRef } as any)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. ENVELOPE (ABA DA FRENTE - COBRE O PAPEL NO INÍCIO) ── */}
      {stage !== 'reading' && (
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            // Subiu para 54% para cobrir mais espaço do topo e esconder o papel 100% no início
            clipPath: 'inset(62% 0px 0px 0px)' 
          }}
        >
          <img src={envelopeImg} alt="envelope frente" className="w-full h-full object-contain" />
        </div>
      )}

      {/* ── 4. LACRE ── */}
      <AnimatePresence>
        {stage === 'sealed' && (
          <motion.button
            key="seal"
            initial={{ scale: 1, x: '-50%' }}
            whileHover={{ scale: 1.12, x: '-50%' }}
            whileTap={{ scale: 0.88, x: '-50%' }}
            exit={{ scale: 0, rotate: 180, opacity: 0, transition: { duration: 0.45 } }}
            onClick={handleSealClick}
            className="absolute cursor-pointer bg-transparent border-0 p-0"
            style={{ bottom: '28%', left: '50%', zIndex: 30 }}
          >
            <img src="/assets/cera.png" alt="lacre" style={{ width: 84, height: 84, objectFit: 'contain' }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
