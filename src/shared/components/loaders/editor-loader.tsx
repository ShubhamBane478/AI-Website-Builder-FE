export function EditorLoader() {
   return (
      <div className="flex min-h-screen bg-background">
         <div className="w-80 border-r bg-muted/30 p-4">
            <div className="space-y-4">
               <div className="h-10 animate-pulse rounded bg-muted" />
               <div className="h-10 animate-pulse rounded bg-muted" />
               <div className="h-10 animate-pulse rounded bg-muted" />
               <div className="h-32 animate-pulse rounded bg-muted" />
            </div>
         </div>

         <div className="flex-1 p-8">
            <div className="mx-auto max-w-5xl space-y-6">
               <div className="h-64 animate-pulse rounded-2xl bg-muted" />
               <div className="h-32 animate-pulse rounded-2xl bg-muted" />
               <div className="grid grid-cols-3 gap-4">
                  <div className="h-40 animate-pulse rounded-xl bg-muted" />
                  <div className="h-40 animate-pulse rounded-xl bg-muted" />
                  <div className="h-40 animate-pulse rounded-xl bg-muted" />
               </div>
            </div>
         </div>
      </div>
   )
}