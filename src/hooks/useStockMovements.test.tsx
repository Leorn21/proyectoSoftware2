import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const getBatchMock = vi.fn();
const updateAvailableQuantityMock = vi.fn();

vi.mock('./useBatches', () => ({
  useBatches: () => ({
    getBatch: getBatchMock,
    updateAvailableQuantity: updateAvailableQuantityMock
  })
}));

import { useStockMovements } from './useStockMovements';

describe('useStockMovements', () => {
  let now = 2000;

  beforeEach(() => {
    localStorage.clear();
    getBatchMock.mockReset();
    updateAvailableQuantityMock.mockReset();
    now = 2000;
    vi.spyOn(Date, 'now').mockImplementation(() => now++);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test('REQ-F03 carga movimientos desde localStorage y filtra por lote', () => {
    localStorage.setItem('stockMovements', JSON.stringify([
      {
        id: 'mov-1',
        batchId: 'batch-1',
        type: 'ingreso',
        quantity: 4,
        reason: 'Carga inicial extra',
        createdAt: '2026-05-01T10:00:00.000Z'
      },
      {
        id: 'mov-2',
        batchId: 'batch-2',
        type: 'egreso',
        quantity: 1,
        reason: 'Venta',
        createdAt: '2026-05-02T10:00:00.000Z'
      }
    ]));

    const { result } = renderHook(() => useStockMovements());

    expect(result.current.loading).toBe(false);
    expect(result.current.movements).toHaveLength(2);
    expect(result.current.movements[0].createdAt).toBeInstanceOf(Date);
    expect(result.current.getMovementsByBatch('batch-1')).toHaveLength(1);
  });

  test('REQ-F03 calcula disponible con ingresos y egresos', () => {
    getBatchMock.mockReturnValue({
      id: 'batch-1',
      initialQuantity: 10
    });
    localStorage.setItem('stockMovements', JSON.stringify([
      {
        id: 'mov-1',
        batchId: 'batch-1',
        type: 'ingreso',
        quantity: 5,
        createdAt: '2026-05-01T10:00:00.000Z'
      },
      {
        id: 'mov-2',
        batchId: 'batch-1',
        type: 'egreso',
        quantity: 3,
        createdAt: '2026-05-02T10:00:00.000Z'
      },
      {
        id: 'mov-3',
        batchId: 'otro-lote',
        type: 'egreso',
        quantity: 99,
        createdAt: '2026-05-03T10:00:00.000Z'
      }
    ]));

    const { result } = renderHook(() => useStockMovements());

    expect(result.current.calculateAvailableQuantity('batch-1')).toBe(12);
    expect(getBatchMock).toHaveBeenCalledWith('batch-1');
  });

  test('REQ-F03 devuelve 0 si el lote no existe', () => {
    getBatchMock.mockReturnValue(undefined);

    const { result } = renderHook(() => useStockMovements());

    expect(result.current.calculateAvailableQuantity('batch-inexistente')).toBe(0);
  });

  test('REQ-F03 agrega y elimina movimientos recalculando el disponible', () => {
    getBatchMock.mockReturnValue({
      id: 'batch-1',
      initialQuantity: 10
    });
    const { result } = renderHook(() => useStockMovements());

    act(() => {
      result.current.addMovement('batch-1', {
        type: 'ingreso',
        quantity: 5,
        reason: 'Reposicion'
      });
    });

    const created = result.current.movements[0];
    expect(created.batchId).toBe('batch-1');
    expect(created.reason).toBe('Reposicion');
    expect(updateAvailableQuantityMock).toHaveBeenLastCalledWith('batch-1', 15);

    act(() => {
      result.current.addMovement('batch-1', {
        type: 'egreso',
        quantity: 2,
        reason: 'Venta'
      });
    });
    expect(updateAvailableQuantityMock).toHaveBeenLastCalledWith('batch-1', 13);

    act(() => {
      result.current.deleteMovement(created.id, 'batch-1');
    });

    expect(result.current.movements).toHaveLength(1);
    expect(result.current.movements[0].reason).toBe('Venta');
    expect(updateAvailableQuantityMock).toHaveBeenLastCalledWith('batch-1', 8);
    expect(localStorage.getItem('stockMovements')).toContain('Venta');
  });

  test('REQ-F03 agrega y elimina movimientos aunque el lote no exista', () => {
    getBatchMock.mockReturnValue(undefined);
    const { result } = renderHook(() => useStockMovements());

    act(() => {
      result.current.addMovement('batch-faltante', {
        type: 'egreso',
        quantity: 1
      });
    });

    expect(result.current.getMovementsByBatch('batch-faltante')).toHaveLength(1);
    expect(updateAvailableQuantityMock).not.toHaveBeenCalled();

    act(() => {
      result.current.deleteMovement(result.current.movements[0].id, 'batch-faltante');
    });

    expect(result.current.movements).toHaveLength(0);
    expect(updateAvailableQuantityMock).not.toHaveBeenCalled();
  });
});
