# 🚀 Quick Start - n8n Hotel Nodes

Comandos más utilizados para desarrollo y despliegue.

---

## 📦 Comandos Esenciales (pnpm)

```bash
# Instalar dependencias (primera vez)
pnpm install

# Build completo
pnpm run build

# Desarrollo con watch mode
pnpm run dev

# Formatear código
pnpm run format

# Verificar código
pnpm run lint

# Limpiar build
pnpm run clean
```

---

## 🐳 Docker (n8n Local)

### Levantar n8n con Custom Nodes

```bash
# Desde el proyecto GUILLEUMES_2026
cd c:/windsurf/GUILLEUMES_2026/docker
docker-compose -f docker-compose.dev.yml up -d n8n

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f n8n

# Reiniciar n8n (después de cambios)
docker-compose -f docker-compose.dev.yml restart n8n
```

### Verificar Montaje

```bash
# Verificar que los nodos están montados
docker-compose -f docker-compose.dev.yml exec n8n ls -la /home/node/.n8n/custom

# Ver variables de entorno
docker-compose -f docker-compose.dev.yml exec n8n env | grep N8N_CUSTOM
```

---

## 🧪 Testing

### Verificar Compilación

```bash
# Listar archivos compilados
ls -la dist/nodes
ls -la dist/credentials

# Verificar tipos TypeScript
npx tsc --noEmit
```

### Test en n8n

1. Abre http://localhost:5678
2. Login (admin/changeme por defecto)
3. Crea nuevo workflow
4. Busca tus nodos: "Beds24", "Cuentica", etc.

---

## 📦 Git Workflow

### Commits

```bash
# Ver estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "feat: descripción del cambio"

# Push
git push origin main
```

### Branches

```bash
# Crear feature branch
git checkout -b feature/nuevo-nodo

# Push del branch
git push origin feature/nuevo-nodo

# Volver a main
git checkout main
```

---

## 🏷️ Versionado

### Crear Nueva Versión

```bash
# Actualizar CHANGELOG.md primero!

# Crear tag
git tag -a v1.1.0 -m "Release v1.1.0 - Descripción"

# Push tag
git push origin v1.1.0
```

---

## 🚢 Deploy en VPS

### Primera Instalación

```bash
# SSH al VPS
ssh user@vps-ip

# Clonar repo
cd /opt
git clone https://github.com/guilleumes/n8n-hotel-nodes.git
cd n8n-hotel-nodes

# Compilar
pnpm install
pnpm run build
```

### Actualizar en VPS

```bash
# En el VPS
cd /opt/n8n-hotel-nodes
git pull origin main
npm run build

# Reiniciar n8n
docker-compose -f /opt/guilleumes/docker/docker-compose.prod.yml restart n8n
```

---

## 🔍 Troubleshooting

### Nodos No Aparecen

```bash
# 1. Verificar compilación
ls -la dist/nodes

# 2. Verificar montaje en Docker
docker-compose exec n8n ls -la /home/node/.n8n/custom

# 3. Ver logs de n8n
docker-compose logs n8n | grep -i "custom\|error"

# 4. Reiniciar n8n
docker-compose restart n8n
```

### Errores de TypeScript

```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json dist
pnpm install
pnpm run build
```

### Docker Issues

```bash
# Reiniciar todo
docker-compose down
docker-compose up -d

# Ver logs completos
docker-compose logs --tail=100 n8n
```

---

## 📚 Documentación Útil

- **README.md** - Documentación principal
- **SESSION.md** - Notas de sesión actual
- **n8n Docs**: https://docs.n8n.io/integrations/creating-nodes/
- **Beds24 API**: https://beds24.com/api/v2/docs
- **Cuentica API**: https://cuentica.com/api/docs

---

## 🆘 Comandos de Emergencia

```bash
# Forzar recreación completa
docker-compose down -v
docker-compose up -d --force-recreate

# Ver todo el estado de Docker
docker-compose ps
docker-compose logs --tail=50

# Limpiar todo y empezar de nuevo
npm run clean
rm -rf node_modules
pnpm install
pnpm run build
docker-compose restart n8n
```

---

**Última actualización**: 08/10/2025
