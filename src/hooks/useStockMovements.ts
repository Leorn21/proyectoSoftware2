import { useState, useEffect, useCallback } from 'react';
import { StockMovement, StockMovementFormData } from '../types';
import { useBatches } from './useBatches';

/**
 * Hook personalizado para gestionar movimientos de stock
 * REQ-F03: Registro de movimientos de stock (ingresos y egresos)
 * Actualiza automáticamente la cantidad disponible del lote
 */
export const useStockMovements = () => {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const { getBatch, updateAvailableQuantity } = useBatches();

  // Cargar movimientos del localStorage
  useEffect(() => {
    const stored = localStorage.getItem('stockMovements');
    if (stored) {
      const parsed = JSON.parse(stored);
      setMovements(parsed.map((m: any) => ({
        ...m,
        createdAt: new Date(m.createdAt)
      })));
    }
    setLoading(false);
  }, []);

  // Guardar en localStorage cuando cambian los movimientos
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('stockMovements', JSON.stringify(movements));
    }
  }, [movements, loading]);

  // Calcular cantidad disponible después de todos los movimientos
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

  // Agregar movimiento de stock
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

    // Calcular cantidad disponible con los movimientos actualizados
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

  // Eliminar movimiento
  const deleteMovement = (id: string, batchId: string): void => {
    const updatedMovements = movements.filter(m => m.id !== id);
    setMovements(updatedMovements);

    // Recalcular cantidad disponible del lote
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

  // Obtener movimientos de un lote
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
