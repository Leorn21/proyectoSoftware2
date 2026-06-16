"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ConfirmDialog_1 = require("./ConfirmDialog");
var button_1 = require("./ui/button");
var card_1 = require("./ui/card");
/**
 * Trazabilidad REQ-F01:
 * Presenta productos consultables y expone acciones de editar/eliminar.
 *
 * Trazabilidad REQ-F05:
 * Es la entrada visual al inventario; desde cada producto se accede al detalle
 * de lotes que explica el stock disponible.
 */
var ProductList = function (_a) {
    var products = _a.products, onEdit = _a.onEdit, onDelete = _a.onDelete, onSelectProduct = _a.onSelectProduct, searchQuery = _a.searchQuery;
    if (products.length === 0) {
        return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "border-dashed border-slate-700/80 bg-slate-950/50", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-10 text-center", children: (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-slate-400", children: searchQuery
                        ? "No se encontraron productos."
                        : "No hay productos registrados. ¡Crea uno nuevo!" }) }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-slate-800 bg-slate-900/80", children: [(0, jsx_runtime_1.jsx)("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "C\u00F3digo" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Nombre" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Descripci\u00F3n" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Categor\u00EDa" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Unidad" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Acciones" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: products.map(function (product) { return ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-slate-900 transition-colors hover:bg-slate-900/60", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 text-sm font-medium text-slate-100", children: product.code }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 text-sm text-slate-200", children: product.name }), (0, jsx_runtime_1.jsx)("td", { className: "max-w-xs truncate px-6 py-4 text-sm text-slate-400", children: product.description }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 text-sm", children: (0, jsx_runtime_1.jsx)("span", { className: "inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-200", children: product.category }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 text-sm text-slate-300", children: product.unit }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 text-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [onSelectProduct && ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return onSelectProduct(product); }, variant: "secondary", size: "sm", title: "Ver lotes del producto", children: "Lotes" })), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return onEdit(product); }, variant: "outline", size: "sm", children: "Editar" }), (0, jsx_runtime_1.jsx)(ConfirmDialog_1.ConfirmDialog, { title: "Eliminar producto \"".concat(product.name, "\""), description: "Esta acci\u00F3n quitar\u00E1 el producto del inventario y no se puede deshacer.", onConfirm: function () { return onDelete(product.id); }, trigger: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "destructive", size: "sm", children: "Eliminar" }) })] }) })] }, product.id)); }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "border-t border-slate-800 bg-slate-900/70 px-6 py-4 text-sm text-slate-400", children: ["Total:", " ", (0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-slate-100", children: products.length }), " ", "producto(s)"] })] }));
};
exports.ProductList = ProductList;
