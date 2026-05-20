import { useState, useMemo } from 'react';
import { useProducts } from './hooks/useProducts';
import { useBatches } from './hooks/useBatches';
import { useStockMovements } from './hooks/useStockMovements';
import { ProductForm, ProductList, SearchBar, ProductDetail, BatchDetail } from './components';
import { Product, ProductFormData, BatchFormData, Batch, StockMovementFormData } from './types';

/**
 * Componente principal de la aplicación
 * Cumple con REQ-F01: Sistema de gestión de productos
 * Cumple con REQ-F02: Sistema de gestión de lotes
 * Cumple con REQ-F03: Sistema de movimientos de stock
 * - Registrar productos y lotes
 * - Editar productos y lotes
 * - Consultar productos y lotes
 * - Eliminar productos y lotes
 * - Registrar movimientos de stock (ingresos y egresos)
 */
function App() {
  const { products, addProduct, updateProduct, deleteProduct, searchProducts, loading: productsLoading } = useProducts();
  const { batches, addBatch, updateBatch, deleteBatch, getBatchesByProduct, getBatch, loading: batchesLoading } = useBatches();
  const { addMovement, deleteMovement, getMovementsByBatch, loading: movementsLoading } = useStockMovements();
  
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);

  const loading = productsLoading || batchesLoading || movementsLoading;

  // Calcular cantidad disponible para un lote basado en movimientos
  const getAvailableQuantity = (batch: Batch): number => {
    const batchMovements = getMovementsByBatch(batch.id);
    const totalMovement = batchMovements.reduce((sum, m) => {
      return m.type === 'ingreso' ? sum + m.quantity : sum - m.quantity;
    }, 0);
    return batch.initialQuantity + totalMovement;
  };

  // Determinar qué productos mostrar (búsqueda o todos)
  const displayedProducts = useMemo(() => {
    if (searchQuery.trim()) {
      return searchProducts(searchQuery);
    }
    return products;
  }, [products, searchQuery, searchProducts]);

  const selectedProduct = selectedProductId ? products.find(p => p.id === selectedProductId) : null;
  const selectedProductBatches = selectedProductId ? getBatchesByProduct(selectedProductId) : [];

  const handleFormSubmit = (data: ProductFormData) => {
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando aplicación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📦 Gestor de Inventario
              </h1>
              <p className="text-gray-600 mt-1">Sistema de gestión de productos y lotes</p>
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
              <strong>{products.length}</strong> productos | <strong>{batches.length}</strong> lotes
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
            {showForm && (
              <div className="mb-8">
                <ProductForm
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                  initialData={editingProduct ? {
                    code: editingProduct.code,
                    name: editingProduct.name,
                    description: editingProduct.description,
                    category: editingProduct.category,
                    unit: editingProduct.unit
                  } : undefined}
                  isEditing={!!editingProduct}
                />
              </div>
            )}

            {/* Sección de búsqueda y botón */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar producto
                  </label>
                  <SearchBar onSearch={setSearchQuery} />
                </div>
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                  >
                    + Nuevo Producto
                  </button>
                )}
              </div>
            </div>

            {/* Lista de productos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {searchQuery ? `Resultados de búsqueda (${displayedProducts.length})` : 'Lista de Productos'}
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
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
          <p>Sistema de Gestión de Inventario v1.0 | Cumple con REQ-F01 y REQ-F02</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
