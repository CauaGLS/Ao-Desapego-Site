// components/Modal.tsx
"use client";

import { useForm } from "react-hook-form";
import { criarExpositor } from "@/src/client";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const Modal = ({ isOpen, onClose, onSuccess }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await criarExpositor({ body: data });
  
      if (response.data) {
        alert("Expositor criado com sucesso!");
        reset();
        onSuccess();
      } else {
        console.error("Erro ao criar expositor:", response.error);
        alert("Erro ao criar expositor.");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      alert("Erro ao criar expositor.");
    }
  };  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Criar Expositor</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block font-medium">Nome</label>
            <input
              {...register("nome", { required: "Nome é obrigatório" })}
              id="nome"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Nome do Expositor"
            />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message as string}</p>}
          </div>

          <div>
            <label htmlFor="descricao" className="block font-medium">Descrição</label>
            <textarea
              {...register("descricao", { required: "Descrição é obrigatória" })}
              id="descricao"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Descrição do Expositor"
            />
            {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao.message as string}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Criando..." : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
