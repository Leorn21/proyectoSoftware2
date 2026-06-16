# Matriz de Trazabilidad de Requisitos

| Requisito | Codigo | Tests | Estado | Observacion |
| --- | --- | --- | --- | --- |
| REQ-F01 | `src/hooks/useProducts.ts`, `src/components/ProductForm.tsx`, `src/components/ProductList.tsx`, `src/components/SearchBar.tsx`, `src/App.tsx` | `src/App.test.tsx`, `src/hooks/useProducts.test.tsx` | Cumple | CRUD, busqueda y validaciones de campos requeridos. |
| REQ-F02 | `src/hooks/useBatches.ts`, `src/components/BatchForm.tsx`, `src/components/BatchList.tsx`, `src/components/ProductDetail.tsx` | `src/App.test.tsx`, `src/hooks/useBatches.test.tsx`, `src/components/inventory-components.test.tsx` | Cumple | Lotes asociados a producto, edicion, baja y vencimiento. |
| REQ-F03 | `src/hooks/useStockMovements.ts`, `src/components/StockMovementForm.tsx`, `src/components/StockMovementList.tsx`, `src/components/BatchDetail.tsx` | `src/App.test.tsx`, `src/hooks/useStockMovements.test.tsx`, `src/components/inventory-components.test.tsx` | Cumple | Ingresos, egresos, historial y recalculo de saldo. |
| REQ-F04 | `src/components/StockMovementForm.tsx`, `src/hooks/useStockMovements.ts` | `src/App.test.tsx`, `src/hooks/useStockMovements.test.tsx` | Cumple | Validacion UI y validacion defensiva en hook. |
| REQ-F05 | `src/components/ProductList.tsx`, `src/components/ProductDetail.tsx`, `src/components/BatchList.tsx`, `src/components/BatchDetail.tsx`, `src/hooks/useBatches.ts`, `src/hooks/useStockMovements.ts` | `src/App.test.tsx`, `src/components/inventory-components.test.tsx` | Cumple | Consulta por producto, stock total y detalle de lotes. |
| REQ-NF01 | `README.md`, `package.json`, `vite.config.ts`, `vitest.config.ts` | `npm run build`, `npm test`, `npm run test:coverage` | Cumple con observacion | Ejecucion local documentada; tests pueden requerir permisos por restriccion `spawn EPERM` del sandbox. |
| REQ-NF02 | Comentarios `REQ-Fxx` en `src`, nombres de tests, documentos finales | Revision estatica y esta RTM | Cumple | Trazabilidad directa requisito -> codigo -> test. |

## Estado global

Los requisitos funcionales estan implementados y testeados. La brecha principal no funcional/arquitectonica es que PostgreSQL esta modelado como esquema objetivo, pero no conectado mediante backend en la app ejecutable.
