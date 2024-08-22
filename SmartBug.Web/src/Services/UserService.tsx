import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllUsers = async (enterpriseId:number) => {
    try {
        const response = await api.get(`/api/v1/User/get-all?enterpriseId=${enterpriseId}`);
        return response;
    } catch (error) {
      errorLog('UserService->getAllUsers', error);
      throw error;
    }
  }

  export const getAllSelectUsuarios = async () => {
    try {
        const response = await api.get(`/api/v1/User/get-select-all`);
        return response.data
    } catch (error) {
      errorLog('EmpreendimentoService->getAllSelectEmpreendimentos', error)
      throw error
    }
  }

  export const getUser = async (userId:number) => {
    try {
        const response = await api.get(`/api/v1/User/get-user?userId=${userId}`);
        return response.data;
    } catch (error) {
      errorLog('UserService->getUser', error);
      throw error;
    }
  }

  export const addUser = async (User:any) => {
    try {
      if(User.isActive){
        User.isActive = User.isActive.toString();
      }else{
        User.isActive = User.isActive.toString();
      }
      
      const response = await api.post('/api/v1/User/create-user', User);
      return { status: response.status, data: response.data };
    } catch (error) {
      errorLog('UserService->addUser', error);
      throw error;
    }
  }

  export const UpdateUser = async (User: any) => {
    try {
      if(User.isActive){
        User.isActive = User.isActive.toString();
      }else{
        User.isActive = User.isActive.toString();
      }
  
      const response = await api.post('/api/v1/User/update-user', User);
      return { status: response.status, data: response.data };
    } catch (error) {
      errorLog('UserService->UpdateUser', error);
      throw error;
    }
  };
  