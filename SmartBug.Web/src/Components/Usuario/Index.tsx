import React, { useState, useEffect } from "react";
import Button from "../Button/Index";
import Input from "../Input/Index";
import InputDropDown from "../Input/InputDropDown";
import { getAllSelectEmpreendimentos } from "../../Services/EmpreendimentoService";

interface UsuarioFormProps {
  formData: {
    nome: string;
    email: string;
    senha: string;
    avatar: string;
    perfil: number;
    isActive: boolean;
    empreendimentos: string[]; // Array de strings para múltipla seleção
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: () => void;
  toggleModal: () => void;
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({ formData, handleInputChange, handleSubmit, toggleModal }) => {
  const [empreendimentos, setEmpreendimentos] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchEmpreendimentos = async () => {
      const response = await getAllSelectEmpreendimentos();

      // Transformando a resposta no formato esperado
      const formattedEmpreendimentos = response.map((empreendimento: { id: number, nome: string }) => ({
        label: empreendimento.nome,
        value: empreendimento.id.toString(), // Presume-se que `value` seja uma string
      }));

      setEmpreendimentos(formattedEmpreendimentos);
    };

    fetchEmpreendimentos();
  }, []);

  return (
    <div className="bg-white dark:bg-boxdark p-6 rounded-md shadow-lg w-203">
      <h2 className="text-lg font-medium text-black dark:text-white mb-5">Novo Usuário</h2>

      <form className="row">
        <div className="col-md-12 mb-4">
          <hr className="border-bodydark dark:border-strokedark" />
        </div>

        <div className="col-md-12 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Nome</label>
          <Input type="text" name="nome" value={formData.nome} onChange={handleInputChange} autoFocus />
        </div>

        <div className="col-md-12 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Email</label>
          <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>

        <div className="col-md-4 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Senha</label>
          <Input type="password" name="senha" value={formData.senha} onChange={handleInputChange} />
        </div>

        <div className="col-md-4 mb-4">
          <InputDropDown
            label="Perfil"
            name="perfil"
            value={formData.perfil.toString()} // Converte o valor de perfil para string
            options={[
              { label: 'SIMPLES', value: '1' },
              { label: 'SUPERVISOR', value: '2' },
              { label: 'ADMINISTRADOR', value: '3' },
            ]}
            onChange={handleInputChange}
          />
        </div>


        <div className="col-md-4 mb-4">
          <InputDropDown
            label="Situação"
            name="isActive"
            value={formData.isActive ? "true" : "false"}
            options={[
              { label: 'ATIVO', value: 'true' },
              { label: 'INATIVO', value: 'false' },
            ]}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-12 mb-4">
          <InputDropDown
            label="Empreendimentos"
            name="empreendimentos"
            value={formData.empreendimentos}
            options={empreendimentos}
            onChange={handleInputChange}
            multiple={true}
          />

        </div>

        <div className="col-xs-12 mb-4">
          <hr className="border-bodydark dark:border-strokedark" />
        </div>

        <div className="col-xs-12 flex justify-end space-x-4">
          <Button color='#ff6b6b' text='Cancelar' onClick={toggleModal} disabled={false} height={32} width={100} fontWeight={'500'} />
          <Button color='#28C76F' text='Salvar' onClick={handleSubmit} disabled={false} height={32} width={100} fontWeight={'500'} />
        </div>
      </form>
    </div>
  );
}

export default React.memo(UsuarioForm);
