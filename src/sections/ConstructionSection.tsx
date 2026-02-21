import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, Shield, Paintbrush, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ConstructionSectionProps {
  className?: string;
}

const ConstructionSection = ({ className = '' }: ConstructionSectionProps) => {
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
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
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

  const constructionServices = [
    { icon: Building2, text: 'Concrete & structural steel coordination' },
    { icon: Shield, text: 'Curtain wall, cladding, & waterproofing' },
    { icon: Paintbrush, text: 'Interior fit-outs & ceiling systems' },
    { icon: Truck, text: 'Site logistics & waste management' },
  ];

  return (
    <section
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/facade_construction.jpg)',
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
            Structure to<br />
            <span className="text-primary">finishes.</span>
          </h2>

          <p className="text-body text-gray-cool max-w-[34vw] leading-relaxed">
            Concrete, masonry, cladding, and interior build-outs—managed with 
            tight controls and daily reporting.
          </p>
        </div>

        {/* Construction Card */}
        <div
          ref={cardRef}
          className="absolute right-6 lg:right-[6vw] top-[16vh] w-full max-w-[400px] lg:w-[34vw] glass-card rounded-xl p-6 lg:p-8"
        >
          <h3 className="font-heading text-lg font-semibold text-white mb-6">
            General Construction
          </h3>

          <ul className="space-y-4">
            {constructionServices.map((service, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <service.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-gray-cool leading-relaxed">{service.text}</span>
              </li>
            ))}
          </ul>

          <button className="mt-6 inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all">
            View construction services
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Micro Label */}
        <div
          ref={microLabelRef}
          className="absolute left-6 lg:left-[7vw] bottom-[10vh]"
        >
          <span className="micro-label">
            Daily Reporting • Quality Checklists
          </span>
        </div>
      </div>
    </section>
  );
};

export default ConstructionSection;
