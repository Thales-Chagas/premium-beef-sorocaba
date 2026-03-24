import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Cuts from './components/Cuts';
import Videos from './components/Videos';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function SectionDivider() {
  return (
    <div style={{
      background: '#0d0d0d',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      height: '64px',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.35))' }} />
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
        <path d="M9 1 L10.8 6.8 L17 6.8 L11.9 10.4 L13.7 16.2 L9 12.6 L4.3 16.2 L6.1 10.4 L1 6.8 L7.2 6.8 Z" fill="#c9a84c" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.35))' }} />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <Cuts />
        <Videos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
