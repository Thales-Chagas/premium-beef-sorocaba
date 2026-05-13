# -*- coding: utf-8 -*-
c = open('src/components/Cuts.jsx', 'r', encoding='utf-8').read()

# 1. min-height instead of height
c = c.replace('height:100vh; display:flex; align-items:flex-start;', 'min-height:100vh; display:flex; align-items:flex-start;')

# 2. Add image area to card CSS - replace ct-card padding with ct-card-body
old_card = 'padding:2vh 1.5vw; position:relative; overflow:hidden; transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s; cursor:default; }'
new_card = 'position:relative; overflow:hidden; transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s; cursor:default; }\n  .ct-card-img { width:100%; height:160px; object-fit:cover; display:block; }\n  .ct-card-img-placeholder { width:100%; height:160px; background:linear-gradient(135deg,rgba(201,168,76,0.06),rgba(0,0,0,0.4)); display:flex; align-items:center; justify-content:center; color:rgba(201,168,76,0.15); font-size:2.5rem; letter-spacing:0.2em; font-family:Montserrat,sans-serif; font-size:0.6rem; text-transform:uppercase; }\n  .ct-card-body { padding:1.5vh 1.2vw; }'
c = c.replace(old_card, new_card)

# 3. Update JSX - wrap card content in ct-card-body and add placeholder image area
old_jsx = '''                <div className="ct-card-line" />
                {cut.badge && <span className="ct-badge">{cut.badge}</span>}
                <p className="ct-cat">{cut.category}</p>
                <h3 className="ct-name">{cut.name}</h3>
                <p className="ct-desc">{cut.desc}</p>
                <a'''

new_jsx = '''                <div className="ct-card-line" />
                {cut.badge && <span className="ct-badge">{cut.badge}</span>}
                <div className="ct-card-img-placeholder">&#10022;</div>
                <div className="ct-card-body">
                <p className="ct-cat">{cut.category}</p>
                <h3 className="ct-name">{cut.name}</h3>
                <p className="ct-desc">{cut.desc}</p>
                <a'''

old_jsx_end = '''                  className="ct-link"
                >
                  Pedir agora <span>→</span>
                </a>
              </div>'''

new_jsx_end = '''                  className="ct-link"
                >
                  Pedir agora <span>→</span>
                </a>
                </div>
              </div>'''

if old_jsx in c:
    c = c.replace(old_jsx, new_jsx)
    print('JSX card atualizado')
else:
    print('JSX card nao encontrado')

if old_jsx_end in c:
    c = c.replace(old_jsx_end, new_jsx_end)
    print('JSX card end atualizado')
else:
    print('JSX card end nao encontrado')

open('src/components/Cuts.jsx', 'w', encoding='utf-8', newline='\n').write(c)
print('Salvo')
