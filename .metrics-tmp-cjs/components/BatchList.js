"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ConfirmDialog_1 = require("./ConfirmDialog");
var button_1 = require("./ui/button");
var card_1 = require("./ui/card");
/**
 * Trazabilidad REQ-F02:
 * Lista los lotes asociados a un producto con cantidades, ingreso y vencimiento.
 *
 * Trazabilidad REQ-F05:
 * Permite consultar el detalle de lotes que compone el stock total del producto.
 */
var BatchList = function (_a) {
    var batches = _a.batches, onEdit = _a.onEdit, onDelete = _a.onDelete, onView = _a.onView, calculateAvailable = _a.calculateAvailable, productUnit = _a.productUnit;
    if (batches.length === 0) {
        return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "border-dashed border-slate-700/80 bg-slate-950/50", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-8 text-center", children: (0, jsx_runtime_1.jsx)("p", { className: "text-slate-400", children: "No hay lotes registrados para este producto." }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-slate-800 bg-slate-900/80", children: [(0, jsx_runtime_1.jsx)("th", { className: "px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "N\u00FAmero de Lote" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Cantidad Inicial" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Disponible" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Ingreso" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Vencimiento" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Acciones" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: batches.map(function (batch) {
                            // REQ-F03 / REQ-F05: Usa el saldo recalculado por movimientos cuando esta disponible.
                            var available = calculateAvailable
                                ? calculateAvailable(batch)
                                : batch.availableQuantity;
                            return ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-slate-900 transition-colors hover:bg-slate-900/60", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-4 py-4 font-medium text-slate-100", children: batch.batchNumber }), (0, jsx_runtime_1.jsxs)("td", { className: "px-4 py-4 text-slate-300", children: [batch.initialQuantity, " ", productUnit] }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-4", children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex rounded-full px-3 py-1 text-xs font-medium ".concat(available > 0
                                                ? "bg-emerald-500/15 text-emerald-300"
                                                : "bg-rose-500/15 text-rose-300"), children: [available, " ", productUnit] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-4 text-xs text-slate-400", children: batch.entryDate.toLocaleDateString("es-ES") }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-4 text-xs text-slate-300", children: batch.expiryDate ? ((0, jsx_runtime_1.jsx)("span", { className: new Date(batch.expiryDate) < new Date()
                                                ? "font-semibold text-rose-400"
                                                : "text-slate-300", children: batch.expiryDate.toLocaleDateString("es-ES") })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-slate-500", children: "-" })) }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [onView && ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return onView(batch); }, variant: "secondary", size: "sm", children: "Movimientos" })), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return onEdit(batch); }, variant: "outline", size: "sm", children: "Editar" }), (0, jsx_runtime_1.jsx)(ConfirmDialog_1.ConfirmDialog, { title: "Eliminar lote \"".concat(batch.batchNumber, "\""), description: "El lote y su informaci\u00F3n dejar\u00E1n de estar disponibles en este producto.", onConfirm: function () { return onDelete(batch.id); }, trigger: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "destructive", size: "sm", children: "Eliminar" }) })] }) })] }, batch.id));
                        }) })] }) }) }));
};
exports.BatchList = BatchList;
