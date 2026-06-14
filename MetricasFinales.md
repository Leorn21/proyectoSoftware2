# Metricas Finales

## Fecha

2026-06-14

## Metricas registradas

| Metrica | Valor | Fuente |
| --- | ---: | --- |
| LOC fisicas aproximadas en `src` | 3766 | `Get-ChildItem src -Recurse -Include *.ts,*.tsx` |
| Archivos fuente y test en `src` | 30 | `rg --files src` |
| Complejidad ciclomatrica promedio | 2.04 | `escomplex-report.json` regenerado |
| Indice de mantenibilidad promedio | 112.70 | `escomplex-report.json` regenerado |
| Cobertura statements | 95.57% | `npm run test:coverage` |
| Cobertura branches | 90.29% | `npm run test:coverage` |
| Cobertura functions | 90.37% | `npm run test:coverage` |
| Cobertura lines | 95.90% | `npm run test:coverage` |
| Tests automatizados | 44/44 passing | `npm test` |
| Build | OK | `npm run build` |
| Vulnerabilidades high | 0 | `npm audit --audit-level=high` |

## Interpretacion

- La complejidad promedio es baja y consistente con componentes pequenos.
- El indice de mantenibilidad es alto.
- La cobertura final supera ampliamente los umbrales configurados.
- El build, la suite de tests y la auditoria de vulnerabilidades high quedaron verificados.

## Riesgos restantes

- PostgreSQL no esta conectado a una API ejecutable.
- El esquema SQL existe como referencia arquitectonica, no como migracion integrada.
- Si el entorno bloquea procesos (`spawn EPERM`), la ejecucion local de Vitest puede requerir permisos elevados.
