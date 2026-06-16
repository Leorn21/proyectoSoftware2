# Reflexion Final

El proyecto llego al Hito 5 con una base funcional clara: productos, lotes, movimientos, validacion de stock e inventario consultable. La mayor fortaleza tecnica es la trazabilidad: cada requisito funcional tiene componentes, hooks y pruebas asociadas, lo que facilita defender el alcance y detectar regresiones.

Durante el cierre se reforzo REQ-F04 para que la regla de no permitir egresos mayores al stock no dependa solo de la interfaz. Esto mejora la separacion entre UI y logica de negocio.

La principal limitacion es arquitectonica: el stack objetivo menciona PostgreSQL, pero la aplicacion ejecutable actual usa `localStorage`. Para una evolucion productiva, el siguiente paso natural es incorporar backend, migraciones y tests de integracion contra base de datos.

Como aprendizaje, el Hito 5 muestra que no alcanza con que la funcionalidad exista: tambien debe estar documentada, probada, trazada y lista para ser explicada en defensa.
