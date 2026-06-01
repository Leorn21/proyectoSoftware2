import type {
  Batch,
  BatchFormData,
  Product,
  ProductFormData,
  StockMovement,
  StockMovementFormData,
} from "../../types";

export const baseProductFormData: ProductFormData = {
  code: "PROD-001",
  name: "Martillo",
  description: "Martillo de acero",
  category: "Herramientas",
  unit: "piezas",
};

export const baseBatchFormData: BatchFormData = {
  batchNumber: "LOTE-001",
  initialQuantity: 10,
  expiryDate: null,
};

export const baseIngressMovement: StockMovementFormData = {
  type: "ingreso",
  quantity: 5,
  reason: "Reposicion",
};

export const baseEgressMovement: StockMovementFormData = {
  type: "egreso",
  quantity: 3,
  reason: "Venta",
};

export const buildProduct = (overrides: Partial<Product> = {}): Product => ({
  id: "product-1",
  ...baseProductFormData,
  createdAt: new Date("2026-05-01T00:00:00.000Z"),
  ...overrides,
});

export const buildBatch = (overrides: Partial<Batch> = {}): Batch => ({
  id: "batch-1",
  productId: "product-1",
  batchNumber: baseBatchFormData.batchNumber,
  initialQuantity: baseBatchFormData.initialQuantity,
  availableQuantity: baseBatchFormData.initialQuantity,
  entryDate: new Date("2026-05-01T00:00:00.000Z"),
  expiryDate: null,
  createdAt: new Date("2026-05-01T00:00:00.000Z"),
  ...overrides,
});

export const buildMovement = (
  overrides: Partial<StockMovement> = {},
): StockMovement => ({
  id: "mov-1",
  batchId: "batch-1",
  type: baseIngressMovement.type,
  quantity: baseIngressMovement.quantity,
  reason: baseIngressMovement.reason,
  createdAt: new Date("2026-05-01T10:00:00.000Z"),
  ...overrides,
});
