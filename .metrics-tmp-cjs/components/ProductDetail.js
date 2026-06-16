"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetail = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var index_1 = require("./index");
var button_1 = require("./ui/button");
var card_1 = require("./ui/card");
var dialog_1 = require("./ui/dialog");
/**
 * Trazabilidad REQ-F02:
 * Muestra y administra los lotes asociados al producto seleccionado.
 *
 * Trazabilidad REQ-F05:
 * Consolida el stock total disponible del producto a partir del detalle de sus
 * lotes, cumpliendo la consulta de inventario definida en la propuesta.
 */
var ProductDetail = function (_a) {
    var _b;
    var product = _a.product, batches = _a.batches, onAddBatch = _a.onAddBatch, onEditBatch = _a.onEditBatch, onDeleteBatch = _a.onDeleteBatch, onSelectBatch = _a.onSelectBatch, calculateAvailable = _a.calculateAvailable, onBack = _a.onBack;
    var formatDateForInput = function (date) { return date.toISOString().split("T")[0]; };
    var _c = (0, react_1.useState)(false), showBatchForm = _c[0], setShowBatchForm = _c[1];
    var _d = (0, react_1.useState)(null), editingBatch = _d[0], setEditingBatch = _d[1];
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
    // REQ-F05: Suma el disponible de cada lote para informar stock total por producto.
    var totalStock = batches.reduce(function (sum, b) {
        var available = calculateAvailable
            ? calculateAvailable(b)
            : b.availableQuantity;
        return sum + available;
    }, 0);
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "overflow-hidden", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "border-b border-slate-800 bg-slate-900/80", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: onBack, variant: "ghost", className: "w-fit px-0 text-sky-300 hover:bg-transparent hover:text-sky-200", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { className: "h-4 w-4" }), "Volver"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300", children: "Detalle del producto" }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-3xl", children: product.name })] }), (0, jsx_runtime_1.jsx)("div", { className: "rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-right text-sm text-slate-400", children: (0, jsx_runtime_1.jsxs)("p", { children: ["C\u00F3digo:", " ", (0, jsx_runtime_1.jsx)("span", { className: "font-mono font-semibold text-slate-100", children: product.code })] }) })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-8 p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "rounded-3xl border border-slate-800 bg-slate-900/70 p-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-400", children: "Categor\u00EDa" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-3 text-lg font-semibold text-slate-100", children: product.category })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-3xl border border-slate-800 bg-slate-900/70 p-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-400", children: "Unidad de Medida" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-3 text-lg font-semibold text-slate-100", children: product.unit })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-3xl border border-sky-500/20 bg-sky-500/10 p-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-sky-200/80", children: "Stock Total Disponible" }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-3 text-2xl font-bold text-sky-300", children: [totalStock, " ", product.unit] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-3xl border border-slate-800 bg-slate-900/60 p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Descripci\u00F3n" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-300", children: product.description })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border-t border-slate-800 pt-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 text-sky-300", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Boxes, { className: "h-5 w-5" }) }), (0, jsx_runtime_1.jsxs)("h3", { className: "text-xl font-bold text-slate-50", children: ["Lotes (", batches.length, ")"] })] }), !showBatchForm && ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return setShowBatchForm(true); }, className: "w-full sm:w-auto", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PackagePlus, { className: "h-4 w-4" }), "+ Nuevo Lote"] }))] }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: showBatchForm, onOpenChange: function (open) { return !open && handleCancelBatch(); }, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { className: "sr-only", children: editingBatch ? "Editar Lote" : "Nuevo Lote" }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { className: "sr-only", children: "Formulario para registrar o editar lotes del producto seleccionado." }), (0, jsx_runtime_1.jsx)(index_1.BatchForm, { productName: product.name, onSubmit: editingBatch ? handleSaveEditBatch : handleAddBatch, onCancel: handleCancelBatch, minExpiryDate: formatDateForInput((_b = editingBatch === null || editingBatch === void 0 ? void 0 : editingBatch.entryDate) !== null && _b !== void 0 ? _b : new Date()), initialData: editingBatch
                                                ? {
                                                    batchNumber: editingBatch.batchNumber,
                                                    initialQuantity: editingBatch.initialQuantity,
                                                    expiryDate: editingBatch.expiryDate
                                                        ? formatDateForInput(editingBatch.expiryDate)
                                                        : null,
                                                }
                                                : undefined, isEditing: !!editingBatch })] }) }), (0, jsx_runtime_1.jsx)(index_1.BatchList, { batches: batches, onEdit: handleEditBatch, onDelete: onDeleteBatch, onView: handleViewBatchDetails, calculateAvailable: calculateAvailable, productUnit: product.unit })] })] })] }));
};
exports.ProductDetail = ProductDetail;
