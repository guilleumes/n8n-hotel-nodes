# **⚙️ Plan de Refactorización y Modernización: n8n-hotel-nodes**

**Objetivo:** Refactorizar el repositorio n8n-hotel-nodes para alinearlo con la arquitectura, herramientas y buenas prácticas del monorepo GUILLEUMES\_2026-main. Esto mejorará el mantenimiento, la escalabilidad y la experiencia de desarrollo.

## **1\. Análisis del Estado Actual (n8n-hotel-nodes)**

El proyecto actual, aunque funcional, presenta varias áreas de mejora:

* **Sistema de Build Antiguo:** Utiliza gulpfile.js para compilar y mover archivos. Esto es una dependencia extra y un sistema más complejo de mantener en comparación con las herramientas modernas de TypeScript.  
* **Gestión de Dependencias Clásica:** Usa npm y package-lock.json en un formato de repositorio único. No aprovecha las ventajas de un monorepo para compartir código.  
* **Estructura de Carpetas Mejorable:** La separación entre nodes, credentials y dist es estándar para n8n, pero puede organizarse de una manera más limpia y modular dentro de un monorepo.  
* **Falta de Herramientas de Calidad de Código:** No integra herramientas como Prettier o ESLint de forma consistente con el proyecto principal.

## **2\. Visión Futura: n8n-hotel-nodes como parte del Monorepo**

La idea central es transformar n8n-hotel-nodes en un paquete más dentro de nuestro pnpm workspace.

### **Nueva Estructura Objetivo (Dentro de GUILLEUMES\_2026-main)**

GUILLEUMES\_2026/  
├── apps/  
│   ├── backend/  
│   └── frontend/  
├── packages/  
│   ├── types/  
│   ├── config/  
│   └── n8n-nodes/  \<-- ¡NUEVO PAQUETE\!  
│       ├── src/  
│       │   ├── nodes/  
│       │   │   └── Beds24/  
│       │   │       ├── Beds24.node.ts  
│       │   │       └── ...  
│       │   └── credentials/  
│       │       └── Beds24Api.credentials.ts  
│       ├── package.json  
│       └── tsconfig.json  
└── package.json

## **3\. Plan de Acción Detallado para la Refactorización**

### **Fase 1: Integración en el Monorepo (Setup Inicial)**

1. **Crear el Nuevo Paquete:**  
   * Dentro de GUILLEUMES\_2026-main, crea la carpeta packages/n8n-nodes.  
   * Ejecuta pnpm init dentro de esa carpeta para crear un package.json inicial.  
2. **Migrar el Código Fuente:**  
   * Copia las carpetas nodes y credentials del repositorio antiguo a packages/n8n-nodes/src/.  
   * Copia los archivos de iconos (.svg) a sus carpetas correspondientes dentro de src/nodes/Beds24, etc.  
3. **Adaptar package.json:**  
   * Abre el nuevo packages/n8n-nodes/package.json.  
   * Copia las dependencies y devDependencies del package.json antiguo.  
   * **Importante:** Añade la sección n8n que es requerida por n8n para descubrir los nodos.  
     "n8n": {  
       "nodes": "dist/nodes/\*\*/\*.node.js",  
       "credentials": "dist/credentials/\*\*/\*.credentials.js"  
     }

   * Define los scripts de build usando tsc y herramientas modernas.

### **Fase 2: Modernización del Tooling y Build**

1. **Eliminar gulpfile.js:**  
   * **Ya no es necesario.** La compilación de TypeScript y el movimiento de archivos se gestionará de forma más simple.  
2. **Configurar tsconfig.json:**  
   * Crea un tsconfig.json dentro de packages/n8n-nodes que herede del tsconfig.json raíz del monorepo para mantener la consistencia.  
   * Asegúrate de que el outDir apunte a dist y rootDir a src.  
   * **Clave:** Habilita la opción "resolveJsonModule": true para poder importar archivos JSON si es necesario.  
3. **Actualizar los Scripts de package.json:**  
   * Reemplaza los scripts antiguos por unos más limpios y estándar:  
     "scripts": {  
       "clean": "rm \-rf dist",  
       "build": "pnpm run clean && tsc && pnpm run copy-assets",  
       "copy-assets": "cp \-r src/nodes/\*\*/\*.svg dist/nodes/"  
     }

   * El script copy-assets se encarga de mover los archivos no-TypeScript (como los iconos .svg) al directorio dist después de la compilación.

### **Fase 3: Compartir Código y Tipos**

Esta es la mayor ventaja de la refactorización.

1. **Centralizar Tipos:**  
   * El paquete n8n-nodes ahora puede (y debe) importar tipos directamente desde el paquete @guilleumes/types que ya existe en el monorepo.  
   * **Acción:**  
     * Añade "@guilleumes/types": "workspace:\*" a las dependencias de packages/n8n-nodes/package.json.  
     * Refactoriza las interfaces en nodes/Beds24/interfaces/IBeds24.ts para que, en lugar de redefinir tipos como Booking, los importen desde @guilleumes/types.  
2. **Compartir Lógica de API (Opcional Avanzado):**  
   * Si hay lógica de comunicación con la API de Beds24 que se repite entre apps/backend y packages/n8n-nodes, se podría crear un nuevo paquete packages/beds24-sdk para centralizarla. Por ahora, nos centraremos en los tipos.

### **Fase 4: Calidad de Código y CI/CD**

1. **Integrar Prettier y ESLint:**  
   * Al estar en el monorepo, las configuraciones de Prettier y ESLint de la raíz se aplicarán automáticamente, garantizando un estilo de código consistente en todo el proyecto.  
2. **Añadir a pnpm-workspace.yaml:**  
   * Asegúrate de que el nuevo paquete esté incluido en el archivo pnpm-workspace.yaml en la raíz del proyecto.  
     packages:  
       \- 'apps/\*'  
       \- 'packages/\*'

## **4\. Resumen de Beneficios**

* **Ecosistema Unificado:** Un solo repositorio, un solo comando (pnpm install) para instalar todo.  
* **Código Compartido:** No más tipos duplicados entre el backend y los nodos de n8n.  
* **Build Simplificado:** Adiós a Gulp. tsc es más rápido, simple y es el estándar de la industria.  
* **Mantenimiento Mejorado:** Actualizar una dependencia o una regla de linting se hace en un solo lugar.  
* **Consistencia de Código:** Mismas reglas de estilo y calidad para todo el código base.