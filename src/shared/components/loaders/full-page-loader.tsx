export function FullPageLoader() {
   return (
      <div className="flex min-h-screen items-center justify-center bg-background">
         <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />

            <div className="space-y-1 text-center">
               <p className="font-medium">Loading SiteForge</p>
               <p className="text-sm text-muted-foreground">
                  Preparing your experience...
               </p>
            </div>
         </div>
      </div>
   )
}