import type { ApiResponseAction, ApiResponseSingle } from "~~/types/types"

interface Login
{
    access_token: string
    refresh_token: string
    message: string
}

export interface User {
  id: string
  full_name: string
  email: string
  // tambah sesuai struktur user dari backend-mu
}

export const useAuth = () => {  


    const user = useCookie<User | null>('user', { sameSite: 'strict' , maxAge: 3600})
 
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase
 
  
    const login = async (payload: FormData) => {
      try {
        const  data = await $fetch<ApiResponseSingle<User>>('/auth/login', {
          baseURL,
          method: 'POST',
          body: payload,
        }) 
            
        user.value = data.data

        return data
        
      } catch (error: any) {
        throw error?.data || error 
      }
    }  

    const register = async (payload: FormData) => {
      try {
        const  data = await $fetch<ApiResponseAction>('/auth/register', {
          baseURL,
          method: 'POST',
          body: payload,
        })  

        return data
        
      } catch (error: any) {
        throw error?.data || error 
      }
    }   

    const fetchCurrentUser = async () => {
    try {
      const data = await $fetch<ApiResponseSingle<User>>('/auth/me', {
        baseURL,
        credentials: 'include', // penting: agar cookie HttpOnly terkirim
      })

      // user.value = data.data

    
      user.value = data.data

      return data.data
    } catch (error: any) {
      user.value = null
      throw error?.data || error
    }
  }

    const loginWithGoogle = () => { 
    window.location.href = `${baseURL}/auth/google/login`
  }

    const logout = async () => {
    try {
      // Optional: kalau backend kamu punya endpoint /auth/logout
      await $fetch<ApiResponseAction>('/auth/logout', {
        baseURL,
        method: 'POST',
        credentials: 'include', // agar cookie HttpOnly juga dihapus server
      })
    } catch (_) {
      // even if error, tetap lanjut reset client-side
    }

    // Clear cookie dan state user
    user.value = null
  }
  
      const forgotPassword = async (payload: FormData) => {
      try {
        const  data = await $fetch<ApiResponseAction>('/auth/forgot-password', {
          baseURL,
          method: 'POST',
          body: payload,
        })  

        return data
        
      } catch (error: any) {
        throw error?.data || error 
      }
    }   
      const resetPassword = async (payload: FormData) => {
      try {
        const  data = await $fetch<ApiResponseAction>('/auth/reset-password', {
          baseURL,
          method: 'POST',
          body: payload,
        })  

        return data
        
      } catch (error: any) {
        throw error?.data || error 
      }
    }   

    return {
      user, 
      login, 
      loginWithGoogle,
      fetchCurrentUser,
      logout,
      register,
      forgotPassword,
      resetPassword
    }
  }
  