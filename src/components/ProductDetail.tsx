import { useState } from "react";
import { ArrowLeft, Boxes, PackagePlus } from "lucide-react";
import { Product, Batch, BatchFormData } from "../types";
import { BatchForm, BatchList } from "./index";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

interface ProductDetailProps {
  product: Product;
  batches: Batch[];
  onAddBatch: (data: BatchFormData) => void;
  onEditBatch: (id: string, data: BatchFormData) => void;
  onDeleteBatch: (id: string) => void;
  onSelectBatch?: (batch: Batch) => void;
  calculateAvailable?: (batch: Batch) => number;
  onBack: () => void;
}

/**
 * Trazabilidad REQ-F02:
 * Muestra y administra los lotes asociados al producto seleccionado.
 *
 * Trazabilidad REQ-F05:
 * Consolida el stock total disponible del producto a partir del detalle de sus
 * lotes, cumpliendo la consulta de inventario definida en la propuesta.
 */
export const ProductDetail = ({
  product,
  batches,
  onAddBatch,
  onEditBatch,
  onDeleteBatch,
  onSelectBatch,
  calculateAvailable,
  onBack,
}: ProductDetailProps) => {
  const formatDateForInput = (date: Date) => date.toISOString().split("T")[0];
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  const handleAddBatch = (data: BatchFormData) => {
    onAddBatch(data);
    setShowBatchForm(false);
  };

  const handleEditBatch = (batch: Batch) => {
    setEditingBatch(batch);
    setShowBatchForm(true);
  };

  const handleSaveEditBatch = (data: BatchFormData) => {
    if (editingBatch) {
      onEditBatch(editingBatch.id, data);
      setEditingBatch(null);
      setShowBatchForm(false);
    }
  };

  const handleCancelBatch = () => {
    setShowBatchForm(false);
    setEditingBatch(null);
  };

  const handleViewBatchDetails = (batch: Batch) => {
    if (onSelectBatch) {
      onSelectBatch(batch);
    }
  };

  // REQ-F05: Suma el disponible de cada lote para informar stock total por producto.
  const totalStock = batches.reduce((sum, b) => {
    const available = calculateAvailable
      ? calculateAvailable(b)
      : b.availableQuantity;
    return sum + available;
  }, 0);

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
              Detalle del producto
            </p>
            <CardTitle className="text-3xl">{product.name}</CardTitle>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-right text-sm text-slate-400">
            <p>
              Código:{" "}
              <span className="font-mono font-semibold text-slate-100">
                {product.code}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Categoría</p>
            <p className="mt-3 text-lg font-semibold text-slate-100">
              {product.category}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Unidad de Medida</p>
            <p className="mt-3 text-lg font-semibold text-slate-100">
              {product.unit}
            </p>
          </div>
          <div className="rounded-3xl border border-sky-500/20 bg-sky-500/10 p-5">
            <p className="text-sm text-sky-200/80">Stock Total Disponible</p>
            <p className="mt-3 text-2xl font-bold text-sky-300">
              {totalStock} {product.unit}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Descripción
          </h3>
          <p className="text-slate-300">{product.description}</p>
        </div>

        <div className="border-t border-slate-800 pt-6">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 text-sky-300">
                <Boxes className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-50">
                Lotes ({batches.length})
              </h3>
            </div>
            {!showBatchForm && (
              <Button
                onClick={() => setShowBatchForm(true)}
                className="w-full sm:w-auto"
              >
                <PackagePlus className="h-4 w-4" />+ Nuevo Lote
              </Button>
            )}
          </div>

          <Dialog
            open={showBatchForm}
            onOpenChange={(open) => !open && handleCancelBatch()}
          >
            <DialogContent>
              <DialogTitle className="sr-only">
                {editingBatch ? "Editar Lote" : "Nuevo Lote"}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Formulario para registrar o editar lotes del producto
                seleccionado.
              </DialogDescription>
              <BatchForm
                productName={product.name}
                onSubmit={editingBatch ? handleSaveEditBatch : handleAddBatch}
                onCancel={handleCancelBatch}
                minExpiryDate={formatDateForInput(
                  editingBatch?.entryDate ?? new Date(),
                )}
                initialData={
                  editingBatch
                    ? {
                        batchNumber: editingBatch.batchNumber,
                        initialQuantity: editingBatch.initialQuantity,
                        expiryDate: editingBatch.expiryDate
                          ? formatDateForInput(editingBatch.expiryDate)
                          : null,
                      }
                    : undefined
                }
                isEditing={!!editingBatch}
              />
            </DialogContent>
          </Dialog>

          <BatchList
            batches={batches}
            onEdit={handleEditBatch}
            onDelete={onDeleteBatch}
            onView={handleViewBatchDetails}
            calculateAvailable={calculateAvailable}
            productUnit={product.unit}
          />
        </div>
      </CardContent>
    </Card>
  );
};
