import { Toaster } from 'sonner'

export const AppToaster = () => {
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