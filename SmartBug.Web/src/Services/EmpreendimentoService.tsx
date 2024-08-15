import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllSelectEmpreendimentos = async () => {
    try {
        const response = await api.get(`/api/v1/Empreendimento/get-all`);
        return response.data
    } catch (error) {
      errorLog('UserService->getAllUsers', error)
      throw error
    }
  }