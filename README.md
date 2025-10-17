# Portal Aduana Chile - React

Portal web moderno desarrollado en React con TypeScript y Tailwind CSS, diseñado específicamente para los estándares de la Aduana de Chile.

## 🚀 Características

- **Diseño Moderno**: Interfaz adaptada a los estándares visuales de la Aduana de Chile
- **Responsive**: Optimizado para desktop, tablet y móvil
- **Navegación Intuitiva**: Sidebar con navegación clara y accesible
- **Componentes Reutilizables**: Arquitectura modular y escalable
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Estilos modernos y consistentes

## 📋 Vistas Implementadas

### Prioridad Alta (Core del Portal)
- ✅ **Dashboard** (`/`) - Mi Escritorio principal
- ✅ **Mis Aplicaciones** (`/applications`) - Gestión de aplicaciones asignadas
- ✅ **Mis Vistas** (`/views`) - Configuración de vistas personalizadas
- ✅ **Búsqueda** (`/search`) - Consulta de documentos
- ✅ **Configuración** (`/settings`) - Configuración personal del usuario

### Funcionalidades Principales
- **Dashboard**: Estadísticas, actividad reciente y acciones rápidas
- **Aplicaciones**: Lista de aplicaciones con filtros y búsqueda
- **Vistas**: Gestión de vistas de datos con filtros y columnas configurables
- **Búsqueda**: Tabla de resultados con paginación y filtros avanzados
- **Configuración**: Perfil, notificaciones, seguridad y apariencia

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **React Router DOM** para navegación
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Create React App** como base

## 🎨 Paleta de Colores

```css
/* Colores oficiales Aduana Chile */
--aduana-blue: #1e3a8a      /* Azul principal */
--aduana-light-blue: #3b82f6 /* Azul claro */
--aduana-red: #dc2626        /* Rojo para alertas */
--aduana-green: #059669      /* Verde para éxito */
--aduana-gray: #6b7280      /* Gris neutro */
--aduana-light-gray: #f3f4f6 /* Gris claro */
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd portal-aduana-chile

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### Scripts Disponibles
```bash
npm start          # Servidor de desarrollo
npm run build      # Build de producción
npm test           # Ejecutar tests
npm run eject      # Ejectar configuración (irreversible)
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout.tsx      # Layout principal
│   ├── Sidebar.tsx     # Navegación lateral
│   └── Header.tsx      # Cabecera de página
├── views/              # Vistas principales
│   ├── Dashboard.tsx   # Mi Escritorio
│   ├── Applications.tsx # Mis Aplicaciones
│   ├── Views.tsx       # Mis Vistas
│   ├── SearchResults.tsx # Búsqueda
│   └── Settings.tsx    # Configuración
├── types/              # Definiciones TypeScript
│   └── index.ts       # Interfaces y tipos
├── App.tsx            # Componente raíz
└── index.css          # Estilos globales
```

## 🎯 Migración desde JSP

Este proyecto migra las siguientes vistas del sistema original:

| Vista Original | Nueva Vista | Estado |
|---------------|-------------|--------|
| `index.jsp` | Dashboard | ✅ Migrado |
| `MisAplicaciones.jsp` | Applications | ✅ Migrado |
| `MisVistas.jsp` | Views | ✅ Migrado |
| `ResultadoBusqueda.jsp` | SearchResults | ✅ Migrado |
| `ConfigurarSitio.jsp` | Settings | ✅ Migrado |

## 🔧 Configuración

### Tailwind CSS
El proyecto está configurado con Tailwind CSS personalizado para la Aduana de Chile:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'aduana-blue': '#1e3a8a',
        'aduana-light-blue': '#3b82f6',
        // ... más colores personalizados
      }
    }
  }
}
```

## 📱 Responsive Design

El portal está optimizado para:
- **Desktop**: Layout completo con sidebar
- **Tablet**: Sidebar colapsable
- **Mobile**: Navegación adaptada

## 🚀 Próximos Pasos

1. **Integración con Backend**: Conectar con APIs reales
2. **Autenticación**: Implementar sistema de login
3. **Estado Global**: Agregar Redux o Context API
4. **Testing**: Implementar tests unitarios y de integración
5. **PWA**: Convertir en Progressive Web App

## 📄 Licencia

Este proyecto está desarrollado para la Aduana de Chile.

## 👥 Contribución

Para contribuir al proyecto, seguir las mejores prácticas de React y TypeScript.

---

**Desarrollado con ❤️ para la Aduana de Chile**