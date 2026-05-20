import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onSelectProduct?: (product: Product) => void;
  searchQuery?: string;
}

/**
 * Trazabilidad REQ-F01:
 * Presenta productos consultables y expone acciones de editar/eliminar.
 *
 * Trazabilidad REQ-F05:
 * Es la entrada visual al inventario; desde cada producto se accede al detalle
 * de lotes que explica el stock disponible.
 */
export const ProductList = ({
  products,
  onEdit,
  onDelete,
  onSelectProduct,
  searchQuery
}: ProductListProps) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">
          {searchQuery ? 'No se encontraron productos.' : 'No hay productos registrados. ¡Crea uno nuevo!'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Código</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Categoría</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Unidad</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.code}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{product.description}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{product.unit}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    {onSelectProduct && (
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="px-3 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 transition-colors font-medium"
                        title="Ver lotes del producto"
                      >
                        Lotes
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(product)}
                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`¿Eliminar producto "${product.name}"?`)) {
                          onDelete(product.id);
                        }
                      }}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t text-sm text-gray-600">
        Total: <span className="font-semibold">{products.length}</span> producto(s)
      </div>
    </div>
  );
};
