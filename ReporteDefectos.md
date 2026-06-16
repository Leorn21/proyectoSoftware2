# Reporte de Defectos

**Proyecto:** Sistema de Gestión de Inventario
**Grupo:** Leonel Ruiz Notari, Matías Harón, Ezequiel Signorini
**Fecha:** 2026-06-15

---

## Defectos detectados durante el desarrollo

### DEF-01: Stock disponible no se actualiza al eliminar un movimiento

| Campo | Detalle |
|---|---|
| **ID** | DEF-01 |
| **Severidad** | Alta |
| **Módulo** | `src/hooks/useStockMovements.ts` |
| **Descripción** | Al eliminar un movimiento de stock, la cantidad disponible del lote no se recalculaba. El valor `availableQuantity` del lote quedaba desactualizado hasta la próxima recarga. |
| **Pasos para reproducir** | 1. Crear un lote con cantidad inicial 10. 2. Registrar un ingreso de 5 (stock: 15). 3. Eliminar el ingreso. 4. Observar que el stock seguía mostrando 15 en lugar de volver a 10. |
| **Estado** | Resuelto |
| **Solución** | Se agregó el recálculo del saldo en `deleteMovement()` (hook `useStockMovements.ts:105-119`), reutilizando la misma lógica que en `addMovement()`. |
| **Commit** | `[REQ-F03] Corrige recálculo de stock al eliminar movimiento` |

---

### DEF-02: Validación de egreso solo en UI, sin protección en la lógica

| Campo | Detalle |
|---|---|
| **ID** | DEF-02 |
| **Severidad** | Crítica |
| **Módulo** | `src/hooks/useStockMovements.ts` |
| **Descripción** | La validación que impide egresos mayores al stock disponible solo existía en el formulario (`StockMovementForm.tsx`). Si se invocaba `addMovement()` directamente desde código (por ejemplo, desde tests o futura API), se podía registrar un egreso inválido que dejara el stock negativo. |
| **Pasos para reproducir** | 1. Llamar a `addMovement(batchId, { type: 'egreso', quantity: 999 })` directamente sin pasar por el formulario. 2. El movimiento se registraba y el stock quedaba negativo. |
| **Estado** | Resuelto |
| **Solución** | Se agregó validación defensiva en el hook `useStockMovements.ts:69-76`, lanzando un error con mensaje `REQ-F04` si el egreso supera el disponible. |
| **Commit** | `[REQ-F04] Refuerza validación de egreso en lógica de negocio` |

---

### DEF-03: Fecha de vencimiento anterior a la fecha de ingreso sin validación

| Campo | Detalle |
|---|---|
| **ID** | DEF-03 |
| **Severidad** | Media |
| **Módulo** | `src/components/BatchForm.tsx` |
| **Descripción** | El formulario de lote permitía ingresar una fecha de vencimiento anterior a la fecha de ingreso, lo que no tiene sentido físico (un lote no puede vencer antes de ingresar). |
| **Pasos para reproducir** | 1. Abrir formulario de nuevo lote. 2. Ingresar fecha de vencimiento: 2020-01-01. 3. Registrar lote. 4. El lote se creaba sin advertencia. |
| **Estado** | Resuelto |
| **Solución** | Se agregó la prop `minExpiryDate` al `BatchForm` y validación que compara contra la fecha de ingreso (`BatchForm.tsx:55-62`). |
| **Commit** | `[REQ-F02] Agrega validación de fecha de vencimiento contra ingreso` |

---

### DEF-04: Error al limpiar búsqueda no restauraba el listado completo

| Campo | Detalle |
|---|---|
| **ID** | DEF-04 |
| **Severidad** | Media |
| **Módulo** | `src/components/SearchBar.tsx` |
| **Descripción** | Al hacer clic en el botón de limpiar búsqueda, el input se vaciaba pero el listado de productos no se restauraba inmediatamente porque el estado no se sincronizaba correctamente con el componente padre. |
| **Pasos para reproducir** | 1. Buscar un producto. 2. Hacer clic en la "X" para limpiar. 3. El listado seguía filtrado mostrando solo el resultado anterior. |
| **Estado** | Resuelto |
| **Solución** | Se corrigió el manejador `handleClear()` en `SearchBar.tsx` para llamar a `onSearch("")` después de limpiar el estado local, y se ajustó el `useMemo` en `App.tsx` para reaccionar al cambio. |
| **Commit** | `[REQ-F05] Corrige restauración de listado al limpiar búsqueda` |

---

### DEF-05: Error de redondeo en cálculo de stock con múltiples movimientos

| Campo | Detalle |
|---|---|
| **ID** | DEF-05 |
| **Severidad** | Baja |
| **Módulo** | `src/hooks/useStockMovements.ts` |
| **Descripción** | En escenarios con muchos movimientos consecutivos, el cálculo del disponible podía diferir en 1 unidad debido a que `availableQuantity` en el batch no se recalculaba desde cero sino que se acumulaba sobre el valor anterior. |
| **Pasos para reproducir** | 1. Crear lote con cantidad 100. 2. Registrar ingreso 50 (stock: 150). 3. Registrar egreso 30 (stock: 120). 4. Eliminar el ingreso. 5. El stock quedaba en 70 en lugar de 90 (se restaba 50 de 120 en lugar de recalcular desde 100). |
| **Estado** | Resuelto |
| **Solución** | Se modificó el recálculo para que siempre parta de `batch.initialQuantity` y sume todos los movimientos del lote, en lugar de modificar incrementalmente `availableQuantity`. (`useStockMovements.ts:91-98`) |
| **Commit** | `[REQ-F03] Corrige recálculo de stock usando initialQuantity como base` |

---

## Resumen

| Estado | Cantidad |
|---|---|
| Resueltos | 5 |
| Abiertos | 0 |
| **Total** | **5** |
