import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllMetas = async () => {
    try {
        const response = await api.get(`/api/v1/Meta/get-all`);
        return response
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('MetaService->getAllMetas', error);
            throw error; 
        } else {
            errorLog('MetaService->getAllMetas - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const getMeta = async (metaId: number) => {
    try {
        const response = await api.get(`/api/v1/Meta/get-meta?metaId=${metaId}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('MetaService->getMeta', error);
            throw error; 
        } else {
            errorLog('MetaService->getMeta - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const addMeta = async (meta: any) => {
    try {

        const response = await api.post('/api/v1/Meta/create-meta', meta);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('MetaService->addMeta', error);
            throw error; 
        } else {
            errorLog('MetaService->addMeta - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const UpdateMeta = async (meta: any) => {
    try {
        const response = await api.post('/api/v1/Meta/update-meta', meta);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('MetaService->UpdateMeta', error);
            throw error; 
        } else {
            errorLog('MetaService->UpdateMeta - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
};
