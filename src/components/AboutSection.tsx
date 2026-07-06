import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HighlightWord = ({
  children,
  progress,
  range,
  isAmber,
  isItalic,
}: {
  children: React.ReactNode;
  progress: any;
  range: [number, number];
  isAmber?: boolean;
  isItalic?: boolean;
}) => {
  // Maps scroll progress to background color (transparent -> selection block color)
  const bg = useTransform(progress, range, [
    'rgba(232, 119, 46, 0)',
    'rgba(232, 119, 46, 0.3)',
  ]);
  // Maps scroll progress to text color (muted -> solid)
  const color = useTransform(progress, range, [
    isAmber ? 'rgba(232, 119, 46, 0.35)' : 'rgba(232, 234, 240, 0.25)',
    isAmber ? 'rgba(232, 119, 46, 1)' : 'rgba(255, 255, 255, 1)',
  ]);

  return (
    <motion.span
      style={{
        backgroundColor: bg,
        color: color,
        borderRadius: '8px',
        padding: '0.1em 0.2em',
        margin: '0 0.05em',
        fontFamily: isItalic ? "'Instrument Serif', serif" : 'inherit',
        fontStyle: isItalic ? 'italic' : 'normal',
      }}
    >
      {children}
    </motion.span>
  );
};

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 40%'], // Animation window
  });

  // Calculate range for each word out of 9 total words
  const getRange = (index: number, total: number = 9): [number, number] => {
    const step = 1 / total;
    return [index * step, (index + 1) * step];
  };

  return (
    <section
      ref={containerRef}
      id="about-section"
      className="w-full min-h-[90vh] overflow-hidden relative flex flex-col items-center justify-center py-20 sm:py-32"
      style={{ background: 'var(--navy-deepest)' }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-40"
        style={{ background: 'var(--amber-glow)' }}
      />
      {/* Subtle bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: 'var(--amber-glow)' }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center justify-center">
        {/* Label */}
        <p
          className="text-sm tracking-widest uppercase mb-10 md:mb-14"
          style={{ color: 'var(--text-muted)' }}
        >
          About Us
        </p>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.3] tracking-tight break-words max-w-4xl text-center flex flex-col items-center gap-2 font-medium">
          <span>
            <HighlightWord progress={scrollYProgress} range={getRange(0)}>Pioneering</HighlightWord>
            <HighlightWord progress={scrollYProgress} range={getRange(1)} isAmber isItalic>ideas</HighlightWord>
            <HighlightWord progress={scrollYProgress} range={getRange(2)}>for</HighlightWord>
            <HighlightWord progress={scrollYProgress} range={getRange(3)}>minds</HighlightWord>
          </span>
          <span>
            <HighlightWord progress={scrollYProgress} range={getRange(4)}>that</HighlightWord>
            <HighlightWord progress={scrollYProgress} range={getRange(5)} isItalic>create,</HighlightWord>
            <HighlightWord progress={scrollYProgress} range={getRange(6)} isItalic>build,</HighlightWord>
          </span>
          <span>
            <HighlightWord progress={scrollYProgress} range={getRange(7)}>and</HighlightWord>
            <HighlightWord progress={scrollYProgress} range={getRange(8)} isItalic>inspire.</HighlightWord>
          </span>
        </h2>
      </div>
    </section>
  );
}
