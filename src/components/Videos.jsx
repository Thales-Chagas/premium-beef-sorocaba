import { useEffect, useRef, useState } from 'react';

// Vídeos do Facebook do Premium Beef Sorocaba
// Usando embed do Facebook para os vídeos do estabelecimento
const videos = [
  {
    title: 'Premium Beef Sorocaba',
    desc: 'Confira nossos cortes e promoções no Facebook',
    // Embed do perfil do Facebook do estabelecimento
    embedUrl: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61574917547251&show_text=false',
    fallbackUrl: 'https://www.facebook.com/profile.php?id=61574917547251',
  },
];

// Reels/posts do Instagram para exibir como galeria
const instagramPosts = [
  {
    label: 'Siga no Instagram',
    url: 'https://www.instagram.com/premiumbeefsorocaba/',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'Curta no Facebook',
    url: 'https://www.facebook.com/profile.php?id=61574917547251',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export default function Videos() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="videos" ref={ref} className="py-16 sm:py-24 lg:py-32 bg-[#1a1a1a] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#c0392b]/20 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-[#c0392b] text-xs tracking-[4px] uppercase font-semibold mb-3">Redes Sociais</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Nos <span className="text-[#c0392b]">Acompanhe</span>
          </h2>
          <div className="w-16 h-1 bg-[#c0392b] mx-auto mb-4" />
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Fique por dentro das novidades, promoções e conteúdos exclusivos nas nossas redes sociais
          </p>
        </div>

        {/* Facebook Video Embed */}
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 p-4 sm:p-8">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 text-center">
              Vídeos do Facebook
            </h3>
            <p className="text-white/50 text-sm text-center mb-6">
              Assista nossos vídeos diretamente do nosso perfil no Facebook
            </p>
            <div className="w-full overflow-hidden rounded-xl" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61574917547251&tabs=timeline%2Cvideos&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Premium Beef Facebook"
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61574917547251"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white no-underline rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Ver todos os vídeos no Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Social Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {instagramPosts.map((p) => (
            <a
              key={p.label}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-[#111] border border-white/5 hover:border-[#c0392b]/50 rounded-2xl p-6 no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(192,57,43,0.15)]"
            >
              <div className="text-white/60 group-hover:text-[#c0392b] transition-colors duration-300">
                {p.icon}
              </div>
              <div>
                <p className="text-white font-semibold text-base">{p.label}</p>
                <p className="text-white/40 text-sm mt-1">@premiumbeefsorocaba</p>
              </div>
              <span className="ml-auto text-white/30 group-hover:text-[#c0392b] transition-all duration-300 group-hover:translate-x-1">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
