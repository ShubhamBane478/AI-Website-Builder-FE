type Props = {
   error?: Error
}

export function ErrorFallback({ error }: Props) {
   return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
         <h1 className="text-3xl font-bold">Something went wrong</h1>

         <p className="max-w-md text-muted-foreground">
            An unexpected error occurred while rendering this page.
         </p>

         {error && (
            <pre className="max-w-xl overflow-auto rounded-lg bg-muted p-4 text-left text-sm">
               {error.message}
            </pre>
         )}

         <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
         >
            Reload Page
         </button>
      </div>
   )
}