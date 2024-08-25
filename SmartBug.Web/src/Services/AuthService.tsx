import { api } from '../Utils/Axios'
import { errorLog } from '../Utils/Logger'

export const authenticate = async (login:string, senha:string) => {
    try {
      const response = await api.post('/api/v1/Auth/login', {
        login,
        senha,
      })
      return response.data
    } catch (error) {
      errorLog('authService->authenticate', error)
      throw error
    }
  }