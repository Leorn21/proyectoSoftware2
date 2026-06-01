# Insumo para Informe de Defectos

## 1. Resumen de ejecución

- Total de casos definidos: 22
- Casos automatizados: 18
- Casos semi-automatizados: 3
- Casos manuales: 1
- Casos aprobados: 21
- Casos rechazados: 0
- Casos bloqueados: 0
- Casos no aplicables: 0

## 2. Resultados por caso de prueba

### CP-01 — Alta correcta de producto
- ID: CP-01
- Nombre: Alta correcta de producto
- Requerimiento asociado: REQ-F01
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El producto se registra y aparece en el listado.
- Resultado obtenido: La suite funcional registra correctamente productos válidos.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-02 — Alta de producto con campos obligatorios vacíos
- ID: CP-02
- Nombre: Alta de producto con campos obligatorios vacíos
- Requerimiento asociado: REQ-F01
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: Se bloquea el alta y se muestran errores de validación claros.
- Resultado obtenido: El sistema impide el alta y muestra los mensajes de validación esperados.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-03 — Edición correcta de producto
- ID: CP-03
- Nombre: Edición correcta de producto
- Requerimiento asociado: REQ-F01
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El sistema actualiza los datos del producto y los refleja en el listado.
- Resultado obtenido: La edición de producto queda persistida en la interfaz y en el hook.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-04 — Eliminación de producto
- ID: CP-04
- Nombre: Eliminación de producto
- Requerimiento asociado: REQ-F01
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El sistema elimina el producto y deja de mostrarlo en el listado.
- Resultado obtenido: La eliminación por modal funciona y actualiza el listado.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-05 — Consulta de listado de productos
- ID: CP-05
- Nombre: Consulta de listado de productos
- Requerimiento asociado: REQ-F01
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El sistema muestra todos los productos registrados con consistencia.
- Resultado obtenido: El listado muestra múltiples productos y total visible.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-06 — Alta correcta de lote asociado a un producto
- ID: CP-06
- Nombre: Alta correcta de lote asociado a un producto
- Requerimiento asociado: REQ-F02
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El lote se registra asociado al producto con cantidad disponible inicial correcta.
- Resultado obtenido: El lote se crea y queda visible en el detalle del producto.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-07 — Alta de lote con cantidad inicial inválida
- ID: CP-07
- Nombre: Alta de lote con cantidad inicial inválida
- Requerimiento asociado: REQ-F02
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El sistema rechaza el lote con cantidad inicial inválida.
- Resultado obtenido: La validación UI impide registrar cantidades menores o iguales a 0.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-08 — Registro de ingreso de stock
- ID: CP-08
- Nombre: Registro de ingreso de stock
- Requerimiento asociado: REQ-F03
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El ingreso incrementa correctamente la cantidad disponible del lote.
- Resultado obtenido: Los ingresos impactan el saldo visible y persistido.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-09 — Registro de egreso de stock
- ID: CP-09
- Nombre: Registro de egreso de stock
- Requerimiento asociado: REQ-F03
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El egreso decrementa correctamente la cantidad disponible del lote.
- Resultado obtenido: Los egresos impactan correctamente el saldo del lote.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-10 — Intento de egreso mayor al stock disponible
- ID: CP-10
- Nombre: Intento de egreso mayor al stock disponible
- Requerimiento asociado: REQ-F04
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El sistema rechaza la operación y mantiene el stock sin cambios.
- Resultado obtenido: La validación evita el egreso inválido y no persiste el movimiento.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-11 — Verificación de actualización automática de cantidad disponible
- ID: CP-11
- Nombre: Verificación de actualización automática de cantidad disponible
- Requerimiento asociado: REQ-F03, REQ-F04
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El stock disponible se recalcula automáticamente luego de cada movimiento válido.
- Resultado obtenido: El disponible se actualiza luego de cada movimiento.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-12 — Consulta del stock total por producto
- ID: CP-12
- Nombre: Consulta del stock total por producto
- Requerimiento asociado: REQ-F05
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El sistema informa el stock total sumando los lotes del producto.
- Resultado obtenido: La vista de producto calcula correctamente el stock total.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-13 — Consulta del detalle de lotes asociados
- ID: CP-13
- Nombre: Consulta del detalle de lotes asociados
- Requerimiento asociado: REQ-F05
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El sistema muestra cada lote asociado con sus cantidades y fechas.
- Resultado obtenido: La vista de detalle muestra lotes y sus datos asociados.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-14 — Prueba de trazabilidad entre producto, lote y movimiento
- ID: CP-14
- Nombre: Prueba de trazabilidad entre producto, lote y movimiento
- Requerimiento asociado: REQ-F02, REQ-F03, REQ-F05
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El sistema conserva la relación entre producto, lote y movimiento.
- Resultado obtenido: Existe un escenario integrado que confirma la trazabilidad completa.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-15 — Validación de fecha de vencimiento cuando corresponda
- ID: CP-15
- Nombre: Validación de fecha de vencimiento cuando corresponda
- Requerimiento asociado: REQ-F02
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: Si se exige coherencia temporal, el sistema debe rechazar un vencimiento anterior a la fecha de ingreso e informar el error.
- Resultado obtenido: El formulario rechaza fechas de vencimiento anteriores a la fecha de ingreso y muestra el mensaje de validación correspondiente.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-16 — Prueba de regresión sobre el cálculo de stock luego de varios movimientos
- ID: CP-16
- Nombre: Prueba de regresión sobre el cálculo de stock luego de varios movimientos
- Requerimiento asociado: REQ-F03, REQ-F04, REQ-F05
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El stock final del lote y del producto permanece correcto tras una secuencia combinada de movimientos.
- Resultado obtenido: La secuencia de movimientos mantiene el saldo final esperado.
- Evidencia: reports/test-output.txt
- Observaciones: Sin observaciones.

### CP-17 — Validación de ejecución de ESLint sin errores críticos
- ID: CP-17
- Nombre: Validación de ejecución de ESLint sin errores críticos
- Requerimiento asociado: REQ-NF02
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: El análisis finaliza sin errores críticos de ESLint.
- Resultado obtenido: ESLint finalizó con 0 errores críticos.
- Evidencia: reports/eslint-report.json
- Observaciones: Sin observaciones.

### CP-18 — Validación de cobertura mínima con Vitest
- ID: CP-18
- Nombre: Validación de cobertura mínima con Vitest
- Requerimiento asociado: REQ-NF02
- Tipo de ejecución: Automatizada
- Estado: Aprobado
- Resultado esperado: La cobertura supera el mínimo de 60% en statements, branches y functions.
- Resultado obtenido: Cobertura obtenida: 95.53% statements, 90.07% branches, 90.37% functions, 95.86% lines.
- Evidencia: coverage/coverage-summary.json
- Observaciones: Sin observaciones.

### CP-19 — Validación de complejidad ciclomática máxima
- ID: CP-19
- Nombre: Validación de complejidad ciclomática máxima
- Requerimiento asociado: REQ-NF02
- Tipo de ejecución: Semi-automatizada
- Estado: Aprobado
- Resultado esperado: La complejidad ciclomática máxima del código de aplicación es menor o igual a 10.
- Resultado obtenido: Máxima detectada: 10 en ProductForm (/home/sierraecho/Descargas/proyectoSoftware2/.metrics-tmp-cjs/components/ProductForm.js).
- Evidencia: reports/complexity-summary.json
- Observaciones: El análisis excluye archivos de test compilados para medir solo código de aplicación.

### CP-20 — Validación de Maintainability Index
- ID: CP-20
- Nombre: Validación de Maintainability Index
- Requerimiento asociado: REQ-NF02
- Tipo de ejecución: Semi-automatizada
- Estado: Aprobado
- Resultado esperado: El Maintainability Index promedio del proyecto debe ser mayor o igual a 70.
- Resultado obtenido: Índice promedio detectado: 110.6.
- Evidencia: reports/complexity-summary.json
- Observaciones: Sin observaciones.

### CP-21 — Revisión de README con instrucciones de instalación, ejecución y pruebas
- ID: CP-21
- Nombre: Revisión de README con instrucciones de instalación, ejecución y pruebas
- Requerimiento asociado: REQ-NF01
- Tipo de ejecución: Semi-automatizada
- Estado: Aprobado
- Resultado esperado: El README incluye instrucciones de instalación, ejecución y pruebas.
- Resultado obtenido: Instalación: sí, ejecución: sí, pruebas: sí.
- Evidencia: README.md
- Observaciones: Sin observaciones.

### CP-22 — Verificación de que no existan defectos críticos abiertos al cierre
- ID: CP-22
- Nombre: Verificación de que no existan defectos críticos abiertos al cierre
- Requerimiento asociado: REQ-NF02
- Tipo de ejecución: Manual
- Estado: Manual
- Resultado esperado: No deben existir defectos críticos abiertos al cierre del plan de pruebas.
- Resultado obtenido: No hay acceso a gh ni API configurada en este entorno; la verificación queda manual.
- Evidencia: gh no disponible en el entorno actual
- Observaciones: La verificación debe completarse manualmente con el repositorio o tracker real.

## 3. Resultados de calidad

- ESLint: 0 errores críticos. Umbral: 0. Estado: Cumple.
- Prettier: Cumple.
- Cobertura de statements: 95.53%. Umbral: 60%. Estado: Cumple.
- Cobertura de branches: 90.07%. Umbral: 60%. Estado: Cumple.
- Cobertura de functions: 90.37%. Umbral: 60%. Estado: Cumple.
- Cobertura de lines: 95.86%. Umbral: 60%. Estado: Cumple.
- Complejidad ciclomática máxima: 10. Umbral: 10. Estado: Cumple.
- Maintainability Index: 110.6. Umbral: 70. Estado: Cumple.
- Defectos críticos abiertos: Pendiente de verificación manual. Umbral: 0. Estado: Manual.

## 4. Defectos candidatos detectados

No se detectaron defectos candidatos activos a partir de los casos ejecutados y de los umbrales de calidad evaluados.

## 5. Casos que requieren revisión manual

### CP-19
- Motivo: El análisis es automático, pero la interpretación del umbral y el foco en código de aplicación requiere revisión humana.
- Qué debería revisar una persona: Confirmar que la complejidad máxima reportada coincide con el criterio del hito y con los archivos efectivamente evaluados.
- Evidencia sugerida: reports/complexity-summary.json
- Riesgo de no ejecutarlo manualmente: Se podría aceptar una métrica mal interpretada o contaminada por archivos no relevantes.

### CP-20
- Motivo: El valor es automático, pero la interpretación del Maintainability Index debe validarse en contexto.
- Qué debería revisar una persona: Verificar si el índice promedio y el método de cálculo son aceptables para el hito.
- Evidencia sugerida: reports/complexity-summary.json
- Riesgo de no ejecutarlo manualmente: Se podría considerar suficiente una métrica que no represente el riesgo real de mantenibilidad.

### CP-21
- Motivo: La comprobación actual valida presencia de secciones, no calidad completa de la documentación.
- Qué debería revisar una persona: Confirmar manualmente que un tercero puede instalar, ejecutar y probar el proyecto siguiendo el README.
- Evidencia sugerida: README.md
- Riesgo de no ejecutarlo manualmente: La documentación podría ser incompleta o ambigua aunque mencione las secciones mínimas.

### CP-22
- Motivo: No hay acceso a GitHub Issues ni API configurada en el entorno actual.
- Qué debería revisar una persona: Revisar si existen defectos críticos abiertos al cierre en el repositorio o en el tracker oficial.
- Evidencia sugerida: Listado de issues abiertos, tablero del proyecto o export de defectos.
- Riesgo de no ejecutarlo manualmente: Se podría declarar cumplimiento del criterio de salida sin verificar realmente el estado de defectos críticos.

## 6. Conclusión técnica

Se automatizó la mayor parte del plan de pruebas definido en el documento adjunto: 18 casos automatizados sobre 22, con 3 semi-automatizados y 1 manuales.
No quedaron casos de prueba rechazados ni bloqueados dentro del set de CP del documento.
La verificación de defectos críticos abiertos no pudo automatizarse porque gh/API no está disponible en este entorno.
Los criterios automáticos de calidad se cumplen, pero el criterio de defectos críticos abiertos requiere validación manual adicional.
La información generada en reports/ es suficiente para redactar el informe final de defectos, dejando explícito qué fue automático, qué fue manual y qué evidencia respalda cada resultado.
