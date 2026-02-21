import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingUp, MessageSquare, CreditCard, FileText, Bell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PortalSectionProps {
  className?: string;
}

const PortalSection = ({ className = '' }: PortalSectionProps) => {
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

  const dashboardMetrics = [
    { icon: TrendingUp, label: 'Progress', value: '72%', color: 'text-green-400' },
    { icon: MessageSquare, label: 'Open RFIs', value: '4', color: 'text-yellow-400' },
    { icon: CreditCard, label: 'Pending invoice', value: '—', color: 'text-gray-cool' },
  ];

  const portalFeatures = [
    { icon: FileText, label: 'Document Control' },
    { icon: Bell, label: 'Real-time Notifications' },
    { icon: TrendingUp, label: 'Progress Tracking' },
  ];

  return (
    <section
      id="portal"
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/office_meeting.jpg)',
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
            Track everything.<br />
            <span className="text-primary">Miss nothing.</span>
          </h2>

          <p className="text-body text-gray-cool max-w-[34vw] leading-relaxed">
            A live dashboard for progress, documents, RFIs, and financials—updated weekly.
          </p>
        </div>

        {/* Portal Dashboard Card */}
        <div
          ref={cardRef}
          className="absolute right-6 lg:right-[6vw] top-[14vh] w-full max-w-[420px] lg:w-[36vw] glass-card rounded-xl p-6 lg:p-8"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-semibold text-white">
              Project Dashboard
            </h3>
            <div className="flex items-center gap-2">
              <div className="status-dot" />
              <span className="text-xs text-gray-cool">Live</span>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-4 mb-6">
            {dashboardMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <metric.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-gray-cool">{metric.label}</span>
                </div>
                <span className={`text-lg font-semibold ${metric.color}`}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {portalFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5"
              >
                <feature.icon className="w-3 h-3 text-primary" />
                <span className="text-xs text-gray-cool">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="w-full inline-flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
            Request portal access
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Micro Label */}
        <div
          ref={microLabelRef}
          className="absolute left-6 lg:left-[7vw] bottom-[10vh]"
        >
          <span className="micro-label">
            Weekly Reports • Document Control • Payment Tracking
          </span>
        </div>
      </div>
    </section>
  );
};

export default PortalSection;
