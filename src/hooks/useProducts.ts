import { useState, useEffect } from "react";
import { Product, ProductFormData } from "../types";

type StoredProduct = Omit<Product, "createdAt"> & {
  createdAt: string;
};

/**
 * Trazabilidad REQ-F01:
 * Centraliza las operaciones CRUD de productos requeridas por la propuesta:
 * registrar, editar, consultar, eliminar y buscar por datos basicos.
 *
 * Trazabilidad REQ-NF01:
 * Usa localStorage para que el sistema pueda ejecutarse y probarse localmente
 * sin depender de servicios externos durante la validacion del alcance.
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // REQ-NF01: Carga datos locales para pruebas manuales reproducibles.
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      const parsed = JSON.parse(stored) as StoredProduct[];
      setProducts(
        parsed.map((p) => ({
          ...p,
          createdAt: new Date(p.createdAt),
        })),
      );
    }
    setLoading(false);
  }, []);

  // REQ-NF01: Persiste cambios locales entre recargas del navegador.
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, loading]);

  // REQ-F01: Alta de producto con los campos basicos definidos en la propuesta.
  const addProduct = (data: ProductFormData): Product => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  // REQ-F01: Edicion de datos basicos sin alterar la identidad del producto.
  const updateProduct = (id: string, data: ProductFormData): void => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  // REQ-F01: Baja de producto desde el inventario.
  const deleteProduct = (id: string): void => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // REQ-F01: Consulta puntual de producto por identificador interno.
  const getProduct = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  // REQ-F05: Consulta de inventario por campos visibles del producto.
  const searchProducts = (query: string): Product[] => {
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.code.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    searchProducts,
  };
};
