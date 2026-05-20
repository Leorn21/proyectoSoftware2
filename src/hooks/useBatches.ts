import { useState, useEffect } from 'react';
import { Batch, BatchFormData } from '../types';

type StoredBatch = Omit<Batch, 'entryDate' | 'expiryDate' | 'createdAt'> & {
  entryDate: string;
  expiryDate: string | null;
  createdAt: string;
};

/**
 * Trazabilidad REQ-F02:
 * Centraliza el ciclo de vida de lotes asociados a productos, incluyendo
 * numero de lote, cantidades, fecha de ingreso y vencimiento opcional.
 *
 * Trazabilidad REQ-F05:
 * Expone consultas por producto para mostrar el detalle de lotes dentro del
 * inventario.
 */
export const useBatches = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);

  // REQ-NF01: Recupera lotes guardados localmente para ejecutar la app sin backend.
  useEffect(() => {
    const stored = localStorage.getItem('batches');
    if (stored) {
      const parsed = JSON.parse(stored) as StoredBatch[];
      setBatches(parsed.map((b) => ({
        ...b,
        entryDate: new Date(b.entryDate),
        expiryDate: b.expiryDate ? new Date(b.expiryDate) : null,
        createdAt: new Date(b.createdAt)
      })));
    }
    setLoading(false);
  }, []);

  // REQ-NF01: Mantiene persistencia local de lotes para pruebas de usuario.
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('batches', JSON.stringify(batches));
    }
  }, [batches, loading]);

  // REQ-F02: Registra un lote vinculado a un producto con cantidad inicial y vencimiento opcional.
  const addBatch = (productId: string, data: BatchFormData): Batch => {
    const newBatch: Batch = {
      id: Date.now().toString(),
      productId,
      batchNumber: data.batchNumber,
      initialQuantity: data.initialQuantity,
      availableQuantity: data.initialQuantity,
      entryDate: new Date(),
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      createdAt: new Date()
    };
    setBatches([...batches, newBatch]);
    return newBatch;
  };

  // REQ-F02: Edita los datos de identificacion y vencimiento del lote.
  const updateBatch = (id: string, data: BatchFormData): void => {
    setBatches(batches.map(b =>
      b.id === id
        ? {
            ...b,
            batchNumber: data.batchNumber,
            expiryDate: data.expiryDate ? new Date(data.expiryDate) : null
          }
        : b
    ));
  };

  // REQ-F02: Elimina un lote asociado cuando deja de formar parte del inventario.
  const deleteBatch = (id: string): void => {
    setBatches(batches.filter(b => b.id !== id));
  };

  // REQ-F05: Obtiene el detalle de lotes asociado a un producto listado.
  const getBatchesByProduct = (productId: string): Batch[] => {
    return batches.filter(b => b.productId === productId);
  };

  // REQ-F02: Consulta puntual de un lote para visualizar o actualizar su detalle.
  const getBatch = (id: string): Batch | undefined => {
    return batches.find(b => b.id === id);
  };

  // REQ-F03: Sincroniza el saldo disponible luego de registrar movimientos de stock.
  const updateAvailableQuantity = (batchId: string, newQuantity: number): void => {
    setBatches(batches.map(b =>
      b.id === batchId ? { ...b, availableQuantity: newQuantity } : b
    ));
  };

  return {
    batches,
    loading,
    addBatch,
    updateBatch,
    deleteBatch,
    getBatchesByProduct,
    getBatch,
    updateAvailableQuantity
  };
};
