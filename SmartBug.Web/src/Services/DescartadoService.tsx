import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllLeads = async () => {
    try {
        const response = await api.get(`/api/v1/Descartados/get-all`);
        return response
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('DescartadoService->getAllLeads', error);
            throw error; 
        } else {
            errorLog('DescartadoService->getAllLeads - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const getLead = async (leadId: number) => {
    try {
        const response = await api.get(`/api/v1/Descartados/get-lead?leadId=${leadId}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('DescartadoService->getLead', error);
            throw error; 
        } else {
            errorLog('DescartadoService->getLead - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const addLead = async (lead: any) => {
    try {

        const response = await api.post('/api/v1/Descartados/create-lead', lead);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('DescartadoService->addLead', error);
            throw error; 
        } else {
            errorLog('DescartadoService->addLead - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const UpdateLead = async (lead: any) => {
    try {
        const response = await api.post('/api/v1/Descartados/update-lead', lead);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('DescartadoService->UpdateLead', error);
            throw error; 
        } else {
            errorLog('DescartadoService->UpdateLead - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
};
