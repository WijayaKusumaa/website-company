import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import techVideo from '../assets/2762d56702ea10a3270e28ea9b2450ee.mp4';

interface ServiceCard {
  videoUrl: string;
  tag: string;
  title: string;
  description: string;
}

const services: ServiceCard[] = [
  {
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
    tag: 'Strategy',
    title: 'Research & Insight',
    description:
      'We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.',
  },
  {
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
    tag: 'Craft',
    title: 'Design & Execution',
    description:
      'From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.',
  },
  {
    videoUrl: techVideo,
    tag: 'Scale',
    title: 'Technology & Growth',
    description:
      'We build robust digital ecosystems that scale with your ambitions, ensuring every solution is future-proof and resilient.',
  }
];

export default function ServicesSection() {
  return (
    <section
      id="services-section"
      className="pt-20 pb-20 sm:pt-36 sm:pb-36 md:pt-48 md:pb-48 w-full overflow-hidden relative"
      style={{ background: 'var(--navy-deepest)' }}
    >
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 mx-auto">
        {/* Header row */}
        <motion.div
          className="flex items-baseline justify-between mt-10 sm:mt-16 md:mt-24 mb-12 sm:mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            What we do
          </h2>
          <p
            className="text-sm hidden md:block"
            style={{ color: 'var(--text-muted)' }}
          >
            Our services
          </p>
        </motion.div>

        {/* Three-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group h-full w-full border border-white/5 transition-colors duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hover"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                hover: {
                  y: -12,
                  boxShadow: '0 30px 60px -15px rgba(232,119,46,0.15)',
                  borderColor: 'rgba(232,119,46,0.3)'
                }
              }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              {/* Card video area */}
              <div className="aspect-video overflow-hidden relative shrink-0">
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  src={service.videoUrl}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(
                      to top,
                      var(--navy-mid) 0%,
                      transparent 50%
                    )`,
                  }}
                />
              </div>

              {/* Card body */}
              <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <p
                    className="uppercase tracking-widest text-xs truncate mr-4 font-medium"
                    style={{ color: 'var(--amber)' }}
                  >
                    {service.tag}
                  </p>
                  <motion.div
                    className="rounded-full p-2 shrink-0 flex items-center justify-center border border-white/10 bg-white/5"
                    variants={{
                      hover: {
                        backgroundColor: 'var(--amber)',
                        borderColor: 'var(--amber)',
                        rotate: 45
                      }
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      variants={{
                        hover: { color: '#ffffff' }
                      }}
                      className="text-white/80"
                    >
                      <ArrowUpRight size={16} color="currentColor" />
                    </motion.div>
                  </motion.div>
                </div>
                <h3
                  className="text-xl md:text-2xl mb-3 tracking-tight break-words font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed break-words text-pretty font-light"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
