import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllLeads = async () => {
    try {
        const response = await api.get(`/api/v1/Lead/get-all`);
        return response
    } catch (error) {
        errorLog('LeadService->getAllLeads', error)
        throw error
    }
}

export const getLead = async (leadId: number) => {
    try {
        const response = await api.get(`/api/v1/Lead/get-lead?leadId=${leadId}`);
        return response.data;
    } catch (error) {
        errorLog('LeadService->getLead', error);
        throw error;
    }
}

export const addLead = async (lead: any) => {
    try {

        const response = await api.post('/api/v1/Lead/create-lead', lead);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('LeadService->addLead', error);
        throw error;
    }
}

export const UpdateLead = async (lead: any) => {
    try {
        const response = await api.post('/api/v1/Lead/update-lead', lead);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('LeadService->UpdateLead', error);
        throw error;
    }
};
