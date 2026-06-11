import type { ComponentProps } from 'react'
import { DropdownItem } from './DropdownItem'
import { XCircle, CheckCircle } from 'lucide-react'

interface Props extends Omit<ComponentProps<typeof DropdownItem>, 'children'> {
  isActive: boolean
}

export const DropdownStatusItem: React.FC<Props> = ({ isActive, onClick}) => {
  return (
    <DropdownItem onClick={onClick}>
      {isActive
        ? <XCircle size={14} className="text-danger" />
        : <CheckCircle size={14} className="text-success" />
      }
      {isActive ? 'Desactivar' : 'Activar'}
    </DropdownItem>
  )
}