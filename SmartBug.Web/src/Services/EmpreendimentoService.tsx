import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllSelectEmpreendimentos = async () => {
    try {
        const response = await api.get(`/api/v1/Empreendimento/get-select-all`);
        return response.data
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('EmpreendimentoService->getAllSelectEmpreendimentos', error);
            throw error; 
        } else {
            errorLog('EmpreendimentoService->getAllSelectEmpreendimentos - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
  }

  export const getAllEmpreendimentos = async () => {
    try {
        const response = await api.get(`/api/v1/Empreendimento/get-all`);
        return response
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('EmpreendimentoService->getAllEmpreendimentos', error);
            throw error; 
        } else {
            errorLog('EmpreendimentoService->getAllEmpreendimentos - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
  }
  
  export const getEmpreendimento = async (empreendimentoId:number) => {
    try {
        const response = await api.get(`/api/v1/Empreendimento/get-empreendimento?empreendimentoId=${empreendimentoId}`);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
            errorLog('EmpreendimentoService->getEmpreendimento', error);
            throw error; 
        } else {
            errorLog('EmpreendimentoService->getEmpreendimento - Erro não crítico', error);
            return { status: error.response?.status || 500, data: error.response?.data }; 
        }
    }
  }

  export const addEmpreendimento = async (empreendimento:any) => {
    try {
     
      const response = await api.post('/api/v1/Empreendimento/create-empreendimento', empreendimento);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
          errorLog('EmpreendimentoService->addEmpreendimento', error);
          throw error; 
      } else {
          errorLog('EmpreendimentoService->addEmpreendimento - Erro não crítico', error);
          return { status: error.response?.status || 500, data: error.response?.data }; 
      }
  }
  }

  export const UpdateEmpreendimento = async (empreendimento: any) => {
    try { 
      const response = await api.post('/api/v1/Empreendimento/update-empreendimento', empreendimento);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
          errorLog('EmpreendimentoService->UpdateEmpreendimento', error);
          throw error; 
      } else {
          errorLog('EmpreendimentoService->UpdateEmpreendimento - Erro não crítico', error);
          return { status: error.response?.status || 500, data: error.response?.data }; 
      }
  }
  };
  