# Catalogo de Requerimientos

## Proyecto

Sistema de Gestion de Inventario para registrar productos, administrar lotes, controlar movimientos de stock y consultar disponibilidad.

## Requisitos funcionales

| ID | Nombre | Descripcion | Criterio de aceptacion | Prioridad | Estado |
| --- | --- | --- | --- | --- | --- |
| REQ-F01 | CRUD de productos | Registrar, editar, consultar, buscar y eliminar productos con codigo, nombre, descripcion, categoria y unidad. | El usuario puede completar el ciclo CRUD y los campos requeridos se validan. | Alta | Implementado |
| REQ-F02 | Gestion de lotes | Registrar, editar, consultar y eliminar lotes asociados a productos, con cantidad inicial, disponible, ingreso y vencimiento opcional. | Cada lote queda vinculado a un producto y se visualiza en su detalle. | Alta | Implementado |
| REQ-F03 | Movimientos de stock | Registrar ingresos y egresos por lote y conservar historial. | Cada movimiento actualiza el disponible y aparece en el historial del lote. | Alta | Implementado |
| REQ-F04 | Validacion de egresos | Impedir egresos mayores al stock disponible. | El sistema bloquea el movimiento invalido y no altera el stock. | Critica | Implementado |
| REQ-F05 | Consulta de inventario | Consultar productos con stock total y detalle de lotes. | El listado y detalle muestran disponibilidad total y por lote. | Alta | Implementado |

## Requisitos no funcionales

| ID | Nombre | Descripcion | Criterio de aceptacion | Estado |
| --- | --- | --- | --- | --- |
| REQ-NF01 | Ejecucion simple | README completo con instalacion, ejecucion, build y pruebas. | Un evaluador puede ejecutar el proyecto con npm. | Implementado |
| REQ-NF02 | Modularidad y trazabilidad | Codigo modular y trazabilidad entre requisitos, implementacion y tests. | RTM completa y etiquetas REQ-FXX en codigo/tests relevantes. | Implementado |

## Restricciones y supuestos

- La aplicacion ejecutable actual persiste en `localStorage`.
- Se incluye modelo PostgreSQL objetivo en `database/schema.sql`.
- No se incorpora backend/API en esta iteracion; queda identificado como riesgo si la defensa exige persistencia PostgreSQL operativa.
