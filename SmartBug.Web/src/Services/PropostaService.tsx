import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllPropostas = async () => {
    try {
        const response = await api.get(`/api/v1/Proposta/get-all`);
        return response
    } catch (error) {
        errorLog('PropostaService->getAllPropostas', error)
        throw error
    }
}

export const getProposta = async (propostaId: number) => {
    try {
        const response = await api.get(`/api/v1/Proposta/get-proposta?propostaId=${propostaId}`);
        return response.data;
    } catch (error) {
        errorLog('PropostaService->getProposta', error);
        throw error;
    }
}

export const addProposta = async (proposta: any) => {
    try {
        const response = await api.post('/api/v1/Proposta/create-proposta', proposta);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('PropostaService->addProposta', error);
        throw error;
    }
}

export const UpdateProposta = async (proposta: any) => {
    try {
        const response = await api.post('/api/v1/Proposta/update-proposta', proposta);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('PropostaService->UpdateProposta', error);
        throw error;
    }
};
