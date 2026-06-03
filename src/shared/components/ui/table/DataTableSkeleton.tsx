type Props = {
  columns: number
  skeletonRows?: number
}

export const DataTableSkeleton = ({ columns, skeletonRows = 5 }: Props) => {
  return (
    <>
      {Array.from({ length: skeletonRows }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="border-t border-slate-100"
        >
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <td
              key={columnIndex}
              className="px-6 py-5"
            >
              <div className="h-4 animate-pulse rounded-md bg-slate-200" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}