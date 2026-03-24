import { useState, useEffect } from 'react';
import carneImg from '../assets/carne.png';

import logoImg from '../assets/logo33.png';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.pageYOffset);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scaleY(1) translateY(0); }
          25%       { opacity: 0.85; transform: scaleY(1.08) translateY(-2px); }
          50%       { opacity: 0.95; transform: scaleY(0.96) translateY(1px); }
          75%       { opacity: 0.9; transform: scaleY(1.04) translateY(-1px); }
        }
        @keyframes fireRise {
          0%   { opacity: 0; transform: translateY(0) scale(1); }
          40%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-22px) scale(0.6); }
        }
        @keyframes ember {
          0%   { opacity: 0; transform: translate(0, 0) scale(1); }
          60%  { opacity: 0.9; }
          100% { opacity: 0; transform: translate(var(--ex), -20px) scale(0.3); }
        }

        .fire-btn {
          position: relative;
          overflow: visible;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 10px 28px;
          border-radius: 2px;
          transition: transform 0.3s, box-shadow 0.3s;
          display: inline-block;
          text-align: center;
        }
        .fire-btn:hover { transform: translateY(-2px); }

        .fire-btn .flames {
          position: absolute;
          bottom: 100%;
          left: 0;
          width: 100%;
          height: 28px;
          pointer-events: none;
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .fire-btn:hover .flames { opacity: 1; }

        .flame {
          width: 5px;
          border-radius: 50% 50% 20% 20%;
          animation: fireRise 0.5s ease-out infinite;
        }
        .flame:nth-child(odd)  { background: linear-gradient(to top, #f0c040, #e74c3c); height: 16px; }
        .flame:nth-child(even) { background: linear-gradient(to top, #e74c3c, #c0392b); height: 10px; animation-delay: 0.15s; }
        .flame:nth-child(3n)   { background: linear-gradient(to top, #fff, #f0c040); height: 20px; animation-delay: 0.08s; }

        .fire-btn .embers {
          position: absolute;
          bottom: 95%;
          left: 0;
          width: 100%;
          height: 30px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .fire-btn:hover .embers { opacity: 1; }
        .ember {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #f0c040;
          animation: ember 0.8s ease-out infinite;
        }

        .btn-primary {
          background: #c9a84c;
          color: #1a1a1a;
          border: 1px solid #c9a84c;
        }
        .btn-primary:hover {
          box-shadow: 0 0 30px rgba(201,168,76,0.6), 0 0 60px rgba(201,168,76,0.3);
        }

        .btn-outline {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.35);
        }
        .btn-outline:hover {
          border-color: #c0392b;
          box-shadow: 0 0 20px rgba(192,57,43,0.4);
        }

        @media (max-width: 640px) {
          .hero-btns {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
          }
          .fire-btn {
            width: 100% !important;
            padding: 9px 12px;
            font-size: 0.6rem;
            letter-spacing: 0.12em;
            text-align: center;
          }
        }
      `}</style>

      <section id="home" className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background — carne.png com parallax e leve desfoque */}
        <div
          className="absolute inset-0 w-full h-[120%] z-[1]"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
            backgroundImage: `url(${carneImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px) brightness(0.55) saturate(1.3)',
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-[2]" style={{
          background: 'linear-gradient(135deg, rgba(10,5,5,0.72) 0%, rgba(192,57,43,0.22) 100%)'
        }} />

        {/* Linha decorativa */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#c0392b]/60 to-transparent z-[3]" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 sm:px-8 max-w-3xl mx-auto w-full">
          {/* Logo */}
          <div className="flex justify-center animate-fadeIn" style={{ marginBottom: '1rem', marginTop: '-40px' }}>
            <img
              src={logoImg}
              alt="Premium Beef"
              className="object-contain"
              style={{
                width: '280px',
                height: '280px',
                filter: 'drop-shadow(0 0 12px rgba(192,57,43,0.6))',
              }}
            />
          </div>

          <p className="text-[#d4a017] text-sm sm:text-lg tracking-[6px] uppercase mb-14 font-semibold animate-fadeInUp">
            Açougue Premium · Sorocaba
          </p>
          <h1
            className="font-serif text-5xl sm:text-7xl md:text-8xl font-black leading-none animate-fadeInUp"
            style={{ animationDelay: '0.2s', marginBottom: '2rem' }}
          >
            PREMIUM <span style={{ color: '#c9a84c' }}>BEEF</span>
          </h1>
          <div className="w-16 h-px bg-[#c0392b]/80 mx-auto" style={{ animationDelay: '0.3s', marginBottom: '2rem' }} />
          <p
            className="font-sans text-xs sm:text-sm text-[#d4a017] mx-auto leading-relaxed tracking-[4px] uppercase animate-fadeInUp text-center"
            style={{ animationDelay: '0.4s', marginBottom: '2rem', fontWeight: 500, textShadow: '0 0 20px rgba(212,160,23,0.5)', maxWidth: '100%', paddingLeft: '4px' }}
          >
            Cortes nobres selecionados com qualidade e tradição para a sua mesa
          </p>

          <div className="hero-btns flex flex-col sm:flex-row gap-3 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            {/* Botão 1 */}
            <a href="#cuts" onClick={(e) => scrollTo(e, '#cuts')} className="fire-btn btn-primary">
              <span className="flames">
                {[...Array(10)].map((_, i) => <span key={i} className="flame" style={{ animationDelay: `${i * 0.05}s` }} />)}
              </span>
              <span className="embers">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="ember" style={{
                    left: `${10 + i * 15}%`,
                    animationDelay: `${i * 0.12}s`,
                    '--ex': `${(i % 2 === 0 ? 1 : -1) * (4 + i * 2)}px`,
                  }} />
                ))}
              </span>
              Ver Nossos Cortes
            </a>

            {/* Botão 2 */}
            <a
              href="https://wa.me/5515997172705?text=Olá! Gostaria de fazer um pedido."
              target="_blank"
              rel="noopener noreferrer"
              className="fire-btn btn-outline"
            >
              <span className="flames">
                {[...Array(10)].map((_, i) => <span key={i} className="flame" style={{ animationDelay: `${i * 0.05}s` }} />)}
              </span>
              <span className="embers">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="ember" style={{
                    left: `${10 + i * 15}%`,
                    animationDelay: `${i * 0.12}s`,
                    '--ex': `${(i % 2 === 0 ? 1 : -1) * (4 + i * 2)}px`,
                  }} />
                ))}
              </span>
              Fazer Pedido
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" style={{ opacity: scrollY > 100 ? 0 : 1, transition: 'opacity 0.3s' }}>
          <span className="block w-px h-10 bg-white/30 mx-auto animate-scrollDown" />
        </div>

        {/* Divisor inferior */}
        <div className="absolute bottom-0 left-0 w-full z-10" style={{ height: '60px', background: 'linear-gradient(to bottom, transparent, #0d0d0d)' }} />
      </section>
    </>
  );
}
