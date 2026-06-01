import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import App from './App';

type TestUser = ReturnType<typeof userEvent.setup>;

const renderInventory = async () => {
  const user = userEvent.setup();
  render(<App />);
  await screen.findByRole('heading', { name: /Lista de Productos/i });
  return user;
};

const fillProductForm = async (
  user: TestUser,
  product = {
    code: 'PROD-001',
    name: 'Martillo',
    description: 'Martillo de acero',
    category: 'Herramientas',
    unit: 'piezas'
  }
) => {
  await user.clear(screen.getByLabelText(/Código del Producto/i));
  await user.type(screen.getByLabelText(/Código del Producto/i), product.code);
  await user.clear(screen.getByLabelText(/Nombre del Producto/i));
  await user.type(screen.getByLabelText(/Nombre del Producto/i), product.name);
  await user.clear(screen.getByLabelText(/Descripción/i));
  await user.type(screen.getByLabelText(/Descripción/i), product.description);
  await user.selectOptions(screen.getByLabelText(/Categoría/i), product.category);
  await user.selectOptions(screen.getByLabelText(/Unidad de Medida/i), product.unit);
};

const createProduct = async (
  user: TestUser,
  product?: Parameters<typeof fillProductForm>[1]
) => {
  await user.click(screen.getByRole('button', { name: /\+ Nuevo Producto/i }));
  await fillProductForm(user, product);
  await user.click(screen.getByRole('button', { name: /Crear Producto/i }));
  await screen.findByText(product?.name ?? 'Martillo');
};

const getProductRow = (name: RegExp | string) => {
  const matcher = typeof name === 'string' ? new RegExp(name, 'i') : name;
  return screen.getByRole('row', { name: matcher });
};

const openProductLots = async (user: TestUser, productName = /Martillo/i) => {
  await user.click(within(getProductRow(productName)).getByRole('button', { name: /Lotes/i }));
  await screen.findByRole('heading', { name: productName });
};

const fillBatchForm = async (
  user: TestUser,
  batch = {
    batchNumber: 'LOTE-001',
    initialQuantity: '10',
    expiryDate: ''
  }
) => {
  await user.clear(screen.getByLabelText(/Número de Lote/i));
  await user.type(screen.getByLabelText(/Número de Lote/i), batch.batchNumber);
  await user.clear(screen.getByLabelText(/Cantidad Inicial/i));
  await user.type(screen.getByLabelText(/Cantidad Inicial/i), batch.initialQuantity);
  if (batch.expiryDate) {
    await user.type(screen.getByLabelText(/Fecha de Vencimiento/i), batch.expiryDate);
  }
};

const createBatch = async (
  user: TestUser,
  batch?: Parameters<typeof fillBatchForm>[1]
) => {
  await user.click(screen.getByRole('button', { name: /\+ Nuevo Lote/i }));
  await fillBatchForm(user, batch);
  await user.click(screen.getByRole('button', { name: /Registrar Lote/i }));
  await screen.findByText(batch?.batchNumber ?? 'LOTE-001');
};

const openBatchMovements = async (user: TestUser, batchNumber = /LOTE-001/i) => {
  await user.click(within(screen.getByRole('row', { name: batchNumber })).getByRole('button', { name: /Movimientos/i }));
  await screen.findByRole('heading', { name: new RegExp(`Lote ${batchNumber.source ?? batchNumber}`, 'i') });
};

const registerMovement = async (
  user: TestUser,
  movement: {
    type: 'ingreso' | 'egreso';
    quantity: string;
    reason?: string;
  }
) => {
  await user.click(screen.getByRole('button', { name: /\+ Nuevo Movimiento/i }));
  await user.selectOptions(screen.getByLabelText(/Tipo de Movimiento/i), movement.type);
  await user.clear(screen.getByLabelText(/^Cantidad$/i));
  await user.type(screen.getByLabelText(/^Cantidad$/i), movement.quantity);
  if (movement.reason) {
    await user.type(screen.getByLabelText(/Razón/i), movement.reason);
  }
  await user.click(screen.getByRole('button', { name: /Registrar Movimiento/i }));
};

describe('Gestor de Inventario - trazabilidad funcional', () => {
  let now = 1000;

  beforeEach(() => {
    cleanup();
    localStorage.clear();
    now = 1000;
    vi.spyOn(Date, 'now').mockImplementation(() => now++);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test('REQ-F01 crear producto válido', async () => {
    const user = await renderInventory();

    await createProduct(user);

    expect(screen.getByText('PROD-001')).toBeInTheDocument();
    expect(screen.getByText('Martillo')).toBeInTheDocument();
    expect(screen.getByText('Martillo de acero')).toBeInTheDocument();
    expect(screen.getByText('Herramientas')).toBeInTheDocument();
  });

  test('REQ-F01 impide crear producto con campos obligatorios vacíos', async () => {
    const user = await renderInventory();

    await user.click(screen.getByRole('button', { name: /\+ Nuevo Producto/i }));
    await user.click(screen.getByRole('button', { name: /Crear Producto/i }));

    expect(screen.getByText(/El código es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/El nombre es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/La descripción es requerida/i)).toBeInTheDocument();
    expect(screen.getByText(/La categoría es requerida/i)).toBeInTheDocument();
    expect(screen.getByText(/La unidad de medida es requerida/i)).toBeInTheDocument();
    expect(screen.queryByText('PROD-001')).not.toBeInTheDocument();
  });

  test('REQ-F01 editar producto', async () => {
    const user = await renderInventory();
    await createProduct(user);

    await user.click(within(getProductRow(/Martillo/i)).getByRole('button', { name: /Editar/i }));
    await user.clear(screen.getByLabelText(/Nombre del Producto/i));
    await user.type(screen.getByLabelText(/Nombre del Producto/i), 'Martillo Pro');
    await user.click(screen.getByRole('button', { name: /Guardar Cambios/i }));

    expect(screen.getByText('Martillo Pro')).toBeInTheDocument();
    expect(screen.queryByText('Martillo de acero')).toBeInTheDocument();
  });

  test('REQ-F01 buscar producto por código, nombre, descripción o categoría', async () => {
    const user = await renderInventory();
    await createProduct(user, {
      code: 'HER-100',
      name: 'Taladro',
      description: 'Taladro percutor industrial',
      category: 'Herramientas',
      unit: 'piezas'
    });
    await createProduct(user, {
      code: 'MAT-200',
      name: 'Clavos',
      description: 'Clavo galvanizado',
      category: 'Materiales',
      unit: 'kg'
    });

    const search = screen.getByPlaceholderText(/Buscar por código/i);
    await user.type(search, 'HER-100');
    expect(screen.getByText('Taladro')).toBeInTheDocument();
    expect(screen.queryByText('Clavos')).not.toBeInTheDocument();

    await user.clear(search);
    await user.type(search, 'Clavos');
    expect(screen.getByText('Clavos')).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, 'galvanizado');
    expect(screen.getByText('Clavos')).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, 'Materiales');
    expect(screen.getByText('Clavos')).toBeInTheDocument();
  });

  test('REQ-F01 eliminar producto con confirmación', async () => {
    const user = await renderInventory();
    await createProduct(user);

    await user.click(within(getProductRow(/Martillo/i)).getByRole('button', { name: /Eliminar/i }));
    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/Eliminar producto "Martillo"/i)).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: /^Eliminar$/i }));

    expect(screen.queryByText('Martillo')).not.toBeInTheDocument();
    expect(screen.getByText(/No hay productos registrados/i)).toBeInTheDocument();
  });

  test('REQ-F01 cancelar eliminación', async () => {
    const user = await renderInventory();
    await createProduct(user);

    await user.click(within(getProductRow(/Martillo/i)).getByRole('button', { name: /Eliminar/i }));
    await user.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: /^Cancelar$/i }));

    expect(screen.getByText('Martillo')).toBeInTheDocument();
  });

  test('REQ-F02 crear lote asociado a un producto y mostrar stock disponible', async () => {
    const user = await renderInventory();
    await createProduct(user);
    await openProductLots(user);

    await createBatch(user);

    const row = screen.getByRole('row', { name: /LOTE-001/i });
    expect(within(row).getAllByText(/10 piezas/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Stock Total Disponible/i)).toBeInTheDocument();
    expect(screen.getAllByText('10 piezas').length).toBeGreaterThan(0);
  });

  test('REQ-F02 impide lote sin número y con cantidad inicial menor o igual a 0', async () => {
    const user = await renderInventory();
    await createProduct(user);
    await openProductLots(user);

    await user.click(screen.getByRole('button', { name: /\+ Nuevo Lote/i }));
    await user.click(screen.getByRole('button', { name: /Registrar Lote/i }));

    expect(screen.getByText(/El número de lote es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/La cantidad debe ser mayor a 0/i)).toBeInTheDocument();
    expect(screen.queryByText('LOTE-001')).not.toBeInTheDocument();
  });

  test('REQ-F02 editar lote', async () => {
    const user = await renderInventory();
    await createProduct(user);
    await openProductLots(user);
    await createBatch(user);

    await user.click(within(screen.getByRole('row', { name: /LOTE-001/i })).getByRole('button', { name: /Editar/i }));
    await user.clear(screen.getByLabelText(/Número de Lote/i));
    await user.type(screen.getByLabelText(/Número de Lote/i), 'LOTE-EDITADO');
    await user.click(screen.getByRole('button', { name: /Guardar Cambios/i }));

    expect(screen.getByText('LOTE-EDITADO')).toBeInTheDocument();
    expect(screen.queryByText('LOTE-001')).not.toBeInTheDocument();
  });

  test('REQ-F02 eliminar lote', async () => {
    const user = await renderInventory();
    await createProduct(user);
    await openProductLots(user);
    await createBatch(user);

    await user.click(within(screen.getByRole('row', { name: /LOTE-001/i })).getByRole('button', { name: /Eliminar/i }));
    await user.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: /^Eliminar$/i }));

    expect(screen.queryByText('LOTE-001')).not.toBeInTheDocument();
    expect(screen.getByText(/No hay lotes registrados/i)).toBeInTheDocument();
  });

  test('REQ-F02 mostrar indicador de lote vencido', async () => {
    const user = await renderInventory();
    await createProduct(user);
    await openProductLots(user);

    await createBatch(user, {
      batchNumber: 'LOTE-VENCIDO',
      initialQuantity: '5',
      expiryDate: '2020-01-01'
    });

    const expiredRow = screen.getByRole('row', { name: /LOTE-VENCIDO/i });
    const expiredDate = within(expiredRow).getByText((_content, element) => {
      return element?.classList.contains('text-rose-400') ?? false;
    });
    expect(expiredDate).toHaveClass('text-rose-400');
  });

  test('REQ-F03 registrar ingreso y egreso, actualizar stock y mostrar historial', async () => {
    const user = await renderInventory();
    await createProduct(user);
    await openProductLots(user);
    await createBatch(user);
    await openBatchMovements(user);

    await registerMovement(user, { type: 'ingreso', quantity: '5', reason: 'Reposición' });
    expect(screen.getByText(/\+ Ingreso/i)).toBeInTheDocument();
    expect(screen.getByText('Reposición')).toBeInTheDocument();
    expect(screen.getByText('15 piezas')).toBeInTheDocument();

    await registerMovement(user, { type: 'egreso', quantity: '3', reason: 'Venta' });
    expect(screen.getByText(/- Egreso/i)).toBeInTheDocument();
    expect(screen.getByText('Venta')).toBeInTheDocument();
    expect(screen.getByText('12 piezas')).toBeInTheDocument();
  });

  test('REQ-F04 bloquea egreso mayor al stock disponible y no registra movimiento inválido', async () => {
    const user = await renderInventory();
    await createProduct(user);
    await openProductLots(user);
    await createBatch(user);
    await openBatchMovements(user);

    await registerMovement(user, { type: 'egreso', quantity: '11', reason: 'Venta imposible' });

    expect(screen.getByText(/No hay suficiente stock. Disponible: 10/i)).toBeInTheDocument();
    expect(screen.queryByText('Venta imposible')).not.toBeInTheDocument();
    expect(screen.queryByText(/- Egreso/i)).not.toBeInTheDocument();
    expect(screen.getAllByText('10 piezas').length).toBeGreaterThan(0);
  });

  test('REQ-F04 bloquea movimiento con cantidad 0 y cantidad negativa', async () => {
    const user = await renderInventory();
    await createProduct(user);
    await openProductLots(user);
    await createBatch(user);
    await openBatchMovements(user);

    await registerMovement(user, { type: 'ingreso', quantity: '0', reason: 'Cantidad cero' });
    expect(screen.getByText(/La cantidad debe ser mayor a 0/i)).toBeInTheDocument();
    expect(screen.queryByText('Cantidad cero')).not.toBeInTheDocument();

    await user.clear(screen.getByLabelText(/^Cantidad$/i));
    await user.type(screen.getByLabelText(/^Cantidad$/i), '-1');
    await user.clear(screen.getByLabelText(/Razón/i));
    await user.type(screen.getByLabelText(/Razón/i), 'Cantidad negativa');
    await user.click(screen.getByRole('button', { name: /Registrar Movimiento/i }));

    expect(screen.getByLabelText(/^Cantidad$/i)).toBeInvalid();
    expect(screen.queryByText('Cantidad negativa')).not.toBeInTheDocument();
    expect(screen.getAllByText('10 piezas').length).toBeGreaterThan(0);
  });

  test('REQ-F04 verifica que el stock nunca quede negativo', async () => {
    const user = await renderInventory();
    await createProduct(user);
    await openProductLots(user);
    await createBatch(user);
    await openBatchMovements(user);

    await registerMovement(user, { type: 'egreso', quantity: '10', reason: 'Salida completa' });
    expect(screen.getByText('0 piezas')).toBeInTheDocument();

    await registerMovement(user, { type: 'egreso', quantity: '1', reason: 'Salida negativa' });
    expect(screen.getByText(/No hay suficiente stock. Disponible: 0/i)).toBeInTheDocument();
    expect(screen.queryByText('Salida negativa')).not.toBeInTheDocument();
    expect(screen.queryByText('-1 piezas')).not.toBeInTheDocument();
  });

  test('REQ-F05 calcula stock total por producto como suma de lotes disponibles y muestra detalle', async () => {
    const user = await renderInventory();
    await createProduct(user);
    await openProductLots(user);
    await createBatch(user, { batchNumber: 'LOTE-A', initialQuantity: '10', expiryDate: '' });
    await createBatch(user, { batchNumber: 'LOTE-B', initialQuantity: '20', expiryDate: '' });

    expect(screen.getByText('30 piezas')).toBeInTheDocument();
    expect(screen.getByText('LOTE-A')).toBeInTheDocument();
    expect(screen.getByText('LOTE-B')).toBeInTheDocument();
  });

  test('REQ-F05 mantiene los datos después de recargar desde localStorage', async () => {
    const user = await renderInventory();
    await createProduct(user);
    await openProductLots(user);
    await createBatch(user);

    cleanup();
    render(<App />);

    await screen.findAllByText(/Gestor de Inventario/i);
    expect(screen.getByText((_content, element) => element?.textContent === '1 productos | 1 lotes')).toBeInTheDocument();
    expect(localStorage.getItem('products')).toContain('Martillo');
    expect(localStorage.getItem('batches')).toContain('LOTE-001');
  });
});
