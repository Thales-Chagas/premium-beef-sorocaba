import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(id);
    if (!el) return;

    const headerHeight = document.querySelector('header')?.offsetHeight || 70;
    const targetY = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const duration = 900;
    let startTime = null;

    const easeInOutCubic = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const links = [
    { href: '#home', label: 'Início' },
    { href: '#about', label: 'Sobre' },
    { href: '#cuts', label: 'Cortes' },
    { href: '#cuts-aves', label: 'Frango & Porco' },
    { href: '#kits', label: 'Kits' },
    { href: '#feedback', label: 'Contato' },
  ];

  return (
    <>
      <style>{`
        @keyframes spark {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          50%  { opacity: 1; }
          100% { opacity: 0; transform: scale(1.2) translateY(-18px); }
        }
        .nav-link {
          position: relative;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.3s;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #c9a84c;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #c9a84c; }
        .nav-link:hover::after { width: 100%; }
        .nav-link .sparks {
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          display: flex;
          gap: 3px;
          opacity: 0;
          transition: opacity 0.1s;
        }
        .nav-link:hover .sparks { opacity: 1; }
        .spark-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #c9a84c;
          animation: spark 0.6s ease-out infinite;
        }
        .spark-dot:nth-child(2) { animation-delay: 0.1s; background: #f0e080; }
        .spark-dot:nth-child(3) { animation-delay: 0.2s; }

        .btn-fale {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #c9a84c;
          text-decoration: none;
          border: 1px solid rgba(201,168,76,0.6);
          padding: 6px 18px;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          transition: color 0.3s, border-color 0.3s;
        }
        .btn-fale::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c9a84c;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          z-index: 0;
        }
        .btn-fale:hover::before { transform: scaleX(1); }
        .btn-fale:hover { border-color: #c9a84c; color: #1a1a1a; }
        .btn-fale span { position: relative; z-index: 1; }
        .btn-fale .sparks {
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          display: flex;
          gap: 3px;
          opacity: 0;
          transition: opacity 0.1s;
          z-index: 2;
        }
        .btn-fale:hover .sparks { opacity: 1; }
      `}</style>

      <header
        className={`fixed top-0 w-full z-[1000] transition-all duration-400 ${
          scrolled ? 'bg-[#1a1a1a]/98 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'
        }`}
        style={{ paddingTop: scrolled ? '8px' : '8px', paddingBottom: scrolled ? '8px' : '8px' }}
      >
        <nav className="max-w-[1300px] mx-auto px-6 sm:px-10 flex justify-between items-center relative">

          {/* Esquerda — texto */}
          <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex flex-col no-underline" style={{ marginLeft: '12px', marginTop: '10px' }}>
            <span className="font-serif text-base sm:text-lg font-bold text-white leading-tight tracking-widest">
              PREMIUM <span className="text-[#c0392b]">BEEF</span>
            </span>
            <span className="text-[0.55rem] uppercase font-semibold mt-0.5"
              style={{ color: '#d4a017', textShadow: '0 0 12px rgba(212,160,23,0.6)', letterSpacing: '0.35em' }}>
              · Sorocaba ·
            </span>
          </a>


          {/* Direita — links */}
          <ul className="hidden md:flex list-none gap-8 items-end ml-auto" style={{ marginTop: '18px' }}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => scrollTo(e, l.href)} className="nav-link">
                  <span className="sparks">
                    <span className="spark-dot" />
                    <span className="spark-dot" />
                    <span className="spark-dot" />
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="https://wa.me/5515997172705" target="_blank" rel="noopener noreferrer" className="btn-fale">
                <span className="sparks">
                  <span className="spark-dot" />
                  <span className="spark-dot" />
                  <span className="spark-dot" />
                </span>
                <span>Fale Conosco</span>
              </a>
            </li>
          </ul>

          {/* Mobile Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex flex-col gap-1.5 p-1 ml-auto">
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden backdrop-blur-md transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
          style={{ background: 'rgba(10,5,5,0.97)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <ul className="flex flex-col px-8 py-6 gap-0">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', letterSpacing: '0.35em', fontWeight: 300, color: 'rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(201,168,76,0.1)', display: 'block', padding: '14px 0', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.3s', textAlign: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-5">
              <a
                href="https://wa.me/5515997172705"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.3em', fontWeight: 400, color: '#c9a84c', border: '1px solid rgba(201,168,76,0.4)', display: 'block', textAlign: 'center', padding: '12px', textDecoration: 'none', textTransform: 'uppercase', transition: 'background 0.3s' }}
              >
                Fale Conosco
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
