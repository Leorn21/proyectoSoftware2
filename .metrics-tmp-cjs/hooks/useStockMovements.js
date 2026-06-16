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
 * Trazabilidad REQ-F03:
 * Gestiona movimientos de stock por lote, diferenciando ingresos y egresos, y
 * recalcula el saldo disponible despues de cada cambio.
 *
 * Trazabilidad REQ-F04:
 * La validacion de egresos mayores al stock se aplica en StockMovementForm y se
 * refuerza aqui para proteger la regla de negocio ante invocaciones directas.
 */
var useStockMovements = function () {
    var _a = (0, react_1.useState)([]), movements = _a[0], setMovements = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, useBatches_1.useBatches)(), getBatch = _c.getBatch, updateAvailableQuantity = _c.updateAvailableQuantity;
    // REQ-NF01: Recupera movimientos locales para ejecutar y probar sin infraestructura externa.
    (0, react_1.useEffect)(function () {
        var stored = localStorage.getItem("stockMovements");
        if (stored) {
            var parsed = JSON.parse(stored);
            setMovements(parsed.map(function (m) { return (__assign(__assign({}, m), { createdAt: new Date(m.createdAt) })); }));
        }
        setLoading(false);
    }, []);
    // REQ-NF01: Persiste el historial local de movimientos entre recargas.
    (0, react_1.useEffect)(function () {
        if (!loading) {
            localStorage.setItem("stockMovements", JSON.stringify(movements));
        }
    }, [movements, loading]);
    // REQ-F03 / REQ-F05: Calcula el saldo que se muestra en consultas de lote e inventario.
    var calculateAvailableQuantity = (0, react_1.useCallback)(function (batchId) {
        var batch = getBatch(batchId);
        if (!batch)
            return 0;
        var totalMovement = movements
            .filter(function (m) { return m.batchId === batchId; })
            .reduce(function (sum, m) {
            return m.type === "ingreso" ? sum + m.quantity : sum - m.quantity;
        }, 0);
        return batch.initialQuantity + totalMovement;
    }, [movements, getBatch]);
    // REQ-F03: Registra ingreso o egreso y actualiza automaticamente la cantidad disponible del lote.
    var addMovement = function (batchId, data) {
        var batch = getBatch(batchId);
        if (batch && data.type === "egreso") {
            var currentAvailable = calculateAvailableQuantity(batchId);
            if (data.quantity > currentAvailable) {
                throw new Error("REQ-F04: El egreso no puede superar el stock disponible del lote.");
            }
        }
        var newMovement = {
            id: Date.now().toString(),
            batchId: batchId,
            type: data.type,
            quantity: data.quantity,
            reason: data.reason,
            createdAt: new Date(),
        };
        var updatedMovements = __spreadArray(__spreadArray([], movements, true), [newMovement], false);
        setMovements(updatedMovements);
        // REQ-F03: Recalculo inmediato para que el lote refleje el movimiento recien registrado.
        if (batch) {
            var totalMovement = updatedMovements
                .filter(function (m) { return m.batchId === batchId; })
                .reduce(function (sum, m) {
                return m.type === "ingreso" ? sum + m.quantity : sum - m.quantity;
            }, 0);
            var newAvailable = batch.initialQuantity + totalMovement;
            updateAvailableQuantity(batchId, newAvailable);
        }
        return newMovement;
    };
    // REQ-F03: Al eliminar un movimiento se recompone el saldo para mantener trazabilidad historica.
    var deleteMovement = function (id, batchId) {
        var updatedMovements = movements.filter(function (m) { return m.id !== id; });
        setMovements(updatedMovements);
        // REQ-F03: Recalcula el saldo con el historial restante del lote.
        var batch = getBatch(batchId);
        if (batch) {
            var totalMovement = updatedMovements
                .filter(function (m) { return m.batchId === batchId; })
                .reduce(function (sum, m) {
                return m.type === "ingreso" ? sum + m.quantity : sum - m.quantity;
            }, 0);
            var newAvailable = batch.initialQuantity + totalMovement;
            updateAvailableQuantity(batchId, newAvailable);
        }
    };
    // REQ-F03: Consulta del historial de movimientos asociado a un lote.
    var getMovementsByBatch = function (batchId) {
        return movements.filter(function (m) { return m.batchId === batchId; });
    };
    return {
        movements: movements,
        loading: loading,
        addMovement: addMovement,
        deleteMovement: deleteMovement,
        getMovementsByBatch: getMovementsByBatch,
        calculateAvailableQuantity: calculateAvailableQuantity,
    };
};
exports.useStockMovements = useStockMovements;
