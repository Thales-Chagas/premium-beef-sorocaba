import { useEffect, useRef, useState } from 'react';


const cuts = [
  {
    name: 'Picanha',
    category: 'CORTE NOBRE',
    desc: 'O clássico do churrasco brasileiro. Macia, suculenta e com capa de gordura perfeita.',
    badge: 'Mais Pedido',
  },
  {
    name: 'Costela',
    category: 'CHURRASCO',
    desc: 'Costela bovina de qualidade premium, ideal para o fogo baixo e longa cocção.',
    badge: null,
  },
  {
    name: 'Fraldinha',
    category: 'CORTE ESPECIAL',
    desc: 'Corte versátil com sabor intenso. Perfeita para grelha ou panela.',
    badge: null,
  },
  {
    name: 'Maminha',
    category: 'CORTE MACIO',
    desc: 'Extremamente macia e saborosa. Uma das preferidas para churrasco em família.',
    badge: null,
  },
  {
    name: 'Alcatra',
    category: 'CORTE NOBRE',
    desc: 'Corte nobre com sabor marcante. Ideal para bifes e churrasco.',
    badge: null,
  },
  {
    name: 'Contrafilé',
    category: 'GRELHADOS',
    desc: 'Macio e suculento, com marmoreio ideal para bifes e grelhados.',
    badge: 'Destaque',
  },
];

const css = `
  .ct-section { position:relative; overflow:hidden; background:linear-gradient(to bottom,#000 0%,#0d0d0d 100%); min-height:911px; display:flex; align-items:center; }


  .ct-fade-top { position:absolute; top:0; left:0; width:100%; height:140px; background:linear-gradient(to bottom,#0d0d0d 0%,transparent 100%); z-index:2; pointer-events:none; }
  .ct-fade-bot { position:absolute; bottom:0; left:0; width:100%; height:140px; background:linear-gradient(to top,#0d0d0d 0%,transparent 100%); z-index:2; pointer-events:none; }
  .ct-body { position:relative; z-index:3; width:100%; max-width:1350px; margin:0 auto; padding:100px 64px; }
  .ct-eyebrow { font-family:Montserrat,sans-serif; font-size:0.68rem; font-weight:600; letter-spacing:0.5em; color:#c9a84c; text-transform:uppercase; text-shadow:0 0 24px rgba(201,168,76,0.55); margin-bottom:20px; text-align:center; }
  .ct-title { font-family:'Playfair Display',serif; font-weight:700; color:#fff; line-height:1.12; font-size:clamp(2.4rem,4vw,4.2rem); margin-bottom:16px; text-align:center; }
  .ct-title em { font-style:normal; color:#c9a84c; }
  .ct-rule { width:48px; height:1px; background:rgba(201,168,76,0.4); margin:0 auto 20px; }
  .ct-sub { font-family:Montserrat,sans-serif; font-size:0.88rem; font-weight:300; color:rgba(255,255,255,0.45); text-align:center; margin-bottom:64px; line-height:1.7; }
  .ct-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-bottom:56px; }
  .ct-card { background:rgba(255,255,255,0.03); border:1px solid rgba(201,168,76,0.12); padding:36px 32px; position:relative; overflow:hidden; transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s; cursor:default; }
  .ct-card:hover { border-color:rgba(201,168,76,0.4); transform:translateY(-4px); box-shadow:0 12px 48px rgba(201,168,76,0.12); }
  .ct-card-line { position:absolute; top:0; left:0; height:2px; width:0; background:linear-gradient(to right,#c9a84c,rgba(201,168,76,0.2)); transition:width 0.5s; }
  .ct-card:hover .ct-card-line { width:100%; }
  .ct-badge { position:absolute; top:16px; right:16px; background:#c9a84c; color:#111; font-family:Montserrat,sans-serif; font-size:0.58rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; padding:4px 10px; }
  .ct-cat { font-family:Montserrat,sans-serif; font-size:0.58rem; font-weight:600; letter-spacing:0.4em; color:#c9a84c; text-transform:uppercase; margin-bottom:12px; }
  .ct-name { font-family:'Playfair Display',serif; font-weight:700; font-size:1.6rem; color:#fff; margin-bottom:12px; line-height:1.2; }
  .ct-desc { font-family:Montserrat,sans-serif; font-size:0.82rem; font-weight:300; color:rgba(255,255,255,0.5); line-height:1.8; margin-bottom:20px; }
  .ct-link { font-family:Montserrat,sans-serif; font-size:0.72rem; font-weight:500; letter-spacing:0.15em; text-transform:uppercase; color:#c9a84c; text-decoration:none; display:inline-flex; align-items:center; gap:6px; transition:gap 0.3s,color 0.3s; }
  .ct-link:hover { color:#fff; gap:10px; }
  .ct-cta { text-align:center; }
  .ct-cta-btn { display:inline-block; font-family:Montserrat,sans-serif; font-size:0.72rem; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; text-decoration:none; padding:14px 48px; background:transparent; color:#c9a84c; border:1px solid #c9a84c; transition:background 0.3s,color 0.3s,box-shadow 0.3s; }
  .ct-cta-btn:hover { background:#c9a84c; color:#111; box-shadow:0 0 40px rgba(201,168,76,0.35); }
  @media (max-width:900px) {
    .ct-body { padding:80px 28px; }
    .ct-grid { grid-template-columns:1fr 1fr; gap:16px; }
  }
  @media (max-width:600px) {
    .ct-grid { grid-template-columns:1fr; }
    .ct-title { font-size:clamp(2rem,8vw,2.8rem); }
  }
`;

export default function Cuts() {
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
      <section id="cuts" ref={ref} className="ct-section">
        
        
        <div className="ct-fade-top" />
        <div className="ct-fade-bot" />
        <div
          className="ct-body"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p className="ct-eyebrow">Nosso Cardápio</p>
          <h2 className="ct-title">Cortes <em>Selecionados</em></h2>
          <div className="ct-rule" />
          <p className="ct-sub">Trabalhamos com os melhores cortes bovinos, suínos e de frango,<br />sempre frescos e selecionados</p>

          <div className="ct-grid">
            {cuts.map((cut, i) => (
              <div
                key={cut.name}
                className="ct-card"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="ct-card-line" />
                {cut.badge && <span className="ct-badge">{cut.badge}</span>}
                <p className="ct-cat">{cut.category}</p>
                <h3 className="ct-name">{cut.name}</h3>
                <p className="ct-desc">{cut.desc}</p>
                <a
                  href={`https://wa.me/5515997172705?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20${encodeURIComponent(cut.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-link"
                >
                  Pedir agora <span>→</span>
                </a>
              </div>
            ))}
          </div>

          <div className="ct-cta">
            <a
              href="https://wa.me/5515997172705?text=Ol%C3%A1!%20Gostaria%20de%20ver%20todos%20os%20cortes%20dispon%C3%ADveis."
              target="_blank"
              rel="noopener noreferrer"
              className="ct-cta-btn"
            >
              Ver Todos os Cortes no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}


