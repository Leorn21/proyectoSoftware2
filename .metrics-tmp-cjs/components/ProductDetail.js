"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetail = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var index_1 = require("./index");
/**
 * Componente de detalle de producto con gestión de lotes
 * REQ-F02: Muestra lotes asociados y permite registrar nuevos
 * REQ-F03: Permite navegar a detalle de lote con movimientos de stock
 */
var ProductDetail = function (_a) {
    var product = _a.product, batches = _a.batches, onAddBatch = _a.onAddBatch, onEditBatch = _a.onEditBatch, onDeleteBatch = _a.onDeleteBatch, onSelectBatch = _a.onSelectBatch, calculateAvailable = _a.calculateAvailable, onBack = _a.onBack;
    var _b = (0, react_1.useState)(false), showBatchForm = _b[0], setShowBatchForm = _b[1];
    var _c = (0, react_1.useState)(null), editingBatch = _c[0], setEditingBatch = _c[1];
    var handleAddBatch = function (data) {
        onAddBatch(data);
        setShowBatchForm(false);
    };
    var handleEditBatch = function (batch) {
        setEditingBatch(batch);
        setShowBatchForm(true);
    };
    var handleSaveEditBatch = function (data) {
        if (editingBatch) {
            onEditBatch(editingBatch.id, data);
            setEditingBatch(null);
            setShowBatchForm(false);
        }
    };
    var handleCancelBatch = function () {
        setShowBatchForm(false);
        setEditingBatch(null);
    };
    var handleViewBatchDetails = function (batch) {
        if (onSelectBatch) {
            onSelectBatch(batch);
        }
    };
    var totalStock = batches.reduce(function (sum, b) {
        var available = calculateAvailable ? calculateAvailable(b) : b.availableQuantity;
        return sum + available;
    }, 0);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-6", children: [(0, jsx_runtime_1.jsx)("button", { onClick: onBack, className: "text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2", children: "\u2190 Volver" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-gray-900", children: product.name }), (0, jsx_runtime_1.jsx)("div", { className: "text-right text-sm text-gray-600", children: (0, jsx_runtime_1.jsxs)("p", { children: ["C\u00F3digo: ", (0, jsx_runtime_1.jsx)("span", { className: "font-mono font-semibold", children: product.code })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Categor\u00EDa" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-semibold text-gray-900", children: product.category })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Unidad de Medida" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-semibold text-gray-900", children: product.unit })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Stock Total Disponible" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-2xl font-bold text-green-600", children: [totalStock, " ", product.unit] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-8", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Descripci\u00F3n" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 bg-gray-50 p-4 rounded", children: product.description })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border-t pt-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-xl font-bold text-gray-900", children: ["Lotes (", batches.length, ")"] }), !showBatchForm && ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setShowBatchForm(true); }, className: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium", children: "+ Nuevo Lote" }))] }), showBatchForm && ((0, jsx_runtime_1.jsx)("div", { className: "mb-6", children: (0, jsx_runtime_1.jsx)(index_1.BatchForm, { productName: product.name, onSubmit: editingBatch ? handleSaveEditBatch : handleAddBatch, onCancel: handleCancelBatch, initialData: editingBatch ? {
                                batchNumber: editingBatch.batchNumber,
                                initialQuantity: editingBatch.initialQuantity,
                                expiryDate: editingBatch.expiryDate
                                    ? editingBatch.expiryDate.toISOString().split('T')[0]
                                    : null
                            } : undefined, isEditing: !!editingBatch }) })), (0, jsx_runtime_1.jsx)(index_1.BatchList, { batches: batches, onEdit: handleEditBatch, onDelete: onDeleteBatch, onView: handleViewBatchDetails, calculateAvailable: calculateAvailable, productUnit: product.unit })] })] }));
};
exports.ProductDetail = ProductDetail;
