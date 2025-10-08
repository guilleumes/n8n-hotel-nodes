# 🐛 Errores y Soluciones

Documentación de errores encontrados durante el desarrollo y sus soluciones.

---

## ❌ Error: NodeConnectionType - TypeScript Compilation

**Fecha**: 08/10/2025 02:10  
**Estado**: 🔄 En investigación  
**Severidad**: Alta - Bloquea compilación de nodos Beds24

### Descripción del Error

```
error TS2693: 'NodeConnectionType' only refers to a type, but is being used as a value here.

nodes/Beds24/Beds24.node.ts:42:12
nodes/Beds24/Beds24.node.ts:43:13
nodes/Beds24/Beds24Paginated.node.ts:29:12
nodes/Beds24/Beds24Paginated.node.ts:30:13
nodes/Beds24/Beds24Trigger.node.ts:24:10
```

### Contexto

Al migrar los nodos Beds24 desde `c:\windsurf\n8nCustomNodes`, el código TypeScript genera errores de compilación relacionados con `NodeConnectionType` de `n8n-workflow`.

### Archivos Afectados

- `nodes/Beds24/Beds24.node.ts`
- `nodes/Beds24/Beds24Paginated.node.ts`
- `nodes/Beds24/Beds24Trigger.node.ts`

### Código Problemático

```typescript
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,  // ← Problema aquí
	IDataObject,
	IHttpRequestOptions,
	NodeOperationError,
} from 'n8n-workflow';

// ...

description: INodeTypeDescription = {
	// ...
	inputs: [NodeConnectionType.Main],   // ← Error: usado como valor
	outputs: [NodeConnectionType.Main],  // ← Error: usado como valor
}
```

### Intentos de Solución

#### ❌ Intento 1: Separar imports `type` y valores
```typescript
import type {
	IExecuteFunctions,
	// ...
} from 'n8n-workflow';

import {
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
```
**Resultado**: Mismo error

#### ❌ Intento 2: Actualizar TypeScript a 5.6.3
```json
"typescript": "^5.6.3"
```
**Resultado**: Empeoró el problema (más errores de compatibilidad)

#### ❌ Intento 3: Downgrade a TypeScript 4.8.4 (versión original)
```json
"typescript": "~4.8.4"
```
**Resultado**: Mismo error persiste

#### ❌ Intento 4: Añadir `preserveValueImports` al tsconfig
```json
"preserveValueImports": true
```
**Resultado**: Opción obsoleta en TypeScript 4.8.4

#### 🔄 Intento 5: Usar versión exacta de n8n-workflow
```json
"n8n-workflow": "1.82.0"  // Versión del proyecto original
```
**Resultado**: Instalado, pendiente de probar compilación

### Diferencias con Proyecto Original

| Aspecto | Original (`n8nCustomNodes`) | Nuevo (`n8n-hotel-nodes`) |
|---------|----------------------------|---------------------------|
| TypeScript | 4.8.4 | 4.8.4 ✅ |
| n8n-workflow | 1.82.0 (instalado) + 1.14.1 (n8n-core) | 1.82.0 ✅ |
| Compilación | ✅ Funciona | ❌ Falla |
| Código fuente | Idéntico | Idéntico |

### Análisis

El código es **exactamente el mismo** que en el proyecto original que SÍ compila correctamente. Esto sugiere:

1. **Posible problema de caché de TypeScript**
2. **Configuración de `tsconfig.json` diferente** (aunque se copió igual)
3. **Dependencias adicionales** que el original tiene pero el nuevo no
4. **Versión de npm/node** diferente entre proyectos

### Próximos Pasos

1. ✅ Comparar `package.json` completo del original vs nuevo
2. ✅ Verificar todas las versiones de dependencias
3. ⏳ Limpiar completamente caché: `rm -rf node_modules dist && npm install`
4. ⏳ Copiar `tsconfig.json` exacto del original
5. ⏳ Verificar si el original usa `n8n-core` como dependencia
6. ⏳ Considerar copiar directamente los archivos `.js` compilados del original (temporal)

### Workaround Temporal

**Opción A**: Usar archivos compilados del original
```bash
# Copiar dist/ desde n8nCustomNodes
cp -r ../n8nCustomNodes/dist/nodes/Beds24 ./dist/nodes/
cp -r ../n8nCustomNodes/dist/credentials/Beds24Api.credentials.js ./dist/credentials/
```

**Opción B**: Excluir Beds24 del build y compilar solo Cuentica
```json
// tsconfig.json
"exclude": [
  "node_modules/**/*",
  "dist/**/*",
  "nodes/Beds24/**/*"  // ← Temporal
]
```

### Referencias

- **n8n-workflow API**: https://github.com/n8n-io/n8n/tree/master/packages/workflow
- **NodeConnectionType**: Enum que define tipos de conexiones entre nodos
- **Proyecto original**: `c:\windsurf\n8nCustomNodes` (funciona correctamente)

---

## ✅ Error Resuelto: Imports faltantes en Cuentica

**Fecha**: 08/10/2025 02:06  
**Estado**: ✅ Resuelto  

### Descripción
Archivo `Cuentica.node.ts` migrado sin imports de n8n-workflow.

### Solución
```typescript
import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';
```

**Resultado**: ✅ Compilación exitosa

---

## 📝 Notas de Debugging

### Verificar Compilación en Original

```bash
cd c:\windsurf\n8nCustomNodes
npm run build  # ← Verificar que SÍ compila

# Ver versiones exactas
npm list typescript n8n-workflow n8n-core
```

### Limpiar Proyecto Completamente

```bash
cd c:\windsurf\n8n-hotel-nodes

# Limpiar todo
rm -rf node_modules package-lock.json dist

# Reinstalar
npm install

# Recompilar
npm run build
```

### Comparar Configuraciones

```bash
# Comparar tsconfig.json
diff c:\windsurf\n8nCustomNodes\tsconfig.json c:\windsurf\n8n-hotel-nodes\tsconfig.json

# Comparar package.json
diff c:\windsurf\n8nCustomNodes\package.json c:\windsurf\n8n-hotel-nodes\package.json
```

---

**Última actualización**: 08/10/2025 02:15  
**Estado general**: 1 nodo funcionando (Cuentica) ✅, 3 nodos bloqueados (Beds24) ❌
