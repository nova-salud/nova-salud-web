import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const FilterContainer = ({ children }: Props) => (
  <div className="rounded-3xl border-2 border-slate-300 bg-white p-4 shadow-lg">
    {children}
  </div>
)
