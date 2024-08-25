import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllMetas = async () => {
    try {
        const response = await api.get(`/api/v1/Meta/get-all`);
        return response
    } catch (error) {
        errorLog('LeadService->getAllLeads', error)
        throw error
    }
}

export const getMeta = async (metaId: number) => {
    try {
        const response = await api.get(`/api/v1/Meta/get-meta?metaId=${metaId}`);
        return response.data;
    } catch (error) {
        errorLog('LeadService->getLead', error);
        throw error;
    }
}

export const addMeta = async (meta: any) => {
    try {

        const response = await api.post('/api/v1/Meta/create-meta', meta);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('LeadService->addLead', error);
        throw error;
    }
}

export const UpdateMeta = async (meta: any) => {
    try {
        const response = await api.post('/api/v1/Meta/update-meta', meta);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('LeadService->UpdateLead', error);
        throw error;
    }
};
