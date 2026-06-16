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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBatches = void 0;
var react_1 = require("react");
/**
 * Trazabilidad REQ-F02:
 * Centraliza el ciclo de vida de lotes asociados a productos, incluyendo
 * numero de lote, cantidades, fecha de ingreso y vencimiento opcional.
 *
 * Trazabilidad REQ-F05:
 * Expone consultas por producto para mostrar el detalle de lotes dentro del
 * inventario.
 */
var useBatches = function () {
    var _a = (0, react_1.useState)([]), batches = _a[0], setBatches = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    // REQ-NF01: Recupera lotes guardados localmente para ejecutar la app sin backend.
    (0, react_1.useEffect)(function () {
        var stored = localStorage.getItem("batches");
        if (stored) {
            var parsed = JSON.parse(stored);
            setBatches(parsed.map(function (b) { return (__assign(__assign({}, b), { entryDate: new Date(b.entryDate), expiryDate: b.expiryDate ? new Date(b.expiryDate) : null, createdAt: new Date(b.createdAt) })); }));
        }
        setLoading(false);
    }, []);
    // REQ-NF01: Mantiene persistencia local de lotes para pruebas de usuario.
    (0, react_1.useEffect)(function () {
        if (!loading) {
            localStorage.setItem("batches", JSON.stringify(batches));
        }
    }, [batches, loading]);
    // REQ-F02: Registra un lote vinculado a un producto con cantidad inicial y vencimiento opcional.
    var addBatch = function (productId, data) {
        var newBatch = {
            id: Date.now().toString(),
            productId: productId,
            batchNumber: data.batchNumber,
            initialQuantity: data.initialQuantity,
            availableQuantity: data.initialQuantity,
            entryDate: new Date(),
            expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
            createdAt: new Date(),
        };
        setBatches(__spreadArray(__spreadArray([], batches, true), [newBatch], false));
        return newBatch;
    };
    // REQ-F02: Edita los datos de identificacion y vencimiento del lote.
    var updateBatch = function (id, data) {
        setBatches(batches.map(function (b) {
            return b.id === id
                ? __assign(__assign({}, b), { batchNumber: data.batchNumber, expiryDate: data.expiryDate ? new Date(data.expiryDate) : null }) : b;
        }));
    };
    // REQ-F02: Elimina un lote asociado cuando deja de formar parte del inventario.
    var deleteBatch = function (id) {
        setBatches(batches.filter(function (b) { return b.id !== id; }));
    };
    // REQ-F05: Obtiene el detalle de lotes asociado a un producto listado.
    var getBatchesByProduct = function (productId) {
        return batches.filter(function (b) { return b.productId === productId; });
    };
    // REQ-F02: Consulta puntual de un lote para visualizar o actualizar su detalle.
    var getBatch = function (id) {
        return batches.find(function (b) { return b.id === id; });
    };
    // REQ-F03: Sincroniza el saldo disponible luego de registrar movimientos de stock.
    var updateAvailableQuantity = function (batchId, newQuantity) {
        setBatches(batches.map(function (b) {
            return b.id === batchId ? __assign(__assign({}, b), { availableQuantity: newQuantity }) : b;
        }));
    };
    return {
        batches: batches,
        loading: loading,
        addBatch: addBatch,
        updateBatch: updateBatch,
        deleteBatch: deleteBatch,
        getBatchesByProduct: getBatchesByProduct,
        getBatch: getBatch,
        updateAvailableQuantity: updateAvailableQuantity,
    };
};
exports.useBatches = useBatches;
