import { useState } from 'react';
import { BatchFormData } from '../types';

interface BatchFormProps {
  productName: string;
  onSubmit: (data: BatchFormData) => void;
  onCancel: () => void;
  initialData?: BatchFormData;
  isEditing?: boolean;
}

interface BatchFormErrors {
  batchNumber?: string;
  initialQuantity?: string;
  expiryDate?: string;
}

/**
 * Trazabilidad REQ-F02:
 * Captura los datos necesarios para registrar o editar lotes asociados a un
 * producto: numero de lote, cantidad inicial y fecha de vencimiento opcional.
 */
export const BatchForm = ({
  productName,
  onSubmit,
  onCancel,
  initialData,
  isEditing = false
}: BatchFormProps) => {
  const [formData, setFormData] = useState<BatchFormData>(
    initialData || {
      batchNumber: '',
      initialQuantity: 0,
      expiryDate: null
    }
  );

  const [errors, setErrors] = useState<BatchFormErrors>({});

  // REQ-F02: Garantiza que cada lote tenga identificacion y cantidad inicial valida.
  const validateForm = (): boolean => {
    const newErrors: BatchFormErrors = {};

    if (!formData.batchNumber.trim()) {
      newErrors.batchNumber = 'El número de lote es requerido';
    }
    if (formData.initialQuantity <= 0) {
      newErrors.initialQuantity = 'La cantidad debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? parseInt(value) : 0) : value || null
    }));
    if (errors[name as keyof BatchFormErrors]) {
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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        {isEditing ? 'Editar Lote' : 'Nuevo Lote'} - {productName}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Número de Lote */}
        <div>
          <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Número de Lote
          </label>
          <input
            type="text"
            id="batchNumber"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.batchNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: LOTE-2024-001"
          />
          {errors.batchNumber && <p className="text-red-500 text-sm mt-1">{errors.batchNumber}</p>}
        </div>

        {/* Cantidad Inicial */}
        <div>
          <label htmlFor="initialQuantity" className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad Inicial
          </label>
          <input
            type="number"
            id="initialQuantity"
            name="initialQuantity"
            value={formData.initialQuantity || ''}
            onChange={handleChange}
            min="1"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.initialQuantity ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Cantidad"
          />
          {errors.initialQuantity && <p className="text-red-500 text-sm mt-1">{errors.initialQuantity}</p>}
        </div>

        {/* Fecha de Vencimiento */}
        <div className="md:col-span-2">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Vencimiento (opcional)
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {isEditing ? 'Guardar Cambios' : 'Registrar Lote'}
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
