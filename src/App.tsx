import { useRef, useCallback, useEffect, useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';

/* Inline SVG social icons */
const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GlobeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/* ─── Fade helper (vanilla JS) ───────────────────────────────── */
function animateOpacity(
  el: HTMLVideoElement,
  from: number,
  to: number,
  duration: number,
  onDone?: () => void
) {
  const start = performance.now();
  el.style.opacity = String(from);

  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.style.opacity = String(from + (to - from) * progress);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else if (onDone) {
      onDone();
    }
  }

  requestAnimationFrame(tick);
}

/* ─── Hero Section ───────────────────────────────────────────── */
function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOut = useRef(false);
  const [inputFocused, setInputFocused] = useState(false);

  // Mouse parallax state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform normalized mouse (-1 to 1) to rotation and movement
  // Positive rotation on Y axis turns it right. Positive X axis turns it down.
  const rotateX = useTransform(smoothMouseY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-4, 4]);
  const translateX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const translateY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Normalize to -1 to 1
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = (e.clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleCanPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => { });
    animateOpacity(v, 0, 1, 600);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || fadingOut.current) return;
    const remaining = v.duration - v.currentTime;
    if (remaining <= 0.55) {
      fadingOut.current = true;
      animateOpacity(v, parseFloat(v.style.opacity || '1'), 0, 500);
    }
  }, []);

  const handleEnded = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.style.opacity = '0';
    fadingOut.current = false;
    setTimeout(() => {
      v.currentTime = 0;
      v.play().catch(() => { });
      animateOpacity(v, 0, 1, 600);
    }, 100);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.addEventListener('canplay', handleCanPlay);
    v.addEventListener('timeupdate', handleTimeUpdate);
    v.addEventListener('ended', handleEnded);
    return () => {
      v.removeEventListener('canplay', handleCanPlay);
      v.removeEventListener('timeupdate', handleTimeUpdate);
      v.removeEventListener('ended', handleEnded);
    };
  }, [handleCanPlay, handleTimeUpdate, handleEnded]);

  const navLinks = ['Features', 'Location', 'Schedule', 'Availability'];

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* ── Background video + overlay ─────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          scale: 1.05, // scale slightly up so edges don't show when transforming
        }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          style={{ opacity: 0 }}
          muted
          autoPlay
          playsInline
          preload="auto"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
        />
        {/* Deep navy gradient overlay for contrast + branding */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              180deg,
              rgba(6,10,26,0.55) 0%,
              rgba(11,16,38,0.35) 35%,
              rgba(11,16,38,0.5) 70%,
              rgba(6,10,26,0.92) 100%
            )`,
          }}
        />
      </motion.div>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className="relative z-20 py-6 w-full flex-none">
        <div className="w-full px-4 md:px-8 lg:px-12 flex justify-between items-center relative">
          {/* Brand */}
          <div className="flex items-center gap-2.5 justify-start">
            <MapPin size={18} style={{ color: 'var(--amber)' }} />
            <span
              className="text-lg font-semibold tracking-wide"
              style={{ color: 'var(--text-primary)' }}
            >
              AskMe
            </span>
          </div>

          {/* Center nav links */}
          <div className="hidden md:flex items-center justify-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right: Login */}
          <div className="flex justify-end">
            <button className="btn-ghost text-[13px]">Login</button>
          </div>
        </div>
      </nav>

      {/* ── Hero content ───────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8 text-center self-center">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* Main heading */}
          <motion.h1
            className="mb-8 break-words text-center"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="block text-center text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Know it
            </span>
            <span
              className="block text-center text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              then{' '}
              <em
                className="italic"
                style={{ color: 'var(--amber)' }}
              >
                all.
              </em>
            </span>
          </motion.h1>

          {/* Subtitle + CTA block */}
          <motion.div
            className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-base sm:text-lg leading-relaxed mb-2 break-words text-center"
              style={{ color: 'var(--text-secondary)' }}
            >
              Join us for an epic, once-in-a-lifetime journey. Begin searching
              for anything you want to know right here.
            </p>

            {/* Email subscribe */}
            <div
              className="glass-card rounded-full pl-5 pr-1.5 py-1.5 flex flex-nowrap items-center gap-2 sm:gap-3 transition-all duration-200 w-full max-w-[95%] sm:max-w-md mx-auto"
              style={{
                borderColor: inputFocused
                  ? 'rgba(232, 119, 46, 0.35)'
                  : undefined,
                boxShadow: inputFocused
                  ? '0 0 0 3px rgba(232, 119, 46, 0.08)'
                  : undefined,
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                className="flex-1 bg-transparent outline-none text-sm min-w-[150px] text-center"
                style={{
                  color: 'var(--text-primary)',
                  caretColor: 'var(--amber)',
                }}
              />
              <button
                id="hero-subscribe-btn"
                className="btn-amber flex items-center gap-1.5 shrink-0 !py-2.5 !px-5"
              >
                <span className="text-[13px]">Subscribe</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Meta text centered below */}
            <p
              className="text-xs break-words text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              We won't share your data with anyone or spam your inbox.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar (nav secondary + socials) ───────────────── */}
      <div
        className="relative z-10 border-t py-6 w-full flex-none"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="w-full px-4 md:px-8 lg:px-12 flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:gap-0 relative">
          {/* Left Column (copyright/meta) */}
          <div className="text-xs text-[var(--text-muted)] text-center md:text-start w-full md:w-auto mt-2 md:mt-0">
            © 2026 W for Wijaya. <span className="hidden sm:inline">All rights reserved.</span>
          </div>

          {/* Center: Bottom nav links */}
          <div className="hidden md:flex items-center justify-center gap-6 md:absolute md:left-1/2 md:-translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs font-medium transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center justify-center md:justify-end gap-3 w-full md:w-auto">
            {[InstagramIcon, TwitterIcon, GlobeIcon].map((Icon, i) => (
              <button
                key={i}
                className="p-2 rounded-full transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--amber)';
                  e.currentTarget.style.background = 'var(--amber-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Lenis from 'lenis';
import SparkleCursor from './components/SparkleCursor';

export default function App() {
  const [toast, setToast] = useState<{ visible: boolean; message: string; subMessage: string }>({
    visible: false,
    message: '',
    subMessage: ''
  });
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showPopup = useCallback(() => {
    setToast({
      visible: true,
      message: 'Developer malas membuat fitur yang lain 😴',
      subMessage: 'Ini hanya web statis.'
    });
    
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button');
      
      if (clickable) {
        const isLink = clickable.tagName === 'A';
        const href = clickable.getAttribute('href');
        const isInternalScroll = isLink && href?.startsWith('#') && href !== '#';
        
        if (!isInternalScroll) {
          e.preventDefault();
          showPopup();
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showPopup]);

  useEffect(() => {
    // Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full overflow-x-hidden flex flex-col">
      <SparkleCursor />
      <HeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      <Footer />

      {/* Lazy Developer Toast */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 px-6 py-4 rounded-2xl border border-white/10 shadow-2xl"
            style={{ background: 'rgba(11, 16, 38, 0.85)', backdropFilter: 'blur(12px)' }}
          >
            <p className="text-sm md:text-base font-medium text-white">{toast.message}</p>
            <p className="text-xs text-[var(--amber)] font-medium">{toast.subMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

