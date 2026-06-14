# Sistema de Gestion de Inventario

Proyecto React + TypeScript para el Hito 5 de Ingenieria de Software II. Cubre productos, lotes, movimientos de stock, validacion de egresos e inventario consultable con trazabilidad entre requisitos, codigo y pruebas.

## Alcance funcional

| Requisito | Estado | Evidencia principal |
| --- | --- | --- |
| REQ-F01 CRUD de productos | Implementado | `src/hooks/useProducts.ts`, `src/components/ProductForm.tsx`, `src/components/ProductList.tsx`, `src/App.test.tsx` |
| REQ-F02 Gestion de lotes por producto | Implementado | `src/hooks/useBatches.ts`, `src/components/BatchForm.tsx`, `src/components/BatchList.tsx` |
| REQ-F03 Movimientos de stock | Implementado | `src/hooks/useStockMovements.ts`, `src/components/StockMovementForm.tsx`, `src/components/StockMovementList.tsx` |
| REQ-F04 Bloqueo de egresos mayores al stock | Implementado | Validacion en `StockMovementForm` y refuerzo en `useStockMovements` |
| REQ-F05 Consulta de inventario | Implementado | `ProductList`, `ProductDetail`, `BatchDetail`, calculo de stock por lote y total |
| REQ-NF01 README ejecutable | Implementado | Este documento y scripts npm |
| REQ-NF02 Trazabilidad | Implementado | Comentarios `REQ-Fxx`, tests nombrados por requisito y `RTM.md` |

## Stack

- Frontend: React 18, TypeScript, Vite.
- Estilos: Tailwind CSS.
- Tests: Vitest + Testing Library + jsdom.
- Persistencia ejecutable actual: `localStorage`, para permitir demo local sin infraestructura.
- PostgreSQL: se incluye `database/schema.sql` como modelo de datos objetivo. No hay backend/API conectado en esta version; ver riesgos en `MetricasFinales.md`.

## Requisitos previos

- Node.js 18 o superior.
- npm.

## Instalacion y ejecucion

```bash
npm install
npm run dev
```

Vite informa la URL local disponible, normalmente `http://localhost:5173`.

## Comandos de calidad

```bash
npm run build
npm test
npm run test:coverage
```

El build ejecuta TypeScript y compila la app. Los tests cubren los flujos funcionales y unitarios por requisito.

## Estructura

```text
src/
  App.tsx
  components/
  hooks/
  lib/
  test/
  types/
database/
  schema.sql
CatalogoRequerimientos.md
RTM.md
PlanSQA_Final.md
PlanPruebas_Final.md
MetricasFinales.md
ReflexionFinal.md
GuionDefensa.md
```

## Flujos manuales sugeridos

1. Crear un producto con codigo, nombre, descripcion, categoria y unidad.
2. Abrir el detalle del producto y crear uno o mas lotes.
3. Abrir movimientos de un lote y registrar ingresos y egresos.
4. Intentar registrar un egreso mayor al disponible y verificar el bloqueo.
5. Volver al inventario y validar stock total y detalle de lotes.

## Trazabilidad

La trazabilidad completa esta en `RTM.md`. En codigo y tests se usan etiquetas `REQ-F01` a `REQ-F05` y `REQ-NF01` a `REQ-NF02` para vincular comportamiento, pruebas y documentacion.

## Documentacion final

- `CatalogoRequerimientos.md`: catalogo de requisitos funcionales y no funcionales.
- `RTM.md`: matriz requisito -> codigo -> test -> estado.
- `PlanSQA_Final.md`: estrategia final de aseguramiento de calidad.
- `PlanPruebas_Final.md`: alcance, casos y criterios de prueba.
- `MetricasFinales.md`: LOC, complejidad, mantenibilidad, cobertura y riesgos.
- `ReflexionFinal.md`: reflexion de cierre del equipo.
- `GuionDefensa.md`: guion breve para defensa oral.
- `Wireframes_AltaFidelidad.md`: propuesta de 3 wireframes y 2 pantallas hi-fi.
