# Wireframes y Pantallas de Alta Fidelidad

## Verificacion

No se encontraron archivos de wireframes ni pantallas hi-fi exportadas en el repositorio. Para cumplir el punto 10 del Hito 5 se proponen los siguientes artefactos.

## Wireframe 1: Listado de inventario

```text
+------------------------------------------------------+
| Header: Sistema de Gestion de Inventario             |
| [Buscar producto................] [Nuevo Producto]   |
+------------------------------------------------------+
| Codigo | Nombre | Categoria | Stock total | Acciones |
| HERR-1 | Martillo | Herr.   | 120 piezas  | Ver/Edit |
+------------------------------------------------------+
```

Objetivo: cubrir REQ-F01 y REQ-F05.

## Wireframe 2: Detalle de producto y lotes

```text
+------------------------------------------------------+
| Producto: Martillo             [Volver] [Nuevo Lote] |
+------------------------------------------------------+
| Stock total: 120 piezas                              |
| Lote | Inicial | Disponible | Vencimiento | Acciones |
| L-01 | 100     | 90         | 31/12/2026  | Mov/Edit |
+------------------------------------------------------+
```

Objetivo: cubrir REQ-F02 y REQ-F05.

## Wireframe 3: Detalle de lote y movimientos

```text
+------------------------------------------------------+
| Lote L-01                    [Volver] [Movimiento]   |
+------------------------------------------------------+
| Disponible: 90 piezas                                |
| Tipo    | Cantidad | Motivo       | Fecha | Acciones |
| Ingreso | 20       | Reposicion   | ...   | Eliminar |
| Egreso  | 10       | Venta        | ...   | Eliminar |
+------------------------------------------------------+
```

Objetivo: cubrir REQ-F03 y REQ-F04.

## Pantalla hi-fi 1 propuesta: Inventario operativo

- Fondo neutro oscuro con tarjetas de resumen.
- Tabla principal con busqueda, acciones visibles y badges de stock.
- Estados de stock: verde para disponible, rojo para cero o critico.
- Acciones primarias: `Nuevo Producto`, `Ver lotes`.

## Pantalla hi-fi 2 propuesta: Movimientos de lote

- Encabezado con producto, lote, stock disponible y vencimiento.
- Boton principal `Nuevo Movimiento`.
- Historial con badges `Ingreso` y `Egreso`.
- Modal de movimiento con validacion visible para egreso mayor al disponible.
