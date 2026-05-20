"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useProducts_1 = require("./hooks/useProducts");
var useBatches_1 = require("./hooks/useBatches");
var useStockMovements_1 = require("./hooks/useStockMovements");
var components_1 = require("./components");
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
    var _a = (0, useProducts_1.useProducts)(), products = _a.products, addProduct = _a.addProduct, updateProduct = _a.updateProduct, deleteProduct = _a.deleteProduct, searchProducts = _a.searchProducts, productsLoading = _a.loading;
    var _b = (0, useBatches_1.useBatches)(), batches = _b.batches, addBatch = _b.addBatch, updateBatch = _b.updateBatch, deleteBatch = _b.deleteBatch, getBatchesByProduct = _b.getBatchesByProduct, getBatch = _b.getBatch, batchesLoading = _b.loading;
    var _c = (0, useStockMovements_1.useStockMovements)(), addMovement = _c.addMovement, deleteMovement = _c.deleteMovement, getMovementsByBatch = _c.getMovementsByBatch, movementsLoading = _c.loading;
    var _d = (0, react_1.useState)(false), showForm = _d[0], setShowForm = _d[1];
    var _e = (0, react_1.useState)(null), editingProduct = _e[0], setEditingProduct = _e[1];
    var _f = (0, react_1.useState)(''), searchQuery = _f[0], setSearchQuery = _f[1];
    var _g = (0, react_1.useState)(null), selectedProductId = _g[0], setSelectedProductId = _g[1];
    var _h = (0, react_1.useState)(null), selectedBatchId = _h[0], setSelectedBatchId = _h[1];
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
    var displayedProducts = (0, react_1.useMemo)(function () {
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
        return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Cargando aplicaci\u00F3n..." })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-gray-50", children: [(0, jsx_runtime_1.jsx)("header", { className: "bg-white shadow", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-gray-900", children: "\uD83D\uDCE6 Gestor de Inventario" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mt-1", children: "Sistema de gesti\u00F3n de productos y lotes" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg", children: [(0, jsx_runtime_1.jsx)("strong", { children: products.length }), " productos | ", (0, jsx_runtime_1.jsx)("strong", { children: batches.length }), " lotes"] })] }) }) }), (0, jsx_runtime_1.jsxs)("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [selectedBatchId && selectedProduct && ((0, jsx_runtime_1.jsx)("div", { children: getBatch(selectedBatchId) && ((0, jsx_runtime_1.jsx)(components_1.BatchDetail, { product: selectedProduct, batch: getBatch(selectedBatchId), movements: getMovementsByBatch(selectedBatchId), onAddMovement: handleAddMovement, onDeleteMovement: handleDeleteMovement, onBack: handleBackFromBatchDetail })) })), selectedProduct && !selectedBatchId && ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(components_1.ProductDetail, { product: selectedProduct, batches: selectedProductBatches, onAddBatch: handleAddBatch, onEditBatch: handleEditBatch, onDeleteBatch: handleDeleteBatch, onSelectBatch: handleSelectBatch, calculateAvailable: getAvailableQuantity, onBack: handleBackFromDetail }) })), !selectedProduct && !selectedBatchId && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showForm && ((0, jsx_runtime_1.jsx)("div", { className: "mb-8", children: (0, jsx_runtime_1.jsx)(components_1.ProductForm, { onSubmit: handleFormSubmit, onCancel: handleFormCancel, initialData: editingProduct ? {
                                        code: editingProduct.code,
                                        name: editingProduct.name,
                                        description: editingProduct.description,
                                        category: editingProduct.category,
                                        unit: editingProduct.unit
                                    } : undefined, isEditing: !!editingProduct }) })), (0, jsx_runtime_1.jsx)("div", { className: "mb-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row gap-4 items-end", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Buscar producto" }), (0, jsx_runtime_1.jsx)(components_1.SearchBar, { onSearch: setSearchQuery })] }), !showForm && ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setShowForm(true); }, className: "px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap", children: "+ Nuevo Producto" }))] }) }), (0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: searchQuery ? "Resultados de b\u00FAsqueda (".concat(displayedProducts.length, ")") : 'Lista de Productos' }), (0, jsx_runtime_1.jsx)(components_1.ProductList, { products: displayedProducts, onEdit: handleEdit, onDelete: deleteProduct, onSelectProduct: handleSelectProduct, searchQuery: searchQuery })] })] }))] }), (0, jsx_runtime_1.jsx)("footer", { className: "bg-white border-t border-gray-200 mt-12", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm", children: (0, jsx_runtime_1.jsx)("p", { children: "Sistema de Gesti\u00F3n de Inventario v1.0 | Cumple con REQ-F01 y REQ-F02" }) }) })] }));
}
exports.default = App;
