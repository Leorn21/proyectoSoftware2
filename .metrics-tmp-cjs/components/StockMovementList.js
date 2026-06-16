"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMovementList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ConfirmDialog_1 = require("./ConfirmDialog");
var button_1 = require("./ui/button");
var card_1 = require("./ui/card");
/**
 * Trazabilidad REQ-F03:
 * Presenta el historial de ingresos y egresos de un lote para explicar los
 * cambios de cantidad disponible.
 */
var StockMovementList = function (_a) {
    var movements = _a.movements, onDelete = _a.onDelete, productUnit = _a.productUnit;
    if (movements.length === 0) {
        return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "border-dashed border-slate-700/80 bg-slate-950/50", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-8 text-center", children: (0, jsx_runtime_1.jsx)("p", { className: "text-slate-400", children: "No hay movimientos registrados para este lote." }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-slate-800 bg-slate-900/80", children: [(0, jsx_runtime_1.jsx)("th", { className: "px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Tipo" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Cantidad" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Raz\u00F3n" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Fecha" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Acciones" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: movements.map(function (movement) { return ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-slate-900 transition-colors hover:bg-slate-900/60", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-4 py-4", children: (0, jsx_runtime_1.jsx)("span", { className: "inline-flex rounded-full px-3 py-1 text-xs font-medium ".concat(movement.type === "ingreso"
                                            ? "bg-emerald-500/15 text-emerald-300"
                                            : "bg-rose-500/15 text-rose-300"), children: movement.type === "ingreso" ? "+ Ingreso" : "- Egreso" }) }), (0, jsx_runtime_1.jsxs)("td", { className: "px-4 py-4 font-medium text-slate-200", children: [movement.quantity, " ", productUnit] }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-4 text-slate-300", children: movement.reason || "-" }), (0, jsx_runtime_1.jsxs)("td", { className: "px-4 py-4 text-xs text-slate-400", children: [movement.createdAt.toLocaleDateString("es-ES"), " ", movement.createdAt.toLocaleTimeString("es-ES", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })] }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-4", children: (0, jsx_runtime_1.jsx)(ConfirmDialog_1.ConfirmDialog, { title: "Eliminar movimiento", description: "Se eliminar\u00E1 este registro del historial del lote.", onConfirm: function () { return onDelete(movement.id); }, trigger: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "destructive", size: "sm", children: "Eliminar" }) }) })] }, movement.id)); }) })] }) }) }));
};
exports.StockMovementList = StockMovementList;
