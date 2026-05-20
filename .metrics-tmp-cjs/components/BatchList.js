"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Componente lista de lotes
 * REQ-F02: Consulta de lotes de un producto
 * REQ-F03: Permite navegar a detalle del lote con movimientos
 */
var BatchList = function (_a) {
    var batches = _a.batches, onEdit = _a.onEdit, onDelete = _a.onDelete, onView = _a.onView, calculateAvailable = _a.calculateAvailable, productUnit = _a.productUnit;
    if (batches.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300", children: (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "No hay lotes registrados para este producto." }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "bg-gray-100 border-b", children: [(0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "N\u00FAmero de Lote" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Cantidad Inicial" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Disponible" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Ingreso" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Vencimiento" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Acciones" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: batches.map(function (batch) {
                            var available = calculateAvailable ? calculateAvailable(batch) : batch.availableQuantity;
                            return ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b hover:bg-gray-50 transition-colors", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3 font-medium text-gray-900", children: batch.batchNumber }), (0, jsx_runtime_1.jsxs)("td", { className: "px-4 py-3 text-gray-700", children: [batch.initialQuantity, " ", productUnit] }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3", children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-medium ".concat(available > 0
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'), children: [available, " ", productUnit] }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3 text-gray-700 text-xs", children: batch.entryDate.toLocaleDateString('es-ES') }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3 text-gray-700 text-xs", children: batch.expiryDate ? ((0, jsx_runtime_1.jsx)("span", { className: new Date(batch.expiryDate) < new Date()
                                                ? 'text-red-600 font-semibold'
                                                : '', children: batch.expiryDate.toLocaleDateString('es-ES') })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-gray-400", children: "-" })) }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [onView && ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return onView(batch); }, className: "px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 transition-colors", children: "Movimientos" })), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return onEdit(batch); }, className: "px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors", children: "Editar" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () {
                                                        if (window.confirm("\u00BFEliminar lote \"".concat(batch.batchNumber, "\"?"))) {
                                                            onDelete(batch.id);
                                                        }
                                                    }, className: "px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors", children: "Eliminar" })] }) })] }, batch.id));
                        }) })] }) }) }));
};
exports.BatchList = BatchList;
