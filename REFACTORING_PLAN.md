# 🎯 Plan de Refactorización n8n-hotel-nodes

**Fecha**: 08/10/2025  
**Autor**: Cascade + Guilleumes Team  
**Estado**: 🚀 Listo para implementar

## 📋 Resumen Ejecutivo

Recomiendo mantener **n8n-hotel-nodes como repositorio independiente** pero modernizarlo con el mismo stack tecnológico que GUILLEUMES_2026. Esto ofrece lo mejor de ambos mundos:
- ✅ Paquete reutilizable por otros hoteles
- ✅ Publicable en npm
- ✅ Tecnología moderna y consistente con el proyecto principal
- ✅ Reutilización de tipos compartidos

## 🏗️ Arquitectura Propuesta

### Opción Elegida: **Repositorio Independiente Modernizado**

```
ECOSISTEMA GUILLEUMES:
├── GUILLEUMES_2026/          # Sistema principal (monorepo)
│   ├── apps/
│   │   ├── backend/
│   │   └── frontend/
│   └── packages/
│       └── types/            # Tipos compartidos (publicado en npm)
│
└── n8n-hotel-nodes/          # Repositorio independiente
    ├── src/                  # Código fuente TypeScript
    │   ├── nodes/
    │   └── credentials/
    └── dist/                 # Compilado para n8n
```

### Ventajas de esta Arquitectura:

1. **Separación de Responsabilidades**
   - GUILLEUMES_2026: Sistema de gestión hotelera
   - n8n-hotel-nodes: Integraciones n8n reutilizables

2. **Reutilización de Código**
   - Publicar `@guilleumes/types` en npm privado
   - n8n-hotel-nodes lo importa como dependencia

3. **Ciclos de Release Independientes**
   - Cada proyecto puede evolucionar a su ritmo
   - No se bloquean mutuamente

4. **Potencial Comercial**
   - n8n-hotel-nodes podría venderse/licenciarse a otros hoteles
   - Mantiene independencia del sistema principal

## 🔧 Plan de Implementación

### Fase 1: Resolver Error Crítico (NodeConnectionType)
**Tiempo estimado**: 30 minutos  
**Prioridad**: 🔴 URGENTE

```typescript
// ❌ INCORRECTO (importación como type)
import type { NodeConnectionType } from 'n8n-workflow';

// ✅ CORRECTO (importación como valor)
import { NodeConnectionType } from 'n8n-workflow';
```

### Fase 2: Modernización del Stack
**Tiempo estimado**: 2 horas  
**Prioridad**: 🟡 Alta

#### 2.1 Migrar a pnpm
```bash
# Eliminar npm
rm package-lock.json
rm -rf node_modules

# Instalar pnpm globalmente
npm install -g pnpm@8.15.0

# Inicializar pnpm
pnpm install
```

#### 2.2 Actualizar package.json
```json
{
  "name": "@guilleumes/n8n-hotel-nodes",
  "version": "2.0.0",
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@8.15.0",
  "scripts": {
    "clean": "rimraf dist",
    "build": "pnpm run clean && tsc && pnpm run copy-assets",
    "copy-assets": "node scripts/copy-assets.js",
    "dev": "tsc --watch",
    "format": "prettier --write \"src/**/*.{ts,json}\"",
    "lint": "eslint src --ext .ts",
    "test": "vitest"
  },
  "dependencies": {
    "@guilleumes/types": "^1.0.0"  // Importar tipos compartidos
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "n8n-workflow": "^1.82.0",
    "@typescript-eslint/eslint-plugin": "^8.8.1",
    "@typescript-eslint/parser": "^8.8.1",
    "eslint": "^8.57.1",
    "prettier": "^3.2.5",
    "rimraf": "^6.0.1",
    "vitest": "^2.1.3"
  }
}
```

#### 2.3 Eliminar Gulp
```bash
# Eliminar archivo
rm gulpfile.js

# Crear script moderno para copiar assets
mkdir scripts
```

Crear `scripts/copy-assets.js`:
```javascript
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

async function copyAssets() {
  // Copiar iconos SVG
  const svgFiles = glob.sync('src/**/*.svg');
  
  for (const file of svgFiles) {
    const destFile = file.replace('src/', 'dist/');
    await fs.copy(file, destFile);
    console.log(`✓ Copied ${file} → ${destFile}`);
  }

  // Copiar archivos JSON de descripción
  const jsonFiles = glob.sync('src/**/*.node.json');
  
  for (const file of jsonFiles) {
    const destFile = file.replace('src/', 'dist/');
    await fs.copy(file, destFile);
    console.log(`✓ Copied ${file} → ${destFile}`);
  }
}

copyAssets().catch(console.error);
```

### Fase 3: Nueva Estructura de Carpetas
**Tiempo estimado**: 1 hora  
**Prioridad**: 🟡 Alta

```
n8n-hotel-nodes/
├── src/                       # Todo el código fuente aquí
│   ├── nodes/
│   │   ├── Beds24/
│   │   │   ├── Beds24.node.ts
│   │   │   ├── Beds24.node.json
│   │   │   ├── beds24.svg
│   │   │   └── types.ts      # Tipos específicos del nodo
│   │   ├── Cuentica/
│   │   └── ParteViajeros/
│   └── credentials/
│       ├── Beds24Api.credentials.ts
│       └── CuenticaApi.credentials.ts
├── dist/                      # Generado automáticamente
├── tests/                     # Tests unitarios
├── docs/                      # Documentación
├── .github/
│   └── workflows/
│       ├── ci.yml            # Tests automáticos
│       └── release.yml       # Publicación en npm
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
└── package.json
```

### Fase 4: Integración de Tipos Compartidos
**Tiempo estimado**: 2 horas  
**Prioridad**: 🟢 Media

#### 4.1 Publicar @guilleumes/types en npm privado

En GUILLEUMES_2026:
```bash
cd packages/types
pnpm publish --registry https://npm.pkg.github.com
```

#### 4.2 Importar en n8n-hotel-nodes

```typescript
// src/nodes/Beds24/types.ts
import type { 
  Beds24Booking, 
  Beds24Guest,
  Beds24Property,
  Beds24Room 
} from '@guilleumes/types';

// Extender si necesario para n8n
export interface N8nBeds24Booking extends Beds24Booking {
  // Campos adicionales específicos de n8n
}
```

### Fase 5: Configuración de Calidad de Código
**Tiempo estimado**: 1 hora  
**Prioridad**: 🟢 Media

#### 5.1 tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

#### 5.2 .eslintrc.js
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    es2022: true
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_' 
    }]
  }
};
```

#### 5.3 .prettierrc
```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### Fase 6: CI/CD con GitHub Actions
**Tiempo estimado**: 1 hora  
**Prioridad**: 🔵 Baja

#### .github/workflows/ci.yml
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v4
        with:
          version: 8.15.0
          
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
          
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm format:check
      - run: pnpm build
      - run: pnpm test
```

## 🎯 Solución Inmediata al Error NodeConnectionType

**URGENTE - Hacer esto primero:**

El problema NO es la importación (está correcta). Es un problema de compatibilidad de versiones.

### Solución Rápida (Opción A - Recomendada):
```bash
# 1. Limpiar completamente
cd c:\windsurf\n8n-hotel-nodes
rm -rf node_modules package-lock.json dist

# 2. Instalar versiones exactas compatibles
npm install --save-dev n8n-workflow@1.14.1 n8n-core@1.14.1

# 3. Recompilar
npm run build
```

### Solución Alternativa (Opción B - Temporal):
Usar strings literales temporalmente mientras resolvemos:
```typescript
// En lugar de NodeConnectionType.Main
inputs: ['main'] as const,
outputs: ['main'] as const,
```

## 📊 Cronograma de Implementación

| Fase | Tarea | Tiempo | Prioridad |
|------|-------|---------|-----------|
| 1 | Fix error NodeConnectionType | 30 min | 🔴 Urgente |
| 2 | Migrar a pnpm | 1 hora | 🟡 Alta |
| 3 | Eliminar gulp | 30 min | 🟡 Alta |
| 4 | Nueva estructura | 1 hora | 🟡 Alta |
| 5 | Integrar tipos | 2 horas | 🟢 Media |
| 6 | CI/CD | 1 hora | 🔵 Baja |

**Tiempo total estimado**: 6 horas

## ✅ Checklist de Migración

- [ ] Error NodeConnectionType resuelto
- [ ] Build funciona sin gulp
- [ ] Migrado a pnpm
- [ ] TypeScript 5.6.3 configurado
- [ ] Tipos importados desde @guilleumes/types
- [ ] Prettier configurado
- [ ] ESLint configurado
- [ ] Tests con Vitest
- [ ] CI/CD en GitHub Actions
- [ ] Documentación actualizada
- [ ] Publicado en npm privado

## 🚀 Comandos Rápidos Post-Refactorización

```bash
# Desarrollo
pnpm dev           # Compilación con watch
pnpm build         # Build producción
pnpm test          # Ejecutar tests
pnpm lint          # Verificar código
pnpm format        # Formatear código

# Release
pnpm version patch # Incrementar versión
pnpm publish       # Publicar a npm
```

## 💡 Recomendaciones Adicionales

1. **Versionado Semántico**: Usar 2.0.0 para marcar la refactorización mayor
2. **Changelog**: Mantener CHANGELOG.md actualizado
3. **Testing**: Añadir tests para cada operación crítica
4. **Documentación**: Crear ejemplos de workflows en docs/examples/
5. **Monitoreo**: Integrar Sentry para errores en producción

## 🎯 Resultado Esperado

Un paquete n8n moderno, mantenible y profesional que:
- ✅ Compila sin errores
- ✅ Reutiliza código del ecosistema Guilleumes
- ✅ Es publicable y reutilizable
- ✅ Mantiene estándares de calidad enterprise
- ✅ Facilita contribuciones futuras

<function_calls>
<invoke name="Read">
<parameter name="file_path">c:\windsurf\n8n-hotel-nodes\nodes\Beds24\Beds24.node.ts
