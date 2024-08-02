import { api } from '../Utils/Axios'
import { errorLog, infoLog } from '../Utils/Logger'

export const getAllUsers = async (enterpriseId:number) => {
    infoLog('UserService->getAllUsers', enterpriseId)
    try {
        const response = await api.get(`/api/User/get-all?enterpriseId=${enterpriseId}`);
        return response.data
    } catch (error) {
      errorLog('UserService->getAllUsers', error)
      throw error
    }
  }