import { motion } from 'framer-motion';
import { Mail, Globe, MapPin } from 'lucide-react';

/* Custom SVG social icons matching the clean reference design */
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  const exploreLinks = [
    { label: 'About', href: '#about-section' },
    { label: 'Story', href: '#philosophy-section' },
    { label: 'Services', href: '#services-section' },
    { label: 'Discover', href: '#featured-video-section' }
  ];

  const servicesLinks = [
    { label: 'Research & Insight', href: '#services-section' },
    { label: 'Design & Execution', href: '#services-section' },
    { label: 'Technology & Scale', href: '#services-section' },
    { label: 'Creative Development', href: '#philosophy-section' }
  ];

  return (
    <footer 
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--navy-deepest) 0%, var(--navy-deep) 100%)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 'clamp(6rem, 10vw, 9rem)', // Plentiful breathing room at the top
        paddingBottom: 'clamp(3rem, 6vw, 5rem)'
      }}
    >
      {/* Background glow effects to enhance visual layers */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-[800px] h-[250px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: 'var(--amber-glow)' }}
      />
      <div
        className="absolute bottom-0 right-10 w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-10"
        style={{ background: 'var(--amber-glow)' }}
      />

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 mx-auto">
        {/* Main 4-Column Grid proportionally balanced */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Column 1: Brand & Bio (4/12 width) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              {/* Stylized Logo Icon */}
              <motion.div 
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg text-white"
                style={{ 
                  background: 'linear-gradient(135deg, var(--amber) 0%, var(--amber-light) 100%)',
                  boxShadow: '0 4px 15px rgba(232, 119, 46, 0.25)'
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span>W</span>
              </motion.div>
              <span className="text-lg font-semibold tracking-wide text-[var(--text-primary)]">
                W for Wijaya
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] font-light max-w-xs">
              Empowering businesses with cutting-edge technology and aesthetic web designs that drive engagement and growth.
            </p>

            {/* Social Media Buttons (Filled Circle reference style) */}
            <div className="flex items-center gap-2.5 mt-2">
              {[
                { Icon: GithubIcon, href: 'https://github.com/WijayaKusumaa', label: 'GitHub' },
                { Icon: LinkedinIcon, href: 'https://linkedin.com/in/wijayadev', label: 'LinkedIn' },
                { Icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
                { Icon: InstagramIcon, href: 'https://www.instagram.com/haswaltch_/', label: 'Instagram' }
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-white/5 bg-white/[0.03] text-[var(--text-secondary)] hover:text-white hover:border-[var(--amber)]/30 hover:bg-[var(--amber)] transition-colors duration-300"
                  whileHover={{ y: -2 }}
                  title={label}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore (2/12 width) */}
          <div className="md:col-span-2 flex flex-col gap-5 lg:pl-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)] flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[var(--amber)] rounded-full"></span>
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-white hover:underline underline-offset-4 decoration-white/10"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Capabilities (3/12 width) */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)] flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[var(--amber)] rounded-full"></span>
              Capabilities
            </h4>
            <ul className="flex flex-col gap-3">
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-white hover:underline underline-offset-4 decoration-white/10"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & System Status (3/12 width) */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)] flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[var(--amber)] rounded-full"></span>
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3.5">
              <a 
                href="mailto:hello@wijaya.dev" 
                className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Mail size={15} className="text-[var(--amber)]" />
                <span>hello@wijaya.dev</span>
              </a>
              <a 
                href="https://wijaya.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Globe size={15} className="text-[var(--amber)]" />
                <span>wijaya.dev</span>
              </a>
              <div className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                <MapPin size={15} className="text-[var(--amber)]" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>

            {/* Pulsing Systems Operational status bar (Reference layout check) */}
            <div className="mt-5 flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-full px-4 py-2 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] font-medium select-none">
                All systems operational
              </span>
            </div>
          </div>

        </div>

        {/* Separator line before bottom bar */}
        <div className="w-full h-px bg-white/5 my-8" />

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} AskMe. Built by{' '}
            <a 
              href="https://wijaya.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] hover:text-[var(--amber)] transition-colors duration-200 font-semibold underline underline-offset-4 decoration-white/10 hover:decoration-[var(--amber)]/50"
            >
              W for Wijaya
            </a>
            . All rights reserved.
          </div>
          
          {/* Policy Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
