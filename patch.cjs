const fs = require('fs');
let c = fs.readFileSync('src/components/About.jsx', 'utf8');

// 1. Fix CSS block
const oldCss = `        /* Textos centralizados e elegantes */
        .ab-cols {
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:0;
          margin-bottom:72px;
          max-width:680px;
          margin-left:auto;
          margin-right:auto;
        }
        .ab-cols p {
          font-family:'Playfair Display',serif;
          font-weight:400;
          font-size:1.15rem;
          line-height:1.9;
          color:rgba(255,255,255,0.82);
          text-align:center;
          font-style:italic;
        }
        .ab-cols p + p {
          margin-top:20px;
          padding-top:20px;
          border-top:1px solid rgba(201,168,76,0.15);
          font-family:'Montserrat',sans-serif;
          font-style:normal;
          font-weight:300;
          font-size:0.9rem;
          line-height:1.95;
          color:rgba(255,255,255,0.5);
        }`;

const newCss = `        .ab-cols { display:flex; flex-direction:row; align-items:flex-start; gap:40px; margin:0 auto 72px; max-width:900px; }
        .ab-col { flex:1; font-family:'Montserrat',sans-serif; font-weight:300; font-size:0.92rem; line-height:1.95; color:rgba(255,255,255,0.65); text-align:center; }`;

// 2. Fix JSX
const oldJsx = `            <div className="ab-cols">
              <p>O Premium Beef é um açougue especializado em cortes nobres e de alta qualidade, localizado em Sorocaba. Trabalhamos com carnes selecionadas, garantindo frescor e sabor incomparáveis em cada pedaço.</p>
              <p>Nossa missão é levar o melhor da carne bovina, suína e de frango para a sua mesa, com atendimento personalizado e produtos que fazem a diferença no seu churrasco ou no dia a dia.</p>
            </div>`;

const newJsx = `            <div className="ab-cols">
              <div className="ab-col"><p>O Premium Beef é um açougue especializado em cortes nobres e de alta qualidade, localizado em Sorocaba. Trabalhamos com carnes selecionadas, garantindo frescor e sabor incomparáveis em cada pedaço.</p></div>
              <div className="ab-col"><p>Nossa missão é levar o melhor da carne bovina, suína e de frango para a sua mesa, com atendimento personalizado e produtos que fazem a diferença no seu churrasco ou no dia a dia.</p></div>
            </div>`;

// 3. Fix media query
const oldMq = `          .ab-cols { margin-bottom:48px; max-width:100%; }
          .ab-cols p { font-size:1rem; line-height:1.8; }
          .ab-cols p + p { font-size:0.82rem; }`;

const newMq = `          .ab-cols { flex-direction:column; gap:20px; margin-bottom:48px; }
          .ab-col { font-size:0.88rem; line-height:1.8; }`;

if (!c.includes(oldCss)) { console.log('CSS block not found'); process.exit(1); }
if (!c.includes(oldJsx)) { console.log('JSX block not found'); process.exit(1); }
if (!c.includes(oldMq)) { console.log('MQ block not found'); process.exit(1); }

c = c.replace(oldCss, newCss).replace(oldJsx, newJsx).replace(oldMq, newMq);
fs.writeFileSync('src/components/About.jsx', c, 'utf8');
console.log('Done! New length:', c.length);
