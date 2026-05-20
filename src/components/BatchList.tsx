import { Batch } from '../types';

interface BatchListProps {
  batches: Batch[];
  onEdit: (batch: Batch) => void;
  onDelete: (id: string) => void;
  onView?: (batch: Batch) => void;
  calculateAvailable?: (batch: Batch) => number;
  productUnit: string;
}

/**
 * Trazabilidad REQ-F02:
 * Lista los lotes asociados a un producto con cantidades, ingreso y vencimiento.
 *
 * Trazabilidad REQ-F05:
 * Permite consultar el detalle de lotes que compone el stock total del producto.
 */
export const BatchList = ({
  batches,
  onEdit,
  onDelete,
  onView,
  calculateAvailable,
  productUnit
}: BatchListProps) => {
  if (batches.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300">
        <p className="text-gray-500">No hay lotes registrados para este producto.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Número de Lote</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Cantidad Inicial</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Disponible</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Ingreso</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Vencimiento</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => {
              // REQ-F03 / REQ-F05: Usa el saldo recalculado por movimientos cuando esta disponible.
              const available = calculateAvailable ? calculateAvailable(batch) : batch.availableQuantity;
              return (
                <tr key={batch.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{batch.batchNumber}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {batch.initialQuantity} {productUnit}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        available > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {available} {productUnit}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-xs">
                    {batch.entryDate.toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-xs">
                    {batch.expiryDate ? (
                      <span
                        className={
                          new Date(batch.expiryDate) < new Date()
                            ? 'text-red-600 font-semibold'
                            : ''
                        }
                      >
                        {batch.expiryDate.toLocaleDateString('es-ES')}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {onView && (
                        <button
                          onClick={() => onView(batch)}
                          className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 transition-colors"
                        >
                          Movimientos
                        </button>
                      )}
                      <button
                        onClick={() => onEdit(batch)}
                        className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar lote "${batch.batchNumber}"?`)) {
                            onDelete(batch.id);
                          }
                        }}
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
