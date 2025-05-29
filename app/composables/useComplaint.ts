import type { ApiResponseAction, ApiResponseNoPagination, ApiResponseSingle } from '~~/types/types'
import type { Complaint } from '~~/types/complaint'

export const useComplaint = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  // Ambil semua complaint
  const getAllComplaints = async () => {
    try {
      const data = await $fetch<ApiResponseNoPagination<Complaint>>('/complaints', {
        baseURL,
        method: 'GET',
        credentials: 'include',
      })
      return data
    } catch (error: any) {
      throw error?.data || error
    }
  }

  // Ambil complaint by ID
  const getComplaintById = async (id: string) => {
    try {
      const data = await $fetch<ApiResponseSingle<Complaint>>(`/complaints/${id}`, {
        baseURL,
        method: 'GET',
        credentials: 'include',
      })
      return data
    } catch (error: any) {
      throw error?.data || error
    }
  }

  // Ambil complaint by Nomor
  const getComplaintByNumber = async (number: string) => {
    try {
      const data = await $fetch<ApiResponseSingle<Complaint>>(`/complaints/number/${number}`, {
        baseURL,
        method: 'GET',
        credentials: 'include',
      })
      return data
    } catch (error: any) {
      throw error?.data || error
    }
  }

  // Buat complaint baru
  const createComplaint = async (payload: FormData) => {
    try {
      const data = await $fetch<ApiResponseSingle<Complaint>>('/complaints', {
        baseURL,
        method: 'POST',
        body: payload,
        credentials: 'include',
      })
      return data
    } catch (error: any) {
      throw error?.data || error
    }
  }

  // Update complaint by ID
  const updateComplaint = async (id: string, payload: FormData) => {
    try {
      const data = await $fetch<ApiResponseSingle<Complaint>>(`/complaints/${id}`, {
        baseURL,
        method: 'PUT',
        body: payload,
        credentials: 'include',
      })
      return data
    } catch (error: any) {
      throw error?.data || error
    }
  }

  // Hapus complaint
  const deleteComplaint = async (id: string) => {
    try {
      const data = await $fetch<ApiResponseAction>(`/complaints/${id}`, {
        baseURL,
        method: 'DELETE',
        credentials: 'include',
      })
      return data
    } catch (error: any) {
      throw error?.data || error
    }
  }

  return {
    getAllComplaints,
    getComplaintById,
    getComplaintByNumber,
    createComplaint,
    updateComplaint,
    deleteComplaint,
  }
}
