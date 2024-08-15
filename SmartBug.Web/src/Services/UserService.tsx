import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllUsers = async (enterpriseId:number) => {
    try {
        const response = await api.get(`/api/v1/User/get-all?enterpriseId=${enterpriseId}`);
        return response
    } catch (error) {
      errorLog('UserService->getAllUsers', error)
      throw error
    }
  }