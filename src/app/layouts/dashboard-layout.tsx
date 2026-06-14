import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
   return (
      <div className="flex min-h-screen">
         <aside className="w-72 border-r bg-muted/30 p-6">
            <h2 className="mb-8 text-2xl font-bold">SiteForge</h2>

            <nav className="space-y-2">
               <a className="block rounded-lg px-3 py-2 hover:bg-muted" href="/dashboard">
                  Dashboard
               </a>

               <a className="block rounded-lg px-3 py-2 hover:bg-muted" href="/account">
                  Account
               </a>
            </nav>
         </aside>

         <div className="flex flex-1 flex-col">
            <header className="flex h-16 items-center border-b px-6">
               Dashboard
            </header>

            <main className="flex-1 p-6">
               <Outlet />
            </main>
         </div>
      </div>
   )
}