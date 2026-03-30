import { createBrowserRouter } from 'react-router'
import { authRoutes } from './routes/auth.routes'
import { appRoutes } from './routes/app.routes'

export const router = createBrowserRouter([
  authRoutes,
  appRoutes,
])