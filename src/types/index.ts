/**
 * Tipos principales para la gestión de inventario
 * REQ-F01: Sistema de registro, edición, consulta y eliminación de productos
 * REQ-F02: Sistema de gestión de lotes asociados a productos
 */

export interface Product {
  id: string;
  code: string; // Código único del producto
  name: string; // Nombre del producto
  description: string; // Descripción del producto
  category: string; // Categoría (ej: "Herramientas", "Materiales")
  unit: string; // Unidad de medida (ej: "kg", "piezas", "metros")
  createdAt: Date; // Fecha de creación
}

export interface ProductFormData {
  code: string;
  name: string;
  description: string;
  category: string;
  unit: string;
}

/**
 * REQ-F02: Lote de producto
 */
export interface Batch {
  id: string; // ID único del lote
  productId: string; // Referencia al producto
  batchNumber: string; // Número de lote
  initialQuantity: number; // Cantidad inicial
  availableQuantity: number; // Cantidad disponible
  entryDate: Date; // Fecha de ingreso
  expiryDate: Date | null; // Fecha de vencimiento (opcional)
  createdAt: Date; // Fecha de creación del registro
}

export interface BatchFormData {
  batchNumber: string;
  initialQuantity: number;
  expiryDate: string | null; // formato YYYY-MM-DD o null
}

/**
 * REQ-F03: Movimiento de stock (ingreso o egreso)
 */
export interface StockMovement {
  id: string; // ID único del movimiento
  batchId: string; // Referencia al lote
  type: 'ingreso' | 'egreso'; // Tipo de movimiento
  quantity: number; // Cantidad movida
  reason?: string; // Razón del movimiento (opcional)
  createdAt: Date; // Fecha del movimiento
}

export interface StockMovementFormData {
  type: 'ingreso' | 'egreso';
  quantity: number;
  reason?: string;
}
