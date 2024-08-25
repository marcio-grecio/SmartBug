import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllClientes = async () => {
    try {
        const response = await api.get(`/api/v1/Cliente/get-all`);
        return response
    } catch (error) {
        errorLog('ClienteP4Service->getAllClienteP4', error)
        throw error
    }
}

export const getCliente = async (clienteId: number) => {
    try {
        const response = await api.get(`/api/v1/Cliente/get-cliente?clienteId=${clienteId}`);
        return response.data;
    } catch (error) {
        errorLog('ClienteP4Service->getClienteP4', error);
        throw error;
    }
}

export const addCliente = async (cliente: any) => {
    try {
        const response = await api.post('/api/v1/Cliente/create-cliente', cliente);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('ClienteP4Service->addClienteP4', error);
        throw error;
    }
}

export const UpdateCliente = async (cliente: any) => {
    try {
        const response = await api.post('/api/v1/Cliente/update-cliente', cliente);
        return { status: response.status, data: response.data };
    } catch (error) {
        errorLog('ClienteP4Service->UpdateClienteP4', error);
        throw error;
    }
};
