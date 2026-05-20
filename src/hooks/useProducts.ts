import { useState, useEffect } from 'react';
import { Product, ProductFormData } from '../types';

/**
 * Hook personalizado para gestionar productos
 * REQ-F01: Registro, edición, consulta y eliminación de productos
 * Utiliza localStorage para persistencia local
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos del localStorage
  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (stored) {
      const parsed = JSON.parse(stored);
      setProducts(parsed.map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt)
      })));
    }
    setLoading(false);
  }, []);

  // Guardar en localStorage cuando cambian los productos
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products, loading]);

  // Agregar nuevo producto
  const addProduct = (data: ProductFormData): Product => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date()
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  // Actualizar producto existente
  const updateProduct = (id: string, data: ProductFormData): void => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, ...data } : p
    ));
  };

  // Eliminar producto
  const deleteProduct = (id: string): void => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Obtener un producto específico
  const getProduct = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  // Buscar productos
  const searchProducts = (query: string): Product[] => {
    const q = query.toLowerCase();
    return products.filter(p =>
      p.code.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    searchProducts
  };
};
