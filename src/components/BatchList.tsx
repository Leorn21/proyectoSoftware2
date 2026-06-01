import { Batch } from "../types";
import { ConfirmDialog } from "./ConfirmDialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface BatchListProps {
  batches: Batch[];
  onEdit: (batch: Batch) => void;
  onDelete: (id: string) => void;
  onView?: (batch: Batch) => void;
  calculateAvailable?: (batch: Batch) => number;
  productUnit: string;
}

/**
 * Trazabilidad REQ-F02:
 * Lista los lotes asociados a un producto con cantidades, ingreso y vencimiento.
 *
 * Trazabilidad REQ-F05:
 * Permite consultar el detalle de lotes que compone el stock total del producto.
 */
export const BatchList = ({
  batches,
  onEdit,
  onDelete,
  onView,
  calculateAvailable,
  productUnit,
}: BatchListProps) => {
  if (batches.length === 0) {
    return (
      <Card className="border-dashed border-slate-700/80 bg-slate-950/50">
        <CardContent className="p-8 text-center">
          <p className="text-slate-400">
            No hay lotes registrados para este producto.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80">
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Número de Lote
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Cantidad Inicial
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Disponible
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Ingreso
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Vencimiento
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => {
              // REQ-F03 / REQ-F05: Usa el saldo recalculado por movimientos cuando esta disponible.
              const available = calculateAvailable
                ? calculateAvailable(batch)
                : batch.availableQuantity;
              return (
                <tr
                  key={batch.id}
                  className="border-b border-slate-900 transition-colors hover:bg-slate-900/60"
                >
                  <td className="px-4 py-4 font-medium text-slate-100">
                    {batch.batchNumber}
                  </td>
                  <td className="px-4 py-4 text-slate-300">
                    {batch.initialQuantity} {productUnit}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        available > 0
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-rose-500/15 text-rose-300"
                      }`}
                    >
                      {available} {productUnit}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-400">
                    {batch.entryDate.toLocaleDateString("es-ES")}
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-300">
                    {batch.expiryDate ? (
                      <span
                        className={
                          new Date(batch.expiryDate) < new Date()
                            ? "font-semibold text-rose-400"
                            : "text-slate-300"
                        }
                      >
                        {batch.expiryDate.toLocaleDateString("es-ES")}
                      </span>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {onView && (
                        <Button
                          onClick={() => onView(batch)}
                          variant="secondary"
                          size="sm"
                        >
                          Movimientos
                        </Button>
                      )}
                      <Button
                        onClick={() => onEdit(batch)}
                        variant="outline"
                        size="sm"
                      >
                        Editar
                      </Button>
                      <ConfirmDialog
                        title={`Eliminar lote "${batch.batchNumber}"`}
                        description="El lote y su información dejarán de estar disponibles en este producto."
                        onConfirm={() => onDelete(batch.id)}
                        trigger={
                          <Button variant="destructive" size="sm">
                            Eliminar
                          </Button>
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
