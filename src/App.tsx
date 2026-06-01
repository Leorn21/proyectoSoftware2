import { useState, useMemo } from "react";
import { Boxes, PackageSearch, PlusCircle } from "lucide-react";
import { useProducts } from "./hooks/useProducts";
import { useBatches } from "./hooks/useBatches";
import { useStockMovements } from "./hooks/useStockMovements";
import {
  ProductForm,
  ProductList,
  SearchBar,
  ProductDetail,
  BatchDetail,
} from "./components";
import {
  Product,
  ProductFormData,
  BatchFormData,
  Batch,
  StockMovementFormData,
} from "./types";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./components/ui/dialog";

/**
 * Trazabilidad REQ-NF02:
 * Orquestador principal de los casos de uso definidos en la propuesta.
 * Conecta productos (REQ-F01), lotes (REQ-F02), movimientos (REQ-F03/REQ-F04)
 * y consulta de inventario con detalle de lotes (REQ-F05).
 */
function App() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    loading: productsLoading,
  } = useProducts();
  const {
    batches,
    addBatch,
    updateBatch,
    deleteBatch,
    getBatchesByProduct,
    getBatch,
    loading: batchesLoading,
  } = useBatches();
  const {
    addMovement,
    deleteMovement,
    getMovementsByBatch,
    loading: movementsLoading,
  } = useStockMovements();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);

  const loading = productsLoading || batchesLoading || movementsLoading;

  // REQ-F03 / REQ-F05: El stock visible se deriva de la cantidad inicial mas el historial de movimientos.
  const getAvailableQuantity = (batch: Batch): number => {
    const batchMovements = getMovementsByBatch(batch.id);
    const totalMovement = batchMovements.reduce((sum, m) => {
      return m.type === "ingreso" ? sum + m.quantity : sum - m.quantity;
    }, 0);
    return batch.initialQuantity + totalMovement;
  };

  // REQ-F05: Permite consultar el inventario completo o filtrado por busqueda.
  const displayedProducts = useMemo(() => {
    if (searchQuery.trim()) {
      return searchProducts(searchQuery);
    }
    return products;
  }, [products, searchQuery, searchProducts]);

  const selectedProduct = selectedProductId
    ? products.find((p) => p.id === selectedProductId)
    : null;
  // REQ-F05: Detalle de lotes asociados al producto seleccionado.
  const selectedProductBatches = selectedProductId
    ? getBatchesByProduct(selectedProductId)
    : [];

  const handleFormSubmit = (data: ProductFormData) => {
    // REQ-F01: Unifica alta y edicion de productos desde el formulario.
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setSelectedProductId(null);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSelectProduct = (product: Product) => {
    setShowForm(false);
    setEditingProduct(null);
    setSelectedProductId(product.id);
  };

  const handleAddBatch = (data: BatchFormData) => {
    // REQ-F02: Todo lote nuevo queda asociado al producto en contexto.
    if (selectedProductId) {
      addBatch(selectedProductId, data);
    }
  };

  const handleEditBatch = (batchId: string, data: BatchFormData) => {
    updateBatch(batchId, data);
  };

  const handleDeleteBatch = (batchId: string) => {
    deleteBatch(batchId);
  };

  const handleSelectBatch = (batch: Batch) => {
    setSelectedBatchId(batch.id);
  };

  const handleBackFromBatchDetail = () => {
    setSelectedBatchId(null);
  };

  const handleAddMovement = (data: StockMovementFormData) => {
    // REQ-F03 / REQ-F04: El formulario valida el egreso y este handler registra el movimiento.
    if (selectedBatchId) {
      addMovement(selectedBatchId, data);
    }
  };

  const handleDeleteMovement = (movementId: string) => {
    if (selectedBatchId) {
      deleteMovement(movementId, selectedBatchId);
    }
  };

  const handleBackFromDetail = () => {
    setSelectedProductId(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-sky-400"></div>
          <p className="text-slate-300">Cargando aplicación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_48%,_#020617_100%)] text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
                Inventario inteligente
              </p>
              <h1 className="text-3xl font-bold text-slate-50">
                Gestor de Inventario
              </h1>
              <p className="mt-1 text-slate-400">
                Sistema de gestión de productos, lotes y movimientos con una
                interfaz renovada.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300 shadow-lg shadow-black/20">
              <strong className="text-sky-300">{products.length}</strong>{" "}
              productos |{" "}
              <strong className="text-sky-300">{batches.length}</strong> lotes
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vista de Detalle del Lote con Movimientos */}
        {selectedBatchId && selectedProduct && (
          <div>
            {getBatch(selectedBatchId) && (
              <BatchDetail
                product={selectedProduct}
                batch={getBatch(selectedBatchId)!}
                movements={getMovementsByBatch(selectedBatchId)}
                onAddMovement={handleAddMovement}
                onDeleteMovement={handleDeleteMovement}
                onBack={handleBackFromBatchDetail}
              />
            )}
          </div>
        )}

        {/* Vista de Detalle del Producto */}
        {selectedProduct && !selectedBatchId && (
          <div>
            <ProductDetail
              product={selectedProduct}
              batches={selectedProductBatches}
              onAddBatch={handleAddBatch}
              onEditBatch={handleEditBatch}
              onDeleteBatch={handleDeleteBatch}
              onSelectBatch={handleSelectBatch}
              calculateAvailable={getAvailableQuantity}
              onBack={handleBackFromDetail}
            />
          </div>
        )}

        {/* Vista de Listado de Productos */}
        {!selectedProduct && !selectedBatchId && (
          <>
            {/* Formulario de Producto */}
            {/* Sección de búsqueda y botón */}
            <div className="mb-8">
              <Card className="overflow-hidden">
                <CardContent className="grid gap-6 p-6 md:grid-cols-[1.7fr,1fr] md:items-end">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 text-sky-300">
                        <PackageSearch className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-50">
                          Explorar productos
                        </h2>
                        <p className="text-sm text-slate-400">
                          Buscá por código, nombre, descripción o categoría.
                        </p>
                      </div>
                    </div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Buscar producto
                    </label>
                    <SearchBar onSearch={setSearchQuery} />
                  </div>
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 text-sky-300">
                        <Boxes className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-100">
                          Panel rápido
                        </p>
                        <p className="text-sm text-slate-400">
                          Creá productos y mantené el inventario al día.
                        </p>
                      </div>
                    </div>
                    {!showForm && (
                      <Button
                        onClick={() => setShowForm(true)}
                        className="w-full"
                      >
                        <PlusCircle className="h-4 w-4" />+ Nuevo Producto
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Dialog
              open={showForm}
              onOpenChange={(open) => !open && handleFormCancel()}
            >
              <DialogContent>
                <DialogTitle className="sr-only">
                  {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Formulario para crear o editar productos del inventario.
                </DialogDescription>
                <ProductForm
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                  initialData={
                    editingProduct
                      ? {
                          code: editingProduct.code,
                          name: editingProduct.name,
                          description: editingProduct.description,
                          category: editingProduct.category,
                          unit: editingProduct.unit,
                        }
                      : undefined
                  }
                  isEditing={!!editingProduct}
                />
              </DialogContent>
            </Dialog>

            {/* Lista de productos */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-50">
                {searchQuery
                  ? `Resultados de búsqueda (${displayedProducts.length})`
                  : "Lista de Productos"}
              </h2>
              <ProductList
                products={displayedProducts}
                onEdit={handleEdit}
                onDelete={deleteProduct}
                onSelectProduct={handleSelectProduct}
                searchQuery={searchQuery}
              />
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-slate-500">
          <p>
            Sistema de Gestión de Inventario v1.0 | Cumple con REQ-F01 y REQ-F02
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
