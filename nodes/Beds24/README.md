# Beds24 Node for n8n

## Contexto y objetivos

Este nodo está diseñado para integrarse con Beds24, que es la central de gestión de reservas y disponibilidad del hotel. La lógica de asignación de habitaciones físicas y virtuales, así como la vinculación con canales (Booking, Expedia, etc.), la gestiona Beds24 directamente. El objetivo principal del nodo es facilitar la creación y modificación de reservas, así como la edición de campos básicos (teléfono, hora de llegada, tipo de cama, etc.) desde n8n, permitiendo que un nuevo PMS/local pueda interactuar con Beds24 de forma sencilla.

## Operaciones críticas
- **Crear/modificar reservas**: Permite mantener sincronizada la información entre sistemas.
- **Consultar reservas**: Para obtener información actualizada y analizar datos.

## Disponibilidad y precios
Las operaciones de consulta de disponibilidad y precios pueden estar separadas en la API v2 y podrían implementarse como un subnodo o nodo aparte. Es recomendable revisar la documentación YAML (`api-v2.yaml`) para decidir la mejor arquitectura. Si la API v2 no cubre bien estas operaciones, se puede considerar mantenerlas como módulo separado.

## Gestión de habitaciones
La asignación de habitaciones físicas/virtuales y las reglas de "recibe asignaciones de" y "puede asignarse a" se gestionan en Beds24 y no requieren lógica adicional en n8n. Para referencia sobre la estructura de habitaciones, consulta [beds24-room-management.md](../../docs/beds24-room-management.md).

## Integración y pruebas
Actualmente, la gestión principal se realiza en Beds24, que conecta con las OTAs. El PMS/local se usa para tareas básicas, pero el objetivo es sustituirlo por flujos n8n conectados a Beds24 y un panel de admin que esta en beta con conexión a los datos en nocoDB. Para pruebas y ejemplos, se recomienda descargar reservas reales futuras mediante la API v2 para analizar payloads y casos de uso típicos.

## Documentación y ejemplos
La documentación se centrará en operaciones clave y ejemplos de payloads reales una vez se disponga de ellos. Los ejemplos de flujos n8n se documentarán en este README y/o en el directorio `docs/` según se vayan definiendo los escenarios principales.

## Referencias
- [Beds24 API OpenAPI YAML](../../docs/integrations/beds24/api-v2.yaml)
- [docs/beds24-room-management.md](../../docs/beds24-room-management.md)

---

*Este README se irá actualizando conforme se avance en la integración y definición de casos de uso reales.*


## Descripción
Este nodo permite interactuar con la API de Beds24 para gestionar reservas y propiedades.

## Documentación oficial de la API
- [api-v2.yaml (OpenAPI/Swagger)](../../docs/integrations/beds24/api-v2.yaml)
- [Beds24 API Online Docs](https://beds24.com/api/)

## Gestión de habitaciones y PMS local
Consulta el documento [beds24-room-management.md](../../docs/beds24-room-management.md) para entender la estructura de habitaciones físicas y virtuales y cómo mapearlas en tus flujos de n8n.

## Ejemplos de uso

---

## Beds24Paginated: Changelog y Estado Actual

### Logros recientes
- **Creación de nodo independiente Beds24Paginated**: Permite experimentar y mejorar sin afectar el nodo original.
- **Implementación de paginación automática en `getMany`**: Recupera todos los bookings de Beds24, sin límite por página.
- **Flags de respuesta visibles y configurables**: 
  - *Include Info Items*: visible, activado por defecto y editable (fuera de Add Filter).
  - *Include Invoice Items*: visible, desactivado por defecto y editable (fuera de Add Filter).
- **UI más clara**: Los flags aparecen siempre arriba de los filtros y no dentro del bloque Add Filter.
- **Compilación y despliegue listos para Docker/n8n**: El nodo ya está disponible tras reiniciar el contenedor.

### Estado actual
- El nodo Beds24Paginated funciona correctamente en todas las operaciones principales (`get`, `getMany`, `update`).
- La paginación en `getMany` está probada y devuelve todos los resultados.
- Los flags de Info/Invoice Items funcionan y se aplican correctamente a la petición.
- El nodo original Beds24 sigue disponible y sin cambios.

### Próximos pasos
- Testear exhaustivamente todas las funciones del nodo Beds24Paginated (incluyendo edge cases y errores API).
- Depurar y pulir pequeños flecos de UI o lógica según se detecten en pruebas reales.
- Documentar ejemplos de uso avanzados y recomendaciones según resultados de test.

---

### Obtener una reserva
```json
{
  "bookingId": "123456"
}
```

### Actualizar una reserva
```json
{
  "bookingId": "123456",
  "checkIn": "2025-05-01",
  "guestName": "John Doe"
}
```

## Autenticación y credenciales

### Uso de Long Life Tokens (LLT) en Beds24

Para facilitar la integración y evitar problemas de expiración de tokens, se recomienda utilizar **Long Life Tokens** (LLT) de Beds24. Estos tokens no caducan y son ideales para integraciones automáticas como n8n.

#### ¿Cómo obtener un Long Life Token?
1. Accede a tu cuenta de Beds24 como administrador.
2. Ve a la sección de configuración de API o gestión de usuarios.
3. Genera un nuevo Long Life Token siguiendo las instrucciones oficiales de Beds24 ([ver documentación](https://wiki.beds24.com/index.php/Category:API_V2#Long_Life_Tokens)).
4. Copia el token generado.

#### ¿Cómo configurar la credencial en n8n?
1. Ve a la sección de **Credenciales** en n8n.
2. Selecciona o crea una nueva credencial "Beds24 API".
3. Pega el Long Life Token en el campo **API Token**.
4. Guarda y prueba la conexión.

> **Ventajas:**
> - No necesitas renovar el token periódicamente.
> - No requiere refresh token ni lógica adicional.
> - Integración robusta y sin mantenimiento.

#### Notas
- Los Long Life Tokens pueden tener permisos limitados según cómo los configures en Beds24 (por ejemplo, solo lectura).
- Si necesitas acceso de escritura, asegúrate de que el token tenga los permisos adecuados.
- Para pruebas o desarrollos, puedes seguir usando invite codes y tokens temporales, pero se recomienda LLT para producción.

## Configuración de credenciales
- Necesitas un API Token de Beds24.
- El icono de la credencial debe estar en la ruta `/home/node/.n8n/custom/nodes/Beds24/beds24.svg` en Docker.
- Usa el prefijo `file:` en los iconos para evitar problemas de visualización.

## Troubleshooting
- **Icono no visible:** Usa rutas absolutas y el prefijo `file:` en el campo `icon`.
- **Cambios no reflejados:** Compila a `dist` y reinicia el servicio n8n.
- **Docker Compose:** Verifica que el volumen esté correctamente montado.

## Cómo contribuir/mejorar el nodo
- Para nuevas operaciones, consulta y adapta los endpoints de la API en [api-v2.yaml](../../docs/integrations/beds24/api-v2.yaml).
- Sigue las buenas prácticas de tipado y documentación.
- Añade ejemplos y advertencias en este README cuando amplíes el nodo.

## Referencias
- [Beds24 API OpenAPI YAML](../../docs/integrations/beds24/api-v2.yaml)
- [docs/beds24-room-management.md](../../docs/beds24-room-management.md)


This node integrates with the Beds24 API v2 to manage bookings and properties.

## Beds24 Node

The Beds24 node allows you to interact with the Beds24 API to manage your property bookings.

### Features

- **Authentication**: Uses API token authentication
- **Operations**: 
  - Get Booking: Retrieve booking details by ID
  - Update Booking: Modify existing booking details
  - Get Properties: List all properties
  - Get Property: Get details of a specific property

### Credentials

To use this node, you need:
- A Beds24 account
- An API token (can be generated in your Beds24 account settings)

### Operations

#### Get Booking
- Retrieves detailed information about a specific booking
- Required parameters:
  - Booking ID
- Optional parameters:
  - Property ID
  - Include cancelled bookings

#### Update Booking
- Updates an existing booking's details
- Required parameters:
  - Booking ID
- Optional parameters:
  - Check-in date
  - Check-out date
  - Guest name
  - Number of guests
  - Status
  - Custom fields
- Supports both simple field updates and raw JSON input

### Error Handling

The node includes comprehensive error handling:
- Invalid API token errors (401)
- Not found errors (404)
- Server errors (500)
- Validation errors for booking updates
- JSON parsing errors for raw input

### Logging

Detailed logging is available for debugging:
- Request details
- Response information
- Error messages
- Validation failures

### Examples

1. Get Booking Details
```json
{
  "node": "Beds24",
  "resource": "booking",
  "operation": "get",
  "parameters": {
    "bookingId": "123456"
  }
}
```

2. Update Booking
```json
{
  "node": "Beds24",
  "resource": "booking",
  "operation": "update",
  "parameters": {
    "bookingId": "123456",
    "updateFields": {
      "guestName": "John Doe",
      "numGuests": 2
    }
  }
}
```

### Known Limitations

- Maximum of 1000 requests per hour
- Some operations may require additional permissions
- Certain fields may be read-only depending on booking status
