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
exports.ProductForm = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("./ui/button");
/**
 * Trazabilidad REQ-F01:
 * Captura y valida los datos basicos exigidos para registrar o editar productos:
 * codigo, nombre, descripcion, categoria y unidad de medida.
 */
var ProductForm = function (_a) {
    var onSubmit = _a.onSubmit, onCancel = _a.onCancel, initialData = _a.initialData, _b = _a.isEditing, isEditing = _b === void 0 ? false : _b;
    var baseInputClass = "w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70";
    var _c = (0, react_1.useState)(initialData || {
        code: "",
        name: "",
        description: "",
        category: "",
        unit: "",
    }), formData = _c[0], setFormData = _c[1];
    var _d = (0, react_1.useState)({}), errors = _d[0], setErrors = _d[1];
    // REQ-F01: Evita productos incompletos antes de enviarlos al hook de persistencia.
    var validateForm = function () {
        var newErrors = {};
        if (!formData.code.trim()) {
            newErrors.code = "El código es requerido";
        }
        if (!formData.name.trim()) {
            newErrors.name = "El nombre es requerido";
        }
        if (!formData.description.trim()) {
            newErrors.description = "La descripción es requerida";
        }
        if (!formData.category.trim()) {
            newErrors.category = "La categoría es requerida";
        }
        if (!formData.unit.trim()) {
            newErrors.unit = "La unidad de medida es requerida";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
        // Limpiar error del campo cuando el usuario comienza a escribir
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
        }
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300", children: "Producto" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-slate-50", children: isEditing ? "Editar Producto" : "Nuevo Producto" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-slate-400", children: "Complet\u00E1 la informaci\u00F3n base para identificarlo y clasificarlo en inventario." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "code", className: "mb-2 block text-sm font-medium text-slate-300", children: "C\u00F3digo del Producto" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "code", name: "code", value: formData.code, onChange: handleChange, className: "".concat(baseInputClass, " ").concat(errors.code ? "border-rose-500 focus:ring-rose-400/60" : ""), placeholder: "Ej: PROD-001" }), errors.code && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-rose-400", children: errors.code }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", className: "mb-2 block text-sm font-medium text-slate-300", children: "Nombre del Producto" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, className: "".concat(baseInputClass, " ").concat(errors.name ? "border-rose-500 focus:ring-rose-400/60" : ""), placeholder: "Ej: Martillo de Acero" }), errors.name && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-rose-400", children: errors.name }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "category", className: "mb-2 block text-sm font-medium text-slate-300", children: "Categor\u00EDa" }), (0, jsx_runtime_1.jsxs)("select", { id: "category", name: "category", value: formData.category, onChange: handleChange, className: "".concat(baseInputClass, " ").concat(errors.category ? "border-rose-500 focus:ring-rose-400/60" : ""), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Seleccionar categor\u00EDa" }), (0, jsx_runtime_1.jsx)("option", { value: "Herramientas", children: "Herramientas" }), (0, jsx_runtime_1.jsx)("option", { value: "Materiales", children: "Materiales" }), (0, jsx_runtime_1.jsx)("option", { value: "Equipos", children: "Equipos" }), (0, jsx_runtime_1.jsx)("option", { value: "Consumibles", children: "Consumibles" }), (0, jsx_runtime_1.jsx)("option", { value: "Otro", children: "Otro" })] }), errors.category && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-rose-400", children: errors.category }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "unit", className: "mb-2 block text-sm font-medium text-slate-300", children: "Unidad de Medida" }), (0, jsx_runtime_1.jsxs)("select", { id: "unit", name: "unit", value: formData.unit, onChange: handleChange, className: "".concat(baseInputClass, " ").concat(errors.unit ? "border-rose-500 focus:ring-rose-400/60" : ""), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Seleccionar unidad" }), (0, jsx_runtime_1.jsx)("option", { value: "piezas", children: "Piezas" }), (0, jsx_runtime_1.jsx)("option", { value: "kg", children: "Kilogramos (kg)" }), (0, jsx_runtime_1.jsx)("option", { value: "metros", children: "Metros (m)" }), (0, jsx_runtime_1.jsx)("option", { value: "litros", children: "Litros (L)" }), (0, jsx_runtime_1.jsx)("option", { value: "cajas", children: "Cajas" }), (0, jsx_runtime_1.jsx)("option", { value: "paquetes", children: "Paquetes" })] }), errors.unit && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-rose-400", children: errors.unit }))] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "description", className: "mb-2 block text-sm font-medium text-slate-300", children: "Descripci\u00F3n" }), (0, jsx_runtime_1.jsx)("textarea", { id: "description", name: "description", value: formData.description, onChange: handleChange, rows: 4, className: "".concat(baseInputClass, " min-h-[132px] ").concat(errors.description ? "border-rose-500 focus:ring-rose-400/60" : ""), placeholder: "Descripci\u00F3n del producto..." }), errors.description && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-rose-400", children: errors.description }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 sm:flex-row", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", children: isEditing ? "Guardar Cambios" : "Crear Producto" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: onCancel, variant: "secondary", children: "Cancelar" })] })] }));
};
exports.ProductForm = ProductForm;
