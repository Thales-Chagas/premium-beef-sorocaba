import { useEffect, useRef, useState } from 'react';
import kitChurrascoImg from '../assets/kit churrasco 2.png';
import kitSemanalImg from '../assets/kit semanal 2.png';
import carneImg from '../assets/carne.png';

export default function Kits() {
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <style>{`
        @keyframes kt-fireRise {
          0%   { opacity:0; transform:translateY(0) scale(1); }
          40%  { opacity:1; }
          100% { opacity:0; transform:translateY(-22px) scale(0.6); }
        }
        @keyframes kt-ember {
          0%   { opacity:0; transform:translate(0,0) scale(1); }
          60%  { opacity:0.9; }
          100% { opacity:0; transform:translate(var(--ex),-20px) scale(0.3); }
        }
        @keyframes kt-lb-in { from { opacity:0; } to { opacity:1; } }
        @keyframes kt-lb-scale { from { transform:scale(0.92); } to { transform:scale(1); } }

        .kt-section { position:relative; width:100%; overflow:hidden; background:#080604; }
        .kt-bg {
          position:absolute; inset:0; z-index:0;
          background-image: url(${carneImg});
          background-size:cover; background-position:center;
          filter:brightness(0.15) saturate(1.3);
        }
        .kt-bg-overlay {
          position:absolute; inset:0; z-index:1;
          background:radial-gradient(ellipse at 50% 0%, rgba(180,80,0,0.18) 0%, transparent 70%),
                     linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.85) 100%);
        }

        .kt-inner {
          position:relative; z-index:2;
          max-width:1100px; margin:0 auto; padding:5vh 3vw 0;
        }

        /* HEADER */
        .kt-head { text-align:center; margin-bottom:3vh; }
        .kt-head-eyebrow {
          font-family:Montserrat,sans-serif; font-size:0.72rem; font-weight:700;
          letter-spacing:0.5em; color:#c9a84c; text-transform:uppercase;
          text-shadow:0 0 20px rgba(201,168,76,0.7); display:block; margin-bottom:0.5vh;
        }
        .kt-head-title {
          font-family:'Playfair Display',serif; font-weight:900;
          font-size:clamp(1.6rem,3vw,3rem); color:#fff; line-height:0.95;
          text-transform:uppercase; letter-spacing:0.01em; margin-bottom:1vh;
          text-shadow:0 2px 30px rgba(0,0,0,0.8);
        }
        .kt-head-title em { font-style:normal; color:#c9a84c; }
        .kt-head-sub {
          font-family:Montserrat,sans-serif; font-size:0.68rem; font-weight:400;
          letter-spacing:0.35em; color:rgba(255,255,255,0.45); text-transform:uppercase;
          margin-bottom:2.5vh;
        }
        .kt-head-sub em { color:#c9a84c; font-style:normal; }

        /* BADGES ROW */
        .kt-badges {
          display:flex; justify-content:center; gap:2vw; margin-bottom:3vh; flex-wrap:wrap;
        }
        .kt-badge-item {
          display:flex; flex-direction:column; align-items:center; gap:6px;
          font-family:Montserrat,sans-serif; font-size:0.5rem; font-weight:600;
          letter-spacing:0.18em; color:rgba(255,255,255,0.4); text-transform:uppercase;
          text-align:center; min-width:80px;
        }
        .kt-badge-icon {
          width:42px; height:42px; border:1px solid rgba(201,168,76,0.4);
          border-radius:50%; display:flex; align-items:center; justify-content:center;
          color:#c9a84c; font-size:1.1rem; background:rgba(0,0,0,0.4);
        }

        /* KIT CARDS */
        .kt-cards { display:flex; flex-direction:column; gap:1.5vh; }

        .kt-card {
          display:grid; grid-template-columns:80px 1fr 1.1fr 190px;
          background:rgba(8,6,3,0.9);
          border:1px solid rgba(201,168,76,0.2);
          border-radius:3px; overflow:hidden; position:relative;
          transition:border-color 0.3s, box-shadow 0.3s;
          min-height:220px;
        }
        .kt-card:hover { border-color:rgba(201,168,76,0.5); box-shadow:0 8px 48px rgba(201,168,76,0.1); }

        /* Badge col */
        .kt-card-badge-col {
          background:linear-gradient(to bottom, #1c1400, #0c0900);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          padding:14px 6px; gap:6px; border-right:1px solid rgba(201,168,76,0.12);
        }
        .kt-card-badge-label {
          font-family:Montserrat,sans-serif; font-size:0.48rem; font-weight:800;
          letter-spacing:0.12em; color:#c9a84c; text-transform:uppercase;
          text-align:center; line-height:1.4;
        }
        .kt-card-badge-star { color:#c9a84c; font-size:1.1rem; }

        /* Image col */
        .kt-card-img-col {
          position:relative; overflow:hidden; cursor:zoom-in;
        }
        .kt-card-img {
          width:100%; height:100%; min-height:220px; object-fit:cover; object-position:center;
          display:block; transition:transform 0.5s;
        }
        .kt-card-img-col:hover .kt-card-img { transform:scale(1.06); }
        .kt-card-img-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 55%);
          pointer-events:none;
        }
        .kt-zoom-hint {
          position:absolute; bottom:8px; right:8px;
          background:rgba(0,0,0,0.6); color:rgba(255,255,255,0.5);
          font-size:0.5rem; font-family:Montserrat,sans-serif; letter-spacing:0.1em;
          padding:3px 7px; border-radius:2px; pointer-events:none;
          text-transform:uppercase;
        }

        /* Info col */
        .kt-card-info {
          padding:24px 20px 24px 26px;
          display:flex; flex-direction:column; justify-content:center; gap:10px;
          border-right:1px solid rgba(201,168,76,0.08);
        }
        .kt-card-name {
          font-family:'Playfair Display',serif; font-weight:900;
          font-size:clamp(1.8rem,2.5vw,2.6rem); color:#fff; line-height:1;
          text-transform:uppercase;
        }
        .kt-card-name em { font-style:normal; color:#c9a84c; }
        .kt-card-desc {
          font-family:Montserrat,sans-serif; font-size:0.7rem; font-weight:300;
          color:rgba(255,255,255,0.45); line-height:1.6; max-width:300px;
        }
        .kt-card-features {
          display:grid; grid-template-columns:1fr 1fr; gap:5px 12px;
          list-style:none; padding:0; margin:0;
        }
        .kt-card-feature {
          font-family:Montserrat,sans-serif; font-size:0.6rem; font-weight:300;
          color:rgba(255,255,255,0.4); display:flex; align-items:flex-start; gap:5px;
          line-height:1.4;
        }
        .kt-card-feature::before { content:'✦'; color:#c9a84c; font-size:0.42rem; margin-top:2px; flex-shrink:0; }

        /* Price col */
        .kt-card-price-col {
          padding:24px 20px;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:12px; background:rgba(0,0,0,0.25);
        }
        .kt-price-label {
          font-family:Montserrat,sans-serif; font-size:0.52rem; font-weight:600;
          letter-spacing:0.25em; color:rgba(255,255,255,0.35); text-transform:uppercase;
        }
        .kt-price {
          font-family:'Playfair Display',serif; font-weight:900;
          font-size:clamp(2.4rem,3.2vw,3.4rem); color:#c9a84c; line-height:1;
          text-shadow:0 0 30px rgba(201,168,76,0.45);
        }
        .kt-price sup { font-size:0.45em; vertical-align:super; }
        .kt-price-installment {
          font-family:Montserrat,sans-serif; font-size:0.5rem; font-weight:400;
          color:rgba(255,255,255,0.25); text-align:center; letter-spacing:0.08em;
          text-transform:uppercase;
        }

        /* CTA Button */
        .kt-btn {
          position:relative; overflow:visible; display:flex; align-items:center;
          justify-content:center; gap:7px; width:100%;
          font-family:Montserrat,sans-serif; font-size:0.62rem; font-weight:700;
          letter-spacing:0.14em; text-transform:uppercase; text-decoration:none;
          padding:10px 14px; background:#c9a84c; color:#111;
          border:none; border-radius:2px; cursor:pointer;
          transition:transform 0.3s, box-shadow 0.3s;
        }
        .kt-btn:hover { transform:translateY(-2px); box-shadow:0 0 28px rgba(201,168,76,0.6); }
        .kt-btn-icon { font-size:0.95rem; }
        .kt-btn .kt-flames {
          position:absolute; bottom:100%; left:0; width:100%; height:28px;
          pointer-events:none; display:flex; justify-content:space-around;
          align-items:flex-end; opacity:0; transition:opacity 0.2s;
        }
        .kt-btn:hover .kt-flames { opacity:1; }
        .kt-flame { width:5px; border-radius:50% 50% 20% 20%; animation:kt-fireRise 0.5s ease-out infinite; }
        .kt-flame:nth-child(odd) { background:linear-gradient(to top,#f0c040,#e74c3c); height:16px; }
        .kt-flame:nth-child(even) { background:linear-gradient(to top,#e74c3c,#c0392b); height:10px; animation-delay:.15s; }
        .kt-flame:nth-child(3n) { background:linear-gradient(to top,#fff,#f0c040); height:20px; animation-delay:.08s; }
        .kt-btn .kt-embers {
          position:absolute; bottom:95%; left:0; width:100%; height:30px;
          pointer-events:none; opacity:0; transition:opacity 0.2s;
        }
        .kt-btn:hover .kt-embers { opacity:1; }
        .kt-ember { position:absolute; width:3px; height:3px; border-radius:50%; background:#f0c040; animation:kt-ember 0.8s ease-out infinite; }

        /* FOOTER BAR */
        .kt-footer {
          display:grid; grid-template-columns:repeat(3,1fr);
          background:rgba(0,0,0,0.75); border-top:1px solid rgba(201,168,76,0.12);
          margin-top:2.5vh;
        }
        .kt-footer-item {
          display:flex; align-items:center; gap:12px;
          padding:16px 20px; border-right:1px solid rgba(201,168,76,0.08);
        }
        .kt-footer-item:last-child { border-right:none; }
        .kt-footer-icon { font-size:1.3rem; color:#c9a84c; flex-shrink:0; }
        .kt-footer-text { display:flex; flex-direction:column; gap:2px; }
        .kt-footer-title {
          font-family:Montserrat,sans-serif; font-size:0.6rem; font-weight:700;
          letter-spacing:0.14em; color:#fff; text-transform:uppercase;
        }
        .kt-footer-sub {
          font-family:Montserrat,sans-serif; font-size:0.5rem; font-weight:300;
          color:rgba(255,255,255,0.3); letter-spacing:0.08em; text-transform:uppercase;
        }

        /* LIGHTBOX */
        .kt-lightbox {
          position:fixed; inset:0; z-index:9999;
          background:rgba(0,0,0,0.94);
          display:flex; align-items:center; justify-content:center;
          cursor:zoom-out; animation:kt-lb-in 0.2s ease;
        }
        .kt-lightbox-img {
          max-width:92vw; max-height:90vh;
          object-fit:contain; border:1px solid rgba(201,168,76,0.2);
          box-shadow:0 0 80px rgba(0,0,0,0.9);
          animation:kt-lb-scale 0.25s ease; cursor:default;
        }
        .kt-lightbox-close {
          position:fixed; top:18px; right:24px;
          font-size:2rem; color:rgba(255,255,255,0.5);
          cursor:pointer; line-height:1; z-index:10000;
          transition:color 0.2s;
        }
        .kt-lightbox-close:hover { color:#c9a84c; }

        @media (max-width:768px) {
          .kt-card { grid-template-columns:60px 1fr; }
          .kt-card-img-col { grid-column:1/-1; min-height:180px; }
          .kt-card-info { grid-column:1/-1; }
          .kt-card-price-col { grid-column:1/-1; flex-direction:row; flex-wrap:wrap; justify-content:space-between; }
          .kt-footer { grid-template-columns:1fr; }
          .kt-footer-item { border-right:none; border-bottom:1px solid rgba(201,168,76,0.08); }
        }
      `}</style>

      <section id="kits" ref={ref} className="kt-section">
        <div className="kt-bg" />
        <div className="kt-bg-overlay" />

        {lightbox && (
          <div className="kt-lightbox" onClick={() => setLightbox(null)}>
            <span className="kt-lightbox-close" onClick={() => setLightbox(null)}>✕</span>
            <img src={lightbox} alt="Kit" className="kt-lightbox-img" onClick={(e) => e.stopPropagation()} />
          </div>
        )}

        <div
          className="kt-inner"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* HEADER */}
          <div className="kt-head">
            <span className="kt-head-eyebrow">Kits Para</span>
            <h2 className="kt-head-title">Churrascos <em>Incríveis</em></h2>
            <p className="kt-head-sub">Qualidade <em>Premium</em> para momentos únicos</p>
          </div>

          {/* BADGES */}
          <div className="kt-badges">
            {[
              { icon: '🥩', label: 'Carnes\nSelecionadas' },
              { icon: '🔥', label: 'Corte Premium\ne Frescos' },
              { icon: '🚚', label: 'Entrega Rápida\ne Segura' },
              { icon: '🛡️', label: 'Compra 100%\nSegura' },
            ].map((b) => (
              <div key={b.label} className="kt-badge-item">
                <div className="kt-badge-icon">{b.icon}</div>
                <span style={{ whiteSpace: 'pre-line' }}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* KIT CARDS */}
          <div className="kt-cards">

            {/* KIT CHURRASCO */}
            <div className="kt-card">
              <div className="kt-card-badge-col">
                <span className="kt-card-badge-star">★</span>
                <span className="kt-card-badge-label">Mais{'\n'}Vendido</span>
              </div>
              <div className="kt-card-img-col" onClick={() => setLightbox(kitChurrascoImg)} title="Clique para ampliar">
                <img src={kitChurrascoImg} alt="Kit Churrasco" className="kt-card-img" />
                <div className="kt-card-img-overlay" />
                <span className="kt-zoom-hint">🔍 Ampliar</span>
              </div>
              <div className="kt-card-info">
                <h3 className="kt-card-name">Kit <em>Churrasco</em></h3>
                <p className="kt-card-desc">Tudo que você precisa para um churrasco inesquecível. Cortes nobres selecionados, frescos e prontos para a grelha.</p>
                <ul className="kt-card-features">
                  <li className="kt-card-feature">Cortes bovinos premium selecionados</li>
                  <li className="kt-card-feature">Porções ideais para grupos</li>
                  <li className="kt-card-feature">Frango e suíno inclusos</li>
                  <li className="kt-card-feature">Entrega no dia ou retirada na loja</li>
                </ul>
              </div>
              <div className="kt-card-price-col">
                <span className="kt-price-label">Por apenas</span>
                <div className="kt-price"><sup>R$</sup>199,90</div>
                <a
                  href={`https://wa.me/5515997172705?text=${encodeURIComponent('Olá vim pelo site e gostaria de mais informações sobre o Kit Churrasco.')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="kt-btn"
                >
                  <span className="kt-flames">
                    {[...Array(10)].map((_, i) => <span key={i} className="kt-flame" style={{ animationDelay: (i * 0.05) + 's' }} />)}
                  </span>
                  <span className="kt-embers">
                    {[...Array(6)].map((_, i) => <span key={i} className="kt-ember" style={{ left: (10 + i * 15) + '%', animationDelay: (i * 0.12) + 's', '--ex': ((i % 2 === 0 ? 1 : -1) * (4 + i * 2)) + 'px' }} />)}
                  </span>
                  <span className="kt-btn-icon">💬</span> Pedir Agora
                </a>
                <span className="kt-price-installment">Parcele em até 3x sem juros</span>
              </div>
            </div>

            {/* KIT SEMANAL */}
            <div className="kt-card">
              <div className="kt-card-badge-col">
                <span className="kt-card-badge-star">👑</span>
                <span className="kt-card-badge-label">Melhor{'\n'}Custo{'\n'}Benefício</span>
              </div>
              <div className="kt-card-info">
                <h3 className="kt-card-name">Kit <em>Semanal</em></h3>
                <p className="kt-card-desc">Variedade e frescor para a semana toda. Carnes selecionadas para o dia a dia da sua família.</p>
                <ul className="kt-card-features">
                  <li className="kt-card-feature">Mix de carnes para a semana</li>
                  <li className="kt-card-feature">Porções balanceadas para a família</li>
                  <li className="kt-card-feature">Bovino, frango e suíno</li>
                  <li className="kt-card-feature">Preço especial de kit</li>
                </ul>
              </div>
              <div className="kt-card-img-col" onClick={() => setLightbox(kitSemanalImg)} title="Clique para ampliar">
                <img src={kitSemanalImg} alt="Kit Semanal" className="kt-card-img" />
                <div className="kt-card-img-overlay" style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.35) 0%, transparent 55%)' }} />
                <span className="kt-zoom-hint">🔍 Ampliar</span>
              </div>
              <div className="kt-card-price-col">
                <span className="kt-price-label">Por apenas</span>
                <div className="kt-price"><sup>R$</sup>179,90</div>
                <a
                  href={`https://wa.me/5515997172705?text=${encodeURIComponent('Olá vim pelo site e gostaria de mais informações sobre o Kit Semanal.')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="kt-btn"
                >
                  <span className="kt-flames">
                    {[...Array(10)].map((_, i) => <span key={i} className="kt-flame" style={{ animationDelay: (i * 0.05) + 's' }} />)}
                  </span>
                  <span className="kt-embers">
                    {[...Array(6)].map((_, i) => <span key={i} className="kt-ember" style={{ left: (10 + i * 15) + '%', animationDelay: (i * 0.12) + 's', '--ex': ((i % 2 === 0 ? 1 : -1) * (4 + i * 2)) + 'px' }} />)}
                  </span>
                  <span className="kt-btn-icon">💬</span> Pedir Agora
                </a>
                <span className="kt-price-installment">Parcele em até 3x sem juros</span>
              </div>
            </div>

          </div>

          {/* FOOTER BAR */}
          <div className="kt-footer">
            <div className="kt-footer-item">
              <span className="kt-footer-icon">💬</span>
              <div className="kt-footer-text">
                <span className="kt-footer-title">Fale Agora no WhatsApp</span>
                <span className="kt-footer-sub">Atendimento rápido e personalizado</span>
              </div>
            </div>
            <div className="kt-footer-item">
              <span className="kt-footer-icon">✅</span>
              <div className="kt-footer-text">
                <span className="kt-footer-title">Satisfação Garantida</span>
                <span className="kt-footer-sub">Qualidade ou seu dinheiro de volta</span>
              </div>
            </div>
            <div className="kt-footer-item">
              <span className="kt-footer-icon">🚚</span>
              <div className="kt-footer-text">
                <span className="kt-footer-title">Entrega Rápida</span>
                <span className="kt-footer-sub">Em até 24h para sua região</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
