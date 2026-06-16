"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var useProducts_1 = require("./hooks/useProducts");
var useBatches_1 = require("./hooks/useBatches");
var useStockMovements_1 = require("./hooks/useStockMovements");
var components_1 = require("./components");
var button_1 = require("./components/ui/button");
var card_1 = require("./components/ui/card");
var dialog_1 = require("./components/ui/dialog");
/**
 * Trazabilidad REQ-NF02:
 * Orquestador principal de los casos de uso definidos en la propuesta.
 * Conecta productos (REQ-F01), lotes (REQ-F02), movimientos (REQ-F03/REQ-F04)
 * y consulta de inventario con detalle de lotes (REQ-F05).
 */
function App() {
    var _a = (0, useProducts_1.useProducts)(), products = _a.products, addProduct = _a.addProduct, updateProduct = _a.updateProduct, deleteProduct = _a.deleteProduct, searchProducts = _a.searchProducts, productsLoading = _a.loading;
    var _b = (0, useBatches_1.useBatches)(), batches = _b.batches, addBatch = _b.addBatch, updateBatch = _b.updateBatch, deleteBatch = _b.deleteBatch, getBatchesByProduct = _b.getBatchesByProduct, getBatch = _b.getBatch, batchesLoading = _b.loading;
    var _c = (0, useStockMovements_1.useStockMovements)(), addMovement = _c.addMovement, deleteMovement = _c.deleteMovement, getMovementsByBatch = _c.getMovementsByBatch, movementsLoading = _c.loading;
    var _d = (0, react_1.useState)(false), showForm = _d[0], setShowForm = _d[1];
    var _e = (0, react_1.useState)(null), editingProduct = _e[0], setEditingProduct = _e[1];
    var _f = (0, react_1.useState)(""), searchQuery = _f[0], setSearchQuery = _f[1];
    var _g = (0, react_1.useState)(null), selectedProductId = _g[0], setSelectedProductId = _g[1];
    var _h = (0, react_1.useState)(null), selectedBatchId = _h[0], setSelectedBatchId = _h[1];
    var loading = productsLoading || batchesLoading || movementsLoading;
    // REQ-F03 / REQ-F05: El stock visible se deriva de la cantidad inicial mas el historial de movimientos.
    var getAvailableQuantity = function (batch) {
        var batchMovements = getMovementsByBatch(batch.id);
        var totalMovement = batchMovements.reduce(function (sum, m) {
            return m.type === "ingreso" ? sum + m.quantity : sum - m.quantity;
        }, 0);
        return batch.initialQuantity + totalMovement;
    };
    // REQ-F05: Permite consultar el inventario completo o filtrado por busqueda.
    var displayedProducts = (0, react_1.useMemo)(function () {
        if (searchQuery.trim()) {
            return searchProducts(searchQuery);
        }
        return products;
    }, [products, searchQuery, searchProducts]);
    var selectedProduct = selectedProductId
        ? products.find(function (p) { return p.id === selectedProductId; })
        : null;
    // REQ-F05: Detalle de lotes asociados al producto seleccionado.
    var selectedProductBatches = selectedProductId
        ? getBatchesByProduct(selectedProductId)
        : [];
    var handleFormSubmit = function (data) {
        // REQ-F01: Unifica alta y edicion de productos desde el formulario.
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
        // REQ-F02: Todo lote nuevo queda asociado al producto en contexto.
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
        // REQ-F03 / REQ-F04: El formulario valida el egreso y este handler registra el movimiento.
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
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex min-h-screen items-center justify-center bg-slate-950", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-sky-400" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-300", children: "Cargando aplicaci\u00F3n..." })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_48%,_#020617_100%)] text-slate-100", children: [(0, jsx_runtime_1.jsx)("header", { className: "border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300", children: "Inventario inteligente" }), (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-slate-50", children: "Gestor de Inventario" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-slate-400", children: "Sistema de gesti\u00F3n de productos, lotes y movimientos con una interfaz renovada." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300 shadow-lg shadow-black/20", children: [(0, jsx_runtime_1.jsx)("strong", { className: "text-sky-300", children: products.length }), " ", "productos |", " ", (0, jsx_runtime_1.jsx)("strong", { className: "text-sky-300", children: batches.length }), " lotes"] })] }) }) }), (0, jsx_runtime_1.jsxs)("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [selectedBatchId && selectedProduct && ((0, jsx_runtime_1.jsx)("div", { children: getBatch(selectedBatchId) && ((0, jsx_runtime_1.jsx)(components_1.BatchDetail, { product: selectedProduct, batch: getBatch(selectedBatchId), movements: getMovementsByBatch(selectedBatchId), onAddMovement: handleAddMovement, onDeleteMovement: handleDeleteMovement, onBack: handleBackFromBatchDetail })) })), selectedProduct && !selectedBatchId && ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(components_1.ProductDetail, { product: selectedProduct, batches: selectedProductBatches, onAddBatch: handleAddBatch, onEditBatch: handleEditBatch, onDeleteBatch: handleDeleteBatch, onSelectBatch: handleSelectBatch, calculateAvailable: getAvailableQuantity, onBack: handleBackFromDetail }) })), !selectedProduct && !selectedBatchId && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-8", children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: "overflow-hidden", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "grid gap-6 p-6 md:grid-cols-[1.7fr,1fr] md:items-end", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4 flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 text-sky-300", children: (0, jsx_runtime_1.jsx)(lucide_react_1.PackageSearch, { className: "h-5 w-5" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold text-slate-50", children: "Explorar productos" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-400", children: "Busc\u00E1 por c\u00F3digo, nombre, descripci\u00F3n o categor\u00EDa." })] })] }), (0, jsx_runtime_1.jsx)("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "Buscar producto" }), (0, jsx_runtime_1.jsx)(components_1.SearchBar, { onSearch: setSearchQuery })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-3xl border border-slate-800 bg-slate-900/70 p-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4 flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 text-sky-300", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Boxes, { className: "h-5 w-5" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-slate-100", children: "Panel r\u00E1pido" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-400", children: "Cre\u00E1 productos y manten\u00E9 el inventario al d\u00EDa." })] })] }), !showForm && ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return setShowForm(true); }, className: "w-full", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, { className: "h-4 w-4" }), "+ Nuevo Producto"] }))] })] }) }) }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: showForm, onOpenChange: function (open) { return !open && handleFormCancel(); }, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { className: "sr-only", children: editingProduct ? "Editar Producto" : "Nuevo Producto" }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { className: "sr-only", children: "Formulario para crear o editar productos del inventario." }), (0, jsx_runtime_1.jsx)(components_1.ProductForm, { onSubmit: handleFormSubmit, onCancel: handleFormCancel, initialData: editingProduct
                                                ? {
                                                    code: editingProduct.code,
                                                    name: editingProduct.name,
                                                    description: editingProduct.description,
                                                    category: editingProduct.category,
                                                    unit: editingProduct.unit,
                                                }
                                                : undefined, isEditing: !!editingProduct })] }) }), (0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "mb-4 text-2xl font-bold text-slate-50", children: searchQuery
                                            ? "Resultados de b\u00FAsqueda (".concat(displayedProducts.length, ")")
                                            : "Lista de Productos" }), (0, jsx_runtime_1.jsx)(components_1.ProductList, { products: displayedProducts, onEdit: handleEdit, onDelete: deleteProduct, onSelectProduct: handleSelectProduct, searchQuery: searchQuery })] })] }))] }), (0, jsx_runtime_1.jsx)("footer", { className: "mt-12 border-t border-slate-800/80 bg-slate-950/50", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-slate-500", children: (0, jsx_runtime_1.jsx)("p", { children: "Sistema de Gestion de Inventario v1.0 | Cumple con REQ-F01 a REQ-F05" }) }) })] }));
}
exports.default = App;
