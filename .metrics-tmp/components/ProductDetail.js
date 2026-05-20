import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { BatchForm, BatchList } from './index';
/**
 * Componente de detalle de producto con gestión de lotes
 * REQ-F02: Muestra lotes asociados y permite registrar nuevos
 * REQ-F03: Permite navegar a detalle de lote con movimientos de stock
 */
export var ProductDetail = function (_a) {
    var product = _a.product, batches = _a.batches, onAddBatch = _a.onAddBatch, onEditBatch = _a.onEditBatch, onDeleteBatch = _a.onDeleteBatch, onSelectBatch = _a.onSelectBatch, calculateAvailable = _a.calculateAvailable, onBack = _a.onBack;
    var _b = useState(false), showBatchForm = _b[0], setShowBatchForm = _b[1];
    var _c = useState(null), editingBatch = _c[0], setEditingBatch = _c[1];
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
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("button", { onClick: onBack, className: "text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2", children: "\u2190 Volver" }), _jsx("h2", { className: "text-2xl font-bold text-gray-900", children: product.name }), _jsx("div", { className: "text-right text-sm text-gray-600", children: _jsxs("p", { children: ["C\u00F3digo: ", _jsx("span", { className: "font-mono font-semibold", children: product.code })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Categor\u00EDa" }), _jsx("p", { className: "text-lg font-semibold text-gray-900", children: product.category })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Unidad de Medida" }), _jsx("p", { className: "text-lg font-semibold text-gray-900", children: product.unit })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Stock Total Disponible" }), _jsxs("p", { className: "text-2xl font-bold text-green-600", children: [totalStock, " ", product.unit] })] })] }), _jsxs("div", { className: "mb-8", children: [_jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Descripci\u00F3n" }), _jsx("p", { className: "text-gray-700 bg-gray-50 p-4 rounded", children: product.description })] }), _jsxs("div", { className: "border-t pt-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-xl font-bold text-gray-900", children: ["Lotes (", batches.length, ")"] }), !showBatchForm && (_jsx("button", { onClick: function () { return setShowBatchForm(true); }, className: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium", children: "+ Nuevo Lote" }))] }), showBatchForm && (_jsx("div", { className: "mb-6", children: _jsx(BatchForm, { productName: product.name, onSubmit: editingBatch ? handleSaveEditBatch : handleAddBatch, onCancel: handleCancelBatch, initialData: editingBatch ? {
                                batchNumber: editingBatch.batchNumber,
                                initialQuantity: editingBatch.initialQuantity,
                                expiryDate: editingBatch.expiryDate
                                    ? editingBatch.expiryDate.toISOString().split('T')[0]
                                    : null
                            } : undefined, isEditing: !!editingBatch }) })), _jsx(BatchList, { batches: batches, onEdit: handleEditBatch, onDelete: onDeleteBatch, onView: handleViewBatchDetails, calculateAvailable: calculateAvailable, productUnit: product.unit })] })] }));
};
