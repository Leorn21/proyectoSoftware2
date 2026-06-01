"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchDetail = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var index_1 = require("./index");
var button_1 = require("./ui/button");
var card_1 = require("./ui/card");
var dialog_1 = require("./ui/dialog");
/**
 * Trazabilidad REQ-F03:
 * Muestra el historial de movimientos de un lote y habilita el registro de
 * nuevos ingresos o egresos.
 *
 * Trazabilidad REQ-F04:
 * Entrega el stock disponible al formulario para validar que un egreso no
 * supere la cantidad disponible.
 */
var BatchDetail = function (_a) {
    var product = _a.product, batch = _a.batch, movements = _a.movements, onAddMovement = _a.onAddMovement, onDeleteMovement = _a.onDeleteMovement, onBack = _a.onBack;
    var _b = (0, react_1.useState)(false), showMovementForm = _b[0], setShowMovementForm = _b[1];
    var handleAddMovement = function (data) {
        onAddMovement(data);
        setShowMovementForm(false);
    };
    var handleCancelMovement = function () {
        setShowMovementForm(false);
    };
    // REQ-F03: Reconstruye el saldo del lote desde la cantidad inicial y sus movimientos.
    var totalMovement = movements.reduce(function (sum, m) {
        return m.type === "ingreso" ? sum + m.quantity : sum - m.quantity;
    }, 0);
    var availableQuantity = batch.initialQuantity + totalMovement;
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "overflow-hidden", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "border-b border-slate-800 bg-slate-900/80", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: onBack, variant: "ghost", className: "w-fit px-0 text-sky-300 hover:bg-transparent hover:text-sky-200", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { className: "h-4 w-4" }), "Volver"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300", children: "Detalle de lote" }), (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "text-3xl", children: ["Lote ", batch.batchNumber] })] }), (0, jsx_runtime_1.jsx)("div", { className: "rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-right text-sm text-slate-400", children: (0, jsx_runtime_1.jsxs)("p", { children: ["Producto:", " ", (0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-slate-100", children: product.name })] }) })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-8 p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "rounded-3xl border border-slate-800 bg-slate-900/70 p-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-400", children: "Cantidad Inicial" }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-3 text-lg font-semibold text-slate-100", children: [batch.initialQuantity, " ", product.unit] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-3xl border border-slate-800 bg-slate-900/70 p-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-400", children: "Movimiento Neto" }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-3 text-lg font-semibold ".concat(totalMovement > 0 ? "text-emerald-400" : totalMovement < 0 ? "text-rose-400" : "text-slate-300"), children: [totalMovement > 0 ? "+" : "", totalMovement, " ", product.unit] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-3xl border border-sky-500/20 bg-sky-500/10 p-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-sky-200/80", children: "Cantidad Disponible" }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-3 text-2xl font-bold text-sky-300", children: [availableQuantity, " ", product.unit] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-3xl border border-slate-800 bg-slate-900/70 p-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-400", children: "Vencimiento" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-3 text-lg font-semibold ".concat(batch.expiryDate && new Date(batch.expiryDate) < new Date()
                                            ? "text-rose-400"
                                            : "text-slate-100"), children: batch.expiryDate
                                            ? batch.expiryDate.toLocaleDateString("es-ES")
                                            : "-" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border-t border-slate-800 pt-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80 text-sky-300", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ClipboardList, { className: "h-5 w-5" }) }), (0, jsx_runtime_1.jsxs)("h3", { className: "text-xl font-bold text-slate-50", children: ["Movimientos de Stock (", movements.length, ")"] })] }), !showMovementForm && ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return setShowMovementForm(true); }, className: "w-full sm:w-auto", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, { className: "h-4 w-4" }), "+ Nuevo Movimiento"] }))] }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: showMovementForm, onOpenChange: function (open) { return !open && handleCancelMovement(); }, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { className: "sr-only", children: "Registrar Movimiento" }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { className: "sr-only", children: "Formulario para registrar ingresos o egresos en el lote actual." }), (0, jsx_runtime_1.jsx)(index_1.StockMovementForm, { batchNumber: batch.batchNumber, availableQuantity: availableQuantity, onSubmit: handleAddMovement, onCancel: handleCancelMovement })] }) }), (0, jsx_runtime_1.jsx)(index_1.StockMovementList, { movements: movements, onDelete: onDeleteMovement, productUnit: product.unit })] })] })] }));
};
exports.BatchDetail = BatchDetail;
