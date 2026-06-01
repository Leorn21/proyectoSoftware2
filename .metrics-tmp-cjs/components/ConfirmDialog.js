"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmDialog = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var alert_dialog_1 = require("./ui/alert-dialog");
var ConfirmDialog = function (_a) {
    var trigger = _a.trigger, title = _a.title, description = _a.description, _b = _a.confirmLabel, confirmLabel = _b === void 0 ? "Eliminar" : _b, _c = _a.cancelLabel, cancelLabel = _c === void 0 ? "Cancelar" : _c, onConfirm = _a.onConfirm;
    return ((0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialog, { children: [(0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogTrigger, { asChild: true, children: trigger }), (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogContent, { children: [(0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogHeader, { children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-2 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-300", children: "!" }), (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogTitle, { children: title }), (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogDescription, { children: description })] }), (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogFooter, { children: [(0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogCancel, { children: cancelLabel }), (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogAction, { onClick: onConfirm, children: confirmLabel })] })] })] }));
};
exports.ConfirmDialog = ConfirmDialog;
