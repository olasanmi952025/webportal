# SearchInput (Molecule)

Un componente de búsqueda que combina un campo de entrada con un botón de búsqueda y funcionalidades adicionales.

## Arquitectura

Este componente es una **molécula** porque combina múltiples atoms:
- `Input` - Campo de entrada de texto
- `Button` - Botón de búsqueda

## Características

- ✅ Combina el atom `Input` y `Button`
- ✅ Botón de limpiar automático cuando hay texto
- ✅ Icono de búsqueda integrado
- ✅ Búsqueda con Enter
- ✅ Estados de carga
- ✅ Personalizable con Tailwind CSS
- ✅ Accesibilidad incluida

## Uso Básico

```tsx
import { SearchInput } from '@arkho/ui';

function MyComponent() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    console.log('Buscando:', value);
    // Lógica de búsqueda aquí
  };

  const handleClear = () => {
    console.log('Búsqueda limpiada');
    // Lógica adicional al limpiar
  };

  return (
    <SearchInput
      value={searchValue}
      onChange={setSearchValue}
      onSearch={handleSearch}
      onClear={handleClear}
      placeholder="Buscar productos..."
    />
  );
}
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `string` | `''` | Valor del input |
| `placeholder` | `string` | `'Buscar...'` | Placeholder del input |
| `onChange` | `(value: string) => void` | - | Callback cuando cambia el valor |
| `onSearch` | `(value: string) => void` | - | Callback cuando se ejecuta la búsqueda |
| `onClear` | `() => void` | - | Callback cuando se limpia la búsqueda |
| `disabled` | `boolean` | `false` | Deshabilitar el componente |
| `hasError` | `boolean` | `false` | Mostrar estado de error |
| `className` | `string` | - | Clases CSS adicionales |
| `maxLength` | `number` | `100` | Longitud máxima del input |
| `searchButtonText` | `string` | `'Buscar'` | Texto del botón de búsqueda |
| `showSearchButton` | `boolean` | `true` | Mostrar botón de búsqueda |
| `showClearButton` | `boolean` | `true` | Mostrar botón de limpiar |
| `searchButtonVariant` | `'primary' \| 'secondary' \| 'outline' \| 'danger'` | `'primary'` | Variante del botón |
| `searchButtonSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón |
| `loading` | `boolean` | `false` | Estado de carga |
| `autoFocus` | `boolean` | `false` | Auto-focus al montar |

## Ejemplos Avanzados

### Solo Input (sin botón)
```tsx
<SearchInput
  showSearchButton={false}
  onSearch={handleSearch}
  placeholder="Buscar con Enter..."
/>
```

### Con estado de carga
```tsx
<SearchInput
  loading={isSearching}
  onSearch={handleSearch}
  searchButtonText="Buscando..."
/>
```

### Con error
```tsx
<SearchInput
  hasError={true}
  placeholder="Campo requerido"
/>
```

### Personalizado
```tsx
<SearchInput
  searchButtonVariant="secondary"
  searchButtonSize="sm"
  searchButtonText="🔍"
  className="max-w-md"
  maxLength={50}
/>
```
