import { useState } from "react";
import { ArrowLeft, ArrowUpDown, ClipboardList } from "lucide-react";
import { Product, Batch, StockMovement, StockMovementFormData } from "../types";
import { StockMovementForm, StockMovementList } from "./index";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

interface BatchDetailProps {
  product: Product;
  batch: Batch;
  movements: StockMovement[];
  onAddMovement: (data: StockMovementFormData) => void;
  onDeleteMovement: (id: string) => void;
  onBack: () => void;
}

/**
 * Trazabilidad REQ-F03:
 * Muestra el historial de movimientos de un lote y habilita el registro de
 * nuevos ingresos o egresos.
 *
 * Trazabilidad REQ-F04:
 * Entrega el stock disponible al formulario para validar que un egreso no
 * supere la cantidad disponible.
 */
export const BatchDetail = ({
  product,
  batch,
  movements,
  onAddMovement,
  onDeleteMovement,
  onBack,
}: BatchDetailProps) => {
  const [showMovementForm, setShowMovementForm] = useState(false);

  const handleAddMovement = (data: StockMovementFormData) => {
    onAddMovement(data);
    setShowMovementForm(false);
  };

  const handleCancelMovement = () => {
    setShowMovementForm(false);
  };

  // REQ-F03: Reconstruye el saldo del lote desde la cantidad inicial y sus movimientos.
  const totalMovement = movements.reduce((sum, m) => {
    return m.type === "ingreso" ? sum + m.quantity : sum - m.quantity;
  }, 0);

  const availableQuantity = batch.initialQuantity + totalMovement;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-slate-800 bg-slate-900/80">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="w-fit px-0 text-sky-300 hover:bg-transparent hover:text-sky-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              Detalle de lote
            </p>
            <CardTitle className="text-3xl">Lote {batch.batchNumber}</CardTitle>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-right text-sm text-slate-400">
            <p>
              Producto:{" "}
              <span className="font-semibold text-slate-100">
                {product.name}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Cantidad Inicial</p>
            <p className="mt-3 text-lg font-semibold text-slate-100">
              {batch.initialQuantity} {product.unit}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Movimiento Neto</p>
            <p
              className={`mt-3 text-lg font-semibold ${totalMovement > 0 ? "text-emerald-400" : totalMovement < 0 ? "text-rose-400" : "text-slate-300"}`}
            >
              {totalMovement > 0 ? "+" : ""}
              {totalMovement} {product.unit}
            </p>
          </div>
          <div className="rounded-3xl border border-sky-500/20 bg-sky-500/10 p-5">
            <p className="text-sm text-sky-200/80">Cantidad Disponible</p>
            <p className="mt-3 text-2xl font-bold text-sky-300">
              {availableQuantity} {product.unit}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Vencimiento</p>
            <p
              className={`mt-3 text-lg font-semibold ${
                batch.expiryDate && new Date(batch.expiryDate) < new Date()
                  ? "text-rose-400"
                  : "text-slate-100"
              }`}
            >
              {batch.expiryDate
                ? batch.expiryDate.toLocaleDateString("es-ES")
                : "-"}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 text-sky-300">
                <ClipboardList className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-50">
                Movimientos de Stock ({movements.length})
              </h3>
            </div>
            {!showMovementForm && (
              <Button
                onClick={() => setShowMovementForm(true)}
                className="w-full sm:w-auto"
              >
                <ArrowUpDown className="h-4 w-4" />+ Nuevo Movimiento
              </Button>
            )}
          </div>

          <Dialog
            open={showMovementForm}
            onOpenChange={(open) => !open && handleCancelMovement()}
          >
            <DialogContent>
              <DialogTitle className="sr-only">
                Registrar Movimiento
              </DialogTitle>
              <DialogDescription className="sr-only">
                Formulario para registrar ingresos o egresos en el lote actual.
              </DialogDescription>
              <StockMovementForm
                batchNumber={batch.batchNumber}
                availableQuantity={availableQuantity}
                onSubmit={handleAddMovement}
                onCancel={handleCancelMovement}
              />
            </DialogContent>
          </Dialog>

          <StockMovementList
            movements={movements}
            onDelete={onDeleteMovement}
            productUnit={product.unit}
          />
        </div>
      </CardContent>
    </Card>
  );
};
