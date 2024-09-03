import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const GetSelectAllEmpreendimento = async (userId: number) => {
    try {
        const response = await api.get(`/api/v1/Report/get-select-all-empreendimento?userId=${userId}`);
        return response.data
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('ReportService->GetSelectAllEmpreendimento', error);
            throw error;
        } else {
            errorLog('ReportService->GetSelectAllEmpreendimento - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data };
        }
    }
}