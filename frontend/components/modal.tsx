// components/Modal.tsx
'use client';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { criarExpositor } from '@/src/lib/api';
import type { CreateExpositorSchema } from '@/src/lib/api';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  expositor: any | null;
};

export const Modal = ({ isOpen, onClose, expositor }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      nome: expositor?.nome || '',
      descricao: expositor?.descricao || '',
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
      mutationFn: (data: CreateExpositorSchema) => criarExpositor({ body: data }),
      onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expositores'] });
      alert('Expositor criado com sucesso!');
      reset();
      onClose();
    },
    onError: () => {
      alert('Erro ao criar expositor.');
    },
  });

  const onSubmit = (data: CreateExpositorSchema) => {
    mutation.mutate(data);
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {expositor ? 'Editar Expositor' : 'Criar Expositor'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block font-medium">
              Nome
            </label>
            <input
              {...register('nome', { required: 'Nome é obrigatório' })}
              id="nome"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Nome do Expositor"
            />

            {typeof errors.nome?.message === 'string' && (
              <p className="text-red-500 text-sm">{errors.nome.message}</p>
            )}

          </div>

          <div>
            <label htmlFor="descricao" className="block font-medium">
              Descrição
            </label>
            <textarea
              {...register('descricao')}
              id="descricao"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Descrição do Expositor"
            />
            {typeof errors.nome?.message === 'string' && (
              <p className="text-red-500 text-sm">{errors.nome.message}</p>
            )}
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
              {isSubmitting ? 'Salvando...' : expositor ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
