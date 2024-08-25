import Input from "../Input/Index";
import Button from "../Button/Index";
import { Check, X } from 'lucide-react';
import React, { useState, useEffect } from "react";
import InputDropDown from "../Input/InputDropDown";
import { getAllSelectEmpreendimentos } from "../../Services/EmpreendimentoService";

interface UsuarioFormProps {
  formData: {
    id: number;
    nome: string;
    ocupacao: string;
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

const UsuarioForm: React.FC<UsuarioFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  toggleModal
}) => {
  const [empreendimentos, setEmpreendimentos] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchEmpreendimentos = async () => {
      try {
        const response = await getAllSelectEmpreendimentos();
        const formattedEmpreendimentos = response.map((empreendimento: { id: number, nome: string }) => ({
          label: empreendimento.nome,
          value: empreendimento.id.toString(),
        }));
        setEmpreendimentos(formattedEmpreendimentos);
      } catch (error) {
        console.error("Erro ao buscar empreendimentos:", error);
      }
    };

    fetchEmpreendimentos();
  }, []);

  return (
    <div className="bg-white dark:bg-boxdark p-6 rounded-md shadow-lg w-203">
      <h2 className="text-lg font-medium text-black dark:text-white mb-6 -mt-3">
        {formData.id ? "Alterar Usuário" : "Novo Usuário"}
      </h2>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="row">
        <div className="col-md-12 mb-4">
          <hr className="border-bodydark dark:border-strokedark" />
        </div>

        <div className="col-md-12 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Nome</label>
          <Input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            autoFocus
            required
          />
        </div>

        <div className="col-md-12 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Ocupação</label>
          <Input
            type="text"
            name="ocupacao"
            value={formData.ocupacao}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-12 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Email / Login <span className="text-red-500">*</span></label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-4 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white"> {formData.id ? "Nova Senha" : "Senha"} <span className="text-red-500">*</span></label>
          <Input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-4 mb-4">
          <InputDropDown
            label="Perfil"
            name="perfil"
            value={formData.perfil.toString()}
            options={[
              { label: 'SIMPLES', value: '3' },
              { label: 'SUPERVISOR', value: '2' },
              { label: 'ADMINISTRADOR', value: '1' },
            ]}
            onChange={handleInputChange}
            placeholder="Selecione um perfil"
            required
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
            placeholder="Selecione uma situação"
            required
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
            placeholder="Selecione os empreendimentos"
            required
          />
        </div>

        <div className="col-xs-12 mb-4">
          <hr className="border-bodydark dark:border-strokedark" />
        </div>

        <div className="col-xs-12 flex justify-end space-x-4">
          <Button
            color='#ff6b6b'
            text='Cancelar'
            onClick={toggleModal}
            disabled={false}
            height={32}
            width={100}
            fontWeight={'600'}
            fontFamily='nunito'
            icon={X}
          />
          <Button
            color='#28C76F'
            text='Salvar'
            disabled={false}
            height={32}
            width={100}
            fontWeight={'600'}
            fontFamily='nunito'
            type="submit"
            icon={Check}
          />
        </div>
      </form>
    </div>
  );
}

export default React.memo(UsuarioForm);
