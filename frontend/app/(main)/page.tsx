// app/expositores/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { listarExpositores } from '@/src/lib/api';
import type { ExpositorSchema } from '@/src/lib/api';
import { ExpositorCard } from '@/components/expositor-card';
import { Modal } from '@/components/modal';

export default function ExpositoresPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpositor, setSelectedExpositor] = useState<ExpositorSchema | null>(null);

  const { data: expositores, isLoading, error } = useQuery({
    queryKey: ['expositores'],
    queryFn: () => listarExpositores().then(res => res.data),
  });

  const handleCardClick = (expositor: ExpositorSchema) => {
    setSelectedExpositor(expositor);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => {
          setSelectedExpositor(null);
          setIsModalOpen(true);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Novo Expositor
      </button>

      {isLoading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>Erro ao carregar expositores.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {expositores?.map((expositor) => (
            <div key={expositor.id} onClick={() => handleCardClick(expositor)}>
              <ExpositorCard
                nome={expositor.nome}
                descricao={expositor.descricao}
              />
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        expositor={selectedExpositor}
      />
    </div>
  );
}
