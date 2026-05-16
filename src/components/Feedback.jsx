import { useState, useRef, useEffect } from 'react';
import fundoFeedback from '../assets/fundo feedback.png';
import carneTestemunho from '../assets/carne.png';
import trofelImg from '../assets/trofel.png';

export default function Feedback() {
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const testimonials = [
    { name: 'Carlos M.', text: 'Melhor açougue de Sorocaba! A picanha é sensacional, macia e suculenta. Atendimento nota 10, sempre muito atenciosos. Virei cliente fiel!', stars: 5 },
    { name: 'Ana Paula S.', text: 'Comprei o kit churrasco e foi um sucesso absoluto! Carnes de primeira qualidade, bem embaladas e entrega super rápida. Todo mundo elogiou!', stars: 5 },
    { name: 'Roberto L.', text: 'Qualidade excepcional! As carnes são sempre frescas e o corte é perfeito. Preço justo pela qualidade oferecida. Recomendo de olhos fechados!', stars: 5 },
    { name: 'Juliana F.', text: 'Fiz meu churrasco de aniversário com as carnes daqui e foi perfeito! A fraldinha estava divina, super macia. Parabéns pelo trabalho!', stars: 5 },
    { name: 'Marcos V.', text: 'Atendimento impecável e carnes de altíssima qualidade. A maminha é a melhor que já provei! Entrega pontual e produto bem refrigerado.', stars: 5 },
    { name: 'Fernanda R.', text: 'Simplesmente perfeito! Compro toda semana e nunca me decepcionei. As carnes são sempre fresquinhas e o atendimento é excelente. Super indico!', stars: 5 },
    { name: 'Paulo H.', text: 'Carnes premium de verdade! A costela bovina é espetacular, bem marmoreada. Preço honesto e qualidade incomparável. Melhor custo-benefício!', stars: 5 },
    { name: 'Mariana C.', text: 'Fiquei impressionada com a qualidade! Pedi pelo WhatsApp e chegou rapidinho. As carnes são lindas, bem cortadas e super saborosas. Amei!', stars: 5 },
    { name: 'Ricardo B.', text: 'Excelente! Compro aqui há meses e a qualidade é sempre a mesma: impecável! O kit semanal é perfeito para a família. Muito satisfeito!', stars: 5 },
    { name: 'Camila T.', text: 'Melhor açougue que já conheci! Carnes selecionadas, frescas e com preço justo. O atendimento é diferenciado, sempre muito educados. Top demais!', stars: 5 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*NOVO FEEDBACK*\n\n*Avaliação Produtos:* ${rating1}/5 ⭐\n*Avaliação Atendimento:* ${rating2}/5 ⭐\n*Comentário:* ${comment}\n*Nome:* ${name || 'Não informado'}\n*WhatsApp:* ${whatsapp || 'Não informado'}`;
    window.open(`https://wa.me/5515997172705?text=${encodeURIComponent(message)}`, '_blank');
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Forçar reload da imagem com timestamp atualizado
  const bgImageUrl = `${fundoFeedback}?v=${new Date().getTime()}`;

  return (
    <>
      <style>{`
        .fb-section {
          position: relative;
          width: 100%;
          background: #000;
          overflow: hidden;
          padding: 80px 0;
        }
        .fb-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.45);
          z-index: 0;
        }
        .fb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%);
          z-index: 1;
        }
        .fb-container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* HEADER */
        .fb-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .fb-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.4em;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .fb-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          color: #fff;
          line-height: 0.9;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .fb-title-gold {
          color: #c9a84c;
        }
        .fb-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: rgba(255,255,255,0.65);
          line-height: 1.8;
          max-width: 550px;
          margin: 0 auto;
        }

        /* BADGES */
        .fb-badges {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }
        .fb-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 28px 20px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 8px;
          transition: all 0.3s;
        }
        .fb-badge:hover {
          border-color: rgba(201,168,76,0.5);
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(201,168,76,0.15);
        }
        .fb-badge-icon {
          width: 56px;
          height: 56px;
          border: 1.5px solid rgba(201,168,76,0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a84c;
          font-size: 1.5rem;
        }
        .fb-badge-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #fff;
          text-transform: uppercase;
          text-align: center;
          line-height: 1.5;
        }

        /* MAIN GRID */
        .fb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }
        @media (max-width: 768px) {
          .fb-grid {
            grid-template-columns: 1fr;
          }
        }

        /* BOX */
        .fb-box {
          background: rgba(0,0,0,0.7);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 8px;
          padding: 40px 32px;
        }
        .fb-box-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: #c9a84c;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 12px;
        }
        .fb-box-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          text-align: center;
          margin-bottom: 32px;
        }

        /* RATING */
        .fb-rating-row {
          margin-bottom: 28px;
        }
        .fb-rating-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: rgba(255,255,255,0.75);
          margin-bottom: 12px;
          display: block;
        }
        .fb-stars {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .fb-star {
          font-size: 2rem;
          color: rgba(201,168,76,0.25);
          cursor: pointer;
          transition: all 0.2s;
        }
        .fb-star:hover {
          transform: scale(1.15);
          color: rgba(201,168,76,0.5);
        }
        .fb-star.active {
          color: #c9a84c;
          text-shadow: 0 0 20px rgba(201,168,76,0.5);
        }

        /* FORM ELEMENTS */
        .fb-textarea {
          width: 100%;
          min-height: 100px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 6px;
          padding: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          color: #fff;
          resize: vertical;
          margin-bottom: 20px;
        }
        .fb-textarea::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .fb-textarea:focus {
          outline: none;
          border-color: rgba(201,168,76,0.6);
          box-shadow: 0 0 20px rgba(201,168,76,0.1);
        }

        .fb-input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .fb-input-row {
            grid-template-columns: 1fr;
          }
        }
        .fb-input {
          width: 100%;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 6px;
          padding: 12px 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          color: #fff;
        }
        .fb-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .fb-input:focus {
          outline: none;
          border-color: rgba(201,168,76,0.6);
          box-shadow: 0 0 20px rgba(201,168,76,0.1);
        }

        .fb-btn {
          width: 100%;
          background: #c9a84c;
          border: none;
          border-radius: 6px;
          padding: 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #111;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .fb-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 40px rgba(201,168,76,0.5);
        }

        /* WHY LIST */
        .fb-why-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 4px 0;
        }
        .fb-why-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
        }
        .fb-why-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border: 1.5px solid rgba(201,168,76,0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a84c;
          font-size: 1.3rem;
          background: rgba(0,0,0,0.5);
          transition: all 0.3s;
        }
        .fb-why-item:hover .fb-why-icon {
          border-color: rgba(201,168,76,0.7);
          background: rgba(201,168,76,0.1);
          transform: scale(1.05);
        }
        .fb-why-text {
          flex: 1;
          max-width: 100%;
        }
        .fb-why-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #fff;
          text-transform: uppercase;
          margin-bottom: 6px;
          line-height: 1.4;
        }
        .fb-why-title-gold {
          color: #c9a84c;
        }
        .fb-why-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          max-width: 90%;
          margin: 0 auto;
        }

        /* CONTACT GRID */
        .fb-contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .fb-contact-box {
          background: rgba(0,0,0,0.7);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 8px;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .fb-contact-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: #c9a84c;
          text-transform: uppercase;
          margin-bottom: 10px;
          text-align: center;
        }

        .fb-contact-item {
          display: flex;
          gap: 18px;
          align-items: center;
          margin-bottom: 28px;
        }
        .fb-contact-icon {
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          border: 1.5px solid rgba(201,168,76,0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a84c;
          font-size: 1.2rem;
        }
        .fb-contact-text {
          flex: 1;
        }
        .fb-contact-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.62rem;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 6px;
        }
        .fb-contact-value {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.5;
          word-break: break-word;
        }
        .fb-contact-value a {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s;
        }
        .fb-contact-value a:hover {
          color: #c9a84c;
        }

        /* MAP */
        .fb-map-box {
          text-align: center;
        }
        .fb-map-container {
          width: 100%;
          height: 280px;
          border-radius: 8px;
          overflow: hidden;
          border: 1.5px solid rgba(201,168,76,0.3);
          margin-bottom: 20px;
        }
        .fb-map-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .fb-map-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 20px;
          border: 1.5px solid rgba(201,168,76,0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a84c;
          font-size: 2rem;
        }
        .fb-map-address {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .fb-map-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(201,168,76,0.15);
          border: 1.5px solid rgba(201,168,76,0.4);
          border-radius: 6px;
          padding: 12px 24px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a84c;
          text-decoration: none;
          transition: all 0.3s;
        }
        .fb-map-btn:hover {
          background: rgba(201,168,76,0.25);
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(201,168,76,0.2);
        }

        /* SOCIAL */
        .fb-social-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
          width: 100%;
          max-width: 500px;
        }
        .fb-social-item {
          display: flex;
          gap: 18px;
          align-items: center;
          padding: 20px 18px;
          background: rgba(0,0,0,0.6);
          border: 1.5px solid rgba(201,168,76,0.3);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .fb-social-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent);
          transition: left 0.6s ease;
        }
        .fb-social-item:hover::before {
          left: 100%;
        }
        .fb-social-item:hover {
          border-color: rgba(201,168,76,0.6);
          background: rgba(0,0,0,0.8);
          transform: translateX(8px);
          box-shadow: 0 8px 30px rgba(201,168,76,0.2);
        }
        .fb-social-icon-box {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          transition: transform 0.4s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .fb-social-item:hover .fb-social-icon-box {
          transform: scale(1.1) rotate(5deg);
        }
        .fb-social-icon-box.facebook {
          background: #1877f2;
          color: #fff;
        }
        .fb-social-icon-box.instagram {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          color: #fff;
        }
        .fb-social-text {
          flex: 1;
        }
        .fb-social-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #fff;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .fb-social-handle {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          margin-bottom: 6px;
        }
        .fb-social-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          line-height: 1.5;
        }

        /* TESTIMONIALS */
        .fb-testimonials {
          margin-bottom: 60px;
        }
        .fb-testimonials-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .fb-testimonials-icon {
          width: 120px;
          height: 120px;
          margin: 0 auto 8px;
          display: block;
          object-fit: contain;
        }
        .fb-testimonials-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(2rem, 4vw, 3.5rem);
          color: #fff;
          text-transform: uppercase;
          line-height: 1.1;
        }
        .fb-testimonials-title-gold {
          color: #c9a84c;
        }

        .fb-testimonial-card {
          display: flex;
          gap: 40px;
          align-items: center;
          background: rgba(0,0,0,0.7);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 8px;
          padding: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .fb-testimonial-card {
            flex-direction: column;
            text-align: center;
            padding: 32px 24px;
          }
        }
        .fb-testimonial-img {
          width: 200px;
          height: 200px;
          flex-shrink: 0;
          border-radius: 8px;
          object-fit: cover;
          border: 1.5px solid rgba(201,168,76,0.3);
        }
        .fb-testimonial-content {
          flex: 1;
        }
        .fb-testimonial-stars {
          color: #c9a84c;
          font-size: 1.4rem;
          margin-bottom: 16px;
          text-shadow: 0 0 20px rgba(201,168,76,0.3);
        }
        .fb-testimonial-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          color: rgba(255,255,255,0.85);
          line-height: 1.8;
          margin-bottom: 18px;
          font-style: italic;
        }
        .fb-testimonial-author {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #c9a84c;
          letter-spacing: 0.15em;
        }

        .fb-testimonials-nav {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 28px;
        }
        .fb-testimonials-arrow {
          width: 48px;
          height: 48px;
          border: 1.5px solid rgba(201,168,76,0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a84c;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
          background: rgba(0,0,0,0.6);
        }
        .fb-testimonials-arrow:hover {
          background: rgba(201,168,76,0.2);
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(201,168,76,0.2);
        }

        /* FOOTER CTA */
        .fb-footer-cta {
          background: transparent;
          border: none;
          border-radius: 8px;
          padding: 60px 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .fb-footer-cta-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          color: #fff;
          text-transform: uppercase;
          line-height: 1.2;
          margin-bottom: 36px;
          letter-spacing: 0.05em;
        }
        .fb-footer-cta-title-gold {
          color: #c9a84c;
          font-weight: 900;
        }
        .fb-footer-cta-btn {
          position: relative;
          overflow: visible;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 36px;
          background: #c9a84c;
          color: #111;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .fb-footer-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 28px rgba(201, 168, 76, 0.6);
        }

        /* CREDITS FOOTER */
        .fb-credits {
          background: transparent;
          border-top: none;
          padding: 40px 0;
          margin-top: 100px;
        }
        .fb-credits-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .fb-credits-left {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.08em;
        }
        .fb-credits-brand {
          color: #c9a84c;
          font-weight: 700;
          text-transform: uppercase;
        }
        .fb-credits-right {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 0.08em;
        }
        .fb-credits-separator {
          color: rgba(201, 168, 76, 0.4);
          margin: 0 10px;
        }
        .fb-credits-dev {
          color: #c9a84c;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }
        .fb-credits-dev:hover {
          color: #d4b55c;
          text-shadow: 0 0 10px rgba(201, 168, 76, 0.4);
        }
        @media (max-width: 768px) {
          .fb-credits-container {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          .fb-credits-left,
          .fb-credits-right {
            font-size: 0.65rem;
          }
        }
      `}</style>

      <section id="feedback" ref={ref} className="fb-section">
        <div className="fb-bg" style={{ backgroundImage: `url(${bgImageUrl})` }} />
        <div className="fb-overlay" />

        <div 
          className="fb-container"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* HEADER */}
          <div className="fb-header">
            <p className="fb-eyebrow">SUA OPINIÃO IMPORTA</p>
            <h2 className="fb-title">
              DEIXE SEU<br />
              <span className="fb-title-gold">FEEDBACK</span>
            </h2>
            <p className="fb-subtitle">
              Queremos sempre oferecer a melhor experiência para você e sua família.<br />
              Conte pra gente como foi!
            </p>
          </div>

          {/* BADGES */}
          <div className="fb-badges">
            <div className="fb-badge">
              <div className="fb-badge-icon">
                <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Bife com osso estilo T-bone/Picanha */}
                  {/* Contorno principal do bife */}
                  <path d="M20 28 C18 30 16 33 16 36 C16 40 18 44 22 46 C24 47 26 48 28 48 L36 48 C38 48 40 47 42 46 C46 44 48 40 48 36 C48 33 46 30 44 28 C42 26 39 25 36 25 L28 25 C25 25 22 26 20 28 Z"/>
                  
                  {/* Osso no centro */}
                  <circle cx="32" cy="32" r="5" strokeWidth="2.5"/>
                  <circle cx="32" cy="32" r="2" fill="currentColor"/>
                  
                  {/* Linhas de textura da carne - lado esquerdo */}
                  <path d="M22 32 C23 33 24 33 25 32" opacity="0.5" strokeWidth="1.5"/>
                  <path d="M20 38 C21 39 22 39 23 38" opacity="0.5" strokeWidth="1.5"/>
                  
                  {/* Linhas de textura da carne - lado direito */}
                  <path d="M39 32 C40 33 41 33 42 32" opacity="0.5" strokeWidth="1.5"/>
                  <path d="M41 38 C42 39 43 39 44 38" opacity="0.5" strokeWidth="1.5"/>
                  
                  {/* Detalhes de gordura/marmoreio */}
                  <ellipse cx="24" cy="35" rx="2" ry="1.5" opacity="0.4" strokeWidth="1"/>
                  <ellipse cx="40" cy="35" rx="2.5" ry="1.8" opacity="0.4" strokeWidth="1"/>
                  <ellipse cx="32" cy="42" rx="2" ry="1.2" opacity="0.4" strokeWidth="1"/>
                  
                  {/* Borda lateral do bife (espessura) */}
                  <path d="M28 48 L28 50 L36 50 L36 48" opacity="0.6" strokeWidth="1.5"/>
                </svg>
              </div>
              <p className="fb-badge-title">CARNES<br />SELECIONADAS</p>
            </div>
            <div className="fb-badge">
              <div className="fb-badge-icon">
                <svg width="36" height="36" viewBox="0 0 64 64" fill="currentColor" stroke="none">
                  {/* Chama estilizada preenchida */}
                  {/* Chama principal (grande) */}
                  <path d="M32 12 C32 12 26 20 26 28 C26 34 28 38 32 40 C32 38 34 36 34 32 C34 28 32 24 32 20 C32 20 36 24 38 28 C40 32 42 36 42 40 C42 48 38 54 32 54 C26 54 22 48 22 40 C22 30 26 20 32 12 Z" opacity="0.9"/>
                  
                  {/* Chama secundária (esquerda) */}
                  <path d="M28 24 C28 24 24 28 24 32 C24 36 26 38 28 38 C28 36 29 34 30 32 C30 30 28 28 28 24 Z" opacity="0.7"/>
                  
                  {/* Chama interna (destaque) */}
                  <path d="M32 26 C32 26 30 30 30 34 C30 38 31 40 32 42 C33 40 34 38 34 34 C34 30 32 26 32 26 Z" opacity="0.5"/>
                </svg>
              </div>
              <p className="fb-badge-title">CORTE PREMIUM<br />E FRESCOS</p>
            </div>
            <div className="fb-badge">
              <div className="fb-badge-icon">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {/* Caminhão detalhado */}
                  <rect x="4" y="16" width="22" height="16" rx="1"/>
                  <path d="M26 20 L32 20 L36 24 L36 32 L26 32 L26 20"/>
                  <circle cx="12" cy="34" r="3"/>
                  <circle cx="32" cy="34" r="3"/>
                  <line x1="8" y1="22" x2="20" y2="22"/>
                  <line x1="8" y1="26" x2="20" y2="26"/>
                  <path d="M30 24 L34 24 L34 28 L30 28" opacity="0.6"/>
                </svg>
              </div>
              <p className="fb-badge-title">ENTREGA RÁPIDA<br />E SEGURA</p>
            </div>
            <div className="fb-badge">
              <div className="fb-badge-icon">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {/* Escudo detalhado */}
                  <path d="M24 6 L8 12 L8 24 C8 32 12 38 24 42 C36 38 40 32 40 24 L40 12 Z"/>
                  <path d="M24 14 L16 20 L16 28 C16 32 18 35 24 38 C30 35 32 32 32 28 L32 20 Z" opacity="0.6"/>
                  <polyline points="18 24 22 28 30 20" strokeWidth="2.2"/>
                </svg>
              </div>
              <p className="fb-badge-title">COMPRA 100%<br />SEGURA</p>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="fb-grid">
            {/* FORM */}
            <div className="fb-box">
              <h3 className="fb-box-title">COMO FOI SUA EXPERIÊNCIA?</h3>
              <p className="fb-box-sub">Sua avaliação nos ajuda a melhorar sempre!</p>

              <form onSubmit={handleSubmit}>
                <div className="fb-rating-row">
                  <label className="fb-rating-label">Como você avalia nossos produtos?</label>
                  <div className="fb-stars">
                    {[1,2,3,4,5].map(n => (
                      <span
                        key={n}
                        className={`fb-star ${rating1 >= n ? 'active' : ''}`}
                        onClick={() => setRating1(n)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="fb-rating-row">
                  <label className="fb-rating-label">Como você avalia nosso atendimento?</label>
                  <div className="fb-stars">
                    {[1,2,3,4,5].map(n => (
                      <span
                        key={n}
                        className={`fb-star ${rating2 >= n ? 'active' : ''}`}
                        onClick={() => setRating2(n)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <textarea
                  className="fb-textarea"
                  placeholder="Conte pra gente o que achou..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="fb-input-row">
                  <input
                    type="text"
                    className="fb-input"
                    placeholder="Seu nome (opcional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="fb-input"
                    placeholder="Seu WhatsApp (opcional)"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>

                <button type="submit" className="fb-btn">
                  <span>✈</span>
                  ENVIAR FEEDBACK
                </button>
              </form>
            </div>

            {/* WHY */}
            <div className="fb-box">
              <h3 className="fb-box-title">POR QUE DAR SEU FEEDBACK?</h3>

              <div className="fb-why-list">
                <div className="fb-why-item">
                  <div className="fb-why-icon">👥</div>
                  <div className="fb-why-text">
                    <p className="fb-why-title">MELHORAMOS SEMPRE</p>
                    <p className="fb-why-desc">Sua opinião nos ajuda a entregar o melhor serviço possível.</p>
                  </div>
                </div>

                <div className="fb-why-item">
                  <div className="fb-why-icon">❤️</div>
                  <div className="fb-why-text">
                    <p className="fb-why-title">EXPERIÊNCIA <span className="fb-why-title-gold">PERSONALIZADA</span></p>
                    <p className="fb-why-desc">Entendemos suas preferências para atender ainda melhor.</p>
                  </div>
                </div>

                <div className="fb-why-item">
                  <div className="fb-why-icon">🤝</div>
                  <div className="fb-why-text">
                    <p className="fb-why-title">VOCÊ <span className="fb-why-title-gold">FAZ PARTE</span></p>
                    <p className="fb-why-desc">Aqui, cada cliente tem voz e participa da nossa evolução.</p>
                  </div>
                </div>

                <div className="fb-why-item">
                  <div className="fb-why-icon">🎁</div>
                  <div className="fb-why-text">
                    <p className="fb-why-title">QUEM AVALIA<br /><span className="fb-why-title-gold">GANHA BENEFÍCIOS!</span></p>
                    <p className="fb-why-desc">Avalie e concorra a descontos exclusivos toda semana.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT GRID */}
          <div className="fb-contact-grid">
            {/* ENTRE EM CONTATO */}
            <div className="fb-contact-box">
              <h3 className="fb-contact-title">ENTRE EM CONTATO</h3>
              <p className="fb-box-sub">Fale com a gente pelos canais abaixo<br />Atendimento via WhatsApp</p>

              <div className="fb-contact-item">
                <div className="fb-contact-icon">📞</div>
                <div className="fb-contact-text">
                  <p className="fb-contact-label">Fale com a gente pelo canal abaixo</p>
                  <p className="fb-contact-value">
                    <a href="https://wa.me/5515997172705" target="_blank" rel="noopener noreferrer">(15) 99717-2705</a>
                  </p>
                  <p className="fb-contact-value" style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: '4px' }}>
                    Atendimento via WhatsApp
                  </p>
                </div>
              </div>

              <div className="fb-contact-item">
                <div className="fb-contact-icon">✉️</div>
                <div className="fb-contact-text">
                  <p className="fb-contact-label">Respondemos em 1 Email</p>
                  <p className="fb-contact-value">
                    <a href="mailto:premiumbeefsorocaba.contato@gmail.com">premiumbeefsorocaba.contato@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="fb-contact-item">
                <div className="fb-contact-icon">🕐</div>
                <div className="fb-contact-text">
                  <p className="fb-contact-label">Horário de funcionamento</p>
                  <p className="fb-contact-value">
                    Terça a Sábado: 08:00h às 19:00h
                  </p>
                  <p className="fb-contact-value" style={{ marginTop: '4px' }}>
                    Domingo e Feriado: 08:00h às 13:00h
                  </p>
                </div>
              </div>
            </div>

            {/* NOSSA LOCALIZAÇÃO */}
            <div className="fb-contact-box fb-map-box">
              <h3 className="fb-contact-title">NOSSA LOCALIZAÇÃO</h3>
              <p className="fb-box-sub">Venha nos visitar</p>

              <div className="fb-map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.0234567890123!2d-47.4567890!3d-23.5012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58a7a7a7a7a7a%3A0x7a7a7a7a7a7a7a7a!2sR.%20S%C3%A3o%20Vicente%2C%20341%20-%20Vila%20Santa%20Rita%2C%20Sorocaba%20-%20SP%2C%2018080-010!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Premium Beef"
                ></iframe>
              </div>

              <p className="fb-map-address">
                R. São Vicente, 341 - Vila Santa Rita<br />
                Sorocaba - SP, CEP 18080-010
              </p>

              <a href="https://www.google.com/maps/search/?api=1&query=R.+São+Vicente,+341+-+Vila+Santa+Rita,+Sorocaba+-+SP,+18080-010" target="_blank" rel="noopener noreferrer" className="fb-map-btn">
                📍 VER NO MAPA
              </a>
            </div>

            {/* SIGA NOSSAS REDES */}
            <div className="fb-contact-box">
              <h3 className="fb-contact-title">SIGA NOSSAS REDES</h3>
              <p className="fb-box-sub">Acompanhe nossas novidades</p>

              <div className="fb-social-list">
                <a href="https://www.facebook.com/p/Premium-Beef-Sorocaba-61574917547251/" target="_blank" rel="noopener noreferrer" className="fb-social-item">
                  <div className="fb-social-icon-box facebook">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div className="fb-social-text">
                    <p className="fb-social-name">FACEBOOK</p>
                    <p className="fb-social-handle">/premiumbeef</p>
                    <p className="fb-social-desc">Fotos, dicas e ofertas</p>
                  </div>
                </a>

                <a href="https://www.instagram.com/premiumbeefsorocaba/" target="_blank" rel="noopener noreferrer" className="fb-social-item">
                  <div className="fb-social-icon-box instagram">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="fb-social-text">
                    <p className="fb-social-name">INSTAGRAM</p>
                    <p className="fb-social-handle">@premiumbeefsorocaba</p>
                    <p className="fb-social-desc">Veja nossas fotos e stories</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* TESTIMONIALS */}
          <div className="fb-testimonials">
            <div className="fb-testimonials-header">
              <img src={trofelImg} alt="Troféu" className="fb-testimonials-icon" />
              <h3 className="fb-testimonials-title">
                O QUE NOSSOS <span className="fb-testimonials-title-gold">CLIENTES</span> DIZEM
              </h3>
            </div>

            <div className="fb-testimonial-card">
              <img src={carneTestemunho} alt="Carne" className="fb-testimonial-img" />
              <div className="fb-testimonial-content">
                <div className="fb-testimonial-stars">★★★★★</div>
                <p className="fb-testimonial-text">"{testimonials[currentTestimonial].text}"</p>
                <p className="fb-testimonial-author">— {testimonials[currentTestimonial].name}</p>
              </div>
            </div>

            <div className="fb-testimonials-nav">
              <div className="fb-testimonials-arrow" onClick={prevTestimonial}>‹</div>
              <div className="fb-testimonials-arrow" onClick={nextTestimonial}>›</div>
            </div>
          </div>

          {/* FOOTER CTA */}
          <div className="fb-footer-cta">
            <h3 className="fb-footer-cta-title">
              PRONTO PARA O PRÓXIMO CHURRASCO?<br />
              PEÇA JÁ O <span className="fb-footer-cta-title-gold">SEU KIT!</span>
            </h3>
            <a 
              href="https://wa.me/5515997172705?text=Olá!%20Gostaria%20de%20pedir%20um%20kit." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="fb-footer-cta-btn"
            >
              PEDIR AGORA
            </a>
          </div>

          {/* CREDITS FOOTER */}
          <div className="fb-credits">
            <div className="fb-credits-container">
              <div className="fb-credits-left">
                © 2026 <span className="fb-credits-brand">PREMIUM BEEF</span> - TODOS OS DIREITOS RESERVADOS
              </div>
              <div className="fb-credits-right">
                DESIGN & DESENVOLVIMENTO <span className="fb-credits-separator">—</span> <a href="https://wa.me/5515981249470?text=Olá%2C%20vi%20seu%20trabalho%20no%20site%20premiumbeefsorocaba%20e%20tenho%20interesse%20em%20um%20projeto." target="_blank" rel="noopener noreferrer" className="fb-credits-dev">THALES CHAGAS</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
