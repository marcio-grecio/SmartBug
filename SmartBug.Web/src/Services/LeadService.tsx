import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllLeads = async () => {
    try {
        const response = await api.get(`/api/v1/Lead/get-all`);
        return response
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('LeadService->getAllLeads', error);
            throw error; 
        } else {
            errorLog('LeadService->getAllLeads - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const getLead = async (leadId: number) => {
    try {
        const response = await api.get(`/api/v1/Lead/get-lead?leadId=${leadId}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('LeadService->getLead', error);
            throw error; 
        } else {
            errorLog('LeadService->getLead - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const addLead = async (lead: any) => {
    try {
        const response = await api.post('/api/v1/Lead/create-lead', lead);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('LeadService->addLead', error);
            throw error; 
        } else {
            errorLog('LeadService->addLead - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
};


export const UpdateLead = async (lead: any) => {
    try {
        const response = await api.post('/api/v1/Lead/update-lead', lead);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('LeadService->UpdateLead', error);
            throw error; 
        } else {
            errorLog('LeadService->UpdateLead - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
};
