"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
/**
 * Trazabilidad REQ-F05:
 * Filtro de consulta del inventario por codigo, nombre o categoria del producto.
 */
var SearchBar = function (_a) {
    var onSearch = _a.onSearch, _b = _a.placeholder, placeholder = _b === void 0 ? "Buscar por código, nombre, categoría..." : _b;
    var _c = (0, react_1.useState)(""), query = _c[0], setQuery = _c[1];
    var handleChange = function (e) {
        var value = e.target.value;
        setQuery(value);
        onSearch(value);
    };
    var handleClear = function () {
        setQuery("");
        onSearch("");
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "relative", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: query, onChange: handleChange, placeholder: placeholder, className: "w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 pl-11 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70" }), (0, jsx_runtime_1.jsx)("span", { className: "absolute left-3 text-slate-500", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "h-5 w-5" }) }), query && ((0, jsx_runtime_1.jsx)("button", { onClick: handleClear, className: "absolute right-3 rounded-full p-1 text-slate-500 transition hover:bg-slate-800 hover:text-slate-200", title: "Limpiar b\u00FAsqueda", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-5 w-5" }) }))] }) }));
};
exports.SearchBar = SearchBar;
