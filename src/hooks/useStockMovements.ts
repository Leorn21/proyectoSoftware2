import { useState, useEffect, useCallback } from 'react';
import { StockMovement, StockMovementFormData } from '../types';

type StoredStockMovement = Omit<StockMovement, 'createdAt'> & {
  createdAt: string;
};
import { useBatches } from './useBatches';

/**
 * Trazabilidad REQ-F03:
 * Gestiona movimientos de stock por lote, diferenciando ingresos y egresos, y
 * recalcula el saldo disponible despues de cada cambio.
 *
 * Trazabilidad REQ-F04:
 * La validacion de egresos mayores al stock se aplica en StockMovementForm antes
 * de invocar este hook; este modulo conserva la actualizacion del saldo.
 */
export const useStockMovements = () => {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const { getBatch, updateAvailableQuantity } = useBatches();

  // REQ-NF01: Recupera movimientos locales para ejecutar y probar sin infraestructura externa.
  useEffect(() => {
    const stored = localStorage.getItem('stockMovements');
    if (stored) {
      const parsed = JSON.parse(stored) as StoredStockMovement[];
      setMovements(parsed.map((m) => ({
        ...m,
        createdAt: new Date(m.createdAt)
      })));
    }
    setLoading(false);
  }, []);

  // REQ-NF01: Persiste el historial local de movimientos entre recargas.
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('stockMovements', JSON.stringify(movements));
    }
  }, [movements, loading]);

  // REQ-F03 / REQ-F05: Calcula el saldo que se muestra en consultas de lote e inventario.
  const calculateAvailableQuantity = useCallback((batchId: string): number => {
    const batch = getBatch(batchId);
    if (!batch) return 0;

    const totalMovement = movements
      .filter(m => m.batchId === batchId)
      .reduce((sum, m) => {
        return m.type === 'ingreso' ? sum + m.quantity : sum - m.quantity;
      }, 0);

    return batch.initialQuantity + totalMovement;
  }, [movements, getBatch]);

  // REQ-F03: Registra ingreso o egreso y actualiza automaticamente la cantidad disponible del lote.
  const addMovement = (batchId: string, data: StockMovementFormData): StockMovement => {
    const newMovement: StockMovement = {
      id: Date.now().toString(),
      batchId,
      type: data.type,
      quantity: data.quantity,
      reason: data.reason,
      createdAt: new Date()
    };

    const updatedMovements = [...movements, newMovement];
    setMovements(updatedMovements);

    // REQ-F03: Recalculo inmediato para que el lote refleje el movimiento recien registrado.
    const batch = getBatch(batchId);
    if (batch) {
      const totalMovement = updatedMovements
        .filter(m => m.batchId === batchId)
        .reduce((sum, m) => {
          return m.type === 'ingreso' ? sum + m.quantity : sum - m.quantity;
        }, 0);
      const newAvailable = batch.initialQuantity + totalMovement;
      updateAvailableQuantity(batchId, newAvailable);
    }

    return newMovement;
  };

  // REQ-F03: Al eliminar un movimiento se recompone el saldo para mantener trazabilidad historica.
  const deleteMovement = (id: string, batchId: string): void => {
    const updatedMovements = movements.filter(m => m.id !== id);
    setMovements(updatedMovements);

    // REQ-F03: Recalcula el saldo con el historial restante del lote.
    const batch = getBatch(batchId);
    if (batch) {
      const totalMovement = updatedMovements
        .filter(m => m.batchId === batchId)
        .reduce((sum, m) => {
          return m.type === 'ingreso' ? sum + m.quantity : sum - m.quantity;
        }, 0);
      const newAvailable = batch.initialQuantity + totalMovement;
      updateAvailableQuantity(batchId, newAvailable);
    }
  };

  // REQ-F03: Consulta del historial de movimientos asociado a un lote.
  const getMovementsByBatch = (batchId: string): StockMovement[] => {
    return movements.filter(m => m.batchId === batchId);
  };

  return {
    movements,
    loading,
    addMovement,
    deleteMovement,
    getMovementsByBatch,
    calculateAvailableQuantity
  };
};
