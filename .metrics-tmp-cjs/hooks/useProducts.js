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
exports.useProducts = void 0;
var react_1 = require("react");
/**
 * Trazabilidad REQ-F01:
 * Centraliza las operaciones CRUD de productos requeridas por la propuesta:
 * registrar, editar, consultar, eliminar y buscar por datos basicos.
 *
 * Trazabilidad REQ-NF01:
 * Usa localStorage para que el sistema pueda ejecutarse y probarse localmente
 * sin depender de servicios externos durante la validacion del alcance.
 */
var useProducts = function () {
    var _a = (0, react_1.useState)([]), products = _a[0], setProducts = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    // REQ-NF01: Carga datos locales para pruebas manuales reproducibles.
    (0, react_1.useEffect)(function () {
        var stored = localStorage.getItem("products");
        if (stored) {
            var parsed = JSON.parse(stored);
            setProducts(parsed.map(function (p) { return (__assign(__assign({}, p), { createdAt: new Date(p.createdAt) })); }));
        }
        setLoading(false);
    }, []);
    // REQ-NF01: Persiste cambios locales entre recargas del navegador.
    (0, react_1.useEffect)(function () {
        if (!loading) {
            localStorage.setItem("products", JSON.stringify(products));
        }
    }, [products, loading]);
    // REQ-F01: Alta de producto con los campos basicos definidos en la propuesta.
    var addProduct = function (data) {
        var newProduct = __assign(__assign({ id: Date.now().toString() }, data), { createdAt: new Date() });
        setProducts(__spreadArray(__spreadArray([], products, true), [newProduct], false));
        return newProduct;
    };
    // REQ-F01: Edicion de datos basicos sin alterar la identidad del producto.
    var updateProduct = function (id, data) {
        setProducts(products.map(function (p) { return (p.id === id ? __assign(__assign({}, p), data) : p); }));
    };
    // REQ-F01: Baja de producto desde el inventario.
    var deleteProduct = function (id) {
        setProducts(products.filter(function (p) { return p.id !== id; }));
    };
    // REQ-F01: Consulta puntual de producto por identificador interno.
    var getProduct = function (id) {
        return products.find(function (p) { return p.id === id; });
    };
    // REQ-F05: Consulta de inventario por campos visibles del producto.
    var searchProducts = function (query) {
        var q = query.toLowerCase();
        return products.filter(function (p) {
            return p.code.toLowerCase().includes(q) ||
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q);
        });
    };
    return {
        products: products,
        loading: loading,
        addProduct: addProduct,
        updateProduct: updateProduct,
        deleteProduct: deleteProduct,
        getProduct: getProduct,
        searchProducts: searchProducts,
    };
};
exports.useProducts = useProducts;
