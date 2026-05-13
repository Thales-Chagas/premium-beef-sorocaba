content = open('src/components/About.jsx', 'r', encoding='utf-8').read()

# Fix keyframes
content = content.replace('@keyframes ab-rise {', '@keyframes ab-fireRise {')
content = content.replace('@keyframes ab-float {', '@keyframes ab-ember {')
content = content.replace('animation:ab-rise ', 'animation:ab-fireRise ')
content = content.replace('animation:ab-float ', 'animation:ab-ember ')

fire_css = """
        .ab-fire-btn { position:relative; overflow:visible; display:inline-block; font-family:'Montserrat',sans-serif; font-size:0.72rem; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; text-decoration:none; padding:10px 28px; background:#c9a84c; color:#1a1a1a; border:1px solid #c9a84c; border-radius:2px; transition:transform 0.3s,box-shadow 0.3s; }
        .ab-fire-btn:hover { transform:translateY(-2px); box-shadow:0 0 30px rgba(201,168,76,0.6),0 0 60px rgba(201,168,76,0.3); }
        .ab-fire-btn .ab-flames { position:absolute; bottom:100%; left:0; width:100%; height:28px; pointer-events:none; display:flex; justify-content:space-around; align-items:flex-end; opacity:0; transition:opacity 0.2s; }
        .ab-fire-btn:hover .ab-flames { opacity:1; }
        .ab-fire-btn .ab-flame { width:5px; border-radius:50% 50% 20% 20%; animation:ab-fireRise 0.5s ease-out infinite; }
        .ab-fire-btn .ab-flame:nth-child(odd) { background:linear-gradient(to top,#f0c040,#e74c3c); height:16px; }
        .ab-fire-btn .ab-flame:nth-child(even) { background:linear-gradient(to top,#e74c3c,#c0392b); height:10px; animation-delay:.15s; }
        .ab-fire-btn .ab-flame:nth-child(3n) { background:linear-gradient(to top,#fff,#f0c040); height:20px; animation-delay:.08s; }
        .ab-fire-btn .ab-embers { position:absolute; bottom:95%; left:0; width:100%; height:30px; pointer-events:none; opacity:0; transition:opacity 0.2s; }
        .ab-fire-btn:hover .ab-embers { opacity:1; }
        .ab-fire-btn .ab-ember { position:absolute; width:3px; height:3px; border-radius:50%; background:#f0c040; animation:ab-ember 0.8s ease-out infinite; }
"""

if '.ab-fire-btn' not in content:
    content = content.replace('        .ab-section {', fire_css + '        .ab-section {')
    print('CSS do fogo adicionado')
else:
    print('CSS do fogo ja existe')

# Fix JSX - replace old button with new one using ab-fire-btn classes
old = 'className="fire-btn btn-primary">'
new = 'className="ab-fire-btn">'
if old in content:
    content = content.replace(old, new)
    # fix spans inside
    content = content.replace('<span className="flames">{flames}</span>', '''<span className="ab-flames">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="ab-flame" style={{ animationDelay: (i * 0.05) + 's' }} />
                  ))}
                </span>''')
    content = content.replace('<span className="embers">{embers}</span>', '''<span className="ab-embers">
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="ab-ember" style={{ left: (10 + i * 15) + '%', animationDelay: (i * 0.12) + 's', '--ex': ((i % 2 === 0 ? 1 : -1) * (4 + i * 2)) + 'px' }} />
                  ))}
                </span>''')
    print('JSX do botao corrigido')
else:
    print('Botao fire-btn nao encontrado, verificar manualmente')

open('src/components/About.jsx', 'w', encoding='utf-8').write(content)
print('Arquivo salvo com sucesso')
