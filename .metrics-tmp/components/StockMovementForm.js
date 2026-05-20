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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
/**
 * Componente formulario para movimientos de stock
 * REQ-F03: Registro de movimientos (ingresos y egresos)
 * REQ-F04: Validación de egresos
 */
export var StockMovementForm = function (_a) {
    var batchNumber = _a.batchNumber, availableQuantity = _a.availableQuantity, onSubmit = _a.onSubmit, onCancel = _a.onCancel;
    var _b = useState({
        type: 'egreso',
        quantity: 0,
        reason: ''
    }), formData = _b[0], setFormData = _b[1];
    var _c = useState({}), errors = _c[0], setErrors = _c[1];
    var validateForm = function () {
        var newErrors = {};
        if (!formData.type) {
            newErrors.type = 'Debe seleccionar tipo de movimiento';
        }
        if (formData.quantity <= 0) {
            newErrors.quantity = 'La cantidad debe ser mayor a 0';
        }
        // REQ-F04: Validar que no se puedan registrar egresos mayores a la cantidad disponible
        if (formData.type === 'egreso' && formData.quantity > availableQuantity) {
            newErrors.quantity = "No hay suficiente stock. Disponible: ".concat(availableQuantity);
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value, type = _a.type;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = type === 'number' ? (value ? parseInt(value) : 0) : value, _a)));
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
            setFormData({ type: 'egreso', quantity: 0, reason: '' });
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow-md", children: [_jsxs("h3", { className: "text-xl font-bold mb-4 text-gray-800", children: ["Registrar Movimiento - Lote ", batchNumber] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "type", className: "block text-sm font-medium text-gray-700 mb-1", children: "Tipo de Movimiento" }), _jsxs("select", { id: "type", name: "type", value: formData.type, onChange: handleChange, className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(errors.type ? 'border-red-500' : 'border-gray-300'), children: [_jsx("option", { value: "egreso", children: "Egreso (Salida)" }), _jsx("option", { value: "ingreso", children: "Ingreso (Entrada)" })] }), errors.type && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.type })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "quantity", className: "block text-sm font-medium text-gray-700 mb-1", children: "Cantidad" }), _jsx("input", { type: "number", id: "quantity", name: "quantity", value: formData.quantity || '', onChange: handleChange, min: "1", className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ".concat(errors.quantity ? 'border-red-500' : 'border-gray-300'), placeholder: "Cantidad" }), errors.quantity && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.quantity })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { htmlFor: "reason", className: "block text-sm font-medium text-gray-700 mb-1", children: "Raz\u00F3n (opcional)" }), _jsx("input", { type: "text", id: "reason", name: "reason", value: formData.reason || '', onChange: handleChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Ej: Devoluci\u00F3n, Uso, Merma, etc." })] })] }), formData.type === 'egreso' && (_jsx("div", { className: "mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: _jsxs("p", { className: "text-sm text-blue-800", children: ["Stock disponible: ", _jsx("span", { className: "font-bold", children: availableQuantity })] }) })), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { type: "submit", className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium", children: "Registrar Movimiento" }), _jsx("button", { type: "button", onClick: onCancel, className: "px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium", children: "Cancelar" })] })] }));
};
