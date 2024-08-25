import Input from "../Input/Index";
import Button from "../Button/Index";
import { Check, X } from 'lucide-react';
import React, { useState, useEffect } from "react";
import InputDropDown from "../Input/InputDropDown";
import { getAllSelectEmpreendimentos } from "../../Services/EmpreendimentoService";

interface PropostaFormFormProps {
    formData: {
        id: number;
        quantidade: number;
        empreendimentoId: number;
        data: string | Date;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: () => void;
    toggleModal: () => void;
}

const PropostaForm: React.FC<PropostaFormFormProps> = ({
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
                {formData.id ? "Alterar Cliente" : "Novo Cliente"}
            </h2>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="row">
                <div className="col-md-12 mb-4">
                    <hr className="border-bodydark dark:border-strokedark" />
                </div>

                <div className="col-md-12 mb-4">
                    <InputDropDown
                        label="Empreendimento"
                        name="empreendimentoId"
                        value={formData.empreendimentoId.toString()} // Certifique-se que é uma string
                        options={empreendimentos}
                        onChange={handleInputChange}
                        multiple={false}
                        placeholder="Selecione um empreendimento"
                        required
                        autoFocus
                    />
                </div>

                <div className="col-md-3 mb-4">
                    <label className="block text-sm font-medium text-black dark:text-white">Quantidade</label>
                    <Input
                        type="number"
                        name="quantidade"
                        value={formData.quantidade}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="col-md-3 mb-4">
                    <label className="block text-sm font-medium text-black dark:text-white">Data</label>
                    <Input
                        type="date"
                        name="data"
                        value={
                            formData.data && typeof formData.data === 'string'
                                ? formData.data.split('T')[0]
                                : formData.data instanceof Date
                                    ? formData.data.toISOString().split('T')[0]
                                    : ''
                        }
                        onChange={handleInputChange}
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

export default React.memo(PropostaForm);
