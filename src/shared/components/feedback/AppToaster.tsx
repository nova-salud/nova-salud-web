import { Toaster } from 'sonner'

const AppToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      expand
      visibleToasts={5}
    />
  )
}

export default AppToaster