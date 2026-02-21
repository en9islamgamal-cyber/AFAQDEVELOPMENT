import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CapabilitiesSectionProps {
  className?: string;
}

const CapabilitiesSection = ({ className = '' }: CapabilitiesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: '50vw', opacity: 0, rotate: 2 },
        { x: 0, opacity: 1, rotate: 0, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        microLabelRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.08, y: '8vh' },
        { scale: 1, y: 0, ease: 'none' },
        0
      );

      // SETTLE (30%-70%): Hold positions

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        microLabelRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-6vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    'MEP Design-Build',
    'General Construction',
    'Infrastructure & Utilities',
    'Fire Protection & Safety',
    'Project Controls & Reporting',
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/warehouse_interior.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        {/* Headline Block */}
        <div ref={headlineRef} className="max-w-[44vw]">
          <h2 className="font-heading text-section font-bold text-white leading-[1.05] mb-6">
            Full-scope<br />
            <span className="text-primary">construction.</span>
          </h2>

          <p className="text-body text-gray-cool max-w-[34vw] leading-relaxed">
            From underground utilities to final finishes—one team, one schedule, 
            one standard of excellence.
          </p>
        </div>

        {/* Capability Card */}
        <div
          ref={cardRef}
          className="absolute right-6 lg:right-[6vw] top-[16vh] w-full max-w-[400px] lg:w-[34vw] glass-card rounded-xl p-6 lg:p-8"
        >
          <h3 className="font-heading text-lg font-semibold text-white mb-6">
            Our Capabilities
          </h3>

          <ul className="space-y-4">
            {capabilities.map((cap, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-gray-cool">{cap}</span>
              </li>
            ))}
          </ul>

          <button className="mt-6 inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all">
            <Download className="w-4 h-4" />
            Download capability statement
          </button>
        </div>

        {/* Micro Label */}
        <div
          ref={microLabelRef}
          className="absolute left-6 lg:left-[7vw] bottom-[10vh]"
        >
          <span className="micro-label">
            Licensed in Kuwait • ISO-Compliant Processes
          </span>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
