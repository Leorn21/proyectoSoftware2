import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Componente lista de movimientos de stock
 * REQ-F03: Consulta de movimientos de stock
 */
export var StockMovementList = function (_a) {
    var movements = _a.movements, onDelete = _a.onDelete, productUnit = _a.productUnit;
    if (movements.length === 0) {
        return (_jsx("div", { className: "bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300", children: _jsx("p", { className: "text-gray-500", children: "No hay movimientos registrados para este lote." }) }));
    }
    return (_jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-100 border-b", children: [_jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Tipo" }), _jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Cantidad" }), _jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Raz\u00F3n" }), _jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Fecha" }), _jsx("th", { className: "px-4 py-3 text-left font-semibold text-gray-700", children: "Acciones" })] }) }), _jsx("tbody", { children: movements.map(function (movement) { return (_jsxs("tr", { className: "border-b hover:bg-gray-50 transition-colors", children: [_jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-medium ".concat(movement.type === 'ingreso'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'), children: movement.type === 'ingreso' ? '+ Ingreso' : '- Egreso' }) }), _jsxs("td", { className: "px-4 py-3 text-gray-700 font-medium", children: [movement.quantity, " ", productUnit] }), _jsx("td", { className: "px-4 py-3 text-gray-700", children: movement.reason || '-' }), _jsxs("td", { className: "px-4 py-3 text-gray-700 text-xs", children: [movement.createdAt.toLocaleDateString('es-ES'), " ", ' ', movement.createdAt.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })] }), _jsx("td", { className: "px-4 py-3", children: _jsx("button", { onClick: function () {
                                            if (window.confirm("\u00BFEliminar este movimiento?")) {
                                                onDelete(movement.id);
                                            }
                                        }, className: "px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors", children: "Eliminar" }) })] }, movement.id)); }) })] }) }) }));
};
