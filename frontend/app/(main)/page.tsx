"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { listarExpositores } from "@/src/client";
import { ExpositorCard } from "@/components/expositor-card";

export default function ExpositoresPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expositores, setExpositores] = useState<any[]>([]);

  const fetchExpositores = async () => {
    try {
      const response = await listarExpositores();
      if (response.data) {
        setExpositores(response.data);
      } else {
        console.error("Erro ao listar expositores:", response.error);
        alert("Erro ao buscar expositores.");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      alert("Erro ao buscar expositores.");
    }
  };

  useEffect(() => {
    fetchExpositores();
  }, []);

  return (
    <div className="p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Novo Expositor
      </button>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {expositores.map((expositor) => (
          <ExpositorCard
            key={expositor.id}
            nome={expositor.nome}
            descricao={expositor.descricao}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          fetchExpositores();
        }}
      />
    </div>
  );
}
