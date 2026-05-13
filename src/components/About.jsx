import { useEffect, useRef, useState } from 'react';
import videoSrc from '../assets/videopremium.mp4';
import './About.css';

const stats = [
  { value: '100%', label: 'Carne Fresca' },
  { value: 'Diário', label: 'Abastecimento' },
  { value: 'Premium', label: 'Qualidade' },
  { value: 'Sorocaba', label: 'Localização' },
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

  return (
    <>

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

            <div style={{display:'flex',justifyContent:'center'}}>
              <a
                href="https://wa.me/5515997172705?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Premium%20Beef."
                target="_blank"
                rel="noopener noreferrer"
                className="ab-fire-btn"
              >
                <span className="ab-flames">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="ab-flame" style={{ animationDelay: (i * 0.05) + 's' }} />
                  ))}
                </span>
                <span className="ab-embers">
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="ab-ember" style={{ left: (10 + i * 15) + '%', animationDelay: (i * 0.12) + 's', '--ex': ((i % 2 === 0 ? 1 : -1) * (4 + i * 2)) + 'px' }} />
                  ))}
                </span>
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
