import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Cuts from './components/Cuts';
import CutsAves from './components/CutsAves';
import Kits from './components/Kits';
import Feedback from './components/Feedback';
import Footer from './components/Footer';
import './index.css';

function SectionDivider({ fromColor = '#000', toColor = '#0d0d0d' }) {
  return (
    <div style={{
      background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      height: '48px',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.2))' }} />
      <svg width="12" height="12" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
        <path d="M9 1 L10.8 6.8 L17 6.8 L11.9 10.4 L13.7 16.2 L9 12.6 L4.3 16.2 L6.1 10.4 L1 6.8 L7.2 6.8 Z" fill="#c9a84c" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.2))' }} />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionDivider fromColor="#0d0d0d" toColor="#0d0d0d" />
        <About />
        <SectionDivider fromColor="#000" toColor="#000" />
        <Cuts />
        <SectionDivider fromColor="#0d0d0d" toColor="#0d0d0d" />
        <CutsAves />
        <SectionDivider fromColor="#000" toColor="#080604" />
        <Kits />
        <SectionDivider fromColor="#080604" toColor="#000" />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}
