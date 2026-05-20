import { useState, useEffect } from 'react';
import { Batch, BatchFormData } from '../types';

/**
 * Hook personalizado para gestionar lotes
 * REQ-F02: Registro de lotes asociados a un producto
 * Utiliza localStorage para persistencia local
 */
export const useBatches = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar lotes del localStorage
  useEffect(() => {
    const stored = localStorage.getItem('batches');
    if (stored) {
      const parsed = JSON.parse(stored);
      setBatches(parsed.map((b: any) => ({
        ...b,
        entryDate: new Date(b.entryDate),
        expiryDate: b.expiryDate ? new Date(b.expiryDate) : null,
        createdAt: new Date(b.createdAt)
      })));
    }
    setLoading(false);
  }, []);

  // Guardar en localStorage cuando cambian los lotes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('batches', JSON.stringify(batches));
    }
  }, [batches, loading]);

  // Agregar nuevo lote
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

  // Actualizar lote
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

  // Eliminar lote
  const deleteBatch = (id: string): void => {
    setBatches(batches.filter(b => b.id !== id));
  };

  // Obtener lotes de un producto
  const getBatchesByProduct = (productId: string): Batch[] => {
    return batches.filter(b => b.productId === productId);
  };

  // Obtener un lote específico
  const getBatch = (id: string): Batch | undefined => {
    return batches.find(b => b.id === id);
  };

  // Actualizar cantidad disponible del lote (para movimientos de stock)
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
