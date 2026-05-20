"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMovementList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Componente lista de movimientos de stock
 * REQ-F03: Consulta de movimientos de stock
 */
var StockMovementList = function (_a) {
    var movements = _a.movements, onDelete = _a.onDelete, productUnit = _a.productUnit;
    if (movements.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300", children: (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "No hay movimientos registrados para este lote." }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "bg-gray-100 border-b", children: [(0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Tipo" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Cantidad" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Raz\u00F3n" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Fecha" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Acciones" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: movements.map(function (movement) { return ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b hover:bg-gray-50 transition-colors", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3", children: (0, jsx_runtime_1.jsx)("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-medium ".concat(movement.type === 'ingreso'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'), children: movement.type === 'ingreso' ? '+ Ingreso' : '- Egreso' }) }), (0, jsx_runtime_1.jsxs)("td", { className: "px-4 py-3 text-gray-700 font-medium", children: [movement.quantity, " ", productUnit] }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3 text-gray-700", children: movement.reason || '-' }), (0, jsx_runtime_1.jsxs)("td", { className: "px-4 py-3 text-gray-700 text-xs", children: [movement.createdAt.toLocaleDateString('es-ES'), " ", ' ', movement.createdAt.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })] }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3", children: (0, jsx_runtime_1.jsx)("button", { onClick: function () {
                                            if (window.confirm("\u00BFEliminar este movimiento?")) {
                                                onDelete(movement.id);
                                            }
                                        }, className: "px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors", children: "Eliminar" }) })] }, movement.id)); }) })] }) }) }));
};
exports.StockMovementList = StockMovementList;
