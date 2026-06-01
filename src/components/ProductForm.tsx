import { useState } from 'react';
import { ProductFormData } from '../types';
import { Button } from './ui/button';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  initialData?: ProductFormData;
  isEditing?: boolean;
}

/**
 * Trazabilidad REQ-F01:
 * Captura y valida los datos basicos exigidos para registrar o editar productos:
 * codigo, nombre, descripcion, categoria y unidad de medida.
 */
export const ProductForm = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false
}: ProductFormProps) => {
  const baseInputClass = 'w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70';
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      code: '',
      name: '',
      description: '',
      category: '',
      unit: ''
    }
  );

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  // REQ-F01: Evita productos incompletos antes de enviarlos al hook de persistencia.
  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.code.trim()) {
      newErrors.code = 'El código es requerido';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es requerida';
    }
    if (!formData.unit.trim()) {
      newErrors.unit = 'La unidad de medida es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario comienza a escribir
    if (errors[name as keyof ProductFormData]) {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">Producto</p>
        <h2 className="text-2xl font-bold text-slate-50">
        {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>
        <p className="mt-2 text-sm text-slate-400">Completá la información base para identificarlo y clasificarlo en inventario.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Código */}
        <div>
          <label htmlFor="code" className="mb-2 block text-sm font-medium text-slate-300">
            Código del Producto
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className={`${baseInputClass} ${
              errors.code ? 'border-rose-500 focus:ring-rose-400/60' : ''
            }`}
            placeholder="Ej: PROD-001"
          />
          {errors.code && <p className="mt-2 text-sm text-rose-400">{errors.code}</p>}
        </div>

        {/* Nombre */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${baseInputClass} ${
              errors.name ? 'border-rose-500 focus:ring-rose-400/60' : ''
            }`}
            placeholder="Ej: Martillo de Acero"
          />
          {errors.name && <p className="mt-2 text-sm text-rose-400">{errors.name}</p>}
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-300">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`${baseInputClass} ${
              errors.category ? 'border-rose-500 focus:ring-rose-400/60' : ''
            }`}
          >
            <option value="">Seleccionar categoría</option>
            <option value="Herramientas">Herramientas</option>
            <option value="Materiales">Materiales</option>
            <option value="Equipos">Equipos</option>
            <option value="Consumibles">Consumibles</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.category && <p className="mt-2 text-sm text-rose-400">{errors.category}</p>}
        </div>

        {/* Unidad de Medida */}
        <div>
          <label htmlFor="unit" className="mb-2 block text-sm font-medium text-slate-300">
            Unidad de Medida
          </label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className={`${baseInputClass} ${
              errors.unit ? 'border-rose-500 focus:ring-rose-400/60' : ''
            }`}
          >
            <option value="">Seleccionar unidad</option>
            <option value="piezas">Piezas</option>
            <option value="kg">Kilogramos (kg)</option>
            <option value="metros">Metros (m)</option>
            <option value="litros">Litros (L)</option>
            <option value="cajas">Cajas</option>
            <option value="paquetes">Paquetes</option>
          </select>
          {errors.unit && <p className="mt-2 text-sm text-rose-400">{errors.unit}</p>}
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-300">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`${baseInputClass} min-h-[132px] ${
            errors.description ? 'border-rose-500 focus:ring-rose-400/60' : ''
          }`}
          placeholder="Descripción del producto..."
        />
        {errors.description && <p className="mt-2 text-sm text-rose-400">{errors.description}</p>}
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
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
