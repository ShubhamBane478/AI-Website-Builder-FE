import { Outlet, Link } from 'react-router-dom'
import { ThemeToggle } from '@/shared/ui/theme-toggle'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface relative flex items-center justify-center p-6 overflow-hidden transition-colors duration-300">
      
      {/* Dynamic Ambient Background Blobs (Mesh Gradients) */}
      <div className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/10 blur-[130px] rounded-full top-[10%] left-[10%] -z-10 animate-pulse duration-[8s]"></div>
      <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-tertiary/8 blur-[120px] rounded-full bottom-[10%] right-[10%] -z-10 animate-pulse duration-[6s]"></div>
      <div className="absolute w-[300px] h-[300px] bg-secondary/8 blur-[110px] rounded-full top-[60%] left-[20%] -z-10"></div>

      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Auth Card Container */}
      <div className="w-full max-w-md surface_glass_high rounded-[24px] p-8 sm:p-10 border border-outline-variant/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(173,198,255,0.08)]">
        
        {/* Top Accent Neon Line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-tertiary"></div>

        {/* Brand Header */}
        <div className="flex flex-col items-center mb-lg">
          <Link to="/" className="inline-flex items-center gap-xs font-headline-md text-headline-md font-bold tracking-tighter text-on-surface hover:text-primary transition-all duration-300 group">
            <span className="material-symbols-outlined text-primary text-[28px] group-hover:rotate-12 transition-transform">auto_awesome</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-on-surface group-hover:from-primary group-hover:to-tertiary transition-all duration-300">
              Luminous
            </span>
          </Link>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-outline-variant/50 to-transparent mt-sm"></div>
        </div>

        {/* Dynamic Auth Page Content */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}