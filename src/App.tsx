import { RouterProvider } from 'react-router'
import AppProvider from '@/app/providers/AppProvider'
import { router } from '@/app/router'

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App