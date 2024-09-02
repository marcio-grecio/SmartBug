import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllUsers = async (enterpriseId:number) => {
    try {
        const response = await api.get(`/api/v1/User/get-all-users?enterpriseId=${enterpriseId}`);
        return response;
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('UserService->getAllUsers', error);
            throw error; 
        } else {
            errorLog('UserService->getAllUsers - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
  }

  export const getAllSelectUsuarios = async () => {
    try {
        const response = await api.get(`/api/v1/User/get-select-all`);
        return response.data
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('UserService->getAllSelectUsuarios', error);
            throw error; 
        } else {
            errorLog('UserService->getAllSelectUsuarios - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
  }

  export const getUser = async (userId:number) => {
    try {
        const response = await api.get(`/api/v1/User/get-user?userId=${userId}`);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('UserService->getUser', error);
            throw error; 
        } else {
            errorLog('UserService->getUser - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
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
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
          errorLog('UserService->addUser', error);
          throw error; 
      } else {
          errorLog('UserService->addUser - Erro não crítico', error);
          return { status: error.response?.status || 500, data: error.response?.data }; 
      }
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
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
          errorLog('UserService->UpdateUser', error);
          throw error; 
      } else {
          errorLog('UserService->UpdateUser - Erro não crítico', error);
          return { status: error.response?.status || 500, data: error.response?.data }; 
      }
  }
  };
  