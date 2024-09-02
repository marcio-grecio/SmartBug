import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllClientes = async () => {
    try {
        const response = await api.get(`/api/v1/Cliente/get-all`);
        return response
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('ClienteService->getAllClientes', error);
            throw error;
        } else {
            errorLog('ClienteService->getAllClientes - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data };
        }
    }
}

export const getCliente = async (clienteId: number) => {
    try {
        const response = await api.get(`/api/v1/Cliente/get-cliente?clienteId=${clienteId}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('ClienteService->getCliente', error);
            throw error;
        } else {
            errorLog('ClienteService->getCliente - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data };
        }
    }
}

export const addCliente = async (cliente: any) => {
    try {
        const response = await api.post('/api/v1/Cliente/create-cliente', cliente);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('ClienteService->addCliente', error);
            throw error;
        } else {
            errorLog('ClienteService->addCliente - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data };
        }
    }
}

export const UpdateCliente = async (cliente: any) => {
    try {
        const response = await api.post('/api/v1/Cliente/update-cliente', cliente);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('ClienteService->UpdateCliente', error);
            throw error;
        } else {
            errorLog('ClienteService->UpdateCliente - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data };
        }
    }
};
