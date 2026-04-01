import { useEffect, useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import { therapeuticCategoryService } from '../services/therapeutic-category.service'

type Category = {
  id: number
  name: string
}

export const useTherapeuticCategories = () => {
  const [data, setData] = useState<Category[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await therapeuticCategoryService.findAll({
          page: 1,
          pageSize: 100,
        })

        setData(result.data)
      } catch (err) {
        const backendError = err as BackendError
        setError(backendError.message as string)
      }
    }

    void fetchData()
  }, [])

  return { data, error }
}