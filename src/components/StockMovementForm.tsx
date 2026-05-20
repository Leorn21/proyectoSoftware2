import { useState } from 'react';
import { StockMovementFormData } from '../types';

interface StockMovementFormProps {
  batchNumber: string;
  availableQuantity: number;
  onSubmit: (data: StockMovementFormData) => void;
  onCancel: () => void;
}

interface MovementFormErrors {
  type?: string;
  quantity?: string;
}

/**
 * Componente formulario para movimientos de stock
 * REQ-F03: Registro de movimientos (ingresos y egresos)
 * REQ-F04: Validación de egresos
 */
export const StockMovementForm = ({
  batchNumber,
  availableQuantity,
  onSubmit,
  onCancel
}: StockMovementFormProps) => {
  const [formData, setFormData] = useState<StockMovementFormData>({
    type: 'egreso',
    quantity: 0,
    reason: ''
  });

  const [errors, setErrors] = useState<MovementFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: MovementFormErrors = {};

    if (!formData.type) {
      newErrors.type = 'Debe seleccionar tipo de movimiento';
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = 'La cantidad debe ser mayor a 0';
    }

    // REQ-F04: Validar que no se puedan registrar egresos mayores a la cantidad disponible
    if (formData.type === 'egreso' && formData.quantity > availableQuantity) {
      newErrors.quantity = `No hay suficiente stock. Disponible: ${availableQuantity}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? parseInt(value) : 0) : value
    }));
    if (errors[name as keyof MovementFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ type: 'egreso', quantity: 0, reason: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Registrar Movimiento - Lote {batchNumber}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Tipo de Movimiento */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Movimiento
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.type ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="egreso">Egreso (Salida)</option>
            <option value="ingreso">Ingreso (Entrada)</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>

        {/* Cantidad */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity || ''}
            onChange={handleChange}
            min="1"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.quantity ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Cantidad"
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </div>

        {/* Razón (opcional) */}
        <div className="md:col-span-2">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Razón (opcional)
          </label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Devolución, Uso, Merma, etc."
          />
        </div>
      </div>

      {/* Info Stock */}
      {formData.type === 'egreso' && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Stock disponible: <span className="font-bold">{availableQuantity}</span>
          </p>
        </div>
      )}

      {/* Botones */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Registrar Movimiento
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
