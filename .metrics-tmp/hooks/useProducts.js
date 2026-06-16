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
import { useState, useEffect } from 'react';
/**
 * Hook personalizado para gestionar productos
 * REQ-F01: Registro, edición, consulta y eliminación de productos
 * Utiliza localStorage para persistencia local
 */
export var useProducts = function () {
    var _a = useState([]), products = _a[0], setProducts = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    // Cargar productos del localStorage
    useEffect(function () {
        var stored = localStorage.getItem('products');
        if (stored) {
            var parsed = JSON.parse(stored);
            setProducts(parsed.map(function (p) { return (__assign(__assign({}, p), { createdAt: new Date(p.createdAt) })); }));
        }
        setLoading(false);
    }, []);
    // Guardar en localStorage cuando cambian los productos
    useEffect(function () {
        if (!loading) {
            localStorage.setItem('products', JSON.stringify(products));
        }
    }, [products, loading]);
    // Agregar nuevo producto
    var addProduct = function (data) {
        var newProduct = __assign(__assign({ id: Date.now().toString() }, data), { createdAt: new Date() });
        setProducts(__spreadArray(__spreadArray([], products, true), [newProduct], false));
        return newProduct;
    };
    // Actualizar producto existente
    var updateProduct = function (id, data) {
        setProducts(products.map(function (p) {
            return p.id === id ? __assign(__assign({}, p), data) : p;
        }));
    };
    // Eliminar producto
    var deleteProduct = function (id) {
        setProducts(products.filter(function (p) { return p.id !== id; }));
    };
    // Obtener un producto específico
    var getProduct = function (id) {
        return products.find(function (p) { return p.id === id; });
    };
    // Buscar productos
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
        searchProducts: searchProducts
    };
};
