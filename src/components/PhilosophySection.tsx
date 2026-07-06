import { motion } from 'framer-motion';

export default function PhilosophySection() {
  return (
    <section
      id="philosophy-section"
      className="py-20 sm:py-28 md:py-40 w-full overflow-hidden relative"
      style={{ background: 'var(--navy-deepest)' }}
    >
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 mx-auto">
        {/* Centered Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight mt-10 sm:mt-16 md:mt-24 mb-16 sm:mb-24 md:mb-32 lg:mb-40 break-words text-center"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          Innovation{' '}
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              color: 'var(--amber)',
            }}
          >
            x
          </span>{' '}
          Vision
        </motion.h2>

        {/* Two-column Full Width Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Video */}
          <motion.div
            className="rounded-2xl overflow-hidden aspect-[4/3] w-full shadow-2xl"
            style={{ border: '1px solid var(--border-subtle)' }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <video
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
            />
          </motion.div>

          {/* Right: Text blocks with massive spacing and interactivity */}
          <motion.div
            className="flex flex-col justify-center w-full text-center lg:text-left lg:pl-16 xl:pl-24"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Interactive Block 1 */}
            <motion.div 
              className="pb-8 w-full flex flex-col items-center lg:items-start group cursor-pointer"
              whileHover="hover"
              variants={{
                hover: { x: 12, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <p
                className="text-xs tracking-widest uppercase mb-4 break-words transition-colors duration-300"
                style={{ color: 'var(--amber)' }}
              >
                Choose your space
              </p>
              <p
                className="text-sm sm:text-base md:text-xl lg:text-2xl leading-relaxed break-words text-[var(--text-secondary)] group-hover:text-white transition-colors duration-300"
              >
                Every meaningful breakthrough begins at the intersection of disciplined strategy and
                remarkable creative vision. We operate at that crossroads, turning bold thinking into
                tangible outcomes that move people and reshape industries.
              </p>
            </motion.div>

            {/* Divider */}
            <div className="w-full h-px my-4 transition-colors duration-500 hover:bg-white/20" style={{ background: 'var(--border-subtle)' }} />

            {/* Interactive Block 2 */}
            <motion.div 
              className="pt-8 w-full flex flex-col items-center lg:items-start group cursor-pointer"
              whileHover="hover"
              variants={{
                hover: { x: 12, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <p
                className="text-xs tracking-widest uppercase mb-4 break-words transition-colors duration-300"
                style={{ color: 'var(--amber)' }}
              >
                Shape the future
              </p>
              <p
                className="text-sm sm:text-base md:text-xl lg:text-2xl leading-relaxed break-words text-[var(--text-secondary)] group-hover:text-white transition-colors duration-300"
              >
                We believe that the best work emerges when curiosity meets conviction. Our process is
                designed to uncover hidden opportunities and translate them into experiences that
                resonate long after the first impression.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
