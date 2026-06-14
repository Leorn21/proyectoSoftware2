# Plan SQA Final

## Objetivo

Asegurar que el Sistema de Gestion de Inventario cumple los requisitos REQ-F01 a REQ-F05 y REQ-NF01 a REQ-NF02 con evidencia verificable.

## Estrategia

- Trazabilidad: cada requisito se vincula con codigo y tests en `RTM.md`.
- Prevencion: TypeScript estricto, componentes modulares y validaciones cercanas al flujo de usuario.
- Deteccion: tests unitarios, tests de integracion con Testing Library y build de produccion.
- Control de cambios: cambios pequenos, revisables y con foco en requisitos.

## Controles aplicados

| Control | Herramienta | Evidencia |
| --- | --- | --- |
| Compilacion TypeScript | `npm run build` | Build sin errores esperado |
| Pruebas automatizadas | `npm test` | Suite Vitest por requisito |
| Cobertura | `npm run test:coverage` | Umbrales configurados en `vitest.config.ts` |
| Trazabilidad | Revision de etiquetas `REQ-Fxx` | Codigo, tests y `RTM.md` |
| Metricas | `escomplex-report.json` y conteo LOC | `MetricasFinales.md` |

## Criterios de salida

- REQ-F01 a REQ-F05 implementados y con pruebas asociadas.
- Build sin errores.
- Cobertura mayor o igual al umbral configurado.
- Documentacion final completa.
- Riesgos remanentes identificados.

## Riesgos de calidad

- Persistencia productiva PostgreSQL no integrada.
- Tests pueden fallar por permisos del entorno si Vitest no puede crear procesos.
- La UI propuesta de wireframes/hi-fi queda documentada, no materializada como imagen exportada.
