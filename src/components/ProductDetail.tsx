import { useState } from 'react';
import { Product, Batch, BatchFormData } from '../types';
import { BatchForm, BatchList } from './index';

interface ProductDetailProps {
  product: Product;
  batches: Batch[];
  onAddBatch: (data: BatchFormData) => void;
  onEditBatch: (id: string, data: BatchFormData) => void;
  onDeleteBatch: (id: string) => void;
  onSelectBatch?: (batch: Batch) => void;
  calculateAvailable?: (batch: Batch) => number;
  onBack: () => void;
}

/**
 * Trazabilidad REQ-F02:
 * Muestra y administra los lotes asociados al producto seleccionado.
 *
 * Trazabilidad REQ-F05:
 * Consolida el stock total disponible del producto a partir del detalle de sus
 * lotes, cumpliendo la consulta de inventario definida en la propuesta.
 */
export const ProductDetail = ({
  product,
  batches,
  onAddBatch,
  onEditBatch,
  onDeleteBatch,
  onSelectBatch,
  calculateAvailable,
  onBack
}: ProductDetailProps) => {
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  const handleAddBatch = (data: BatchFormData) => {
    onAddBatch(data);
    setShowBatchForm(false);
  };

  const handleEditBatch = (batch: Batch) => {
    setEditingBatch(batch);
    setShowBatchForm(true);
  };

  const handleSaveEditBatch = (data: BatchFormData) => {
    if (editingBatch) {
      onEditBatch(editingBatch.id, data);
      setEditingBatch(null);
      setShowBatchForm(false);
    }
  };

  const handleCancelBatch = () => {
    setShowBatchForm(false);
    setEditingBatch(null);
  };

  const handleViewBatchDetails = (batch: Batch) => {
    if (onSelectBatch) {
      onSelectBatch(batch);
    }
  };

  // REQ-F05: Suma el disponible de cada lote para informar stock total por producto.
  const totalStock = batches.reduce((sum, b) => {
    const available = calculateAvailable ? calculateAvailable(b) : b.availableQuantity;
    return sum + available;
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header con botón atrás */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
        >
          ← Volver
        </button>
        <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
        <div className="text-right text-sm text-gray-600">
          <p>Código: <span className="font-mono font-semibold">{product.code}</span></p>
        </div>
      </div>

      {/* Información del producto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b">
        <div>
          <p className="text-sm text-gray-600">Categoría</p>
          <p className="text-lg font-semibold text-gray-900">{product.category}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Unidad de Medida</p>
          <p className="text-lg font-semibold text-gray-900">{product.unit}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Stock Total Disponible</p>
          <p className="text-2xl font-bold text-green-600">{totalStock} {product.unit}</p>
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Descripción</h3>
        <p className="text-gray-700 bg-gray-50 p-4 rounded">{product.description}</p>
      </div>

      {/* Sección de Lotes */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Lotes ({batches.length})
          </h3>
          {!showBatchForm && (
            <button
              onClick={() => setShowBatchForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              + Nuevo Lote
            </button>
          )}
        </div>

        {/* Formulario de Lote */}
        {showBatchForm && (
          <div className="mb-6">
            <BatchForm
              productName={product.name}
              onSubmit={editingBatch ? handleSaveEditBatch : handleAddBatch}
              onCancel={handleCancelBatch}
              initialData={editingBatch ? {
                batchNumber: editingBatch.batchNumber,
                initialQuantity: editingBatch.initialQuantity,
                expiryDate: editingBatch.expiryDate
                  ? editingBatch.expiryDate.toISOString().split('T')[0]
                  : null
              } : undefined}
              isEditing={!!editingBatch}
            />
          </div>
        )}

        {/* Lista de Lotes */}
        <BatchList
          batches={batches}
          onEdit={handleEditBatch}
          onDelete={onDeleteBatch}
          onView={handleViewBatchDetails}
          calculateAvailable={calculateAvailable}
          productUnit={product.unit}
        />
      </div>
    </div>
  );
};
