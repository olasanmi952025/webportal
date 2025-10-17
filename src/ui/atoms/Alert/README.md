# Alert Component

## Descripción

El componente `Alert` es un modal de confirmación que se utiliza para mostrar mensajes importantes al usuario y solicitar confirmación antes de realizar acciones críticas. Es ideal para confirmaciones de eliminación, cambios importantes, o cualquier acción que requiera la atención del usuario.

## Características

- ✅ Modal centrado con overlay
- ✅ Botón de cierre (X) en la esquina superior derecha
- ✅ Botones de confirmación y cancelación personalizables
- ✅ Diseño responsive
- ✅ Soporte para modo oscuro
- ✅ Accesibilidad completa (ARIA labels, focus management)
- ✅ Animaciones suaves

## Propiedades

| Propiedad | Tipo | Requerido | Valor por defecto | Descripción |
|-----------|------|-----------|-------------------|-------------|
| `isOpen` | `boolean` | ✅ | - | Controla si el modal está visible o no |
| `onClose` | `() => void` | ✅ | - | Función que se ejecuta al cerrar el modal |
| `textDescription` | `string` | ✅ | - | Mensaje principal que se muestra al usuario |
| `labelConfirm` | `string` | ❌ | `"Si, Confirmar"` | Texto del botón de confirmación |
| `labelDismiss` | `string` | ❌ | `"Cancelar"` | Texto del botón de cancelación |
| `onHandleConfirm` | `() => void` | ✅ | - | Función que se ejecuta al confirmar la acción |

## Uso Básico

```tsx
import { Alert } from '@/ui/atoms/Alert';

function MyComponent() {
  const [showAlert, setShowAlert] = useState(false);

  const handleConfirm = () => {
    // Lógica de confirmación
    console.log('Acción confirmada');
    setShowAlert(false);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <button onClick={() => setShowAlert(true)}>
        Mostrar Alerta
      </button>

      <Alert
        isOpen={showAlert}
        onClose={handleClose}
        textDescription="¿Estás seguro de que deseas eliminar este elemento?"
        onHandleConfirm={handleConfirm}
      />
    </>
  );
}
```

## Ejemplos

### Ejemplo 1: Confirmación de Eliminación

```tsx
import { useState } from 'react';
import { Alert } from '@/ui/atoms/Alert';

function DeleteUserComponent() {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    try {
      // Llamada a la API para eliminar el usuario
      await deleteUserAPI(userToDelete.id);
      console.log('Usuario eliminado exitosamente');
      setShowDeleteAlert(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteAlert(false);
    setUserToDelete(null);
  };

  return (
    <>
      <button 
        onClick={() => handleDeleteUser({ id: 1, name: 'Juan Pérez' })}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Eliminar Usuario
      </button>

      <Alert
        isOpen={showDeleteAlert}
        onClose={cancelDelete}
        textDescription={`¿Estás seguro de que deseas eliminar al usuario "${userToDelete?.name}"? Esta acción no se puede deshacer.`}
        labelConfirm="Sí, Eliminar"
        labelDismiss="Cancelar"
        onHandleConfirm={confirmDelete}
      />
    </>
  );
}
```

### Ejemplo 2: Confirmación de Cambios con Botones Personalizados

```tsx
import { useState } from 'react';
import { Alert } from '@/ui/atoms/Alert';

function SaveChangesComponent() {
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);

  const handleSaveChanges = () => {
    // Lógica para guardar cambios
    console.log('Cambios guardados');
    setHasUnsavedChanges(false);
    setShowSaveAlert(false);
  };

  const handleDiscardChanges = () => {
    // Lógica para descartar cambios
    console.log('Cambios descartados');
    setHasUnsavedChanges(false);
    setShowSaveAlert(false);
  };

  const handleClose = () => {
    setShowSaveAlert(false);
  };

  return (
    <>
      <button 
        onClick={() => setShowSaveAlert(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!hasUnsavedChanges}
      >
        Guardar Cambios
      </button>

      <Alert
        isOpen={showSaveAlert}
        onClose={handleClose}
        textDescription="Tienes cambios sin guardar. ¿Qué deseas hacer?"
        labelConfirm="Guardar"
        labelDismiss="Descartar"
        onHandleConfirm={handleSaveChanges}
      />
    </>
  );
}
```

## Estilos y Personalización

El componente utiliza clases de Tailwind CSS y está diseñado para integrarse perfectamente con el sistema de diseño. Los colores principales utilizan las variables CSS personalizadas:

- `bg-primary` y `hover:bg-dark-primary` para el botón de confirmación
- `text-primary` para elementos de acento
- Soporte completo para modo oscuro con clases `dark:`

## Accesibilidad

- ✅ Uso correcto de `aria-label` y `aria-hidden`
- ✅ Navegación por teclado
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Contraste adecuado en modo claro y oscuro

## Consideraciones de UX

- El modal se centra automáticamente en la pantalla
- El overlay previene la interacción con el contenido de fondo
- Los botones tienen estados hover y focus claramente definidos
- El ícono de advertencia ayuda a comunicar la importancia del mensaje
- Los textos de los botones son claros y específicos para la acción

## Dependencias

- React 18+
- Tailwind CSS
- Lucide React (para íconos, si se requiere personalización)
