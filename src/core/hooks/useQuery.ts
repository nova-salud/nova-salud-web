import { useQuery as useRQQuery } from '@tanstack/react-query'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { getFnId } from '@/core/utils/fn-id'

export const useQuery = <T>(
  fetcher: () => Promise<T>,
  initialData: T,
  enabled = true,
) => {
  const { data, isFetching, error, refetch } = useRQQuery({
    queryKey: [getFnId(fetcher)],
    queryFn: fetcher,
    initialData,
    enabled,
    retry: false,
  })

  return {
    data: data ?? initialData,
    isLoading: isFetching,
    error: error ? parseBackendError(error) : null,
    refetch: async () => { await refetch() },
  }
}
