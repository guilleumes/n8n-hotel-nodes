# Nodo Cuentica para n8n

## Estado y funcionalidades

- Permite crear gastos en Cuentica y adjuntar documentos (PDF, etc.) a través de un flujo en dos pasos, siguiendo la API oficial.
- Soporta adjuntar documentos mediante un campo especial `__documentInfo` en el JSON de entrada.
- Si falla la subida del documento, el gasto se crea igualmente y se informa del error.

## Cómo adjuntar un documento

1. **Paso 1:** Crear el gasto con el nodo Cuentica (resource: Expense, operation: Create).
2. **Paso 2:** Usar un nodo HTTP Request para adjuntar el documento, con los datos:
   - Endpoint: `/expense/{id}/attachment`
   - Método: `PUT`
   - Headers: `X-AUTH-TOKEN` con tu API Key, `Content-Type: application/json`
   - Body:
     ```json
     {
       "filename": "nombre.pdf",
       "data": "base64..."
     }
     ```

### Ejemplo de JSON de entrada para el gasto
```json
{
  "date": "2025-01-02",
  "provider": 1152076,
  "document_type": "invoice",
  "document_number": "25006",
  "expense_lines": [{ "description": "Ejemplo", "base": 500, "tax": 21 }],
  "payments": [{ "date": "2025-01-02", "amount": 605 }]
}
```

### Ejemplo de función para preparar el adjunto
```javascript
const expenseId = items[0].json.id;
return [{
  json: {
    url: `https://api.cuentica.com/expense/${expenseId}/attachment`,
    method: 'PUT',
    headers: {
      'X-AUTH-TOKEN': $credentials.cuenticaApi.apiKey,
      'Content-Type': 'application/json',
    },
    body: {
      filename: 'nombre.pdf',
      data: $json.documentBase64
    }
  }
}];
```

## Estado de la interfaz y limitaciones

- Los campos "Attach Document", "Document Base64" y "Document Filename" pueden no mostrarse correctamente en la UI de n8n (verificado hasta 2025-04-20).
- Solución recomendada: usar el flujo en dos pasos (Cuentica + HTTP Request).
- Pendiente: pruebas con archivos grandes y base64 inválido.

## Historial y referencias

- Solución funcional documentada en este README y en los archivos históricos.
- Cambios y pruebas detallados en ESTADO_DESARROLLO.md (integrado aquí).


Este nodo es una versión mejorada del nodo Cuentica original, con soporte específico para adjuntar documentos a gastos mediante JSON.

## Nuevas funcionalidades

- **Adjuntar documentos mediante JSON**: Ahora puedes incluir un campo especial `__documentInfo` en tu JSON para adjuntar documentos a los gastos.
- **Procesamiento automático**: El nodo detecta automáticamente la información del documento y lo adjunta al gasto después de crearlo.
- **Manejo de errores mejorado**: Si hay algún problema al adjuntar el documento, el gasto se crea igualmente y se incluye información sobre el error en la respuesta.

## Cómo usar el campo `__documentInfo`

Para adjuntar un documento a un gasto, incluye un campo `__documentInfo` en tu JSON con la siguiente estructura:

```json
{
  "date": "2025-01-02",
  "draft": true,
  "provider": 1152076,
  "document_type": "invoice",
  "document_number": "25006",
  "annotations": "LLOGUER HOSTAL FEBRER-páginas-2.pdf",
  "tags": ["n8n"],
  "expense_lines": [
    {
      "description": "Mª Dolors Bigas Rafart",
      "base": 500,
      "tax": 21,
      "surcharge": 0,
      "retention": 0,
      "imputation": 100,
      "expense_type": "6210001",
      "investment": false
    }
  ],
  "payments": [
    {
      "date": "2025-01-02",
      "amount": 605,
      "payment_method": "wire_transfer",
      "origin_account": 61844,
      "paid": true
    }
  ],
  "__documentInfo": {
    "attach": true,
    "base64": "JVBERi0xLjcKJeLjz9MKNCAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9PUE0gMQo+PgplbmRvYmoKNSAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9PUE0gMAo+PgplbmRvYmoKOCAwIG9iago8PAovRmlsdGVyIC9G ...   ..... PRgo=",
    "filename": "LLOGUER HOSTAL FEBRER-páginas-2.pdf"
  }
}
```

### Propiedades de `__documentInfo`

- `attach` (boolean): Indica si se debe adjuntar el documento. Debe ser `true` para que se adjunte.
- `base64` (string): El contenido del documento en formato base64.
- `filename` (string): El nombre del archivo que se mostrará en Cuentica.

## Formato del base64

El campo `base64` puede tener dos formatos:

1. **Formato simple**: El texto en base64 sin ningún prefijo.
   ```
   "base64": "JVBERi0xLjcKJeLjz9MKNCAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9PUE0gMQo..."
   ```

2. **Formato con prefijo de tipo de datos**:
   ```
   "base64": "data:application/pdf;base64,JVBERi0xLjcKJeLjz9MKNCAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9PUE0gMQo..."
   ```

Ambos formatos son válidos y el nodo los procesará correctamente.

## Respuesta

Cuando se adjunta un documento con éxito, la respuesta incluirá información sobre el documento adjunto en el campo `document`:

```json
{
  "id": 123456,
  "date": "2025-01-02",
  "description": "Mª Dolors Bigas Rafart",
  "has_attachment": true,
  "document": {
    "id": 78901,
    "filename": "LLOGUER HOSTAL FEBRER-páginas-2.pdf",
    "url": "https://api.cuentica.com/expense/123456/attachment/78901"
  }
}
```

Si hay algún error al adjuntar el documento, el gasto se creará igualmente y la respuesta incluirá información sobre el error en el campo `documentError`:

```json
{
  "id": 123456,
  "date": "2025-01-02",
  "description": "Mª Dolors Bigas Rafart",
  "has_attachment": false,
  "documentError": "Error al adjuntar documento: Invalid base64 data"
}
```

## Diferencias con el nodo Cuentica original

- El nodo Cuentica v1.1 tiene un nombre diferente (`cuenticav11`) para evitar conflictos con el nodo original.
- La descripción del campo JSON Input incluye información sobre el campo `__documentInfo`.
- El procesamiento interno del nodo ha sido modificado para detectar y procesar el campo `__documentInfo`.

## Cómo usar este nodo en tu flujo

1. Añade el nodo Cuentica v1.1 a tu flujo.
2. Configura el nodo:
   - Resource: Expense
   - Operation: Create
   - En "JSON Input", proporciona un JSON con la estructura mostrada anteriormente, incluyendo el campo `__documentInfo`.
3. Ejecuta el flujo.

El nodo creará el gasto y adjuntará automáticamente el documento en una sola operación.
