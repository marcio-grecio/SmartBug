import Input from "../Input/Index";
import Button from "../Button/Index";
import { Check, X } from 'lucide-react';
import React, { useState, useEffect } from "react";
import InputDropDown from "../Input/InputDropDown";
import { getAllSelectUsuarios } from "../../Services/UserService";
import ColorPicker from "../ColorPicker/Index";

interface EmpreendimentoFormProps {
  formData: {
    id: number;
    cor: string;
    nome: string;
    localidade: string;
    construtora: string;
    unidadesTotal: number;
    unidadesDisponiveis: number;
    usuarios: string[];
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: () => void;
  toggleModal: () => void;
}

const EmpreendimentoForm: React.FC<EmpreendimentoFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  toggleModal
}) => {
  const [color, setColor] = useState(formData.cor || '#42445A');
  const [usuarios, setUsuarios] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await getAllSelectUsuarios();
        const formattedEmpreendimentos = response.map((empreendimento: { id: number, nome: string }) => ({
          label: empreendimento.nome,
          value: empreendimento.id.toString(),
        }));
        setUsuarios(formattedEmpreendimentos);
      } catch (error) {
        console.error("Erro ao buscar empreendimentos:", error);
      }
    };

    fetchUsuarios();
  }, []);

  // Atualiza o formData sempre que a cor é alterada
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    handleInputChange({
      target: { name: "cor", value: newColor } 
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="bg-white dark:bg-boxdark p-6 rounded-md shadow-lg w-203">
      <h2 className="text-lg font-medium text-black dark:text-white mb-6 -mt-3">
        {formData.id ? "Alterar Empreendimento" : "Novo Empreendimento"}
      </h2>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="row">
        <div className="col-md-12 mb-4">
          <hr className="border-bodydark dark:border-strokedark" />
        </div>

        <div className="col-md-12 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Nome do Empreendimento</label>
          <Input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            autoFocus
            required
          />
        </div>

        <div className="col-md-9 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Construtora</label>
          <Input
            type="text"
            name="construtora"
            value={formData.construtora}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-3 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Selecione uma cor</label>
          <ColorPicker value={color} onChange={handleColorChange} />
        </div>

        <div className="col-md-6 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Localidade</label>
          <Input
            type="text"
            name="localidade"
            value={formData.localidade}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-3 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Unidades Totais</label>
          <Input
            type="number"
            name="unidadesTotal"
            value={formData.unidadesTotal}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-3 mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Unidades Disponíveis</label>
          <Input
            type="number"
            name="unidadesDisponiveis"
            value={formData.unidadesDisponiveis}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-12 mb-4">
          <InputDropDown
            label="Usuários"
            name="usuarios"
            value={formData.usuarios}
            options={usuarios}
            onChange={handleInputChange}
            multiple={true}
            placeholder="Selecione os Usuários"
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

export default React.memo(EmpreendimentoForm);
