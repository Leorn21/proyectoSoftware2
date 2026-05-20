import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useBatches } from './useBatches';

describe('useBatches', () => {
  let now = 1000;

  beforeEach(() => {
    localStorage.clear();
    now = 1000;
    vi.spyOn(Date, 'now').mockImplementation(() => now++);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test('REQ-F02 carga lotes desde localStorage convirtiendo fechas', () => {
    localStorage.setItem('batches', JSON.stringify([
      {
        id: 'batch-1',
        productId: 'product-1',
        batchNumber: 'LOTE-PERSISTIDO',
        initialQuantity: 8,
        availableQuantity: 6,
        entryDate: '2026-05-01T00:00:00.000Z',
        expiryDate: '2026-12-31T00:00:00.000Z',
        createdAt: '2026-05-01T00:00:00.000Z'
      },
      {
        id: 'batch-2',
        productId: 'product-2',
        batchNumber: 'SIN-VENCIMIENTO',
        initialQuantity: 3,
        availableQuantity: 3,
        entryDate: '2026-05-02T00:00:00.000Z',
        expiryDate: null,
        createdAt: '2026-05-02T00:00:00.000Z'
      }
    ]));

    const { result } = renderHook(() => useBatches());

    expect(result.current.loading).toBe(false);
    expect(result.current.batches).toHaveLength(2);
    expect(result.current.batches[0].entryDate).toBeInstanceOf(Date);
    expect(result.current.batches[0].expiryDate).toBeInstanceOf(Date);
    expect(result.current.batches[1].expiryDate).toBeNull();
    expect(result.current.getBatchesByProduct('product-1')).toHaveLength(1);
    expect(result.current.getBatch('batch-2')?.batchNumber).toBe('SIN-VENCIMIENTO');
  });

  test('REQ-F02 registra, actualiza, consulta y elimina lotes', () => {
    const { result } = renderHook(() => useBatches());

    act(() => {
      result.current.addBatch('product-1', {
        batchNumber: 'LOTE-001',
        initialQuantity: 12,
        expiryDate: '2026-12-31'
      });
    });

    const created = result.current.batches[0];
    expect(created.productId).toBe('product-1');
    expect(created.availableQuantity).toBe(12);
    expect(created.expiryDate).toBeInstanceOf(Date);

    act(() => {
      result.current.updateBatch(created.id, {
        batchNumber: 'LOTE-EDITADO',
        initialQuantity: 999,
        expiryDate: null
      });
    });

    expect(result.current.getBatch(created.id)?.batchNumber).toBe('LOTE-EDITADO');
    expect(result.current.getBatch(created.id)?.expiryDate).toBeNull();
    expect(result.current.getBatch('inexistente')).toBeUndefined();

    act(() => {
      result.current.updateAvailableQuantity(created.id, 7);
    });
    expect(result.current.getBatch(created.id)?.availableQuantity).toBe(7);

    act(() => {
      result.current.updateAvailableQuantity('inexistente', 0);
      result.current.deleteBatch(created.id);
    });

    expect(result.current.batches).toHaveLength(0);
    expect(localStorage.getItem('batches')).toBe('[]');
  });
});
