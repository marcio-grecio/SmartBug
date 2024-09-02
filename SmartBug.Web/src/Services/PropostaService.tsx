import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllPropostas = async () => {
    try {
        const response = await api.get(`/api/v1/Proposta/get-all`);
        return response
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('PropostaService->getAllPropostas', error);
            throw error; 
        } else {
            errorLog('PropostaService->getAllPropostas - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const getProposta = async (propostaId: number) => {
    try {
        const response = await api.get(`/api/v1/Proposta/get-proposta?propostaId=${propostaId}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('PropostaService->getProposta', error);
            throw error; 
        } else {
            errorLog('PropostaService->getProposta - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const addProposta = async (proposta: any) => {
    try {
        const response = await api.post('/api/v1/Proposta/create-proposta', proposta);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('PropostaService->addProposta', error);
            throw error; 
        } else {
            errorLog('PropostaService->addProposta - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const UpdateProposta = async (proposta: any) => {
    try {
        const response = await api.post('/api/v1/Proposta/update-proposta', proposta);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('PropostaService->UpdateProposta', error);
            throw error; 
        } else {
            errorLog('PropostaService->UpdateProposta - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
};
