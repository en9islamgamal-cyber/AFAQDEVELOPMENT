import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Layers, Calendar, DollarSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectSpotlightSectionProps {
  className?: string;
}

const ProjectSpotlightSection = ({ className = '' }: ProjectSpotlightSectionProps) => {
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
          end: '+=140%',
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

  const metrics = [
    { icon: DollarSign, label: 'Contract value', value: '—' },
    { icon: MapPin, label: 'Area', value: '150,000+ m²' },
    { icon: Layers, label: 'Systems', value: 'HVAC / Fire / Electrical / Plumbing' },
    { icon: Calendar, label: 'Delivery', value: 'On schedule' },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/mall_interior.jpg)',
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
            Mall of<br />
            <span className="text-primary">Qatar.</span>
          </h2>

          <p className="text-body text-gray-cool max-w-[34vw] leading-relaxed">
            Full MEP coordination and fit-out support for one of the region's 
            largest retail destinations.
          </p>
        </div>

        {/* Metrics Card */}
        <div
          ref={cardRef}
          className="absolute right-6 lg:right-[6vw] top-[16vh] w-full max-w-[400px] lg:w-[34vw] glass-card rounded-xl p-6 lg:p-8"
        >
          <h3 className="font-heading text-lg font-semibold text-white mb-6">
            Project Metrics
          </h3>

          <div className="space-y-0">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-row">
                <div className="flex items-center gap-2">
                  <metric.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-cool">{metric.label}</span>
                </div>
                <span className="text-sm font-medium text-white">{metric.value}</span>
              </div>
            ))}
          </div>

          <button className="mt-6 inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all">
            Read the case study
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Micro Label */}
        <div
          ref={microLabelRef}
          className="absolute left-6 lg:left-[7vw] bottom-[10vh]"
        >
          <span className="micro-label">
            Retail • Hospitality • Healthcare • Industrial
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProjectSpotlightSection;
