import React from "react";
import Input from "../Input/Index";
import Button from "../Button/Index";
import { Check, X } from 'lucide-react';

interface CanalFormProps {
    formData: {
        id: number;
        nome: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: () => void;
    toggleModal: () => void;
}

const ClienteForm: React.FC<CanalFormProps> = ({
    formData,
    handleInputChange,
    handleSubmit,
    toggleModal
}) => {

    return (
        <div className="bg-white dark:bg-boxdark p-6 rounded-md shadow-lg w-203">
            <h2 className="text-lg font-medium text-black dark:text-white mb-6 -mt-3">
                {formData.id ? "Alterar Canal" : "Novo Canal"}
            </h2>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="row">
                <div className="col-md-12 mb-4">
                    <hr className="border-bodydark dark:border-strokedark" />
                </div>

                <div className="col-md-12 mb-4">
                    <label className="block text-sm font-medium text-black dark:text-white">Nome do Canal de Lead</label>
                    <Input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        autoFocus
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

export default React.memo(ClienteForm);
