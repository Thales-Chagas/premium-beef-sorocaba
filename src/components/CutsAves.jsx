import { useEffect, useRef, useState } from 'react';
import frangoInteiroImg from '../assets/frango inteiro.png';
import coxaSobrecoxaImg from '../assets/coxa e sobrecoxa.png';
import peitofrangoImg from '../assets/Peito de frango.png';
import costelasuinaImg from '../assets/Costela suina.png';
import pernilsuinoImg from '../assets/pernil suino.png';
import lombosuinoImg from '../assets/lombo suino.png';

const cuts = [
  {
    name: 'Frango Inteiro',
    category: 'FRANGO',
    desc: 'Frango inteiro fresco, ideal para assar no forno ou na grelha com temperos especiais.',
    badge: 'Mais Pedido',
    img: frangoInteiroImg,
  },
  {
    name: 'Coxa e Sobrecoxa',
    category: 'FRANGO',
    desc: 'Corte suculento e saboroso, perfeito para churrasco, forno ou ensopados.',
    badge: null,
    img: coxaSobrecoxaImg,
  },
  {
    name: 'Peito de Frango',
    category: 'FRANGO PREMIUM',
    desc: 'Corte magro e versátil, ideal para grelhados, saladas e pratos do dia a dia.',
    badge: null,
    img: peitofrangoImg,
  },
  {
    name: 'Costela Suína',
    category: 'PORCO',
    desc: 'Costela suína macia e saborosa, perfeita para churrasco lento ou forno.',
    badge: null,
    img: costelasuinaImg,
  },
  {
    name: 'Pernil Suíno',
    category: 'PORCO',
    desc: 'Corte nobre do porco, ideal para assados especiais e festas em família.',
    badge: 'Destaque',
    img: pernilsuinoImg,
  },
  {
    name: 'Lombo Suíno',
    category: 'PORCO PREMIUM',
    desc: 'Corte macio e magro, excelente para bifes, assados e pratos sofisticados.',
    badge: null,
    img: lombosuinoImg,
  },
];

const css = `
  .ca-section { position:relative; overflow:hidden; background:linear-gradient(to bottom,#0d0d0d 0%,#000 100%); min-height:100vh; display:flex; align-items:flex-start; }
  .ca-fade-top { position:absolute; top:0; left:0; width:100%; height:12%; background:linear-gradient(to bottom,#0d0d0d 0%,transparent 100%); z-index:2; pointer-events:none; }
  .ca-fade-bot { position:absolute; bottom:0; left:0; width:100%; height:12%; background:linear-gradient(to top,#000 0%,transparent 100%); z-index:2; pointer-events:none; }
  .ca-body { position:relative; z-index:3; width:100%; max-width:1350px; margin:0 auto; padding:8vh 4vw 2vh; }
  .ca-eyebrow { font-family:Montserrat,sans-serif; font-size:0.85rem; font-weight:600; letter-spacing:0.5em; color:#c9a84c; text-transform:uppercase; text-shadow:0 0 24px rgba(201,168,76,0.55); margin-bottom:1vh; margin-top:-2vh; text-align:center; }
  .ca-title { font-family:'Playfair Display',serif; font-weight:700; color:#fff; line-height:1.1; font-size:clamp(2rem,3.5vw,3.8rem); margin-bottom:1vh; text-align:center; }
  .ca-title em { font-style:normal; color:#c9a84c; }
  .ca-rule { width:48px; height:1px; background:rgba(201,168,76,0.4); margin:0 auto 1vh; }
  .ca-sub { font-family:Montserrat,sans-serif; font-size:0.82rem; font-weight:300; color:rgba(255,255,255,0.45); text-align:center; margin-bottom:2.5vh; line-height:1.6; }
  .ca-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5vh; margin-bottom:2.5vh; }
  .ca-card { background:rgba(255,255,255,0.03); border:1px solid rgba(201,168,76,0.12); position:relative; overflow:hidden; transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s; cursor:default; }
  .ca-card:hover { border-color:rgba(201,168,76,0.4); transform:translateY(-4px); box-shadow:0 12px 48px rgba(201,168,76,0.12); }
  .ca-card-img { width:100%; height:160px; object-fit:cover; display:block; }
  .ca-card-img-placeholder { width:100%; height:160px; background:linear-gradient(135deg,rgba(201,168,76,0.06),rgba(0,0,0,0.4)); display:flex; align-items:center; justify-content:center; color:rgba(201,168,76,0.2); font-size:0.6rem; text-transform:uppercase; letter-spacing:0.2em; font-family:Montserrat,sans-serif; }
  .ca-card-body { padding:1.5vh 1.2vw; }
  .ca-card-line { position:absolute; top:0; left:0; height:2px; width:0; background:linear-gradient(to right,#c9a84c,rgba(201,168,76,0.2)); transition:width 0.5s; }
  .ca-card:hover .ca-card-line { width:100%; }
  .ca-badge { position:absolute; top:12px; right:12px; background:#c9a84c; color:#111; font-family:Montserrat,sans-serif; font-size:0.55rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; padding:3px 8px; z-index:1; }
  .ca-cat { font-family:Montserrat,sans-serif; font-size:0.55rem; font-weight:600; letter-spacing:0.4em; color:#c9a84c; text-transform:uppercase; margin-bottom:0.6vh; }
  .ca-name { font-family:'Playfair Display',serif; font-weight:700; font-size:clamp(1.2rem,1.5vw,1.5rem); color:#fff; margin-bottom:0.6vh; line-height:1.2; }
  .ca-desc { font-family:Montserrat,sans-serif; font-size:0.78rem; font-weight:300; color:rgba(255,255,255,0.5); line-height:1.6; margin-bottom:1vh; }
  .ca-link { font-family:Montserrat,sans-serif; font-size:0.68rem; font-weight:500; letter-spacing:0.15em; text-transform:uppercase; color:#c9a84c; text-decoration:none; display:inline-flex; align-items:center; gap:6px; transition:gap 0.3s,color 0.3s; }
  .ca-link:hover { color:#fff; gap:10px; }
  .ca-cta { text-align:center; margin-top:3vh; }

  @keyframes ca-fireRise {
    0%   { opacity:0; transform:translateY(0) scale(1); }
    40%  { opacity:1; }
    100% { opacity:0; transform:translateY(-22px) scale(0.6); }
  }
  @keyframes ca-ember {
    0%   { opacity:0; transform:translate(0,0) scale(1); }
    60%  { opacity:0.9; }
    100% { opacity:0; transform:translate(var(--ex),-20px) scale(0.3); }
  }
  .ca-cta-btn { position:relative; overflow:visible; display:inline-block; font-family:Montserrat,sans-serif; font-size:0.72rem; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; text-decoration:none; padding:12px 40px; background:transparent; color:#c9a84c; border:1px solid #c9a84c; transition:background 0.3s,color 0.3s,box-shadow 0.3s; }
  .ca-cta-btn:hover { background:#c9a84c; color:#111; box-shadow:0 0 40px rgba(201,168,76,0.35); }
  .ca-flames { position:absolute; bottom:100%; left:0; width:100%; height:28px; pointer-events:none; display:flex; justify-content:space-around; align-items:flex-end; opacity:0; transition:opacity 0.2s; }
  .ca-cta-btn:hover .ca-flames { opacity:1; }
  .ca-flame { width:5px; border-radius:50% 50% 20% 20%; animation:ca-fireRise 0.5s ease-out infinite; }
  .ca-flame:nth-child(odd) { background:linear-gradient(to top,#f0c040,#e74c3c); height:16px; }
  .ca-flame:nth-child(even) { background:linear-gradient(to top,#e74c3c,#c0392b); height:10px; animation-delay:.15s; }
  .ca-flame:nth-child(3n) { background:linear-gradient(to top,#fff,#f0c040); height:20px; animation-delay:.08s; }
  .ca-embers { position:absolute; bottom:95%; left:0; width:100%; height:30px; pointer-events:none; opacity:0; transition:opacity 0.2s; }
  .ca-cta-btn:hover .ca-embers { opacity:1; }
  .ca-ember { position:absolute; width:3px; height:3px; border-radius:50%; background:#f0c040; animation:ca-ember 0.8s ease-out infinite; }

  @media (max-width:900px) {
    .ca-section { height:auto; }
    .ca-body { padding:8vh 5vw; }
    .ca-grid { grid-template-columns:1fr 1fr; gap:16px; }
  }
  @media (max-width:600px) {
    .ca-grid { grid-template-columns:1fr; }
    .ca-title { font-size:clamp(2rem,8vw,2.8rem); }
  }
`;

export default function CutsAves() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <section id="cuts-aves" ref={ref} className="ca-section">
        <div className="ca-fade-top" />
        <div className="ca-fade-bot" />
        <div
          className="ca-body"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p className="ca-eyebrow">Frango & Porco</p>
          <h2 className="ca-title">Sabor que vai <em>além do boi</em></h2>
          <div className="ca-rule" />
          <p className="ca-sub">Frango fresco e suíno selecionado para o seu churrasco,<br />do dia a dia ou para aquela ocasião especial</p>

          <div className="ca-grid">
            {cuts.map((cut, i) => (
              <div
                key={cut.name}
                className="ca-card"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="ca-card-line" />
                {cut.badge && <span className="ca-badge">{cut.badge}</span>}
                {cut.img
                  ? <img src={cut.img} alt={cut.name} className="ca-card-img" />
                  : <div className="ca-card-img-placeholder">&#10022;</div>
                }
                <div className="ca-card-body">
                  <p className="ca-cat">{cut.category}</p>
                  <h3 className="ca-name">{cut.name}</h3>
                  <p className="ca-desc">{cut.desc}</p>
                  <a
                    href={`https://wa.me/5515997172705?text=${encodeURIComponent(`Olá vim pelo site e gostaria de mais informações deste produto: ${cut.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ca-link"
                  >
                    Pedir agora <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="ca-cta">
            <a
              href="https://wa.me/5515997172705?text=Ol%C3%A1!%20Gostaria%20de%20ver%20todos%20os%20cortes%20de%20frango%20e%20porco%20dispon%C3%ADveis."
              target="_blank"
              rel="noopener noreferrer"
              className="ca-cta-btn"
            >
              <span className="ca-flames">
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="ca-flame" style={{ animationDelay: (i * 0.05) + 's' }} />
                ))}
              </span>
              <span className="ca-embers">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="ca-ember" style={{ left: (10 + i * 15) + '%', animationDelay: (i * 0.12) + 's', '--ex': ((i % 2 === 0 ? 1 : -1) * (4 + i * 2)) + 'px' }} />
                ))}
              </span>
              Ver Todos os Cortes no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
