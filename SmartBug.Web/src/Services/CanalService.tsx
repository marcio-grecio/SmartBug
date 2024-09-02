import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllSelectCanais = async () => {
    try {
        const response = await api.get(`/api/v1/Canal/get-select-all`);
        return response.data
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('CanalService->getAllSelectCanais', error);
            throw error; 
        } else {
            errorLog('CanalService->getAllSelectCanais - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
  }

export const getAllCanais = async () => {
    try {
        const response = await api.get(`/api/v1/Canal/get-all`);
        return response
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('CanalService->getAllCanais', error);
            throw error; 
        } else {
            errorLog('CanalService->getAllCanais - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const getCanal = async (canalId: number) => {
    try {
        const response = await api.get(`/api/v1/Canal/get-canal?canalId=${canalId}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('CanalService->getCanal', error);
            throw error; 
        } else {
            errorLog('CanalService->getCanal - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const addCanal = async (canal: any) => {
    try {
        const response = await api.post('/api/v1/Canal/create-canal', canal);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('CanalService->addCanal', error);
            throw error; 
        } else {
            errorLog('CanalService->addCanal - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const UpdateCanal = async (canal: any) => {
    try {
        const response = await api.post('/api/v1/Canal/update-canal', canal);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('CanalService->UpdateCanal', error);
            throw error; 
        } else {
            errorLog('CanalService->UpdateCanal - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
};
