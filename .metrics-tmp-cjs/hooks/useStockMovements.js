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
exports.useStockMovements = void 0;
var react_1 = require("react");
var useBatches_1 = require("./useBatches");
/**
 * Hook personalizado para gestionar movimientos de stock
 * REQ-F03: Registro de movimientos de stock (ingresos y egresos)
 * Actualiza automáticamente la cantidad disponible del lote
 */
var useStockMovements = function () {
    var _a = (0, react_1.useState)([]), movements = _a[0], setMovements = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, useBatches_1.useBatches)(), getBatch = _c.getBatch, updateAvailableQuantity = _c.updateAvailableQuantity;
    // Cargar movimientos del localStorage
    (0, react_1.useEffect)(function () {
        var stored = localStorage.getItem('stockMovements');
        if (stored) {
            var parsed = JSON.parse(stored);
            setMovements(parsed.map(function (m) { return (__assign(__assign({}, m), { createdAt: new Date(m.createdAt) })); }));
        }
        setLoading(false);
    }, []);
    // Guardar en localStorage cuando cambian los movimientos
    (0, react_1.useEffect)(function () {
        if (!loading) {
            localStorage.setItem('stockMovements', JSON.stringify(movements));
        }
    }, [movements, loading]);
    // Calcular cantidad disponible después de todos los movimientos
    var calculateAvailableQuantity = (0, react_1.useCallback)(function (batchId) {
        var batch = getBatch(batchId);
        if (!batch)
            return 0;
        var totalMovement = movements
            .filter(function (m) { return m.batchId === batchId; })
            .reduce(function (sum, m) {
            return m.type === 'ingreso' ? sum + m.quantity : sum - m.quantity;
        }, 0);
        return batch.initialQuantity + totalMovement;
    }, [movements, getBatch]);
    // Agregar movimiento de stock
    var addMovement = function (batchId, data) {
        var newMovement = {
            id: Date.now().toString(),
            batchId: batchId,
            type: data.type,
            quantity: data.quantity,
            reason: data.reason,
            createdAt: new Date()
        };
        var updatedMovements = __spreadArray(__spreadArray([], movements, true), [newMovement], false);
        setMovements(updatedMovements);
        // Calcular cantidad disponible con los movimientos actualizados
        var batch = getBatch(batchId);
        if (batch) {
            var totalMovement = updatedMovements
                .filter(function (m) { return m.batchId === batchId; })
                .reduce(function (sum, m) {
                return m.type === 'ingreso' ? sum + m.quantity : sum - m.quantity;
            }, 0);
            var newAvailable = batch.initialQuantity + totalMovement;
            updateAvailableQuantity(batchId, newAvailable);
        }
        return newMovement;
    };
    // Eliminar movimiento
    var deleteMovement = function (id, batchId) {
        var updatedMovements = movements.filter(function (m) { return m.id !== id; });
        setMovements(updatedMovements);
        // Recalcular cantidad disponible del lote
        var batch = getBatch(batchId);
        if (batch) {
            var totalMovement = updatedMovements
                .filter(function (m) { return m.batchId === batchId; })
                .reduce(function (sum, m) {
                return m.type === 'ingreso' ? sum + m.quantity : sum - m.quantity;
            }, 0);
            var newAvailable = batch.initialQuantity + totalMovement;
            updateAvailableQuantity(batchId, newAvailable);
        }
    };
    // Obtener movimientos de un lote
    var getMovementsByBatch = function (batchId) {
        return movements.filter(function (m) { return m.batchId === batchId; });
    };
    return {
        movements: movements,
        loading: loading,
        addMovement: addMovement,
        deleteMovement: deleteMovement,
        getMovementsByBatch: getMovementsByBatch,
        calculateAvailableQuantity: calculateAvailableQuantity
    };
};
exports.useStockMovements = useStockMovements;
