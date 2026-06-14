# Plan de Pruebas Final

## Alcance

Validar los flujos principales del inventario: productos, lotes, movimientos, bloqueo de egresos invalidos y consulta de stock.

## Tipos de prueba

| Tipo | Objetivo | Archivos |
| --- | --- | --- |
| Unitarias de hooks | Validar logica de negocio y persistencia local | `src/hooks/*.test.tsx` |
| Integracion UI | Validar flujos de usuario sobre componentes y App | `src/App.test.tsx`, `src/components/inventory-components.test.tsx` |
| Regresion | Asegurar que CRUD, movimientos y consulta siguen funcionando | Suite completa Vitest |
| Build | Verificar tipado y empaquetado | `npm run build` |

## Casos por requisito

| ID | Caso | Resultado esperado |
| --- | --- | --- |
| CP-F01-01 | Crear producto valido | Producto visible en listado |
| CP-F01-02 | Crear producto con campos vacios | Formulario bloquea envio |
| CP-F01-03 | Editar y eliminar producto | Cambios reflejados y baja confirmada |
| CP-F02-01 | Crear lote asociado | Lote aparece en detalle del producto |
| CP-F02-02 | Editar/eliminar lote | Cambios aplicados con confirmacion |
| CP-F03-01 | Registrar ingreso | Stock disponible aumenta |
| CP-F03-02 | Registrar egreso | Stock disponible disminuye |
| CP-F03-03 | Consultar historial | Movimientos visibles por lote |
| CP-F04-01 | Egreso mayor al disponible | Movimiento rechazado y stock sin cambios |
| CP-F05-01 | Consultar inventario | Stock total y lotes visibles |
| CP-F05-02 | Recargar datos locales | Datos persisten desde `localStorage` |

## Datos de prueba sugeridos

- Producto: `HERR-001`, Martillo, Herramientas, unidad `piezas`.
- Lote: `LOTE-001`, cantidad inicial `100`.
- Ingreso: `25`.
- Egreso valido: `10`.
- Egreso invalido: `999`.

## Criterios de aceptacion

- Todos los tests automatizados pasan.
- Build de produccion pasa.
- No quedan defectos criticos abiertos.
