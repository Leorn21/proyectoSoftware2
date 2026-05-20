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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
/**
 * Componente formulario para productos
 * Cumple con REQ-F01: Registro y edición de productos
 */
export var ProductForm = function (_a) {
    var onSubmit = _a.onSubmit, onCancel = _a.onCancel, initialData = _a.initialData, _b = _a.isEditing, isEditing = _b === void 0 ? false : _b;
    var _c = useState(initialData || {
        code: '',
        name: '',
        description: '',
        category: '',
        unit: ''
    }), formData = _c[0], setFormData = _c[1];
    var _d = useState({}), errors = _d[0], setErrors = _d[1];
    var validateForm = function () {
        var newErrors = {};
        if (!formData.code.trim()) {
            newErrors.code = 'El código es requerido';
        }
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'La descripción es requerida';
        }
        if (!formData.category.trim()) {
            newErrors.category = 'La categoría es requerida';
        }
        if (!formData.unit.trim()) {
            newErrors.unit = 'La unidad de medida es requerida';
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
    return (_jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow-md", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-gray-800", children: isEditing ? 'Editar Producto' : 'Nuevo Producto' }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "code", className: "block text-sm font-medium text-gray-700 mb-1", children: "C\u00F3digo del Producto" }), _jsx("input", { type: "text", id: "code", name: "code", value: formData.code, onChange: handleChange, className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(errors.code ? 'border-red-500' : 'border-gray-300'), placeholder: "Ej: PROD-001" }), errors.code && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.code })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre del Producto" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(errors.name ? 'border-red-500' : 'border-gray-300'), placeholder: "Ej: Martillo de Acero" }), errors.name && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.name })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "category", className: "block text-sm font-medium text-gray-700 mb-1", children: "Categor\u00EDa" }), _jsxs("select", { id: "category", name: "category", value: formData.category, onChange: handleChange, className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(errors.category ? 'border-red-500' : 'border-gray-300'), children: [_jsx("option", { value: "", children: "Seleccionar categor\u00EDa" }), _jsx("option", { value: "Herramientas", children: "Herramientas" }), _jsx("option", { value: "Materiales", children: "Materiales" }), _jsx("option", { value: "Equipos", children: "Equipos" }), _jsx("option", { value: "Consumibles", children: "Consumibles" }), _jsx("option", { value: "Otro", children: "Otro" })] }), errors.category && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.category })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "unit", className: "block text-sm font-medium text-gray-700 mb-1", children: "Unidad de Medida" }), _jsxs("select", { id: "unit", name: "unit", value: formData.unit, onChange: handleChange, className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(errors.unit ? 'border-red-500' : 'border-gray-300'), children: [_jsx("option", { value: "", children: "Seleccionar unidad" }), _jsx("option", { value: "piezas", children: "Piezas" }), _jsx("option", { value: "kg", children: "Kilogramos (kg)" }), _jsx("option", { value: "metros", children: "Metros (m)" }), _jsx("option", { value: "litros", children: "Litros (L)" }), _jsx("option", { value: "cajas", children: "Cajas" }), _jsx("option", { value: "paquetes", children: "Paquetes" })] }), errors.unit && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.unit })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-700 mb-1", children: "Descripci\u00F3n" }), _jsx("textarea", { id: "description", name: "description", value: formData.description, onChange: handleChange, rows: 4, className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(errors.description ? 'border-red-500' : 'border-gray-300'), placeholder: "Descripci\u00F3n del producto..." }), errors.description && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.description })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { type: "submit", className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium", children: isEditing ? 'Guardar Cambios' : 'Crear Producto' }), _jsx("button", { type: "button", onClick: onCancel, className: "px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium", children: "Cancelar" })] })] }));
};
