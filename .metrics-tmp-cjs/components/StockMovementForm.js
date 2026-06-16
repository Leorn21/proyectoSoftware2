"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMovementForm = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("./ui/button");
/**
 * Trazabilidad REQ-F03:
 * Captura movimientos de stock por lote, diferenciando ingresos y egresos.
 *
 * Trazabilidad REQ-F04:
 * Es el punto de control que impide registrar egresos superiores al stock
 * disponible informado por la vista de detalle de lote.
 */
var StockMovementForm = function (_a) {
    var batchNumber = _a.batchNumber, availableQuantity = _a.availableQuantity, onSubmit = _a.onSubmit, onCancel = _a.onCancel;
    var baseInputClass = "w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70";
    var _b = (0, react_1.useState)({
        type: "egreso",
        quantity: 0,
        reason: "",
    }), formData = _b[0], setFormData = _b[1];
    var _c = (0, react_1.useState)({}), errors = _c[0], setErrors = _c[1];
    // REQ-F03 / REQ-F04: Valida tipo, cantidad positiva y limite de egreso disponible.
    var validateForm = function () {
        var newErrors = {};
        if (!formData.type) {
            newErrors.type = "Debe seleccionar tipo de movimiento";
        }
        if (formData.quantity <= 0) {
            newErrors.quantity = "La cantidad debe ser mayor a 0";
        }
        // REQ-F04: Validar que no se puedan registrar egresos mayores a la cantidad disponible
        if (formData.type === "egreso" && formData.quantity > availableQuantity) {
            newErrors.quantity = "No hay suficiente stock. Disponible: ".concat(availableQuantity);
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value, type = _a.type;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = type === "number" ? (value ? parseInt(value) : 0) : value, _a)));
        });
        if (errors[name]) {
            setErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = undefined, _a)));
            });
        }
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
            setFormData({ type: "egreso", quantity: 0, reason: "" });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300", children: "Movimiento" }), (0, jsx_runtime_1.jsxs)("h3", { className: "text-xl font-bold text-slate-50", children: ["Registrar Movimiento - Lote ", batchNumber] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-slate-400", children: "Registr\u00E1 ingresos o egresos con contexto para mantener el historial ordenado." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "type", className: "mb-2 block text-sm font-medium text-slate-300", children: "Tipo de Movimiento" }), (0, jsx_runtime_1.jsxs)("select", { id: "type", name: "type", value: formData.type, onChange: handleChange, className: "".concat(baseInputClass, " ").concat(errors.type ? "border-rose-500 focus:ring-rose-400/60" : ""), children: [(0, jsx_runtime_1.jsx)("option", { value: "egreso", children: "Egreso (Salida)" }), (0, jsx_runtime_1.jsx)("option", { value: "ingreso", children: "Ingreso (Entrada)" })] }), errors.type && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-rose-400", children: errors.type }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "quantity", className: "mb-2 block text-sm font-medium text-slate-300", children: "Cantidad" }), (0, jsx_runtime_1.jsx)("input", { type: "number", id: "quantity", name: "quantity", value: formData.quantity || "", onChange: handleChange, min: "1", className: "".concat(baseInputClass, " ").concat(errors.quantity ? "border-rose-500 focus:ring-rose-400/60" : ""), placeholder: "Cantidad" }), errors.quantity && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-rose-400", children: errors.quantity }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "md:col-span-2", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "reason", className: "mb-2 block text-sm font-medium text-slate-300", children: "Raz\u00F3n (opcional)" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "reason", name: "reason", value: formData.reason || "", onChange: handleChange, className: baseInputClass, placeholder: "Ej: Devoluci\u00F3n, Uso, Merma, etc." })] })] }), formData.type === "egreso" && ((0, jsx_runtime_1.jsx)("div", { className: "rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-sky-200", children: ["Stock disponible:", " ", (0, jsx_runtime_1.jsx)("span", { className: "font-bold", children: availableQuantity })] }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 sm:flex-row", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", children: "Registrar Movimiento" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: onCancel, variant: "secondary", children: "Cancelar" })] })] }));
};
exports.StockMovementForm = StockMovementForm;
