import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllLeadsDashboard = async () => {
    try {
        const response = await api.get(`/api/v1/Dashboard/get-leads`);
        return response
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('DashboardService->getAllLeadsDashboard', error);
            throw error; 
        } else {
            errorLog('DashboardService->getAllLeadsDashboard - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const getAllCanaisDashboard = async () => {
    try {
        const response = await api.get(`/api/v1/Dashboard/get-canais`);
        return response
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('DashboardService->getAllCanaisDashboard', error);
            throw error; 
        } else {
            errorLog('DashboardService->getAllCanaisDashboard - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const getAllLeadsMensalDashboard = async () => {
    try {
        const response = await api.get(`/api/v1/Dashboard/get-leads-mensal`);
        return response
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('DashboardService->getAllLeadsMensalDashboard', error);
            throw error; 
        } else {
            errorLog('DashboardService->getAllLeadsMensalDashboard - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}

export const getAllVendasDashboard = async () => {
    try {
        const response = await api.get(`/api/v1/Dashboard/get-vendas`);
        return response
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('DashboardService->getAllVendasDashboard', error);
            throw error; 
        } else {
            errorLog('DashboardService->getAllVendasDashboard - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
}