import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useProducts } from './hooks/useProducts';
import { useBatches } from './hooks/useBatches';
import { useStockMovements } from './hooks/useStockMovements';
import { ProductForm, ProductList, SearchBar, ProductDetail, BatchDetail } from './components';
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
    var _a = useProducts(), products = _a.products, addProduct = _a.addProduct, updateProduct = _a.updateProduct, deleteProduct = _a.deleteProduct, searchProducts = _a.searchProducts, productsLoading = _a.loading;
    var _b = useBatches(), batches = _b.batches, addBatch = _b.addBatch, updateBatch = _b.updateBatch, deleteBatch = _b.deleteBatch, getBatchesByProduct = _b.getBatchesByProduct, getBatch = _b.getBatch, batchesLoading = _b.loading;
    var _c = useStockMovements(), addMovement = _c.addMovement, deleteMovement = _c.deleteMovement, getMovementsByBatch = _c.getMovementsByBatch, movementsLoading = _c.loading;
    var _d = useState(false), showForm = _d[0], setShowForm = _d[1];
    var _e = useState(null), editingProduct = _e[0], setEditingProduct = _e[1];
    var _f = useState(''), searchQuery = _f[0], setSearchQuery = _f[1];
    var _g = useState(null), selectedProductId = _g[0], setSelectedProductId = _g[1];
    var _h = useState(null), selectedBatchId = _h[0], setSelectedBatchId = _h[1];
    var loading = productsLoading || batchesLoading || movementsLoading;
    // Calcular cantidad disponible para un lote basado en movimientos
    var getAvailableQuantity = function (batch) {
        var batchMovements = getMovementsByBatch(batch.id);
        var totalMovement = batchMovements.reduce(function (sum, m) {
            return m.type === 'ingreso' ? sum + m.quantity : sum - m.quantity;
        }, 0);
        return batch.initialQuantity + totalMovement;
    };
    // Determinar qué productos mostrar (búsqueda o todos)
    var displayedProducts = useMemo(function () {
        if (searchQuery.trim()) {
            return searchProducts(searchQuery);
        }
        return products;
    }, [products, searchQuery, searchProducts]);
    var selectedProduct = selectedProductId ? products.find(function (p) { return p.id === selectedProductId; }) : null;
    var selectedProductBatches = selectedProductId ? getBatchesByProduct(selectedProductId) : [];
    var handleFormSubmit = function (data) {
        if (editingProduct) {
            updateProduct(editingProduct.id, data);
        }
        else {
            addProduct(data);
        }
        setShowForm(false);
        setEditingProduct(null);
    };
    var handleEdit = function (product) {
        setSelectedProductId(null);
        setEditingProduct(product);
        setShowForm(true);
    };
    var handleFormCancel = function () {
        setShowForm(false);
        setEditingProduct(null);
    };
    var handleSelectProduct = function (product) {
        setShowForm(false);
        setEditingProduct(null);
        setSelectedProductId(product.id);
    };
    var handleAddBatch = function (data) {
        if (selectedProductId) {
            addBatch(selectedProductId, data);
        }
    };
    var handleEditBatch = function (batchId, data) {
        updateBatch(batchId, data);
    };
    var handleDeleteBatch = function (batchId) {
        deleteBatch(batchId);
    };
    var handleSelectBatch = function (batch) {
        setSelectedBatchId(batch.id);
    };
    var handleBackFromBatchDetail = function () {
        setSelectedBatchId(null);
    };
    var handleAddMovement = function (data) {
        if (selectedBatchId) {
            addMovement(selectedBatchId, data);
        }
    };
    var handleDeleteMovement = function (movementId) {
        if (selectedBatchId) {
            deleteMovement(movementId, selectedBatchId);
        }
    };
    var handleBackFromDetail = function () {
        setSelectedProductId(null);
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Cargando aplicaci\u00F3n..." })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-white shadow", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "\uD83D\uDCE6 Gestor de Inventario" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Sistema de gesti\u00F3n de productos y lotes" })] }), _jsxs("div", { className: "text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg", children: [_jsx("strong", { children: products.length }), " productos | ", _jsx("strong", { children: batches.length }), " lotes"] })] }) }) }), _jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [selectedBatchId && selectedProduct && (_jsx("div", { children: getBatch(selectedBatchId) && (_jsx(BatchDetail, { product: selectedProduct, batch: getBatch(selectedBatchId), movements: getMovementsByBatch(selectedBatchId), onAddMovement: handleAddMovement, onDeleteMovement: handleDeleteMovement, onBack: handleBackFromBatchDetail })) })), selectedProduct && !selectedBatchId && (_jsx("div", { children: _jsx(ProductDetail, { product: selectedProduct, batches: selectedProductBatches, onAddBatch: handleAddBatch, onEditBatch: handleEditBatch, onDeleteBatch: handleDeleteBatch, onSelectBatch: handleSelectBatch, calculateAvailable: getAvailableQuantity, onBack: handleBackFromDetail }) })), !selectedProduct && !selectedBatchId && (_jsxs(_Fragment, { children: [showForm && (_jsx("div", { className: "mb-8", children: _jsx(ProductForm, { onSubmit: handleFormSubmit, onCancel: handleFormCancel, initialData: editingProduct ? {
                                        code: editingProduct.code,
                                        name: editingProduct.name,
                                        description: editingProduct.description,
                                        category: editingProduct.category,
                                        unit: editingProduct.unit
                                    } : undefined, isEditing: !!editingProduct }) })), _jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-end", children: [_jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Buscar producto" }), _jsx(SearchBar, { onSearch: setSearchQuery })] }), !showForm && (_jsx("button", { onClick: function () { return setShowForm(true); }, className: "px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap", children: "+ Nuevo Producto" }))] }) }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: searchQuery ? "Resultados de b\u00FAsqueda (".concat(displayedProducts.length, ")") : 'Lista de Productos' }), _jsx(ProductList, { products: displayedProducts, onEdit: handleEdit, onDelete: deleteProduct, onSelectProduct: handleSelectProduct, searchQuery: searchQuery })] })] }))] }), _jsx("footer", { className: "bg-white border-t border-gray-200 mt-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm", children: _jsx("p", { children: "Sistema de Gesti\u00F3n de Inventario v1.0 | Cumple con REQ-F01 y REQ-F02" }) }) })] }));
}
export default App;
