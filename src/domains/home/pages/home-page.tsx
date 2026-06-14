import { Button } from "../../../shared/ui/button";


export function HomePage() {
  return (
    <div className='min-h-screen bg-white text-black dark:bg-black dark:text-white'>
      <div className='flex items-center justify-between p-6'>
        <h1 className='text-3xl font-bold'>SiteForge</h1>
        {/* <ThemeToggle /> */}
      </div>

      <div className='p-10'>
        <h2 className='text-5xl font-bold'>
          AI Website Builder
        </h2>

        <p className='mt-4 text-zinc-500'>
          Production-grade frontend architecture starter.
        </p>

        <div className='mt-6'>
          <Button>Get Started</Button>
        </div>
      </div>
    </div>
  )
}
