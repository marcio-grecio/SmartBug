import { api } from '../Utils/Axios';
import { errorLog } from '../Utils/Logger';

export const getAllSelectEmpreendimentos = async () => {
    try {
        const response = await api.get(`/api/v1/Empreendimento/get-select-all`);
        return response.data
    } catch (error) {
      errorLog('EmpreendimentoService->getAllSelectEmpreendimentos', error)
      throw error
    }
  }

  export const getAllEmpreendimentos = async () => {
    try {
        const response = await api.get(`/api/v1/Empreendimento/get-all`);
        return response
    } catch (error) {
      errorLog('EmpreendimentoService->getAllEmpreendimentos', error)
      throw error
    }
  }
  
  export const getEmpreendimento = async (empreendimentoId:number) => {
    try {
        const response = await api.get(`/api/v1/Empreendimento/get-empreendimento?empreendimentoId=${empreendimentoId}`);
        return response.data;
    } catch (error) {
      errorLog('EmpreendimentoService->getEmpreendimento', error);
      throw error;
    }
  }

  export const addEmpreendimento = async (empreendimento:any) => {
    try {
     
      const response = await api.post('/api/v1/Empreendimento/create-empreendimento', empreendimento);
      return { status: response.status, data: response.data };
    } catch (error) {
      errorLog('EmpreendimentoService->addEmpreendimento', error);
      throw error;
    }
  }

  export const UpdateEmpreendimento = async (empreendimento: any) => {
    try { 
      const response = await api.post('/api/v1/Empreendimento/update-empreendimento', empreendimento);
      return { status: response.status, data: response.data };
    } catch (error) {
      errorLog('EmpreendimentoService->UpdateEmpreendimento', error);
      throw error;
    }
  };
  