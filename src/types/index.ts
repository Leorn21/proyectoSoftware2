/**
 * Matriz de trazabilidad de dominio (REQ-NF02).
 *
 * Estas interfaces definen los datos minimos exigidos por la propuesta y se
 * usan como contrato entre formularios, listados y hooks de persistencia local.
 * - REQ-F01: Producto identificable por codigo, nombre, descripcion, categoria y unidad.
 * - REQ-F02: Lote asociado a producto con cantidades, ingreso y vencimiento opcional.
 * - REQ-F03: Movimiento de stock asociado a lote, clasificado como ingreso o egreso.
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
 * Trazabilidad REQ-F02:
 * Representa cada lote que permite conservar el origen del stock de un producto.
 * `initialQuantity` registra la carga inicial y `availableQuantity` refleja el
 * saldo operativo que se consulta en inventario y detalle de lote.
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
 * Trazabilidad REQ-F03:
 * Registra el historial de ingresos y egresos que explica por que cambia la
 * cantidad disponible de un lote.
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
