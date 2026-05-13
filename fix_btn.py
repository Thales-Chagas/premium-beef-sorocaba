c = open('src/components/About.jsx', 'r', encoding='utf-8').read()

old = '''            <a
              href="https://wa.me/5515997172705?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Premium%20Beef."
              target="_blank"
              rel="noopener noreferrer"
              className="ab-btn"
            >
              <span className="ab-flames">{flames}</span>
              <span className="ab-embers">{embers}</span>
              Falar no WhatsApp
            </a>'''

new = '''            <div style={{display:'flex',justifyContent:'center'}}>
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
            </div>'''

if old in c:
    c = c.replace(old, new)
    print('Substituido com sucesso')
else:
    print('Nao encontrado')
    print(repr(c[c.find('ab-btn')-20:c.find('ab-btn')+100]))

open('src/components/About.jsx', 'w', encoding='utf-8').write(c)
