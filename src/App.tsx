import { RouterProvider } from 'react-router'
import AppProvider from '@/app/providers/AppProvider'
import { router } from '@/app/router'
import AppToaster from './shared/components/feedback/AppToaster'

const App = () => {
  return (
    <AppProvider>
      <AppToaster />
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App