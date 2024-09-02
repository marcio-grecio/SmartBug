import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllVendas = async () => {
    try {
        const response = await api.get(`/api/v1/Venda/get-all`);
        return response
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('VendaService->getAllVendas', error);
            throw error;
        } else {
            errorLog('VendaService->getAllVendas - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data };
        }
    }
}

export const getVenda = async (vendaId: number) => {
    try {
        const response = await api.get(`/api/v1/Venda/get-venda?vendaId=${vendaId}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('VendaService->getVenda', error);
            throw error;
        } else {
            errorLog('VendaService->getVenda - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data };
        }
    }
}

export const addVenda = async (cliente: any) => {
    try {
        const response = await api.post('/api/v1/Venda/create-venda', cliente);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('VendaService->addVenda', error);
            throw error;
        } else {
            errorLog('VendaService->addVenda - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data };
        }
    }
}

export const UpdateVenda = async (cliente: any) => {
    try {
        const response = await api.post('/api/v1/Venda/update-venda', cliente);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('VendaService->UpdateVenda', error);
            throw error;
        } else {
            errorLog('VendaService->UpdateVenda - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data };
        }
    }
};
