-- REQ-NF02: Modelo PostgreSQL objetivo para trazabilidad arquitectura-datos.
-- Este esquema documenta la persistencia productiva prevista para REQ-F01 a REQ-F05.

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(80) NOT NULL,
  unit VARCHAR(40) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  batch_number VARCHAR(80) NOT NULL,
  initial_quantity NUMERIC(12, 2) NOT NULL CHECK (initial_quantity > 0),
  available_quantity NUMERIC(12, 2) NOT NULL CHECK (available_quantity >= 0),
  entry_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  expiry_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (product_id, batch_number)
);

CREATE TABLE IF NOT EXISTS stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('ingreso', 'egreso')),
  quantity NUMERIC(12, 2) NOT NULL CHECK (quantity > 0),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_batches_product_id ON batches(product_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_batch_id ON stock_movements(batch_id);
