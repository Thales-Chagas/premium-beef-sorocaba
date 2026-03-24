import { useEffect, useRef, useState } from 'react';
import videoSrc from '../assets/videopremium.mp4';

const stats = [
  { value: '100%', label: 'Carne Fresca' },
  { value: 'Di\u00e1rio', label: 'Abastecimento' },
  { value: 'Premium', label: 'Qualidade' },
  { value: 'Sorocaba', label: 'Localiza\u00e7\u00e3o' },
];

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const flames = [...Array(10)].map((_, i) => (
    <span key={i} className="ab-flame" style={{ animationDelay: (i * 0.05) + 's' }} />
  ));
  const embers = [...Array(6)].map((_, i) => (
    <span key={i} className="ab-ember" style={{ left: (10 + i * 15) + '%', animationDelay: (i * 0.12) + 's', '--ex': ((i % 2 === 0 ? 1 : -1) * (4 + i * 2)) + 'px' }} />
  ));

  return (
    <>
      <style>{`
        @keyframes ab-rise {
          0%   { opacity:0; transform:translateY(0) scale(1); }
          40%  { opacity:1; }
          100% { opacity:0; transform:translateY(-22px) scale(0.6); }
        }
        @keyframes ab-float {
          0%   { opacity:0; transform:translate(0,0) scale(1); }
          60%  { opacity:0.9; }
          100% { opacity:0; transform:translate(var(--ex),-20px) scale(0.3); }
        }
        .ab-btn { position:relative; overflow:visible; display:inline-flex; align-items:center; gap:8px; font-family:'Montserrat',sans-serif; font-size:0.65rem; font-weight:600; letter-spacing:0.25em; text-transform:uppercase; text-decoration:none; padding:10px 28px; background:transparent; color:#c9a84c; border:1px solid rgba(201,168,76,0.5); border-radius:2px; transition:all 0.3s; }
        .ab-btn:hover { background:rgba(201,168,76,0.08); border-color:#c9a84c; color:#e0c070; box-shadow:0 0 20px rgba(201,168,76,0.2); transform:translateY(-1px); }
        .ab-flames { position:absolute; bottom:100%; left:0; width:100%; height:28px; pointer-events:none; display:flex; justify-content:space-around; align-items:flex-end; opacity:0; transition:opacity 0.2s; }
        .ab-btn:hover .ab-flames { opacity:1; }
        .ab-flame { width:5px; border-radius:50% 50% 20% 20%; animation:ab-rise 0.5s ease-out infinite; }
        .ab-flame:nth-child(odd)  { background:linear-gradient(to top,#f0c040,#e74c3c); height:16px; }
        .ab-flame:nth-child(even) { background:linear-gradient(to top,#e74c3c,#c0392b); height:10px; animation-delay:.15s; }
        .ab-flame:nth-child(3n)   { background:linear-gradient(to top,#fff,#f0c040); height:20px; animation-delay:.08s; }
        .ab-embers { position:absolute; bottom:95%; left:0; width:100%; height:30px; pointer-events:none; opacity:0; transition:opacity 0.2s; }
        .ab-btn:hover .ab-embers { opacity:1; }
        .ab-ember { position:absolute; width:3px; height:3px; border-radius:50%; background:#f0c040; animation:ab-float 0.8s ease-out infinite; }
        .ab-section { background:#0d0d0d; position:relative; overflow:hidden; width:100%; height:911px; }
        .ab-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; filter:brightness(0.28) saturate(1.3); }
        .ab-overlay { position:absolute; inset:0; z-index:1; background:linear-gradient(160deg,rgba(6,3,3,0.82) 0%,rgba(192,57,43,0.2) 100%); }
        .ab-fade-top { position:absolute; top:0; left:0; width:100%; height:140px; background:linear-gradient(to bottom,#0d0d0d 0%,transparent 100%); z-index:2; pointer-events:none; }
        .ab-fade-bot { position:absolute; bottom:0; left:0; width:100%; height:200px; background:linear-gradient(to top,#000 0%,transparent 100%); z-index:2; pointer-events:none; }
        .ab-body { position:relative; z-index:3; }
        .ab-inner { width:100%; max-width:1000px; margin:0 auto; padding:0 64px; text-align:center; display:flex; flex-direction:column; justify-content:center; height:100%; }
        .ab-eyebrow { font-family:'Montserrat',sans-serif; font-size:0.68rem; font-weight:600; letter-spacing:0.5em; color:#c9a84c; text-transform:uppercase; text-shadow:0 0 24px rgba(201,168,76,0.55); margin-bottom:20px; }
        .ab-title { font-family:'Playfair Display',serif; font-weight:700; color:#fff; line-height:1.12; font-size:clamp(2.6rem,5vw,5rem); margin-bottom:28px; }
        .ab-title em { font-style:normal; color:#c9a84c; }
        .ab-rule { width:48px; height:1px; background:rgba(201,168,76,0.4); margin:0 auto 56px; }
        .ab-cols { display:flex; flex-direction:row; align-items:flex-start; gap:32px; margin:0 auto 72px; max-width:960px; }
        .ab-col { flex:1; padding:36px 32px; display:flex; flex-direction:column; align-items:center; gap:6px; font-family:'Montserrat',sans-serif; font-weight:300; text-align:center; }
        .ab-col-star { color:#c9a84c; font-size:0.85rem; line-height:1; margin:0; }
        .ab-col-text { font-size:1.1rem; line-height:2; color:rgba(255,255,255,0.8); margin:0; padding:0; }
        .ab-stats { display:grid; grid-template-columns:repeat(4,1fr); border:1px solid rgba(201,168,76,0.18); margin-bottom:64px; }
        .ab-stat { padding:32px 16px; border-right:1px solid rgba(201,168,76,0.18); display:flex; flex-direction:column; align-items:center; gap:10px; }
        .ab-stat:last-child { border-right:none; }
        .ab-stat-val { font-family:'Playfair Display',serif; font-weight:700; font-size:2rem; color:#c9a84c; text-shadow:0 0 20px rgba(201,168,76,0.3); line-height:1; }
        .ab-stat-lbl { font-family:'Montserrat',sans-serif; font-size:0.5rem; letter-spacing:0.3em; color:rgba(255,255,255,0.3); text-transform:uppercase; }
        @media (max-width:768px) {
          .ab-inner { padding:80px 20px 72px; }
          .ab-eyebrow { font-size:0.58rem; letter-spacing:0.3em; margin-bottom:14px; }
          .ab-title { font-size:clamp(2rem,8vw,2.8rem); margin-bottom:20px; }
          .ab-rule { margin-bottom:36px; }
          .ab-cols { flex-direction:row; gap:10px; margin-bottom:40px; }
          .ab-col { padding:12px 8px; gap:4px; }
          .ab-col-star { font-size:0.6rem; }
          .ab-col-text { font-size:0.68rem; line-height:1.5; }
          .ab-stats { grid-template-columns:1fr 1fr; margin-bottom:48px; }
          .ab-stat { padding:24px 12px; border-bottom:1px solid rgba(201,168,76,0.18); }
          .ab-stat:last-child { border-bottom:none; border-right:none; }
          .ab-stat:nth-child(even) { border-right:none; }
          .ab-stat-val { font-size:1.6rem; }
          .ab-stat-lbl { font-size:0.48rem; }
        }
      `}</style>

      <section id="about" ref={ref} className="ab-section">
        <video src={videoSrc} autoPlay loop muted playsInline className="ab-video" />
        <div className="ab-overlay" />
        <div className="ab-fade-top" />
        <div className="ab-fade-bot" />
        <div className="ab-body">
          <div
            className="ab-inner"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <p className="ab-eyebrow">Sobre Nós</p>
            <h2 className="ab-title">
              Qualidade que você<br />
              <em>sente na mesa</em>
            </h2>
            <div className="ab-rule" />

            <div className="ab-cols">
              <div className="ab-col">
                <span className="ab-col-star">&#10022;</span>
                <p className="ab-col-text">O Premium Beef é um açougue especializado em cortes nobres e de alta qualidade, localizado em Sorocaba. Trabalhamos com carnes selecionadas, garantindo frescor e sabor incomparáveis em cada pedaço.</p>
              </div>
              <div className="ab-col">
                <span className="ab-col-star">&#10022;</span>
                <p className="ab-col-text">Nossa missão é levar o melhor da carne bovina, suína e de frango para a sua mesa, com atendimento personalizado e produtos que fazem a diferença no seu churrasco ou no dia a dia.</p>
              </div>
            </div>

            <div className="ab-stats">
              {stats.map((s) => (
                <div key={s.label} className="ab-stat">
                  <span className="ab-stat-val">{s.value}</span>
                  <span className="ab-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{display:'flex',justifyContent:'center'}}><a href="https://wa.me/5515997172705?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Premium%20Beef." target="_blank" rel="noopener noreferrer" className="ab-btn">
              <span className="ab-flames">{flames}</span>
              <span className="ab-embers">{embers}</span>
              Falar no WhatsApp</a></div>
          </div>
        </div>
      </section>
    </>
  );
}