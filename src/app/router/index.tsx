import { createBrowserRouter } from 'react-router-dom'

import { marketingRoutes } from '@/app/router/routes/marketing.routes'
import { authRoutes } from '@/app/router/routes/auth.routes'
import { dashboardRoutes } from '@/app/router/routes/dashboard.routes'
import { editorRoutes } from '@/app/router/routes/editor.routes'
import { publicSiteRoutes } from '@/app/router/routes/public-site.routes'
import { errorRoutes } from '@/app/router/routes/error.routes'

export const router = createBrowserRouter([
  marketingRoutes,
  authRoutes,
  dashboardRoutes,
  editorRoutes,
  publicSiteRoutes,
  errorRoutes,
])