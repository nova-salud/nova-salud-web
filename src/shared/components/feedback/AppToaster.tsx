import { Toaster } from 'sonner'

const AppToaster = () => {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      expand
      visibleToasts={5}
    />
  )
}

export default AppToaster