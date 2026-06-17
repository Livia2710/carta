import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LetterText from './LetterText'



// ─── ESTÁGIOS ─────────────────────────────────────────────────
// sealed   → envelope fechado com lacre
// opening  → envelope abre (carta-aberta.png)
// rising   → papel saindo do envelope (carta-papel.png)
// reading  → zoom no papel sozinho (papel.png) + texto

export default function Letter() {
  const [stage, setStage] = useState('sealed')

  function handleSealClick() {
    // 1. Abre o envelope
    setStage('opening')

    // 2. Após 900ms, mostra o papel saindo
    setTimeout(() => setStage('rising'), 900)

    // 3. Após mais 1200ms, faz o zoom no papel
    setTimeout(() => setStage('reading'), 2100)
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 520, height: 680 }}
    >

      {/* ── ENVELOPE (sealed → opening → rising) ── */}
      <AnimatePresence>
        {stage !== 'reading' && (
          <motion.div
            key="envelope"
            className="absolute inset-0"
            exit={{
              scale: 0.85,
              opacity: 0,
              transition: { duration: 0.6, ease: 'easeIn' }
            }}
          >
            <img
              // Troca a imagem conforme o estágio sem remontar o elemento
              src={
                stage === 'sealed'
                  ? '/assets/carta-fechada.png'
                  : stage === 'opening'
                  ? '/assets/carta-aberta.png'
                  : '/assets/carta-papel.png'   // rising
              }
              alt="envelope"
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LACRE DE CERA (só no sealed) ── */}
      <AnimatePresence>
        {stage === 'sealed' && (
          <motion.button
            key="seal"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            exit={{
              scale: 0,
              rotate: 180,
              opacity: 0,
              transition: { duration: 0.45 }
            }}
            onClick={handleSealClick}
            className="absolute z-10 cursor-pointer bg-transparent border-0 p-0"
            style={{ bottom: '28%', left: '42%', transform: 'translateX(-50%)' }}
          >
            <img
              src="/assets/cera.png"
              alt="lacre — clique para abrir"
              style={{ width: 84, height: 84, objectFit: 'contain' }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── PAPEL COM ZOOM + TEXTO (reading) ── */}
      <AnimatePresence>
        {stage === 'reading' && (
          <motion.div
            key="paper"
            initial={{ scale: 0.55, y: 80, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              width: 520,
              height: '85vh',        // altura visível — papel não cresce infinito
              maxHeight: 800,
              backgroundImage: 'url(/assets/papel.png)',
              backgroundSize: '100% 100%',   // estica pra cobrir exatamente o container
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Área scrollável com padding que respeita as bordas do papel */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '4rem 3.5rem 3.5rem',   // padding generoso pras bordas florais
              boxSizing: 'border-box',

              /* Esconde a scrollbar mas mantém o scroll funcional */
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}>
              <LetterText />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
