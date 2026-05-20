"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchDetail = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var index_1 = require("./index");
/**
 * Componente de detalle de lote con movimientos de stock
 * REQ-F03: Muestra movimientos de stock y permite registrar nuevos
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
    // Calcular cantidad disponible basada en movimientos
    var totalMovement = movements.reduce(function (sum, m) {
        return m.type === 'ingreso' ? sum + m.quantity : sum - m.quantity;
    }, 0);
    var availableQuantity = batch.initialQuantity + totalMovement;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-6", children: [(0, jsx_runtime_1.jsx)("button", { onClick: onBack, className: "text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2", children: "\u2190 Volver" }), (0, jsx_runtime_1.jsxs)("h2", { className: "text-2xl font-bold text-gray-900", children: ["Lote ", batch.batchNumber] }), (0, jsx_runtime_1.jsx)("div", { className: "text-right text-sm text-gray-600", children: (0, jsx_runtime_1.jsxs)("p", { children: ["Producto: ", (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: product.name })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Cantidad Inicial" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-lg font-semibold text-gray-900", children: [batch.initialQuantity, " ", product.unit] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Movimiento Neto" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-lg font-semibold ".concat(totalMovement > 0 ? 'text-green-600' : totalMovement < 0 ? 'text-red-600' : 'text-gray-600'), children: [totalMovement > 0 ? '+' : '', totalMovement, " ", product.unit] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Cantidad Disponible" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-2xl font-bold text-green-600", children: [availableQuantity, " ", product.unit] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Vencimiento" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-semibold ".concat(batch.expiryDate && new Date(batch.expiryDate) < new Date()
                                    ? 'text-red-600'
                                    : 'text-gray-900'), children: batch.expiryDate
                                    ? batch.expiryDate.toLocaleDateString('es-ES')
                                    : '-' })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border-t pt-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-xl font-bold text-gray-900", children: ["Movimientos de Stock (", movements.length, ")"] }), !showMovementForm && ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setShowMovementForm(true); }, className: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium", children: "+ Nuevo Movimiento" }))] }), showMovementForm && ((0, jsx_runtime_1.jsx)("div", { className: "mb-6", children: (0, jsx_runtime_1.jsx)(index_1.StockMovementForm, { batchNumber: batch.batchNumber, availableQuantity: availableQuantity, onSubmit: handleAddMovement, onCancel: handleCancelMovement }) })), (0, jsx_runtime_1.jsx)(index_1.StockMovementList, { movements: movements, onDelete: onDeleteMovement, productUnit: product.unit })] })] }));
};
exports.BatchDetail = BatchDetail;
