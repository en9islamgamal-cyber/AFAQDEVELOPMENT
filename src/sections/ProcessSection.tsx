import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ClipboardList, Hammer, FileText, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  className?: string;
}

const ProcessSection = ({ className = '' }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Process line draw
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.4,
          },
        }
      );

      // Step cards animation
      const steps = stepsRef.current?.querySelectorAll('.process-step');
      if (steps) {
        steps.forEach((step, index) => {
          gsap.fromTo(
            step,
            { x: '-10vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: Search,
      title: 'Discover',
      description: 'Scope review, site survey, and comprehensive risk register development.',
      number: '01',
    },
    {
      icon: ClipboardList,
      title: 'Plan',
      description: 'Detailed scheduling, procurement strategy, and resource allocation.',
      number: '02',
    },
    {
      icon: Hammer,
      title: 'Execute',
      description: 'Daily logs, quality checks, and continuous safety audits.',
      number: '03',
    },
    {
      icon: FileText,
      title: 'Handover',
      description: 'Commissioning, as-built documentation, and project close-out.',
      number: '04',
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative bg-navy-900 py-20 lg:py-32 ${className}`}
    >
      {/* Subtle radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(20,27,42,0.5) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 px-6 lg:px-[7vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-16 lg:mb-24">
          <h2 className="font-heading text-section font-bold text-white leading-[1.05] mb-6">
            How we <span className="text-primary">deliver.</span>
          </h2>
          <p className="text-body text-gray-cool max-w-xl leading-relaxed">
            A simple, repeatable process—clear scope, tight controls, clean handover.
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative max-w-3xl">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-[19px] lg:left-[23px] top-0 w-[3px] h-full bg-primary origin-top"
          />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className="process-step relative flex gap-6 lg:gap-8"
              >
                {/* Icon Circle */}
                <div className="relative z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-primary">{step.number}</span>
                    <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm lg:text-base text-gray-cool leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 lg:mt-24">
          <button 
            onClick={scrollToContact}
            className="btn-primary gap-2"
          >
            Start a project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
