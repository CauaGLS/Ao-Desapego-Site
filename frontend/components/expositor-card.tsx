type ExpositorCardProps = {
    nome: string;
    descricao?: string;
  };
  
  export function ExpositorCard({ nome, descricao }: ExpositorCardProps) {
    return (
      <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-gray-900">{nome}</h3>
        <p className="text-sm text-gray-600 mt-1">{descricao || "Sem descrição"}</p>
      </div>
    );
  }
  