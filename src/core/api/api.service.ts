import type { AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axios.instance'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'

export abstract class ApiService {
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.get<T>(url, config)
    return response.data
  }

  protected async getPaginated<T>(url: string, config?: AxiosRequestConfig): Promise<PaginatedResponse<T>> {
    const response = await axiosInstance.get<PaginatedResponse<T>>(url, config)
    return response.data
  }

  protected async post<TResponse, TPayload = unknown>(
    url: string,
    payload?: TPayload,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await axiosInstance.post<TResponse>(url, payload, config)
    return response.data
  }

  protected async patch<TResponse, TPayload = unknown>(
    url: string,
    payload?: TPayload,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await axiosInstance.patch<TResponse>(url, payload, config)
    return response.data
  }

  protected async delete(url: string, config?: AxiosRequestConfig): Promise<void> {
    await axiosInstance.delete(url, config)
  }
}