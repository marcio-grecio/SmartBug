import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllVendas = async () => {
    try {
        const response = await api.get(`/api/v1/Venda/get-all`);
        return response
    } catch (error) {
        errorLog('VendaService->getAllVendas', error)
        throw error
    }
}

export const getVenda = async (vendaId: number) => {
    try {
        const response = await api.get(`/api/v1/Venda/get-venda?vendaId=${vendaId}`);
        return response.data;
    } catch (error) {
        errorLog('VendaService->getVenda', error);
        throw error;
    }
}

export const addVenda = async (cliente: any) => {
    try {
        const response = await api.post('/api/v1/Venda/create-venda', cliente);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('VendaService->addProposta', error);
        throw error;
    }
}

export const UpdateVenda = async (cliente: any) => {
    try {
        const response = await api.post('/api/v1/Venda/update-venda', cliente);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('VendaService->UpdateProposta', error);
        throw error;
    }
};
