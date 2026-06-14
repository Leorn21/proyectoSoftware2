# Guion de Defensa

## 1. Presentacion

Somos el equipo del Sistema de Gestion de Inventario. El objetivo fue resolver el control de productos, lotes y stock disponible con trazabilidad completa para el Hito 5.

## 2. Problema

Las organizaciones que manejan inventario necesitan saber que productos existen, que lotes los componen, que movimientos afectaron el stock y evitar egresos superiores a la disponibilidad.

## 3. Solucion implementada

- REQ-F01: CRUD de productos.
- REQ-F02: lotes asociados a productos.
- REQ-F03: ingresos y egresos por lote.
- REQ-F04: bloqueo de egresos invalidos en UI y logica.
- REQ-F05: inventario con stock total y detalle de lotes.

## 4. Arquitectura

La app esta organizada en componentes, hooks y tipos. Los hooks concentran logica de negocio y los componentes resuelven interaccion visual. La persistencia ejecutable usa `localStorage`; se entrega esquema PostgreSQL objetivo para evolucion backend.

## 5. Calidad

Mostramos trazabilidad en `RTM.md`, pruebas por requisito, build TypeScript, cobertura y metricas de complejidad/mantenibilidad.

## 6. Demo sugerida

1. Crear producto.
2. Crear lote.
3. Registrar ingreso.
4. Registrar egreso valido.
5. Intentar egreso invalido.
6. Mostrar stock total y detalle.

## 7. Cierre

El sistema cumple los requisitos funcionales del hito. El principal pendiente para produccion es conectar la persistencia PostgreSQL mediante una API.
