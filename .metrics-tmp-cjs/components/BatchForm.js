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
/**
 * Componente formulario para lotes
 * REQ-F02: Registro y edición de lotes
 */
var BatchForm = function (_a) {
    var productName = _a.productName, onSubmit = _a.onSubmit, onCancel = _a.onCancel, initialData = _a.initialData, _b = _a.isEditing, isEditing = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)(initialData || {
        batchNumber: '',
        initialQuantity: 0,
        expiryDate: null
    }), formData = _c[0], setFormData = _c[1];
    var _d = (0, react_1.useState)({}), errors = _d[0], setErrors = _d[1];
    var validateForm = function () {
        var newErrors = {};
        if (!formData.batchNumber.trim()) {
            newErrors.batchNumber = 'El número de lote es requerido';
        }
        if (formData.initialQuantity <= 0) {
            newErrors.initialQuantity = 'La cantidad debe ser mayor a 0';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value, type = _a.type;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = type === 'number' ? (value ? parseInt(value) : 0) : value || null, _a)));
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
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow-md", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-xl font-bold mb-4 text-gray-800", children: [isEditing ? 'Editar Lote' : 'Nuevo Lote', " - ", productName] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "batchNumber", className: "block text-sm font-medium text-gray-700 mb-1", children: "N\u00FAmero de Lote" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "batchNumber", name: "batchNumber", value: formData.batchNumber, onChange: handleChange, className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(errors.batchNumber ? 'border-red-500' : 'border-gray-300'), placeholder: "Ej: LOTE-2024-001" }), errors.batchNumber && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm mt-1", children: errors.batchNumber })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "initialQuantity", className: "block text-sm font-medium text-gray-700 mb-1", children: "Cantidad Inicial" }), (0, jsx_runtime_1.jsx)("input", { type: "number", id: "initialQuantity", name: "initialQuantity", value: formData.initialQuantity || '', onChange: handleChange, min: "1", className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(errors.initialQuantity ? 'border-red-500' : 'border-gray-300'), placeholder: "Cantidad" }), errors.initialQuantity && (0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm mt-1", children: errors.initialQuantity })] }), (0, jsx_runtime_1.jsxs)("div", { className: "md:col-span-2", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "expiryDate", className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Vencimiento (opcional)" }), (0, jsx_runtime_1.jsx)("input", { type: "date", id: "expiryDate", name: "expiryDate", value: formData.expiryDate || '', onChange: handleChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsx)("button", { type: "submit", className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium", children: isEditing ? 'Guardar Cambios' : 'Registrar Lote' }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onCancel, className: "px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium", children: "Cancelar" })] })] }));
};
exports.BatchForm = BatchForm;
