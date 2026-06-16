# Matriz de Trazabilidad de Requisitos (RTM)

**Proyecto:** Sistema de Gestión de Inventario  
**Grupo:** Leonel Ruiz Notari, Matías Harón, Ezequiel Signorini  
**Repositorio:** https://github.com/Leorn21/proyectoSoftware2  
**Fecha:** 2026-05-20

---

## Requisitos Funcionales

### REQ-F01: Gestión de Productos

| Aspecto              | Detalle                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**      | El sistema debe permitir registrar, editar, consultar y eliminar productos, indicando datos básicos como código, nombre, descripción, categoría y unidad de medida. |
| **Usuario Objetivo** | Ferreterías y empresas de manufactura                                                                                                                               |
| **Datos**            | Código, nombre, descripción, categoría, unidad de medida                                                                                                            |
| **Funciones**        | CRUD (Create, Read, Update, Delete)                                                                                                                                 |

**Implementación:**

- `src/components/ProductForm.tsx` — Formulario de registro/edición
- `src/components/ProductList.tsx` — Tabla de consulta
- `src/components/SearchBar.tsx` — Búsqueda por múltiples campos
- `src/hooks/useProducts.ts` — Lógica de gestión
- `src/App.tsx` — Integración de flujo

**Pruebas Unitarias/Integración:**

- `src/App.test.tsx` → Crear producto válido
- `src/App.test.tsx` → Impedir crear con campos obligatorios vacíos
- `src/App.test.tsx` → Editar producto
- `src/App.test.tsx` → Buscar por código, nombre, descripción o categoría
- `src/App.test.tsx` → Eliminar producto con confirmación
- `src/App.test.tsx` → Cancelar eliminación

**Cobertura:** 88.52% (App.tsx)

---

### REQ-F02: Gestión de Lotes

| Aspecto              | Detalle                                                                                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**      | El sistema debe permitir registrar lotes asociados a un producto, indicando número de lote, cantidad inicial, cantidad disponible, fecha de ingreso y fecha de vencimiento, cuando corresponda. |
| **Usuario Objetivo** | Ferreterías y empresas de manufactura                                                                                                                                                           |
| **Datos**            | Número de lote, cantidad inicial, cantidad disponible, fecha de ingreso, fecha de vencimiento (opcional), asociación a producto                                                                 |
| **Funciones**        | CRUD (Create, Read, Update, Delete), vinculación a producto                                                                                                                                     |

**Implementación:**

- `src/components/BatchForm.tsx` — Formulario de lote
- `src/components/BatchList.tsx` — Tabla de lotes
- `src/components/ProductDetail.tsx` — Vista de lotes por producto
- `src/components/BatchDetail.tsx` — Detalle y movimientos del lote
- `src/hooks/useBatches.ts` — Lógica de gestión
- `src/App.tsx` — Integración de flujo

**Pruebas Unitarias/Integración:**

- `src/App.test.tsx` → Crear lote asociado a producto
- `src/App.test.tsx` → Mostrar stock disponible por lote
- `src/App.test.tsx` → Impedir lote sin número y con cantidad ≤ 0
- `src/App.test.tsx` → Editar lote
- `src/App.test.tsx` → Eliminar lote
- `src/App.test.tsx` → Mostrar indicador de lote vencido
- `src/hooks/useBatches.test.tsx` → Cargar lotes desde localStorage
- `src/hooks/useBatches.test.tsx` → CRUD completo
- `src/components/inventory-components.test.tsx` → Interacciones UI

**Cobertura:** 100% en BatchList/BatchDetail, 95.23% en BatchForm

---

### REQ-F03: Movimientos de Stock

| Aspecto              | Detalle                                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**      | El sistema debe permitir registrar movimientos de stock sobre un lote, diferenciando ingresos y egresos, actualizando automáticamente la cantidad disponible del lote. |
| **Usuario Objetivo** | Ferreterías y empresas de manufactura                                                                                                                                  |
| **Datos**            | Tipo (ingreso/egreso), cantidad, fecha, lote asociado, razón (opcional)                                                                                                |
| **Funciones**        | Registro, visualización de historial, recalcular saldo automático                                                                                                      |

**Implementación:**

- `src/components/StockMovementForm.tsx` — Formulario de movimiento
- `src/components/StockMovementList.tsx` — Historial de movimientos
- `src/components/BatchDetail.tsx` — Visualización de movimientos y detalle
- `src/hooks/useStockMovements.ts` — Lógica de cálculo de saldo disponible
- `src/components/BatchList.tsx` — Usa saldo recalculado
- `src/App.tsx` — Integración de flujo

**Pruebas Unitarias/Integración:**

- `src/App.test.tsx` → Registrar ingreso y egreso
- `src/App.test.tsx` → Actualizar stock automáticamente
- `src/App.test.tsx` → Mostrar historial de movimientos
- `src/hooks/useStockMovements.test.tsx` → Cargar movimientos desde localStorage
- `src/hooks/useStockMovements.test.tsx` → Calcular disponible con ingresos/egresos
- `src/hooks/useStockMovements.test.tsx` → Agregar y eliminar movimientos
- `src/components/inventory-components.test.tsx` → Mostrar ingresos, egresos, razón faltante
- `src/components/inventory-components.test.tsx` → Confirmar eliminación de movimiento

**Cobertura:** 100% en StockMovementList, 95.83% en StockMovementForm

---

### REQ-F04: Validación de Stock

| Aspecto              | Detalle                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Descripción**      | El sistema debe validar que no se puedan registrar egresos mayores a la cantidad disponible del lote seleccionado. |
| **Usuario Objetivo** | Ferreterías y empresas de manufactura                                                                              |
| **Validaciones**     | Egreso ≤ disponible, cantidad > 0, no valores negativos                                                            |
| **Acción**           | Bloquear registro inválido, mostrar error                                                                          |

**Implementación:**

- `src/components/StockMovementForm.tsx` — Validación pre-envío
- `src/hooks/useStockMovements.ts` — Validación en lógica de negocio
- `src/components/BatchDetail.tsx` — Bloqueo visual

**Pruebas Unitarias/Integración:**

- `src/App.test.tsx` → Bloquea egreso mayor al stock disponible
- `src/App.test.tsx` → No registra movimiento inválido
- `src/App.test.tsx` → Bloquea movimiento con cantidad 0
- `src/App.test.tsx` → Bloquea movimiento con cantidad negativa
- `src/App.test.tsx` → Verifica que stock nunca quede negativo

**Cobertura:** 96.15% en StockMovementForm

---

### REQ-F05: Consulta de Inventario

| Aspecto              | Detalle                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Descripción**      | El sistema debe permitir consultar el inventario mediante un listado de productos, mostrando el stock total disponible por producto y el detalle de los lotes asociados. |
| **Usuario Objetivo** | Ferreterías y empresas de manufactura                                                                                                                                    |
| **Vistas**           | Listado de productos, stock total, detalle de lotes                                                                                                                      |
| **Funciones**        | Búsqueda, filtrado, cálculo de stock total                                                                                                                               |

**Implementación:**

- `src/components/ProductList.tsx` — Tabla de productos con stock total
- `src/components/ProductDetail.tsx` — Detalle de lotes del producto (suma stock)
- `src/components/BatchList.tsx` — Tabla de lotes con disponible
- `src/components/SearchBar.tsx` — Búsqueda sobre inventario
- `src/hooks/useStockMovements.ts` → Calcula saldo disponible
- `src/hooks/useBatches.ts` → Obtiene lotes por producto
- `src/App.tsx` — Integración de flujo

**Pruebas Unitarias/Integración:**

- `src/App.test.tsx` → Calcula stock total por producto (suma de lotes disponibles)
- `src/App.test.tsx` → Muestra detalle de lotes asociados
- `src/App.test.tsx` → Mantiene datos después de recargar desde localStorage
- `src/components/inventory-components.test.tsx` → Limpia búsqueda
- `src/components/inventory-components.test.tsx` → Notifica valor de búsqueda

**Cobertura:** 100% en ProductList/ProductDetail

---

## Requisitos No Funcionales

### REQ-NF01: Simplicidad de Ejecución

| Aspecto         | Detalle                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción** | El sistema debe ser simple de ejecutar y probar localmente, incluyendo un README con instrucciones claras de instalación, configuración, ejecución y pruebas. |
| **Stack**       | TypeScript, React, Vite, localStorage                                                                                                                         |
| **Publicación** | README.md con comandos claros                                                                                                                                 |

**Implementación:**

- `README.md` — Instrucciones completas
- `package.json` — Scripts: `dev`, `build`, `test`, `test:watch`, `test:coverage`
- `vite.config.ts` — Configuración de build
- `tsconfig.json` — Configuración de TypeScript

**Verificación:**

```bash
npm install              # Instala dependencias
npm run dev              # Abre en http://localhost:5173
npm run build            # Compilación exitosa
npm test                 # Todos los tests pasan
npm run test:coverage    # Reporte de cobertura
```

**Resultado:**

- Instalación: 1 comando
- Ejecución: 1 comando
- Tests: 1 comando
- Cobertura total: 95.69%

---

### REQ-NF02: Estructura Clara y Trazable

| Aspecto           | Detalle                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descripción**   | El sistema debe mantener una estructura de código clara, modular y trazable, incorporando referencias a los requerimientos funcionales en el código y en los tests. |
| **Trazabilidad**  | Comentarios `// REQ-Fxx`, nombres de tests con `REQ-Fxx`                                                                                                            |
| **Documentación** | README con referencias, Matriz RTM                                                                                                                                  |

**Implementación:**

- `src/types/index.ts` — Interfaces comentadas con trazabilidad
- `src/components/*.tsx` — Comentarios `// REQ-Fxx` en funcionalidades
- `src/hooks/*.ts` — Comentarios `// REQ-Fxx` en lógica de negocio
- `src/App.tsx` — Comentarios de flujo e integración
- `README.md` — Sección "Referencias a Requisitos"
- `Matriz-RTM.md` — Este documento
- `tests-results.txt` — Resumen de tests y cobertura

**Verificación:**

```bash
# Validación de código
npx eslint "src/**/*.{ts,tsx}"     # 0 errores
npx escomplex -o escomplex-report.json src  # Métricas

# Cobertura
npm run test:coverage              # 95.69%
```

**Métricas:**

- ESLint: 0 errores (exit code: 0)
- Complejidad ciclomática promedio: 2.05
- Índice de mantenibilidad: 110.17
- Cobertura total: 95.69%
- Defectos abiertos: 0

---

## Matriz de Trazabilidad Resumida

| Requisito | Componentes Principales               | Tests Asociados  | Cobertura |
| --------- | ------------------------------------- | ---------------- | --------- |
| REQ-F01   | ProductForm, ProductList, useProducts | 6 tests          | 88.52%    |
| REQ-F02   | BatchForm, BatchList, useBatches      | 8 tests          | 95.23%    |
| REQ-F03   | StockMovementForm, useStockMovements  | 8 tests          | 95.83%    |
| REQ-F04   | StockMovementForm (validación)        | 5 tests          | 96.15%    |
| REQ-F05   | ProductDetail, BatchList, SearchBar   | 5 tests          | 100%      |
| REQ-NF01  | README, package.json, vite.config     | 4 verificaciones | OK        |
| REQ-NF02  | Toda estructura, trazabilidad         | Métricas + tests | 95.69%    |

---

## Estructura de Archivos Relacionados

```
GestorDeInventario/
├── README.md                          # Documentación (REQ-NF01, REQ-NF02)
├── Matriz-RTM.md                      # Este documento (REQ-NF02)
├── package.json                       # Scripts y dependencias (REQ-NF01)
├── tests-results.txt                  # Resumen de tests (REQ-NF02)
├── src/
│   ├── App.tsx                        # Integración de requisitos (REQ-F01/F05)
│   ├── App.test.tsx                   # Tests de aceptación (todos REQ-F)
│   ├── components/
│   │   ├── ProductForm.tsx            # REQ-F01
│   │   ├── ProductList.tsx            # REQ-F01, REQ-F05
│   │   ├── ProductDetail.tsx          # REQ-F02, REQ-F05
│   │   ├── BatchForm.tsx              # REQ-F02
│   │   ├── BatchList.tsx              # REQ-F02, REQ-F05
│   │   ├── BatchDetail.tsx            # REQ-F03, REQ-F04
│   │   ├── StockMovementForm.tsx      # REQ-F03, REQ-F04
│   │   ├── StockMovementList.tsx      # REQ-F03
│   │   ├── SearchBar.tsx              # REQ-F01, REQ-F05
│   │   └── inventory-components.test.tsx # Tests UI
│   ├── hooks/
│   │   ├── useProducts.ts             # REQ-F01
│   │   ├── useBatches.ts              # REQ-F02, REQ-F05
│   │   ├── useStockMovements.ts       # REQ-F03, REQ-F04, REQ-F05
│   │   ├── useBatches.test.tsx        # Tests REQ-F02
│   │   └── useStockMovements.test.tsx # Tests REQ-F03/F04
│   └── types/
│       └── index.ts                   # Tipos con trazabilidad (REQ-NF02)
```

---

## Verificación de Completitud

- [x] REQ-F01 implementado y testeado
- [x] REQ-F02 implementado y testeado
- [x] REQ-F03 implementado y testeado
- [x] REQ-F04 implementado y testeado
- [x] REQ-F05 implementado y testeado
- [x] REQ-NF01 cumplido (README + comandos simples)
- [x] REQ-NF02 cumplido (trazabilidad en código + tests)
- [x] Cobertura ≥ 70%
- [x] 0 errores de ESLint
- [x] 0 defectos críticos abiertos
