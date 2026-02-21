import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background entrance
      tl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1 }
      );

      // Micro label
      tl.fromTo(
        microLabelRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.6'
      );

      // Headline (split by words)
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.9 },
          '-=0.3'
        );
      }

      // Subheadline + CTAs
      tl.fromTo(
        [subheadlineRef.current, ctaRef.current],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 },
        '-=0.5'
      );

      // Feature card
      tl.fromTo(
        cardRef.current,
        { x: '10vw', opacity: 0, rotate: 1.5 },
        { x: 0, opacity: 1, rotate: 0, duration: 0.9 },
        '-=0.7'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, cardRef.current, microLabelRef.current], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          }
        },
      });

      // ENTRANCE (0%-30%): Hold - already visible from load animation
      // SETTLE (30%-70%): Hold
      
      // EXIT (70%-100%)
      scrollTl.fromTo(
        [headlineRef.current, subheadlineRef.current, ctaRef.current, microLabelRef.current],
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
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-6vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          backgroundImage: 'url(/hero_night_cranes.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[7vw]">
        {/* Micro Label */}
        <div ref={microLabelRef} className="absolute top-[14vh] left-6 lg:left-[7vw]">
          <div className="orange-rule mb-4" />
          <span className="micro-label">
            Electromechanical & General Contracting
          </span>
        </div>

        {/* Headline Block */}
        <div className="max-w-[46vw] mt-[4vh]">
          <h1
            ref={headlineRef}
            className="font-heading text-hero font-bold text-white leading-[0.95] mb-6"
          >
            <span className="word inline-block">We</span>{' '}
            <span className="word inline-block">build</span>{' '}
            <span className="word inline-block">systems</span>{' '}
            <span className="word inline-block">that</span>{' '}
            <span className="word inline-block text-primary">last.</span>
          </h1>

          <p
            ref={subheadlineRef}
            className="text-body text-gray-cool max-w-[34vw] mb-8 leading-relaxed"
          >
            MEP execution, infrastructure, and full-scale construction—delivered 
            with precision documentation and strict compliance.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection('#contact')}
              className="btn-primary gap-2"
            >
              Request a proposal
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollToSection('#services')}
              className="btn-secondary gap-2"
            >
              Explore services
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Card */}
        <div
          ref={cardRef}
          className="absolute right-6 lg:right-[6vw] top-[18vh] w-full max-w-[380px] lg:w-[28vw] glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="status-dot" />
            <span className="font-mono text-xs uppercase tracking-wider text-gray-cool">
              Active Project
            </span>
          </div>
          
          <h3 className="font-heading text-xl font-semibold text-white mb-3">
            Mall of Qatar
          </h3>
          
          <p className="text-sm text-gray-cool mb-4 leading-relaxed">
            MEP package delivery on schedule with live progress tracking and 
            comprehensive documentation.
          </p>
          
          <button 
            onClick={() => scrollToSection('#projects')}
            className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
          >
            View project details
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
