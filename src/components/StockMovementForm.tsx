import { useState } from 'react';
import { StockMovementFormData } from '../types';
import { Button } from './ui/button';

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
 * Trazabilidad REQ-F03:
 * Captura movimientos de stock por lote, diferenciando ingresos y egresos.
 *
 * Trazabilidad REQ-F04:
 * Es el punto de control que impide registrar egresos superiores al stock
 * disponible informado por la vista de detalle de lote.
 */
export const StockMovementForm = ({
  batchNumber,
  availableQuantity,
  onSubmit,
  onCancel
}: StockMovementFormProps) => {
  const baseInputClass = 'w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70';
  const [formData, setFormData] = useState<StockMovementFormData>({
    type: 'egreso',
    quantity: 0,
    reason: ''
  });

  const [errors, setErrors] = useState<MovementFormErrors>({});

  // REQ-F03 / REQ-F04: Valida tipo, cantidad positiva y limite de egreso disponible.
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">Movimiento</p>
        <h3 className="text-xl font-bold text-slate-50">
        Registrar Movimiento - Lote {batchNumber}
        </h3>
        <p className="mt-2 text-sm text-slate-400">Registrá ingresos o egresos con contexto para mantener el historial ordenado.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Tipo de Movimiento */}
        <div>
          <label htmlFor="type" className="mb-2 block text-sm font-medium text-slate-300">
            Tipo de Movimiento
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`${baseInputClass} ${
              errors.type ? 'border-rose-500 focus:ring-rose-400/60' : ''
            }`}
          >
            <option value="egreso">Egreso (Salida)</option>
            <option value="ingreso">Ingreso (Entrada)</option>
          </select>
          {errors.type && <p className="mt-2 text-sm text-rose-400">{errors.type}</p>}
        </div>

        {/* Cantidad */}
        <div>
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-slate-300">
            Cantidad
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity || ''}
            onChange={handleChange}
            min="1"
            className={`${baseInputClass} ${
              errors.quantity ? 'border-rose-500 focus:ring-rose-400/60' : ''
            }`}
            placeholder="Cantidad"
          />
          {errors.quantity && <p className="mt-2 text-sm text-rose-400">{errors.quantity}</p>}
        </div>

        {/* Razón (opcional) */}
        <div className="md:col-span-2">
          <label htmlFor="reason" className="mb-2 block text-sm font-medium text-slate-300">
            Razón (opcional)
          </label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason || ''}
            onChange={handleChange}
            className={baseInputClass}
            placeholder="Ej: Devolución, Uso, Merma, etc."
          />
        </div>
      </div>

      {/* Info Stock */}
      {formData.type === 'egreso' && (
        <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4">
          <p className="text-sm text-sky-200">
            Stock disponible: <span className="font-bold">{availableQuantity}</span>
          </p>
        </div>
      )}

      {/* Botones */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
        >
          Registrar Movimiento
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
