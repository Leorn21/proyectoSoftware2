import { useState } from 'react';
import { Product, Batch, StockMovement } from '../types';
import { StockMovementForm, StockMovementList } from './index';

interface BatchDetailProps {
  product: Product;
  batch: Batch;
  movements: StockMovement[];
  onAddMovement: (data: any) => void;
  onDeleteMovement: (id: string) => void;
  onBack: () => void;
}

/**
 * Trazabilidad REQ-F03:
 * Muestra el historial de movimientos de un lote y habilita el registro de
 * nuevos ingresos o egresos.
 *
 * Trazabilidad REQ-F04:
 * Entrega el stock disponible al formulario para validar que un egreso no
 * supere la cantidad disponible.
 */
export const BatchDetail = ({
  product,
  batch,
  movements,
  onAddMovement,
  onDeleteMovement,
  onBack
}: BatchDetailProps) => {
  const [showMovementForm, setShowMovementForm] = useState(false);

  const handleAddMovement = (data: any) => {
    onAddMovement(data);
    setShowMovementForm(false);
  };

  const handleCancelMovement = () => {
    setShowMovementForm(false);
  };

  // REQ-F03: Reconstruye el saldo del lote desde la cantidad inicial y sus movimientos.
  const totalMovement = movements.reduce((sum, m) => {
    return m.type === 'ingreso' ? sum + m.quantity : sum - m.quantity;
  }, 0);

  const availableQuantity = batch.initialQuantity + totalMovement;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
        >
          ← Volver
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Lote {batch.batchNumber}</h2>
        <div className="text-right text-sm text-gray-600">
          <p>Producto: <span className="font-semibold">{product.name}</span></p>
        </div>
      </div>

      {/* Información del Lote */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
        <div>
          <p className="text-sm text-gray-600">Cantidad Inicial</p>
          <p className="text-lg font-semibold text-gray-900">{batch.initialQuantity} {product.unit}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Movimiento Neto</p>
          <p className={`text-lg font-semibold ${totalMovement > 0 ? 'text-green-600' : totalMovement < 0 ? 'text-red-600' : 'text-gray-600'}`}>
            {totalMovement > 0 ? '+' : ''}{totalMovement} {product.unit}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Cantidad Disponible</p>
          <p className="text-2xl font-bold text-green-600">{availableQuantity} {product.unit}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Vencimiento</p>
          <p className={`text-lg font-semibold ${
            batch.expiryDate && new Date(batch.expiryDate) < new Date()
              ? 'text-red-600'
              : 'text-gray-900'
          }`}>
            {batch.expiryDate
              ? batch.expiryDate.toLocaleDateString('es-ES')
              : '-'}
          </p>
        </div>
      </div>

      {/* Sección de Movimientos */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Movimientos de Stock ({movements.length})
          </h3>
          {!showMovementForm && (
            <button
              onClick={() => setShowMovementForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              + Nuevo Movimiento
            </button>
          )}
        </div>

        {/* Formulario de Movimiento */}
        {showMovementForm && (
          <div className="mb-6">
            <StockMovementForm
              batchNumber={batch.batchNumber}
              availableQuantity={availableQuantity}
              onSubmit={handleAddMovement}
              onCancel={handleCancelMovement}
            />
          </div>
        )}

        {/* Lista de Movimientos */}
        <StockMovementList
          movements={movements}
          onDelete={onDeleteMovement}
          productUnit={product.unit}
        />
      </div>
    </div>
  );
};
