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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDialogTrigger = exports.AlertDialogTitle = exports.AlertDialogHeader = exports.AlertDialogFooter = exports.AlertDialogDescription = exports.AlertDialogContent = exports.AlertDialogCancel = exports.AlertDialogAction = exports.AlertDialog = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var AlertDialogPrimitive = __importStar(require("@radix-ui/react-alert-dialog"));
var utils_1 = require("../../lib/utils");
var button_1 = require("./button");
var AlertDialog = AlertDialogPrimitive.Root;
exports.AlertDialog = AlertDialog;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
exports.AlertDialogTrigger = AlertDialogTrigger;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
var AlertDialogOverlay = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Overlay, __assign({ ref: ref, className: (0, utils_1.cn)("fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm", className) }, props)));
});
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContent = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsxs)(AlertDialogPortal, { children: [(0, jsx_runtime_1.jsx)(AlertDialogOverlay, {}), (0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Content, __assign({ ref: ref, className: (0, utils_1.cn)("fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-black/60 sm:p-7", className) }, props))] }));
});
exports.AlertDialogContent = AlertDialogContent;
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
var AlertDialogHeader = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: (0, utils_1.cn)("flex flex-col space-y-2 text-left", className) }, props)));
};
exports.AlertDialogHeader = AlertDialogHeader;
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: (0, utils_1.cn)("flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", className) }, props)));
};
exports.AlertDialogFooter = AlertDialogFooter;
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Title, __assign({ ref: ref, className: (0, utils_1.cn)("text-xl font-semibold text-slate-50", className) }, props)));
});
exports.AlertDialogTitle = AlertDialogTitle;
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescription = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Description, __assign({ ref: ref, className: (0, utils_1.cn)("text-sm leading-6 text-slate-400", className) }, props)));
});
exports.AlertDialogDescription = AlertDialogDescription;
AlertDialogDescription.displayName =
    AlertDialogPrimitive.Description.displayName;
var AlertDialogAction = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Action, __assign({ ref: ref, className: (0, utils_1.cn)((0, button_1.buttonVariants)({ variant: "destructive" }), className) }, props)));
});
exports.AlertDialogAction = AlertDialogAction;
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancel = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Cancel, __assign({ ref: ref, className: (0, utils_1.cn)((0, button_1.buttonVariants)({ variant: "secondary" }), className) }, props)));
});
exports.AlertDialogCancel = AlertDialogCancel;
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
