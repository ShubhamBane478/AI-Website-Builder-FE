import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHealth } from '@/shared/hooks/useHealth'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  const navigate = useNavigate()
  // const { data: healthData, isLoading: isHealthLoading, isError: isHealthError } = useHealth()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    {
      question: "Can I export my code?",
      answer: "Yes, you can export high-quality React components, typescript models, or vanilla HTML/CSS at any time. We believe in open standards and zero vendor lock-in."
    },
    {
      question: "How does the AI work?",
      answer: "When you submit a short guided form about your business, the data is sent to GPT-4o with structural restraints. It expands your short answers into high-converting copy, headlines, taglines, about section and maps them straight to premium template blocks."
    },
    {
      question: "Is hosting included?",
      answer: "Yes! Every site published on SiteForge gets immediate global edge hosting at a {subdomain}.siteforge.app address, optimized with CDN caching for 99.9% uptime."
    }
  ]

  const templates = [
    {
      name: "Nova Agency",
      desc: "Perfect for creative studios and independent freelancers.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG0A8o2a_A2_M5OwjXVD386-KES7Kb7wCbjgBMvcFULqulvYDsuhN6PXfZ3sKTOQUXjMJTmMZdDsS0c8dh8fAj7pmLnpie1_ligBI2smfTpnQ4Pn-zO_D_fodOtz_mji8naeTIGFvPlwSzgaeP7k0UNOFnCGZ70lg9xDRdqRaq7rN6sRksGJUXpi-ULWDxUsMQ-Fj6aSgSyCV2r86ST3T6oBe6z5UqeEVwO1ZpHFnAb0U-fbHvK32Z4mnDaSuZZZ85M02xG8Wb"
    },
    {
      name: "Matrix SaaS",
      desc: "Data-heavy interfaces made clean and simple.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBub9XuHPPOFHP5tX7iS1RQ_MF3cnHLmxLD1Vcffek04Zlho7bzW3hQKBS1mNycBYWFgIvynJUoW2msjynlIzT9WE7lcNQTsjpGKehOZ-WuyTdFOWgGCR0GZEfRuY1XSBeBZcgqSlom2sH5IOIg5SZkXiift45gVoR6oxkrl2Q168XnLyfu4UfTXYi_7tA0u8Azny0-mtJhqQP6K0CIe1N89GJxTXGjmoEMmxD8PNllW8sgfvr8VkSSfemxrV_1Rb-AUjQylAFt"
    },
    {
      name: "Lumina Journal",
      desc: "Elegant content layouts for modern publishing.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAwrpz0ivwrd01VmasIVBX-wZ03uzG8Et69IsKlp89BQv049UzJfbXIcePu9KHBeO7U-cVY5CXk5hOft2BEP7lWusqxAjVcCRWqzR7BQ8MIsaQd6ePahpJzN9fSGxfXjAFGtris6d99UzOY3IOGK708-YvagBqBD9HcYWUq03dv1l5Jqs1YnhI1eSAld0qDGESjfilHkRk7CEzRvW0vOxkW5oaLOmtGK99OZDz7xWdE0ETMhySaQwEHu4pHuZzIKrzlhkv9zrM"
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="relative pt-[110px] overflow-hidden transition-colors duration-200">
      
      {/* Visual Ambient Background Mesh Blobs */}
      <div className="absolute top-0 left-1/4 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-primary/6 blur-[130px] rounded-full -z-10 animate-pulse duration-[10s]"></div>
      <div className="absolute top-[600px] right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-tertiary/5 blur-[120px] rounded-full -z-10 animate-pulse duration-[8s]"></div>
      <div className="absolute top-[1300px] left-1/3 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-secondary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute top-[2200px] right-1/3 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-primary/5 blur-[135px] rounded-full -z-10 animate-pulse duration-[12s]"></div>

      {/* Backend API Observability Indicator */}
      {/* <div className="flex justify-center mb-md px-gutter">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full border border-outline-variant/30 bg-surface-container-low/70 backdrop-blur-md text-label-sm font-label-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <span className="relative flex h-2 w-2">
            {isHealthLoading ? (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            ) : isHealthError ? (
              <span className="absolute inline-flex h-full w-full rounded-full bg-error animate-pulse"></span>
            ) : (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isHealthLoading ? 'bg-yellow-500' : isHealthError ? 'bg-error' : 'bg-emerald-500'}`}></span>
          </span>
          <span className="text-on-surface-variant font-medium">
            {isHealthLoading ? 'Connecting to backend...' : isHealthError ? 'Backend offline' : `System Live — Environment: ${healthData?.environment}`}
          </span>
        </motion.div>
      </div> */}

      {/* Hero Section */}
      <section className="pb-xl px-gutter max-w-screen-2xl mx-auto text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-base px-md py-1.5 rounded-full border border-primary/20 bg-gradient-to-r from-primary/5 via-secondary/5 to-tertiary/5 text-primary mb-md font-label-sm text-label-sm font-semibold tracking-wider uppercase"
        >
          <span className="material-symbols-outlined text-[15px] animate-spin duration-[3s]">auto_awesome</span>
          <span>Generative web design is here</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display-lg text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-md max-w-5xl mx-auto leading-[1.08] text-on-surface"
        >
          Build Websites with AI & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary animate-pulse">Modular Components</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto mb-lg px-2 leading-relaxed"
        >
          The first professional builder that thinks like a designer. Generate layouts, style systems, and full-stack components using natural language.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-md mb-xl max-w-md mx-auto sm:max-w-none"
        >
          <motion.button 
            whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/templates')}
            className="w-full sm:w-auto px-lg py-md bg-gradient-to-r from-primary to-secondary text-surface font-bold font-headline-md rounded-xl shadow-[0_8px_30px_rgba(173,198,255,0.3)] active:scale-[0.98] transition-all"
          >
            Start Building Free
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-lg py-md surface_glass hover:bg-surface-variant/20 text-on-surface font-headline-md text-headline-md rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-base"
          >
            <span className="material-symbols-outlined text-[20px] text-tertiary">play_circle</span>
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Hero Interactive Image Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative w-full max-w-5xl mx-auto group hover:scale-[1.005] transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-[60px] opacity-25 -z-10"></div>
          <div className="surface_glass_high rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)] p-1.5 border border-outline-variant/30">
            <div className="bg-surface-container rounded-xl aspect-[16/9] relative overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-[6s] ease-out" 
                alt="Workspace designer rendering"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy6e71oX2g0V13hU-Qf4vnnZtzSpnpvjALcsj1S2DYo-fEO8lQtFk_w-5k7wueToyfql3aN9ENUdBHBG96MlvvpHdawWZuz_wSFBTz1MQIyPB9trH-2eCW2LeuZ7ZBs0_vnLey4TUwaCAmJ0wbF6BEnKuXKn8N16zj39K9108RYZkJo-CmTokKivA6bPiJaUBQ1TLUPg3a_78qJK42kz2JvvLSjGqpGWSdK3xXIA37u4foG_WhIS4YGxGuDrFFRRBExnPKdD36"
              />
              {/* Floating AI Input Overlay */}
              <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-surface/70 backdrop-blur-2xl rounded-2xl p-4 flex items-center gap-md border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-surface shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-[20px]">temp_preferences_custom</span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-label-sm text-label-sm text-on-surface-variant font-bold">Luminous Assistant</div>
                  <div className="font-body-md text-body-md text-on-surface/90 truncate">"Generate a landing page for my portfolio with dark-mode gradients."</div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-75"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-xl px-gutter max-w-screen-2xl mx-auto border-t border-outline-variant/10 relative">
        <div className="text-center mb-xl">
          <h2 className="font-headline-lg text-headline-lg mb-sm text-on-surface font-extrabold tracking-tight">Everything you need to ship faster</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto text-body-md">From concept to production, Luminous handles the heavy lifting of modern web development.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {/* Card 1: Main Double Feature */}
          <div className="md:col-span-2 md:row-span-2 surface_glass rounded-3xl p-8 md:p-10 flex flex-col justify-between gradient-border min-h-[420px] transition-all hover:bg-surface-variant/10 hover:shadow-[0_15px_40px_rgba(173,198,255,0.06)] hover:-translate-y-1 duration-300 border border-outline-variant/20">
            <div>
              <span className="material-symbols-outlined text-primary text-[42px] mb-md">auto_mode</span>
              <h3 className="font-headline-lg text-headline-lg mb-md text-on-surface font-extrabold">Generative Site Layouts</h3>
              <p className="text-on-surface-variant text-body-lg max-w-lg leading-relaxed">
                Our AI doesn't just build pages; it understands your brand. It crafts custom layout systems based on your content structure and visual preferences.
              </p>
            </div>
            <div className="mt-xl h-48 bg-surface-container-low rounded-2xl overflow-hidden relative border border-outline-variant/25">
              <img 
                className="w-full h-full object-cover opacity-70" 
                alt="Architecture layout visual mesh"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgHi_3WiSJcpjl3PEBtfDHhCJs-ChxqqeoWq4UAwQqSlDfA4YOHIOTU5s01jcRyW-7aavRYq3pLf0V4EIBZyl5NBzFVS_Myp-yAZA9iun6Cg6R7pl6SLRX0FsuQR8X_LGIWu6ocpdzD-DJYeiOrUaw2saYm3fQNe2C1FX-yquEAzLY4eyvDsqp7DB7cRAc7bc6R4d_cj7O99LGL0NbKQFSogH85R3ym6Hk3sIzdpXhEExBxgJFKkugkO5CMI0seP8cUDoU1mdL"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="surface_glass rounded-3xl p-7 border border-outline-variant/20 hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(173,198,255,0.05)] transition-all duration-300">
            <span className="material-symbols-outlined text-tertiary text-[32px] mb-sm">layers</span>
            <h4 className="font-headline-md text-headline-md mb-xs text-on-surface font-bold">Modular Blocks</h4>
            <p className="text-on-surface-variant text-body-md leading-relaxed">Pre-engineered components that are fully responsive and performance-optimized out of the box.</p>
          </div>

          {/* Card 3 */}
          <div className="surface_glass rounded-3xl p-7 border border-outline-variant/20 hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(173,198,255,0.05)] transition-all duration-300">
            <span className="material-symbols-outlined text-secondary text-[32px] mb-sm">palette</span>
            <h4 className="font-headline-md text-headline-md mb-xs text-on-surface font-bold">Token Engine</h4>
            <p className="text-on-surface-variant text-body-md leading-relaxed">Dynamic styling with design tokens. Switch themes and palettes instantly across your entire site.</p>
          </div>

          {/* Card 4 */}
          <div className="surface_glass rounded-3xl p-7 border border-outline-variant/20 hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(173,198,255,0.05)] transition-all duration-300">
            <span className="material-symbols-outlined text-error text-[32px] mb-sm">bolt</span>
            <h4 className="font-headline-md text-headline-md mb-xs text-on-surface font-bold">Fast Export</h4>
            <p className="text-on-surface-variant text-body-md leading-relaxed">One-click export to high-quality React or HTML/CSS code. No vendor lock-in, ever.</p>
          </div>

          {/* Card 5 */}
          <div className="surface_glass rounded-3xl p-7 border border-outline-variant/20 hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(173,198,255,0.05)] transition-all duration-300">
            <span className="material-symbols-outlined text-primary text-[32px] mb-sm">cloud_done</span>
            <h4 className="font-headline-md text-headline-md mb-xs text-on-surface font-bold">Edge Hosting</h4>
            <p className="text-on-surface-variant text-body-md leading-relaxed">Global deployment with 99.9% uptime. Your site is fast, secure, and always accessible.</p>
          </div>

          {/* Card 6 */}
          <div className="surface_glass rounded-3xl p-7 border border-outline-variant/20 hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(173,198,255,0.05)] transition-all duration-300">
            <span className="material-symbols-outlined text-tertiary text-[32px] mb-sm">api</span>
            <h4 className="font-headline-md text-headline-md mb-xs text-on-surface font-bold">API First</h4>
            <p className="text-on-surface-variant text-body-md leading-relaxed">Connect your favorite tools and CMS easily. Luminous fits perfectly into your existing stack.</p>
          </div>
        </div>
      </section>

      {/* Workflow Step Section */}
      <section className="py-xl bg-surface-container-lowest/50 border-y border-outline-variant/10 relative">
        <div className="max-w-screen-2xl mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-lg text-on-surface font-extrabold tracking-tight">From zero to published in minutes</h2>
            <div className="space-y-lg">
              <div className="flex gap-md group">
                <div className="w-12 h-12 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center font-headline-md text-primary font-bold shrink-0 group-hover:bg-primary group-hover:text-surface transition-all duration-300 shadow-md">1</div>
                <div>
                  <h4 className="font-headline-md text-headline-md mb-xs text-on-surface font-bold">Prompt the AI</h4>
                  <p className="text-on-surface-variant text-body-md leading-relaxed">Describe your project, industry, and goals. Luminous generates initial structure and styles instantly.</p>
                </div>
              </div>
              <div className="flex gap-md group">
                <div className="w-12 h-12 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center font-headline-md text-primary font-bold shrink-0 group-hover:bg-primary group-hover:text-surface transition-all duration-300 shadow-md">2</div>
                <div>
                  <h4 className="font-headline-md text-headline-md mb-xs text-on-surface font-bold">Modular Refinement</h4>
                  <p className="text-on-surface-variant text-body-md leading-relaxed">Swap components, adjust copy, and fine-tune styles using our intuitive visual inspector panels.</p>
                </div>
              </div>
              <div className="flex gap-md group">
                <div className="w-12 h-12 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center font-headline-md text-primary font-bold shrink-0 group-hover:bg-primary group-hover:text-surface transition-all duration-300 shadow-md">3</div>
                <div>
                  <h4 className="font-headline-md text-headline-md mb-xs text-on-surface font-bold">Launch Globally</h4>
                  <p className="text-on-surface-variant text-body-md leading-relaxed">Deploy to our ultra-fast edge network or export the code to host it on your own infrastructure.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="surface_glass_high rounded-[24px] overflow-hidden border border-outline-variant/10 aspect-square shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <img 
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-[5s]" 
                alt="Close-up developer setup mockup"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzPUh6Mns1ZeeEPSBBDg5CRpJYfILs-65lggjC6HbW4lk1QGdJ0UWHVMZGGXCl1gAvFnoZHodZosCfAsX-vv5k8UJtTeq1Ra2pw7z_ZHEDbDIsmsfgPPZXERnWpgHSdyb6jIVcSbjQCg_Tkp26hxMZ-O9PtCgPstgqw7ZLm78USxfxyAhhEWSTG2rWyvk1gVqwDXTNOCq0dMJfU2sHIi9qnx_UuLjmv8Qz090A3ScMRjy4-I1gMHemLbjvgyg6e9wUn7881wNA"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-secondary/15 blur-3xl rounded-full -z-10"></div>
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section id="showcase" className="py-xl overflow-hidden border-b border-outline-variant/10 relative">
        <div className="px-gutter max-w-screen-2xl mx-auto mb-lg flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">Start from a template</h2>
            <p className="text-on-surface-variant text-body-md">Handcrafted by world-class designers, powered by AI.</p>
          </div>
          <button 
            onClick={() => navigate('/templates')}
            className="px-md py-2.5 border border-outline-variant/30 hover:border-on-surface hover:bg-surface-variant/20 rounded-xl transition-all font-label-md text-label-md text-on-surface font-semibold"
          >
            Explore All
          </button>
        </div>
        
        {/* Infinite Scrolling Template Slider with Fade Borders */}
        <div className="relative w-full overflow-hidden py-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 sm:before:w-32 before:bg-gradient-to-r before:from-background before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 sm:after:w-32 after:bg-gradient-to-l after:from-background after:to-transparent after:z-10">
          <div className="animate-scroll-x flex gap-md">
            {/* Group 1 */}
            {templates.map((tmpl, idx) => (
              <div key={`s1-${idx}`} className="w-[280px] sm:w-[380px] shrink-0 surface_glass rounded-2xl overflow-hidden border border-outline-variant/25 group hover:border-primary/40 transition-colors shadow-lg">
                <div className="h-44 sm:h-56 bg-surface-container overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-[4s]" 
                    alt={tmpl.name}
                    src={tmpl.img}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                </div>
                <div className="p-md text-left">
                  <div className="font-headline-md text-headline-md mb-xs text-on-surface font-bold">{tmpl.name}</div>
                  <div className="text-on-surface-variant text-body-md line-clamp-2">{tmpl.desc}</div>
                </div>
              </div>
            ))}
            {/* Duplicate Group 2 for infinite marquee scroll effect */}
            {templates.map((tmpl, idx) => (
              <div key={`s2-${idx}`} className="w-[280px] sm:w-[380px] shrink-0 surface_glass rounded-2xl overflow-hidden border border-outline-variant/25 group hover:border-primary/40 transition-colors shadow-lg">
                <div className="h-44 sm:h-56 bg-surface-container overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-[4s]" 
                    alt={tmpl.name}
                    src={tmpl.img}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                </div>
                <div className="p-md text-left">
                  <div className="font-headline-md text-headline-md mb-xs text-on-surface font-bold">{tmpl.name}</div>
                  <div className="text-on-surface-variant text-body-md line-clamp-2">{tmpl.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-xl px-gutter max-w-screen-2xl mx-auto border-b border-outline-variant/10">
        <div className="text-center mb-xl">
          <h2 className="font-headline-lg text-headline-lg mb-sm text-on-surface font-extrabold tracking-tight">Simple, transparent pricing</h2>
          <p className="text-on-surface-variant text-body-md">Choose the plan that fits your ambition.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg max-w-md md:max-w-none mx-auto items-stretch">
          
          {/* Free Plan */}
          <div className="surface_glass rounded-[24px] p-8 flex flex-col border border-outline-variant/20 hover:border-outline/40 hover:-translate-y-1 transition-all duration-300 shadow-md">
            <div className="mb-lg text-left">
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider">FOR STARTERS</div>
              <div className="font-headline-lg text-headline-lg text-on-surface font-extrabold">Free</div>
              <div className="flex items-baseline mt-sm">
                <span className="text-4xl font-bold text-on-surface">$0</span>
                <span className="text-on-surface-variant ml-xs">/month</span>
              </div>
            </div>
            <ul className="space-y-md mb-xl flex-1 text-left">
              <li className="flex items-center gap-sm text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                3 Active Sites
              </li>
              <li className="flex items-center gap-sm text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                Standard Templates
              </li>
              <li className="flex items-center gap-sm text-body-md text-on-surface-variant/60">
                <span className="material-symbols-outlined text-outline-variant text-[18px]">block</span>
                Custom Domains
              </li>
            </ul>
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate('/register')}
              className="w-full py-3 border border-outline-variant hover:border-on-surface hover:bg-surface-variant/10 rounded-xl font-headline-md text-headline-md transition-all text-on-surface font-bold"
            >
              Start for Free
            </motion.button>
          </div>

          {/* Pro Plan */}
          <div className="surface_glass_high rounded-[24px] p-8 flex flex-col gradient-border relative scale-100 md:scale-105 border border-primary/30 shadow-[0_15px_40px_rgba(144,54,226,0.15)] hover:shadow-[0_15px_45px_rgba(144,54,226,0.22)] transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-surface px-md py-1 rounded-full font-label-sm text-label-sm font-bold shadow-md">MOST POPULAR</div>
            <div className="mb-lg text-left">
              <div className="font-label-sm text-label-sm text-primary mb-xs font-bold uppercase tracking-wider">FOR PROFESSIONALS</div>
              <div className="font-headline-lg text-headline-lg text-on-surface font-extrabold">Pro</div>
              <div className="flex items-baseline mt-sm">
                <span className="text-4xl font-bold text-on-surface">$29</span>
                <span className="text-on-surface-variant ml-xs">/month</span>
              </div>
            </div>
            <ul className="space-y-md mb-xl flex-1 text-left">
              <li className="flex items-center gap-sm text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                Unlimited Projects
              </li>
              <li className="flex items-center gap-sm text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                Custom Domains
              </li>
              <li className="flex items-center gap-sm text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                AI Style Generation
              </li>
              <li className="flex items-center gap-sm text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                Team Collaboration
              </li>
            </ul>
            <motion.button 
              whileHover={{ scale: 1.01, filter: 'brightness(1.08)' }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate('/register')}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-surface font-bold font-headline-md rounded-xl transition-all shadow-md"
            >
              Get Started
            </motion.button>
          </div>

          {/* Enterprise Plan */}
          <div className="surface_glass rounded-[24px] p-8 flex flex-col border border-outline-variant/20 hover:border-outline/40 hover:-translate-y-1 transition-all duration-300 shadow-md">
            <div className="mb-lg text-left">
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-xs font-bold uppercase tracking-wider">FOR SCALE</div>
              <div className="font-headline-lg text-headline-lg text-on-surface font-extrabold">Enterprise</div>
              <div className="flex items-baseline mt-sm">
                <span className="text-4xl font-bold text-on-surface">Custom</span>
              </div>
            </div>
            <ul className="space-y-md mb-xl flex-1 text-left">
              <li className="flex items-center gap-sm text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                White-labeling
              </li>
              <li className="flex items-center gap-sm text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                Advanced Security
              </li>
              <li className="flex items-center gap-sm text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                24/7 Priority Support
              </li>
            </ul>
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 border border-outline-variant hover:border-on-surface hover:bg-surface-variant/10 rounded-xl font-headline-md text-headline-md transition-all text-on-surface font-bold"
            >
              Contact Sales
            </motion.button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-xl px-gutter max-w-screen-2xl mx-auto border-b border-outline-variant/10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg text-left">
          <div className="surface_glass p-8 rounded-2xl border border-outline-variant/20 italic text-body-lg text-on-surface hover:-translate-y-1 transition-all duration-300 shadow-md">
            "Luminous has completely changed how we prototype. We went from Figma to a live, functional landing page in under an hour. The AI suggestions are actually usable."
            <div className="mt-lg flex items-center gap-md not-italic">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center font-bold text-primary border border-outline-variant/20">SC</div>
              <div>
                <div className="font-headline-md text-headline-md text-on-surface font-bold">Sarah Chen</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">Product Lead at Nexa</div>
              </div>
            </div>
          </div>
          
          <div className="surface_glass p-8 rounded-2xl border border-outline-variant/20 italic text-body-lg text-on-surface hover:-translate-y-1 transition-all duration-300 shadow-md">
            "The code quality is surprisingly clean. As a developer, I was skeptical of AI builders, but Luminous produces production-ready React components that I can actually maintain."
            <div className="mt-lg flex items-center gap-md not-italic">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center font-bold text-primary border border-outline-variant/20">MT</div>
              <div>
                <div className="font-headline-md text-headline-md text-on-surface font-bold">Marcus Thorne</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">Senior Engineer</div>
              </div>
            </div>
          </div>

          <div className="surface_glass p-8 rounded-2xl border border-outline-variant/20 italic text-body-lg text-on-surface hover:-translate-y-1 transition-all duration-300 shadow-md">
            "Finally, a builder that prioritizes design. The token-based system makes it so easy to keep everything on-brand while moving at lightning speed."
            <div className="mt-lg flex items-center gap-md not-italic">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center font-bold text-primary border border-outline-variant/20">ER</div>
              <div>
                <div className="font-headline-md text-headline-md text-on-surface font-bold">Elena Rodriguez</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">Brand Designer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion with Framer Motion slide-down */}
      <section className="py-xl px-gutter max-w-3xl mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-center mb-xl text-on-surface font-extrabold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-md text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div 
                key={idx} 
                onClick={() => toggleFaq(idx)}
                className="surface_glass rounded-2xl p-5 border border-outline-variant/20 cursor-pointer transition-all duration-300 hover:border-outline/40 hover:bg-surface-variant/5 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h5 className="font-headline-md text-headline-md text-on-surface font-bold">{faq.question}</h5>
                  <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
                    expand_more
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-md text-on-surface-variant text-body-md leading-relaxed border-t border-outline-variant/10 pt-sm">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* Final CTA Card with Shifting Glows */}
      <section className="py-xl px-gutter">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-surface-container-low to-surface-container-high/90 rounded-[30px] sm:rounded-[40px] p-8 sm:p-16 text-center relative overflow-hidden border border-outline-variant/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group hover:shadow-[0_20px_60px_rgba(173,198,255,0.08)] transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10"></div>
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/10 blur-3xl rounded-full -z-10"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-secondary/10 blur-3xl rounded-full -z-10"></div>
          
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-extrabold mb-md text-on-surface tracking-tight">Ready to build the future?</h2>
          <p className="text-on-surface-variant text-body-lg mb-lg max-w-2xl mx-auto leading-relaxed">
            Join 10,000+ creators building faster, smarter websites with Luminous.
          </p>
          <motion.button 
            whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/templates')}
            className="px-xl py-md bg-gradient-to-r from-primary to-secondary text-surface font-bold font-headline-md rounded-xl shadow-lg transition-all"
          >
            Start Your Project Now
          </motion.button>
        </div>
      </section>
    </div>
  )
}
