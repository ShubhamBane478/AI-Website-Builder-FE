import { Outlet } from 'react-router-dom'

export function MarketingLayout() {
   return (
      <div className="min-h-screen bg-background text-foreground">
         <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
               <h1 className="text-xl font-bold">SiteForge</h1>

               <nav className="flex items-center gap-6">
                  <a href="/templates">Templates</a>
                  <a href="/login">Login</a>
               </nav>
            </div>
         </header>

         <main>
            <Outlet />
         </main>

         <footer className="border-t py-10 text-center text-sm text-muted-foreground">
            © 2026 SiteForge
         </footer>
      </div>
   )
}