# 📦 Gestor de Inventario

Sistema de gestión de inventario desarrollado con React, TypeScript y Tailwind CSS. Implementa las funcionalidades REQ-F01 a REQ-F05 del proyecto: productos, lotes, movimientos de stock, validaciones y consulta de inventario.

## 🎯 Funcionalidades Implementadas

### REQ-F01: Gestión de Productos

- ✅ **Registrar productos**: Formulario para crear nuevos productos con código, nombre, descripción, categoría y unidad de medida
- ✅ **Editar productos**: Modificar información de productos existentes
- ✅ **Consultar productos**: Listar todos los productos con tabla interactiva
- ✅ **Buscar productos**: Buscar por código, nombre, descripción o categoría
- ✅ **Eliminar productos**: Eliminar productos con confirmación

### REQ-F02: Gestión de Lotes

- ✅ **Registrar lotes**: Crear lotes asociados a un producto con número, cantidad inicial y fecha de vencimiento
- ✅ **Editar lotes**: Modificar información de lotes existentes
- ✅ **Consultar lotes**: Listar todos los lotes de un producto
- ✅ **Eliminar lotes**: Eliminar lotes con confirmación
- ✅ **Stock disponible**: Mostrar cantidad disponible por lote
- ✅ **Vencimiento**: Indicador visual de lotes vencidos

### REQ-F03: Movimientos de Stock

- ✅ **Registrar ingresos y egresos**: Movimientos sobre un lote
- ✅ **Actualización automática**: Recalcula cantidad disponible del lote

### REQ-F04: Validación de Stock

- ✅ **Bloqueo de egresos inválidos**: No permite egresos mayores al stock disponible

### REQ-F05: Consulta de Inventario

- ✅ **Stock total por producto**: Suma disponible de todos los lotes
- ✅ **Detalle de lotes**: Acceso al detalle y movimientos de cada lote

## 🛠️ Stack Tecnológico

- **Lenguaje**: TypeScript
- **Framework**: React 18
- **Estilos**: Tailwind CSS
- **Build Tool**: Vite
- **Almacenamiento**: localStorage (local)

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn

## 🚀 Instalación y Ejecución

### 1. Clonar o descargar el proyecto

```bash
cd GestorDeInventario
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

### 4. Compilar para producción

```bash
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ProductForm.tsx     # Formulario para crear/editar productos
│   ├── ProductList.tsx     # Tabla de listado de productos
│   ├── ProductDetail.tsx   # Detalle del producto con lotes
│   ├── SearchBar.tsx       # Barra de búsqueda
│   ├── BatchForm.tsx       # Formulario para crear/editar lotes
│   ├── BatchList.tsx       # Tabla de listado de lotes
│   └── index.ts            # Exportaciones centrales
├── hooks/               # Hooks personalizados
│   ├── useProducts.ts      # Hook para gestionar productos
│   └── useBatches.ts       # Hook para gestionar lotes
├── types/               # Tipos TypeScript
│   └── index.ts            # Interfaces Product, Batch, etc.
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales con Tailwind

index.html              # HTML principal
vite.config.ts          # Configuración de Vite
tailwind.config.js      # Configuración de Tailwind CSS
postcss.config.js       # Configuración de PostCSS
tsconfig.json           # Configuración de TypeScript
package.json            # Dependencias del proyecto
```

## 🧪 Pruebas Manuales

### Crear un Producto

1. Haz clic en "+ Nuevo Producto"
2. Completa los campos requeridos:
   - Código: `HERR-001`
   - Nombre: `Martillo de Acero`
   - Descripción: `Martillo de acero forjado para uso general`
   - Categoría: `Herramientas`
   - Unidad: `piezas`
3. Haz clic en "Crear Producto"

### Agregar Lotes a un Producto

1. En la tabla de productos, haz clic en el botón "Lotes" del producto
2. Se abre la vista de detalle del producto
3. Haz clic en "+ Nuevo Lote"
4. Completa los campos:
   - Número de Lote: `LOTE-2024-001`
   - Cantidad Inicial: `100`
   - Fecha de Vencimiento: `2025-12-31` (opcional)
5. Haz clic en "Registrar Lote"

### Editar un Lote

1. En la vista de detalle del producto, busca el lote en la tabla
2. Haz clic en "Editar"
3. Modifica los campos deseados
4. Haz clic en "Guardar Cambios"

### Buscar un Producto

1. Usa la barra de búsqueda en la lista de productos
2. Ingresa texto para buscar por código, nombre, descripción o categoría

### Eliminar un Producto o Lote

1. Busca el elemento en la tabla
2. Haz clic en "Eliminar"
3. Confirma la eliminación

## ✅ Tests de Código Estático

### Linter (ESLint)

Ejecuta el linter sobre el código TypeScript/React:

```bash
npm run lint
```

### Métricas de complejidad y mantenibilidad

Genera reporte con complejidad ciclomática (CC) e índice de mantenibilidad (MI):

```bash
npm run metrics
```

### Cobertura y resumen consolidado

```bash
npm run test:coverage
npm run quality
```

## 💾 Almacenamiento de Datos

Los datos se almacenan en `localStorage` del navegador:

- `products`: Array de productos
- `batches`: Array de lotes
- `stockMovements`: Array de movimientos de stock

Ventajas:

- ✅ Los datos persisten entre sesiones
- ✅ No requiere un servidor backend
- ✅ Perfecto para desarrollo local y pruebas
- ⚠️ Los datos se pierden si se borra el almacenamiento del navegador
- ⚠️ Limitado a ~5-10MB de almacenamiento

## 🔒 Validaciones Implementadas

### Productos

- Código, nombre, descripción, categoría y unidad son requeridos
- Mensajes de error claros para campos inválidos
- Confirmación antes de eliminar

### Lotes

- Número de lote requerido
- Cantidad inicial debe ser mayor a 0
- Fecha de vencimiento es opcional
- Indicador visual para lotes vencidos

### Movimientos de Stock

- Cantidad debe ser mayor a 0
- Egresos no pueden superar el stock disponible

## 📝 Referencias a Requisitos

Cada componente y hook incluye comentarios referenciando los requisitos funcionales:

- **ProductForm.tsx**: REQ-F01 (Registro y edición)
- **ProductList.tsx**: REQ-F01 y REQ-F02 (Consulta y acceso a lotes)
- **SearchBar.tsx**: REQ-F01 (Consulta con búsqueda)
- **BatchForm.tsx**: REQ-F02 (Registro y edición de lotes)
- **BatchList.tsx**: REQ-F02 (Consulta de lotes)
- **ProductDetail.tsx**: REQ-F02 y REQ-F05 (Gestión de lotes y stock total)
- **useProducts.ts**: REQ-F01 (Gestión de productos)
- **useBatches.ts**: REQ-F02 (Gestión de lotes)
- **StockMovementForm.tsx**: REQ-F03 y REQ-F04 (Movimientos y validaciones)
- **StockMovementList.tsx**: REQ-F03 (Consulta de movimientos)
- **BatchDetail.tsx**: REQ-F03 (Detalle de movimientos)
- **useStockMovements.ts**: REQ-F03 (Gestión de movimientos)

## 🎨 Interfaz de Usuario

- Diseño responsivo (mobile-first)
- Colores intuitivos con Tailwind CSS
- Tablas interactivas con hover effects
- Formularios con validación en tiempo real
- Indicadores visuales claros (badges de categoría, stock disponible)
- Navegación simple entre productos y lotes

## 📚 Documentación del Código

El código está documentado siguiendo el requisito REQ-NF02:

- Comentarios JSDoc en funciones principales
- Nombres descriptivos para variables y funciones
- Estructura modular y escalable
- Separación de concerns (componentes, hooks, tipos)
- Fácil de testear

## 🚀 Próximas Funcionalidades (Futuro)

- Reportes de inventario avanzados
- Backend con base de datos PostgreSQL
- Autenticación de usuarios
- Exportación a PDF/Excel

## 📞 Soporte

Para reportar problemas o sugerencias, contacta a los integrantes del proyecto:

- Leonel Ruiz Notari
- Matías Harón
- Ezequiel Signorini

---

**Versión**: 1.1.0  
**Estado**: En desarrollo  
**Última actualización**: Mayo 2026  
**Funcionalidades completadas**: REQ-F01, REQ-F02
