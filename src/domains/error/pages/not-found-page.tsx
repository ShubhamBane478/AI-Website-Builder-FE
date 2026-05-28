// src/domains/error/pages/not-found-page.tsx

import { Link } from 'react-router-dom'

export default function NotFoundPage() {
   return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6">
         <h1 className="text-7xl font-bold">404</h1>

         <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">
               Page not found
            </h2>

            <p className="text-muted-foreground">
               The page you’re looking for does not exist.
            </p>
         </div>

         <Link
            to="/"
            className="rounded-lg bg-primary px-5 py-3 text-primary-foreground"
         >
            Back to Home
         </Link>
      </div>
   )
}