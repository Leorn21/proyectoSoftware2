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
exports.BatchForm = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("./ui/button");
/**
 * Trazabilidad REQ-F02:
 * Captura los datos necesarios para registrar o editar lotes asociados a un
 * producto: numero de lote, cantidad inicial y fecha de vencimiento opcional.
 */
var BatchForm = function (_a) {
    var productName = _a.productName, onSubmit = _a.onSubmit, onCancel = _a.onCancel, initialData = _a.initialData, _b = _a.isEditing, isEditing = _b === void 0 ? false : _b, minExpiryDate = _a.minExpiryDate;
    var baseInputClass = "w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70";
    var _c = (0, react_1.useState)(initialData || {
        batchNumber: "",
        initialQuantity: 0,
        expiryDate: null,
    }), formData = _c[0], setFormData = _c[1];
    var _d = (0, react_1.useState)({}), errors = _d[0], setErrors = _d[1];
    // REQ-F02: Garantiza que cada lote tenga identificacion y cantidad inicial valida.
    var validateForm = function () {
        var newErrors = {};
        if (!formData.batchNumber.trim()) {
            newErrors.batchNumber = "El número de lote es requerido";
        }
        if (formData.initialQuantity <= 0) {
            newErrors.initialQuantity = "La cantidad debe ser mayor a 0";
        }
        if (formData.expiryDate &&
            minExpiryDate &&
            formData.expiryDate < minExpiryDate) {
            newErrors.expiryDate =
                "La fecha de vencimiento no puede ser anterior a la fecha de ingreso";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value, type = _a.type;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = type === "number" ? (value ? parseInt(value) : 0) : value || null, _a)));
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
        }
    };
    return ((0, jsx_runtime_1.jsxs)("form", { noValidate: true, onSubmit: handleSubmit, className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300", children: "Lote" }), (0, jsx_runtime_1.jsxs)("h3", { className: "text-xl font-bold text-slate-50", children: [isEditing ? "Editar Lote" : "Nuevo Lote", " - ", productName] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-slate-400", children: "Defin\u00ED identificaci\u00F3n, cantidad inicial y vencimiento para mantener trazabilidad clara." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "batchNumber", className: "mb-2 block text-sm font-medium text-slate-300", children: "N\u00FAmero de Lote" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "batchNumber", name: "batchNumber", value: formData.batchNumber, onChange: handleChange, className: "".concat(baseInputClass, " ").concat(errors.batchNumber ? "border-rose-500 focus:ring-rose-400/60" : ""), placeholder: "Ej: LOTE-2024-001" }), errors.batchNumber && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-rose-400", children: errors.batchNumber }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "initialQuantity", className: "mb-2 block text-sm font-medium text-slate-300", children: "Cantidad Inicial" }), (0, jsx_runtime_1.jsx)("input", { type: "number", id: "initialQuantity", name: "initialQuantity", value: formData.initialQuantity || "", onChange: handleChange, min: "1", className: "".concat(baseInputClass, " ").concat(errors.initialQuantity
                                    ? "border-rose-500 focus:ring-rose-400/60"
                                    : ""), placeholder: "Cantidad" }), errors.initialQuantity && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-rose-400", children: errors.initialQuantity }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "md:col-span-2", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "expiryDate", className: "mb-2 block text-sm font-medium text-slate-300", children: "Fecha de Vencimiento (opcional)" }), (0, jsx_runtime_1.jsx)("input", { type: "date", id: "expiryDate", name: "expiryDate", value: formData.expiryDate || "", onChange: handleChange, min: minExpiryDate, className: baseInputClass }), errors.expiryDate && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-rose-400", children: errors.expiryDate }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 sm:flex-row", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", children: isEditing ? "Guardar Cambios" : "Registrar Lote" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: onCancel, variant: "secondary", children: "Cancelar" })] })] }));
};
exports.BatchForm = BatchForm;
