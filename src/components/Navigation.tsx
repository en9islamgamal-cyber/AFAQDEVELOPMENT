import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'AR'>('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Portal', href: '#portal' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-navy-900/90 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-[7vw]">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center hover:opacity-90 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img 
                src="/logo-main.jpg" 
                alt="Afaq Al-Tatweer - آفاق التطوير لتشييد المباني"
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-gray-cool hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'EN' ? 'AR' : 'EN')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-sm text-gray-cool hover:border-primary/50 hover:text-white transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="font-mono text-xs">{language}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-navy-900/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {/* Mobile Logo */}
          <img 
            src="/logo-main.jpg" 
            alt="Afaq Al-Tatweer"
            className="h-16 w-auto object-contain mb-4"
          />
          
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-heading text-white hover:text-primary transition-colors"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {link.label}
            </button>
          ))}
          
          <button
            onClick={() => setLanguage(language === 'EN' ? 'AR' : 'EN')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-gray-cool hover:border-primary/50 hover:text-white transition-all mt-4"
          >
            <Globe className="w-5 h-5" />
            <span className="font-mono">{language === 'EN' ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
