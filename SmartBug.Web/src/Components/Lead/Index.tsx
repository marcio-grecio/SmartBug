import Input from "../Input/Index";
import Button from "../Button/Index";
import { Check, X } from 'lucide-react';
import React, { useState, useEffect } from "react";
import InputDropDown from "../Input/InputDropDown";
import { getAllSelectCanais } from "../../Services/CanalService";
import { getAllSelectEmpreendimentos } from "../../Services/EmpreendimentoService";


interface LeadFormProps {
    formData: {
        id: number;
        canalId: number;
        quantidade: number;
        empreendimentoId: number;
        dataLead: string | Date;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: () => void;
    toggleModal: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({
    formData,
    handleInputChange,
    handleSubmit,
    toggleModal
}) => {
    const [empreendimentos, setEmpreendimentos] = useState<{ label: string; value: string }[]>([]);
    const [canais, setCanais] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        const fetchEmpreendimentos = async () => {
            try {
                const selectEmp = await getAllSelectEmpreendimentos();
                const formattedEmp = selectEmp.map((empreendimento: { id: number, nome: string }) => ({
                    label: empreendimento.nome,
                    value: empreendimento.id.toString(),
                }));
                setEmpreendimentos(formattedEmp);

                const selectCanal = await getAllSelectCanais();
                const formattedCanais = selectCanal.map((canal: { id: number, nome: string }) => ({
                    label: canal.nome,
                    value: canal.id.toString(),
                }));
                setCanais(formattedCanais);

            } catch (error) {
                console.error("Erro ao buscar empreendimentos:", error);
            }
        };

        fetchEmpreendimentos();
    }, []);

    return (
        <div className="bg-white dark:bg-boxdark p-6 rounded-md shadow-lg w-203">
            <h2 className="text-lg font-medium text-black dark:text-white mb-6 -mt-3">
                {formData.id ? "Alterar Lead" : "Novo Lead"}
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

                <div className="col-md-6 mb-4">
                    <InputDropDown
                        label="Fonte do Lead"
                        name="canalId"
                        value={formData.canalId.toString()} // Certifique-se que é uma string
                        options={canais}
                        onChange={handleInputChange}
                        multiple={false}
                        placeholder="Selecione um canal de lead"
                        required
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
                    <label className="block text-sm font-medium text-black dark:text-white">Data do lead</label>
                    <Input
                        type="date"
                        name="dataLead"
                        value={
                            formData.dataLead && typeof formData.dataLead === 'string'
                                ? formData.dataLead.split('T')[0]
                                : formData.dataLead instanceof Date
                                    ? formData.dataLead.toISOString().split('T')[0]
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

export default React.memo(LeadForm);
