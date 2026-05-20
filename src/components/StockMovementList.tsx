import { StockMovement } from '../types';

interface StockMovementListProps {
  movements: StockMovement[];
  onDelete: (id: string) => void;
  productUnit: string;
}

/**
 * Componente lista de movimientos de stock
 * REQ-F03: Consulta de movimientos de stock
 */
export const StockMovementList = ({
  movements,
  onDelete,
  productUnit
}: StockMovementListProps) => {
  if (movements.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300">
        <p className="text-gray-500">No hay movimientos registrados para este lote.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Tipo</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Cantidad</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Razón</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Fecha</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      movement.type === 'ingreso'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {movement.type === 'ingreso' ? '+ Ingreso' : '- Egreso'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 font-medium">
                  {movement.quantity} {productUnit}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {movement.reason || '-'}
                </td>
                <td className="px-4 py-3 text-gray-700 text-xs">
                  {movement.createdAt.toLocaleDateString('es-ES')} {' '}
                  {movement.createdAt.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      if (window.confirm(`¿Eliminar este movimiento?`)) {
                        onDelete(movement.id);
                      }
                    }}
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
