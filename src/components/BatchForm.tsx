import { useState } from "react";
import { BatchFormData } from "../types";
import { Button } from "./ui/button";

interface BatchFormProps {
  productName: string;
  onSubmit: (data: BatchFormData) => void;
  onCancel: () => void;
  initialData?: BatchFormData;
  isEditing?: boolean;
  minExpiryDate?: string;
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
  isEditing = false,
  minExpiryDate,
}: BatchFormProps) => {
  const baseInputClass =
    "w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70";
  const [formData, setFormData] = useState<BatchFormData>(
    initialData || {
      batchNumber: "",
      initialQuantity: 0,
      expiryDate: null,
    },
  );

  const [errors, setErrors] = useState<BatchFormErrors>({});

  // REQ-F02: Garantiza que cada lote tenga identificacion y cantidad inicial valida.
  const validateForm = (): boolean => {
    const newErrors: BatchFormErrors = {};

    if (!formData.batchNumber.trim()) {
      newErrors.batchNumber = "El número de lote es requerido";
    }
    if (formData.initialQuantity <= 0) {
      newErrors.initialQuantity = "La cantidad debe ser mayor a 0";
    }
    if (
      formData.expiryDate &&
      minExpiryDate &&
      formData.expiryDate < minExpiryDate
    ) {
      newErrors.expiryDate =
        "La fecha de vencimiento no puede ser anterior a la fecha de ingreso";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value ? parseInt(value) : 0) : value || null,
    }));
    if (errors[name as keyof BatchFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
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
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
          Lote
        </p>
        <h3 className="text-xl font-bold text-slate-50">
          {isEditing ? "Editar Lote" : "Nuevo Lote"} - {productName}
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Definí identificación, cantidad inicial y vencimiento para mantener
          trazabilidad clara.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Número de Lote */}
        <div>
          <label
            htmlFor="batchNumber"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Número de Lote
          </label>
          <input
            type="text"
            id="batchNumber"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleChange}
            className={`${baseInputClass} ${
              errors.batchNumber ? "border-rose-500 focus:ring-rose-400/60" : ""
            }`}
            placeholder="Ej: LOTE-2024-001"
          />
          {errors.batchNumber && (
            <p className="mt-2 text-sm text-rose-400">{errors.batchNumber}</p>
          )}
        </div>

        {/* Cantidad Inicial */}
        <div>
          <label
            htmlFor="initialQuantity"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Cantidad Inicial
          </label>
          <input
            type="number"
            id="initialQuantity"
            name="initialQuantity"
            value={formData.initialQuantity || ""}
            onChange={handleChange}
            min="1"
            className={`${baseInputClass} ${
              errors.initialQuantity
                ? "border-rose-500 focus:ring-rose-400/60"
                : ""
            }`}
            placeholder="Cantidad"
          />
          {errors.initialQuantity && (
            <p className="mt-2 text-sm text-rose-400">
              {errors.initialQuantity}
            </p>
          )}
        </div>

        {/* Fecha de Vencimiento */}
        <div className="md:col-span-2">
          <label
            htmlFor="expiryDate"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Fecha de Vencimiento (opcional)
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate || ""}
            onChange={handleChange}
            min={minExpiryDate}
            className={baseInputClass}
          />
          {errors.expiryDate && (
            <p className="mt-2 text-sm text-rose-400">{errors.expiryDate}</p>
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit">
          {isEditing ? "Guardar Cambios" : "Registrar Lote"}
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary">
          Cancelar
        </Button>
      </div>
    </form>
  );
};
