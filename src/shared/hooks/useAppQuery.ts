import { parseBackendError } from '@/core/utils/parse-backend-error'
import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

type AppQueryOptions<TQueryFnData, TError = Error> =
  Omit<UseQueryOptions<TQueryFnData, TError>, 'queryFn'> & {
    queryFn: () => Promise<TQueryFnData>
  }

export const useAppQuery = <TQueryFnData>({
  queryFn,
  ...options
}: AppQueryOptions<TQueryFnData>) => {
  return useQuery({
    ...options,
    queryFn: async () => {
      try {
        return await queryFn()
      } catch (error) {
        const message = parseBackendError(error)
        throw new Error(message, { cause: error })
      }
    },
  })
}