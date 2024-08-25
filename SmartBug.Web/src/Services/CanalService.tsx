import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllSelectCanais = async () => {
    try {
        const response = await api.get(`/api/v1/Canal/get-select-all`);
        return response.data
    } catch (error) {
      errorLog('CanalService->getAllSelectCanais', error)
      throw error
    }
  }

export const getAllCanais = async () => {
    try {
        const response = await api.get(`/api/v1/Canal/get-all`);
        return response
    } catch (error) {
        errorLog('CanalService->getAllCanais', error)
        throw error
    }
}

export const getCanal = async (canalId: number) => {
    try {
        const response = await api.get(`/api/v1/Canal/get-canal?canalId=${canalId}`);
        return response.data;
    } catch (error) {
        errorLog('CanalService->getCanal', error);
        throw error;
    }
}

export const addCanal = async (canal: any) => {
    try {
        const response = await api.post('/api/v1/Canal/create-canal', canal);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('CanalService->addCanal', error);
        throw error;
    }
}

export const UpdateCanal = async (canal: any) => {
    try {
        const response = await api.post('/api/v1/Canal/update-canal', canal);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('CanalService->UpdateCanal', error);
        throw error;
    }
};
