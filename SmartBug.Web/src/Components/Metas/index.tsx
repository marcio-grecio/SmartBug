import Input from "../Input/Index";
import Button from "../Button/Index";
import { Check, X } from 'lucide-react';
import React, { useState, useEffect } from "react";
import InputDropDown from "../Input/InputDropDown";
import { getAllSelectEmpreendimentos } from "../../Services/EmpreendimentoService";

interface VendaFormFormProps {
    formData: {
        id: number;
        tipo: string;
        quantidade: number;
        empreendimentoId: number;
        dataInicial: string | Date;
        dataFinal: string | Date;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: () => void;
    toggleModal: () => void;
}

const MetaForm: React.FC<VendaFormFormProps> = ({
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
                {formData.id ? "Alterar Meta" : "Nova Meta"}
            </h2>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="row">
                <div className="col-md-12 mb-4">
                    <hr className="border-bodydark dark:border-strokedark" />
                </div>

                <div className="col-md-8 mb-4">
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

                <div className="col-md-4 mb-4">
                    <InputDropDown
                        label="Tipo da Meta"
                        name="tipo"
                        value={formData.tipo.toString()}
                        options={[
                            { label: 'LEAD', value: '1' },
                            { label: 'VENDA', value: '2' },
                        ]}
                        onChange={handleInputChange}
                        placeholder="Selecionar"
                        required
                    />
                </div>

                <div className="col-md-4 mb-4">
                    <label className="block text-sm font-medium text-black dark:text-white">Data Inicial</label>
                    <Input
                        type="date"
                        name="dataInicial"
                        value={
                            formData.dataInicial && typeof formData.dataInicial === 'string'
                                ? formData.dataInicial.split('T')[0]
                                : formData.dataInicial instanceof Date
                                    ? formData.dataInicial.toISOString().split('T')[0]
                                    : ''
                        }
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="col-md-4 mb-4">
                    <label className="block text-sm font-medium text-black dark:text-white">Data Final</label>
                    <Input
                        type="date"
                        name="dataFinal"
                        value={
                            formData.dataFinal && typeof formData.dataFinal === 'string'
                                ? formData.dataFinal.split('T')[0]
                                : formData.dataFinal instanceof Date
                                    ? formData.dataFinal.toISOString().split('T')[0]
                                    : ''
                        }
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="col-md-4 mb-4">
                    <label className="block text-sm font-medium text-black dark:text-white">Quantidade</label>
                    <Input
                        type="number"
                        name="quantidade"
                        value={formData.quantidade}
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

export default React.memo(MetaForm);
