import { motion } from 'framer-motion';

export default function FeaturedVideoSection() {
  return (
    <section
      id="featured-video-section"
      className="pt-6 md:pt-10 pb-20 md:pb-32 w-full overflow-hidden relative"
      style={{ background: 'var(--navy-deepest)' }}
    >
      <div className="relative z-10 w-full mx-auto">
        <motion.div
          className="group w-full overflow-hidden aspect-video md:aspect-[21/9] relative cursor-pointer border-y border-white/5"
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          whileTap="tap"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            hover: { },
            tap: { }
          }}
        >
          {/* Background Video with isolated hover scale */}
          <motion.video
            className="absolute inset-0 w-full h-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
            variants={{
              hidden: { scale: 1.1 },
              visible: { scale: 1, transition: { duration: 1.5, ease: 'easeOut' } },
              hover: { scale: 1.04, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              tap: { scale: 1.04 }
            }}
          />

          {/* Vignette & Gradient overlays */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-black/40 transition-colors duration-700" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                to top,
                var(--navy-deepest) 0%,
                rgba(6,10,26,0.3) 50%,
                transparent 80%
              )`,
            }}
          />

          {/* Center Cinematic Title */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.h3 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl tracking-[0.2em] sm:tracking-[0.25em] font-light text-white uppercase drop-shadow-2xl mb-4"
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, delay: 0.4, ease: 'easeOut' } },
                hover: { scale: 1.05, letterSpacing: '0.3em', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              Discover
            </motion.h3>
            <motion.p
              className="text-xs md:text-sm lg:text-base text-white/70 tracking-[0.4em] font-medium uppercase drop-shadow-lg"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 1.2, delay: 0.6 } },
                hover: { opacity: 0.5, transition: { duration: 0.8 } }
              }}
            >
              The Boundless Horizon
            </motion.p>
          </div>

          {/* Bottom overlay content (isolated from scale so it doesn't clip) */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-12 lg:px-20 pb-6 sm:pb-12 md:pb-20 lg:pb-32 pt-20">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              {/* Left: Info card */}
              <div className="glass-card rounded-xl p-6 md:p-8 max-w-md backdrop-blur-xl bg-white/5 border-white/10 group-hover:bg-white/10 transition-colors duration-500">
                <p className="text-xs tracking-widest uppercase mb-3 text-amber-500 font-medium">
                  Our Approach
                </p>
                <p className="text-sm md:text-base leading-relaxed break-words text-white/90 font-light">
                  We believe in the power of curiosity-driven exploration. Every project starts with a
                  question, and every answer opens a new door to innovation.
                </p>
              </div>

              {/* Right: Explore more button */}
              <motion.button 
                className="btn-amber shrink-0 shadow-[0_0_20px_rgba(232,119,46,0.3)] hover:shadow-[0_0_30px_rgba(232,119,46,0.5)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore more
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
