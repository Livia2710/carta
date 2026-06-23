import { useEffect, RefObject } from 'react'

interface LetterTextProps {
  scrollContainer?: RefObject<HTMLDivElement | null>
}

function useScrollReveal(scrollContainer?: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = scrollContainer?.current ?? null
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { root, threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    const timeout = setTimeout(() => {
      const els = root ? root.querySelectorAll('.reveal') : document.querySelectorAll('.reveal')
      els.forEach((el) => observer.observe(el))
    }, 100)
    return () => { clearTimeout(timeout); observer.disconnect() }
  }, [scrollContainer])
}

function Polaroid({ src, caption, rotate = 0, align = 'center' }: {
  src: string; caption: string; rotate?: number; align?: 'left' | 'right' | 'center'
}) {
  const justify = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'
  return (
    <div className={`reveal flex ${justify} mb-1`}>
      <div
        className="bg-[#fffef9] p-[10px] pb-7 shadow-[0_4px_18px_rgba(60,40,20,0.18)]"
        style={{ transform: `rotate(${rotate}deg)`, width: 'clamp(140px, 42%, 190px)' }}
      >
        <img src={src} alt={caption} className="w-full object-contain aspect-square block sepia-[0.08] contrast-[1.03]" />
        <p className="mt-1.5 text-center text-[0.72rem] text-[--ink-400] leading-tight" style={{ fontFamily: 'var(--font-title)' }}>
          {caption}
        </p>
      </div>
    </div>
  )
}

function PolaroidPair({ left, right }: {
  left: { src: string; caption: string; rotate?: number }
  right: { src: string; caption: string; rotate?: number }
}) {
  return (
    <div className="reveal flex gap-4 justify-center mb-1">
      {[left, right].map((p, i) => (
        <div
          key={i}
          className="bg-[#fffef9] p-[9px] pb-[26px] shadow-[0_4px_18px_rgba(60,40,20,0.18)] flex-1 min-w-0"
          style={{ transform: `rotate(${p.rotate ?? 0}deg)` }}
        >
          <img src={p.src} alt={p.caption} className="w-full object-cover aspect-square block sepia-[0.08] contrast-[1.03]" />
          <p className="mt-1 text-center text-[0.65rem] text-[--ink-400] leading-tight" style={{ fontFamily: 'var(--font-title)' }}>
            {p.caption}
          </p>
        </div>
      ))}
    </div>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="reveal text-[--ink-700] leading-[1.85] mb-[1.1rem] indent-[1.5em] text-[clamp(0.95rem,2.5vw,1.1rem)]">
      {children}
    </p>
  )
}

function Divider() {
  return (
    <div className="reveal text-center text-[--rose-400] tracking-[0.4em] my-5 opacity-60 select-none">
      ✦ ✦ ✦
    </div>
  )
}

export default function LetterText({ scrollContainer }: LetterTextProps) {
  useScrollReveal(scrollContainer)

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <h2
        className="reveal text-center font-title  tracking-[0.06em] leading-[1.2] mb-[1.6rem] text-[--rose-700] text-[clamp(1.6rem,5vw,2rem)]">
        Minha querida mãe,
      </h2>

      {/* ✏️ Seu texto */}
      <P>
        Existem palavras que vivem escondidas dentro da gente por tanto tempo que a gente quase
        esquece que elas existem. Esta carta é a tentativa de trazer algumas delas à luz.
      </P>
      <P>
        Desde pequena, aprendi que família não é perfeição. É olhar para o amálgama de caos e confusão que somos e tentar viver. 
        Sempre fomos assim: uma confusão que de alguma forma dava certo (ou não, na maioria das vezes não).
      </P>

{/* Essa imagem esta cortando em cima, como arurmo isso, lmebrando que estou usando tailwindcss */}
      <Polaroid src="/assets/fotos/foto1.jpeg" caption="sempre caos" rotate={-2.5} align="left" />
      <Divider />

      <P>
        Lembro de tantas tardes que pareciam simples, mas que acabaram guardadas como pequenos tesouros. E em muitas delas você estava no centro de tudo: às vezes brigando conosco, às vezes rindo, sempre fazendo a casa parecer mais cheia. E, claro, com aquele cheiro maravilhoso vindo da sua cozinha.
      </P>
      <P>
        Você me ensinou que amor não é perfeição — é presença. É escolher ficar, mesmo quando é
        difícil. É acreditar no outro mesmo quando ele ainda não acredita em si mesmo.
      </P>

      <PolaroidPair
        left={{ src: '/assets/fotos/foto2.jpeg', caption: 'memórias que guardarei(mentira, foi a Bigu)', rotate: -3 }}
        right={{ src: '/assets/fotos/foto3.jpeg', caption: 'momentos assim(zoe brisando)', rotate: 2 }}
      />
      <Divider />

      <P>
        Crescer é estranho. A gente vai mudando tanto, que quando olhamos para trás, não nos reconhecemos mais. 
        E isso é so possivel, pelas pessoas que convivemos, voce com certeza teve uma grande impacto em mim.
      </P>
      <P>
        Não sei ao certo como o tempo passou tão rápido. Mas sei que cada momento ao seu lado foi uma grande aprenizado.
      </P>

      <Polaroid src="/assets/fotos/foto4.jpeg" caption="Eramos fofos" rotate={2.5} align="right" />
      <Divider />

      <P>
        Que esta carta chegue até você com tudo que às vezes não consigo dizer quando você está na minha frente.
      </P>

      <div className="reveal text-right mt-16 pr-2 pb-15">
        <p
          className="text-[--rose-700] text-md font-title m-1  tracking-[0.08em] ">
          Suas filhas, Lívia e Lais
        </p>
      </div>
    </>
  )
}