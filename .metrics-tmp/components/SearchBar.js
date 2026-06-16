import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
/**
 * Componente barra de búsqueda
 * Cumple con REQ-F01: Consulta de productos
 */
export var SearchBar = function (_a) {
    var onSearch = _a.onSearch, _b = _a.placeholder, placeholder = _b === void 0 ? 'Buscar por código, nombre, categoría...' : _b;
    var _c = useState(''), query = _c[0], setQuery = _c[1];
    var handleChange = function (e) {
        var value = e.target.value;
        setQuery(value);
        onSearch(value);
    };
    var handleClear = function () {
        setQuery('');
        onSearch('');
    };
    return (_jsx("div", { className: "relative", children: _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "text", value: query, onChange: handleChange, placeholder: placeholder, className: "w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("span", { className: "absolute left-3 text-gray-400", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }), query && (_jsx("button", { onClick: handleClear, className: "absolute right-3 text-gray-400 hover:text-gray-600", title: "Limpiar b\u00FAsqueda", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }))] }) }));
};
