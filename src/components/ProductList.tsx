import { Product } from "../types";
import { ConfirmDialog } from "./ConfirmDialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

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
  searchQuery,
}: ProductListProps) => {
  if (products.length === 0) {
    return (
      <Card className="border-dashed border-slate-700/80 bg-slate-950/50">
        <CardContent className="p-10 text-center">
          <p className="text-lg text-slate-400">
            {searchQuery
              ? "No se encontraron productos."
              : "No hay productos registrados. ¡Crea uno nuevo!"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Código
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Nombre
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Descripción
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Categoría
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Unidad
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-900 transition-colors hover:bg-slate-900/60"
              >
                <td className="px-6 py-4 text-sm font-medium text-slate-100">
                  {product.code}
                </td>
                <td className="px-6 py-4 text-sm text-slate-200">
                  {product.name}
                </td>
                <td className="max-w-xs truncate px-6 py-4 text-sm text-slate-400">
                  {product.description}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-200">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  {product.unit}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    {onSelectProduct && (
                      <Button
                        onClick={() => onSelectProduct(product)}
                        variant="secondary"
                        size="sm"
                        title="Ver lotes del producto"
                      >
                        Lotes
                      </Button>
                    )}
                    <Button
                      onClick={() => onEdit(product)}
                      variant="outline"
                      size="sm"
                    >
                      Editar
                    </Button>
                    <ConfirmDialog
                      title={`Eliminar producto "${product.name}"`}
                      description="Esta acción quitará el producto del inventario y no se puede deshacer."
                      onConfirm={() => onDelete(product.id)}
                      trigger={
                        <Button variant="destructive" size="sm">
                          Eliminar
                        </Button>
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-slate-800 bg-slate-900/70 px-6 py-4 text-sm text-slate-400">
        Total:{" "}
        <span className="font-semibold text-slate-100">{products.length}</span>{" "}
        producto(s)
      </div>
    </Card>
  );
};
