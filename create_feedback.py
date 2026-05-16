#!/usr/bin/env python3
# Script para criar o componente Feedback completo

feedback_content = '''import { useState, useRef, useEffect } from 'react';
import fundoFeedback from '../assets/fundo feedback.png';
import carneTestemunho from '../assets/carne.png';

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
    { name: 'João P.', text: 'Carne de altíssima qualidade! Comprei no grupo e todo mundo elogiou. Voltarei com certeza!', stars: 5 },
    { name: 'Lucas R.', text: 'Melhor açougue que comprei! Tudo selecionado e muito bem embalado. Recomendo demais!', stars: 5 },
    { name: 'Rafael M.', text: 'Atendimento excelente e carnes ainda melhores. Recomendo de olhos fechados!', stars: 5 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*NOVO FEEDBACK*\\n\\n*Avaliação Produtos:* ${rating1}/5 ⭐\\n*Avaliação Atendimento:* ${rating2}/5 ⭐\\n*Comentário:* ${comment}\\n*Nome:* ${name || 'Não informado'}\\n*WhatsApp:* ${whatsapp || 'Não informado'}`;
    window.open(`https://wa.me/5515997172705?text=${encodeURIComponent(message)}`, '_blank');
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="feedback" ref={ref} className="py-16 sm:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={fundoFeedback} alt="" className="w-full h-full object-cover opacity-20" style={{filter: 'brightness(0.22)'}} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />
      </div>

      <div 
        className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* HEADER */}
        <div className="mb-12 text-left">
          <p className="text-white/50 text-[0.65rem] tracking-[0.35em] uppercase font-semibold mb-3">SUA OPINIÃO IMPORTA</p>
          <h2 className="font-serif text-5xl lg:text-6xl font-black text-white uppercase leading-none mb-4">
            DEIXE SEU<br />
            <span className="text-[#c9a84c]">FEEDBACK</span>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-md">
            Queremos sempre oferecer a melhor<br />
            experiência para você e sua família.<br />
            Conte pra gente como foi!
          </p>
        </div>

        {/* BADGES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: '🥩', title: 'CARNES\\nSELECIONADAS' },
            { icon: '🔥', title: 'CORTE PREMIUM\\nE FRESCOS' },
            { icon: '🚚', title: 'ENTREGA RÁPIDA\\nE SEGURA' },
            { icon: '🛡️', title: 'COMPRA 100%\\nSEGURA' },
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-5 bg-black/50 border border-[#c9a84c]/25 rounded">
              <div className="w-12 h-12 border border-[#c9a84c]/40 rounded-full flex items-center justify-center text-2xl">{badge.icon}</div>
              <p className="text-white text-[0.55rem] font-bold tracking-wider uppercase text-center leading-snug whitespace-pre-line">{badge.title}</p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* FORM */}
          <div className="bg-black/65 border border-[#c9a84c]/25 rounded p-7">
            <h3 className="text-[#c9a84c] text-[0.8rem] font-bold tracking-widest uppercase text-center mb-2">COMO FOI SUA EXPERIÊNCIA?</h3>
            <p className="text-white/50 text-[0.6rem] text-center mb-6">Sua avaliação nos ajuda a melhorar sempre!</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="text-white/70 text-[0.62rem] block mb-2">Como você avalia nossos produtos?</label>
                <div className="flex gap-2 justify-center">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className={`text-3xl cursor-pointer transition-all ${rating1 >= n ? 'text-[#c9a84c]' : 'text-[#c9a84c]/30'} hover:scale-110`} onClick={() => setRating1(n)}>★</span>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="text-white/70 text-[0.62rem] block mb-2">Como você avalia nosso atendimento?</label>
                <div className="flex gap-2 justify-center">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className={`text-3xl cursor-pointer transition-all ${rating2 >= n ? 'text-[#c9a84c]' : 'text-[#c9a84c]/30'} hover:scale-110`} onClick={() => setRating2(n)}>★</span>
                  ))}
                </div>
              </div>

              <textarea className="w-full min-h-[90px] bg-black/60 border border-[#c9a84c]/25 rounded p-3 text-white text-[0.65rem] resize-vertical mb-4 focus:outline-none focus:border-[#c9a84c]/50" placeholder="Conte pra gente o que achou..." value={comment} onChange={(e) => setComment(e.target.value)} />

              <div className="grid grid-cols-2 gap-3 mb-5">
                <input type="text" className="w-full bg-black/60 border border-[#c9a84c]/25 rounded p-2.5 text-white text-[0.65rem] focus:outline-none focus:border-[#c9a84c]/50" placeholder="Seu nome (opcional)" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" className="w-full bg-black/60 border border-[#c9a84c]/25 rounded p-2.5 text-white text-[0.65rem] focus:outline-none focus:border-[#c9a84c]/50" placeholder="Seu WhatsApp (opcional)" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </div>

              <button type="submit" className="w-full bg-[#c9a84c] text-black text-[0.65rem] font-bold tracking-widest uppercase rounded p-3.5 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(201,168,76,0.6)]">
                <span>✈</span>
                ENVIAR FEEDBACK
              </button>
            </form>
          </div>

          {/* WHY */}
          <div className="bg-black/65 border border-[#c9a84c]/25 rounded p-7">
            <h3 className="text-[#c9a84c] text-[0.8rem] font-bold tracking-widest uppercase text-center mb-6">POR QUE DAR SEU FEEDBACK?</h3>

            <div className="flex flex-col gap-5">
              {[
                { icon: '👥', title: 'MELHORAMOS SEMPRE', desc: 'Sua opinião nos ajuda a entregar o melhor serviço possível.' },
                { icon: '❤️', title: 'EXPERIÊNCIA PERSONALIZADA', desc: 'Entendemos suas preferências para atender ainda melhor.' },
                { icon: '🤝', title: 'VOCÊ FAZ PARTE', desc: 'Aqui, cada cliente tem voz e participa da nossa evolução.' },
                { icon: '🎁', title: 'QUEM AVALIA\\nGANHA BENEFÍCIOS!', desc: 'Avalie e concorra a descontos exclusivos toda semana.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3.5">
                  <div className="w-11 h-11 flex-shrink-0 border border-[#c9a84c]/35 rounded-full flex items-center justify-center text-xl">{item.icon}</div>
                  <div>
                    <p className="text-white text-[0.7rem] font-bold tracking-wider uppercase mb-1.5 whitespace-pre-line">{item.title.includes('GANHA') ? <><span>QUEM AVALIA</span><br /><span className="text-[#c9a84c]">GANHA BENEFÍCIOS!</span></> : item.title.includes('PERSONALIZADA') ? <><span>EXPERIÊNCIA </span><span className="text-[#c9a84c]">PERSONALIZADA</span></> : item.title.includes('FAZ') ? <><span>VOCÊ </span><span className="text-[#c9a84c]">FAZ PARTE</span></> : item.title}</p>
                    <p className="text-white/50 text-[0.6rem] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT GRID */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* ENTRE EM CONTATO */}
          <div className="bg-black/65 border border-[#c9a84c]/25 rounded p-7">
            <h3 className="text-[#c9a84c] text-[0.75rem] font-bold tracking-widest uppercase text-center mb-2">ENTRE EM CONTATO</h3>
            <p className="text-white/50 text-[0.6rem] text-center mb-6">Fale com a gente pelos canais abaixo<br />Atendimento via WhatsApp</p>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 flex-shrink-0 border border-[#c9a84c]/35 rounded-full flex items-center justify-center text-[#c9a84c]">📞</div>
                <div>
                  <p className="text-white/50 text-[0.6rem] uppercase tracking-wider mb-1">Fale com a gente pelo canal abaixo</p>
                  <p className="text-white text-[0.7rem] font-semibold"><a href="https://wa.me/5515997172705" className="text-white hover:text-[#c9a84c] no-underline">(11) 99999-9999</a><br />Atendimento via WhatsApp</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 flex-shrink-0 border border-[#c9a84c]/35 rounded-full flex items-center justify-center text-[#c9a84c]">✉️</div>
                <div>
                  <p className="text-white/50 text-[0.6rem] uppercase tracking-wider mb-1">Respondemos em 1 Email</p>
                  <p className="text-white text-[0.7rem] font-semibold"><a href="mailto:contato@seuacougue.com.br" className="text-white hover:text-[#c9a84c] no-underline">contato@seuacougue.com.br</a></p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 flex-shrink-0 border border-[#c9a84c]/35 rounded-full flex items-center justify-center text-[#c9a84c]">🕐</div>
                <div>
                  <p className="text-white/50 text-[0.6rem] uppercase tracking-wider mb-1">Horário de funcionamento</p>
                  <p className="text-white text-[0.7rem] font-semibold">Segunda a Domingo<br />07:00h às 22:00h</p>
                </div>
              </div>
            </div>
          </div>

          {/* NOSSA LOCALIZAÇÃO */}
          <div className="bg-black/65 border border-[#c9a84c]/25 rounded p-7 text-center">
            <h3 className="text-[#c9a84c] text-[0.75rem] font-bold tracking-widest uppercase mb-2">NOSSA LOCALIZAÇÃO</h3>
            <p className="text-white/50 text-[0.6rem] mb-6">Venha nos visitar</p>

            <div className="w-16 h-16 mx-auto mb-4 border border-[#c9a84c]/40 rounded-full flex items-center justify-center text-[#c9a84c] text-3xl">📍</div>

            <p className="text-white/70 text-[0.65rem] leading-relaxed mb-4">
              Rua das Carnes, 1234 - Vila Brasileira<br />
              Sorocaba - SP, CEP 18000-000
            </p>

            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/40 rounded px-5 py-2.5 text-[#c9a84c] text-[0.6rem] font-bold tracking-widest uppercase no-underline transition-all hover:bg-[#c9a84c]/25 hover:-translate-y-0.5">
              📍 VER NO MAPA
            </a>
          </div>

          {/* SIGA NOSSAS REDES */}
          <div className="bg-black/65 border border-[#c9a84c]/25 rounded p-7">
            <h3 className="text-[#c9a84c] text-[0.75rem] font-bold tracking-widest uppercase text-center mb-2">SIGA NOSSAS REDES</h3>
            <p className="text-white/50 text-[0.6rem] text-center mb-6">Acompanhe nossas novidades</p>

            <div className="flex flex-col gap-3.5">
              <a href="https://facebook.com/premiumbeef" target="_blank" rel="noopener noreferrer" className="flex gap-3.5 items-center p-3 bg-black/40 border border-[#c9a84c]/20 rounded no-underline transition-all hover:border-[#c9a84c]/50 hover:bg-black/60 hover:translate-x-1">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#1877f2] flex items-center justify-center text-white text-xl">f</div>
                <div>
                  <p className="text-white text-[0.7rem] font-bold tracking-wider uppercase mb-0.5">FACEBOOK</p>
                  <p className="text-white/50 text-[0.58rem]">/premiumbeef</p>
                  <p className="text-white/40 text-[0.55rem] leading-snug">Fotos, dicas e ofertas</p>
                </div>
              </a>

              <a href="https://instagram.com/acouguepremium" target="_blank" rel="noopener noreferrer" className="flex gap-3.5 items-center p-3 bg-black/40 border border-[#c9a84c]/20 rounded no-underline transition-all hover:border-[#c9a84c]/50 hover:bg-black/60 hover:translate-x-1">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white text-xl">📷</div>
                <div>
                  <p className="text-white text-[0.7rem] font-bold tracking-wider uppercase mb-0.5">INSTAGRAM</p>
                  <p className="text-white/50 text-[0.58rem]">@acouguepremium</p>
                  <p className="text-white/40 text-[0.55rem] leading-snug">Veja nossas fotos e stories</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-[#c9a84c] text-3xl mb-2">🏆</p>
            <h3 className="font-serif text-3xl lg:text-4xl font-black text-white uppercase">
              O QUE NOSSOS <span className="text-[#c9a84c]">CLIENTES</span> DIZEM
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-black/65 border border-[#c9a84c]/25 rounded p-8 flex flex-col lg:flex-row gap-6 items-center">
              <img src={carneTestemunho} alt="Carne" className="w-44 h-44 flex-shrink-0 rounded border border-[#c9a84c]/30 object-cover" />
              <div>
                <div className="text-[#c9a84c] text-xl mb-3">★★★★★</div>
                <p className="text-white/80 text-sm lg:text-base italic leading-relaxed mb-3.5">"{testimonials[currentTestimonial].text}"</p>
                <p className="text-[#c9a84c] text-[0.7rem] font-bold tracking-wider">— {testimonials[currentTestimonial].name}</p>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-5">
              <button onClick={prevTestimonial} className="w-10 h-10 border border-[#c9a84c]/40 rounded-full flex items-center justify-center text-[#c9a84c] text-xl bg-black/50 transition-all hover:bg-[#c9a84c]/20 hover:scale-110">‹</button>
              <button onClick={nextTestimonial} className="w-10 h-10 border border-[#c9a84c]/40 rounded-full flex items-center justify-center text-[#c9a84c] text-xl bg-black/50 transition-all hover:bg-[#c9a84c]/20 hover:scale-110">›</button>
            </div>
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="bg-black/70 border border-[#c9a84c]/30 rounded p-8 lg:p-12 text-center">
          <h3 className="font-serif text-3xl lg:text-5xl font-black text-white uppercase leading-none mb-6">
            PRONTO PARA O PRÓXIMO CHURRASCO?<br />
            PEÇA JÁ O <span className="text-[#c9a84c]">SEU KIT!</span>
          </h3>
          <a href="https://wa.me/5515997172705?text=Olá!%20Gostaria%20de%20pedir%20um%20kit." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#c9a84c] text-black text-[0.7rem] font-bold tracking-widest uppercase rounded px-8 py-4 no-underline transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(201,168,76,0.7)]">
            💬 PEDIR AGORA PELO WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
'''

# Escrever o arquivo
with open(r'c:\Users\thale\OneDrive\Área de Trabalho\premiumbeef\src\components\Feedback.jsx', 'w', encoding='utf-8') as f:
    f.write(feedback_content)

print("✅ Componente Feedback.jsx criado com sucesso!")
