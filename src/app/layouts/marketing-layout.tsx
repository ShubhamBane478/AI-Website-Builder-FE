import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@/shared/ui/theme-toggle'

export function MarketingLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md relative flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm transition-colors duration-200">
        <div className="flex justify-between items-center px-6 md:px-8 h-toolbar-height w-full max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link to="/" className="font-headline-md text-headline-md font-bold tracking-tighter text-on-surface flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary text-[24px]">auto_awesome</span>
            <span>Luminous</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-md">
            <a href="#features" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Features
            </a>
            <Link to="/templates" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Templates
            </Link>
            <a href="#showcase" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Showcase
            </a>
            <a href="#pricing" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Pricing
            </a>
          </div>

          {/* Utility Buttons */}
          <div className="flex items-center gap-base">
            <ThemeToggle />
            <button 
              onClick={() => navigate('/login')}
              className="hidden sm:inline-block px-md py-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all active:scale-95"
            >
              Log In
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-md py-base bg-primary text-on-primary font-label-md text-label-md rounded-lg active:scale-95 duration-200 shadow-sm hover:brightness-110"
            >
              Get Started
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 rounded-lg flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <span className="material-symbols-outlined text-[24px]">close</span>
              ) : (
                <span className="material-symbols-outlined text-[24px]">menu</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-outline-variant/30 bg-surface/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-sm animate-fade-in absolute w-full left-0 shadow-lg">
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant py-2 border-b border-outline-variant/10 hover:text-primary transition-colors"
            >
              Features
            </a>
            <Link 
              to="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant py-2 border-b border-outline-variant/10 hover:text-primary transition-colors"
            >
              Templates
            </Link>
            <a 
              href="#showcase" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant py-2 border-b border-outline-variant/10 hover:text-primary transition-colors"
            >
              Showcase
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant py-2 border-b border-outline-variant/10 hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/login');
              }}
              className="w-full text-left font-body-md text-body-md text-on-surface-variant py-2 hover:text-primary transition-colors"
            >
              Log In
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative w-full bg-surface-container-low border-t border-outline-variant/20 transition-colors duration-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-xl gap-md max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-sm text-center md:text-left">
            <div className="font-headline-lg text-headline-lg font-bold text-on-surface flex items-center justify-center md:justify-start gap-xs">
              <span className="material-symbols-outlined text-primary text-[28px]">auto_awesome</span>
              <span>Luminous</span>
            </div>
            <div className="text-on-surface-variant font-body-md text-body-md max-w-xs">
              © {new Date().getFullYear()} Luminous AI. Built for the future of the web.
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-lg">
            <a className="text-on-surface-variant font-body-md text-body-md hover:text-on-surface transition-colors" href="#privacy">
              Privacy Policy
            </a>
            <a className="text-on-surface-variant font-body-md text-body-md hover:text-on-surface transition-colors" href="#terms">
              Terms of Service
            </a>
            <a className="text-on-surface-variant font-body-md text-body-md hover:text-on-surface transition-colors" href="#changelog">
              Changelog
            </a>
            <a className="text-on-surface-variant font-body-md text-body-md hover:text-on-surface transition-colors" href="#docs">
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}