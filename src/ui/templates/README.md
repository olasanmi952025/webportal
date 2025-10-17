# Templates de UI

Esta carpeta contiene templates base reutilizables construidos con los componentes atómicos de la biblioteca Arkho.

## Templates Disponibles

### 1. FilterGridTemplate

Template para pantallas con filtros y grilla de datos.

**Características:**
- Filtros configurables (input, select, date)
- Búsqueda global
- Grilla con ordenamiento
- Acciones por fila
- Botones de acción (actualizar, exportar, agregar)
- Contador de resultados

**Uso:**
```tsx
import { FilterGridTemplate } from '../templates/FilterGridTemplate';

const filters = [
  {
    key: 'name',
    label: 'Nombre',
    type: 'input',
    placeholder: 'Buscar por nombre...',
  },
  {
    key: 'status',
    label: 'Estado',
    type: 'select',
    options: [
      { label: 'Activo', value: 'active' },
      { label: 'Inactivo', value: 'inactive' },
    ],
  },
];

<FilterGridTemplate
  title="Usuarios"
  filters={filters}
  data={users}
  headers={headers}
  onFilterChange={handleFilterChange}
  onRefresh={handleRefresh}
  onExport={handleExport}
  onAdd={handleAdd}
/>
```

### 2. LoginTemplate

Template para pantallas de autenticación.

**Características:**
- Formulario de login con validación
- Campos de email y contraseña
- Checkbox "Recordarme"
- Enlaces de recuperación y registro
- Login social opcional
- Manejo de estados de error y éxito
- Logo personalizable

**Uso:**
```tsx
import { LoginTemplate } from '../templates/LoginTemplate';

<LoginTemplate
  title="Iniciar sesión"
  subtitle="Ingresa tus credenciales"
  onSubmit={handleLogin}
  onForgotPassword={handleForgotPassword}
  onSignUp={handleSignUp}
  socialLogin={[
    {
      provider: 'Google',
      icon: <GoogleIcon />,
      onClick: handleGoogleLogin,
    },
  ]}
/>
```

### 3. DashboardTemplate

Template para dashboards y paneles de control.

**Características:**
- Métricas con indicadores de cambio
- Widgets de gráficos configurables
- Sidebar opcional
- Estados de carga con skeleton
- Botones de acción (actualizar, exportar)
- Colores temáticos para métricas

**Uso:**
```tsx
import { DashboardTemplate } from '../templates/DashboardTemplate';

const metrics = [
  {
    title: 'Usuarios activos',
    value: '1,234',
    change: { value: 12, isPositive: true },
    color: 'green',
  },
];

const charts = [
  {
    title: 'Ventas mensuales',
    content: <ChartComponent data={salesData} />,
  },
];

<DashboardTemplate
  title="Dashboard"
  metrics={metrics}
  charts={charts}
  onRefresh={handleRefresh}
  onExport={handleExport}
/>
```

### 4. FormTemplate

Template para formularios con validación.

**Características:**
- Campos configurables (text, email, password, select, checkbox, textarea)
- Validación en tiempo real
- Múltiples layouts (vertical, horizontal, grid)
- Manejo de errores y éxito
- Estados de carga
- Tamaños configurables

**Uso:**
```tsx
import { FormTemplate } from '../templates/FormTemplate';

const fields = [
  {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    required: true,
    validation: {
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    name: 'role',
    label: 'Rol',
    type: 'select',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
];

<FormTemplate
  title="Crear Usuario"
  fields={fields}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  layout="grid"
  maxWidth="lg"
/>
```

### 5. ListActionTemplate

Template para listas con acciones y búsqueda.

**Características:**
- Búsqueda global y por campos específicos
- Selección múltiple con acciones en lote
- Acciones por fila
- Paginación
- Estados vacíos personalizables
- Modal de confirmación para acciones destructivas

**Uso:**
```tsx
import { ListActionTemplate } from '../templates/ListActionTemplate';

const rowActions = (user: User) => [
  {
    label: 'Editar',
    variant: 'outline',
    onClick: (user) => handleEdit(user),
  },
  {
    label: 'Eliminar',
    variant: 'danger',
    confirm: true,
    confirmMessage: '¿Estás seguro de eliminar este usuario?',
    onClick: (user) => handleDelete(user),
  },
];

const bulkActions = [
  {
    label: 'Eliminar seleccionados',
    variant: 'danger',
    confirm: true,
    onClick: (users) => handleBulkDelete(users),
  },
];

<ListActionTemplate
  title="Usuarios"
  data={users}
  headers={headers}
  rowActions={rowActions}
  bulkActions={bulkActions}
  searchFields={['name', 'email']}
  onRefresh={handleRefresh}
  onExport={handleExport}
/>
```

## Características Comunes

Todos los templates comparten:

- **Responsive Design**: Adaptables a diferentes tamaños de pantalla
- **Accesibilidad**: Cumplen estándares de accesibilidad web
- **TypeScript**: Tipado completo para mejor desarrollo
- **Tailwind CSS**: Estilos consistentes y personalizables
- **Estados de carga**: Skeleton loaders y spinners
- **Manejo de errores**: Alertas y mensajes de error
- **Personalización**: Props configurables para adaptarse a diferentes necesidades

## Estructura de Archivos

```
src/ui/templates/
├── FilterGridTemplate.tsx      # Template de filtros + grilla
├── LoginTemplate.tsx           # Template de login
├── DashboardTemplate.tsx       # Template de dashboard
├── FormTemplate.tsx            # Template de formularios
├── ListActionTemplate.tsx      # Template de listas con acciones
├── examples/                   # Ejemplos de uso
│   └── FilterGridExample.tsx  # Ejemplo del template de filtros
├── index.ts                    # Exportaciones
└── README.md                   # Esta documentación
```

## Mejores Prácticas

1. **Reutilización**: Los templates están diseñados para ser reutilizables en diferentes contextos
2. **Composición**: Usa los componentes atómicos existentes para mantener consistencia
3. **Configuración**: Utiliza las props para personalizar el comportamiento sin modificar el código
4. **Accesibilidad**: Mantén los estándares de accesibilidad al extender los templates
5. **Performance**: Los templates incluyen optimizaciones como `useMemo` y `useCallback` cuando es necesario

## Extensión

Para crear nuevos templates:

1. Crea un nuevo archivo en la carpeta `templates/`
2. Importa los componentes atómicos necesarios
3. Define las interfaces TypeScript para las props
4. Implementa la lógica del template
5. Exporta desde `index.ts`
6. Documenta en este README
7. Crea un ejemplo de uso en la carpeta `examples/`

