# 🧩 Nova Peru SST - Frontend

Frontend del sistema **Nova Peru SST**, enfocado en la gestión de salud ocupacional, con módulos como:

* Atención médica
* Historia clínica
* Seguridad
* Farmacia / Inventario
* Reportería

Este proyecto está desarrollado con:

* ⚛️ React + TypeScript
* 🎨 TailwindCSS
* 🌐 React Router
* 🔗 Axios
* 🧠 Zustand (manejo de estado)

---

# 🏗️ Arquitectura

El proyecto sigue una arquitectura **feature-first** con separación clara de responsabilidades:

```text
app/       → configuración global (router, layouts, guards)
core/      → infraestructura base (api, auth, enums, utils)
shared/    → componentes y lógica reutilizable
features/  → módulos del sistema (auth, inventory, etc.)
config/    → configuración general (env, api)
```

---

# 📁 Estructura del Proyecto

```text
src/
  app/
    layouts/
    providers/
    router/

  core/
    api/
    auth/
    constants/
    enums/
    types/
    utils/

  shared/
    components/
    hooks/
    store/
    styles/

  features/
    auth/
```

---

# 🔐 Autenticación

Se maneja mediante:

* Zustand (`auth.store.ts`)
* Persistencia en `localStorage`
* Token leído automáticamente por Axios

### Flujo

1. Login → obtiene token
2. Token se guarda en store + storage
3. Axios lo inyecta en cada request
4. Guards validan acceso a rutas

---

# 🌐 API

## Axios Instance

Ubicación:

```text
core/api/axios.instance.ts
```

Responsabilidades:

* Base URL
* Interceptors
* Inyección de token
* Manejo de errores globales

---

## ApiService

Ubicación:

```text
core/api/api.service.ts
```

Clase base para servicios:

* GET
* POST
* PATCH
* DELETE

Los servicios por feature heredan de esta clase.

---

# 🧭 Routing

Se utiliza:

```text
createBrowserRouter + RouteObject[]
```

Ubicación:

```text
app/router/
```

---

## Características

* Layouts anidados
* Guards de autenticación
* Validación por roles
* Configuración centralizada

---

# 🛡️ Guards

## AuthGuard

* Verifica si el usuario está autenticado

## RoleGuard

* Verifica si el usuario tiene permisos

---

# 🎭 Roles

Definidos en:

```text
core/enums/role.enum.ts
```

Usados en:

* rutas
* guards
* lógica de autorización

---

# 🧩 Shared

Contiene:

## Componentes

```text
shared/components/
```

* navegación
* feedback
* layout UI

## Hooks

```text
shared/hooks/
```

## Store

```text
shared/store/
```

* auth
* UI global

---

# 🧪 Features

Cada módulo se organiza así:

```text
feature/
  pages/
  services/
  types/
  hooks/
```

Ejemplo:

```text
features/auth/
```

---

# 🎨 Estilos

* TailwindCSS
* Archivo base:

```text
shared/styles/index.css
```

---

# 📌 Convenciones de Código

## Naming

| Tipo           | Convención |
| -------------- | ---------- |
| Componentes    | PascalCase |
| Páginas        | PascalCase |
| Hooks          | camelCase  |
| Servicios      | kebab-case |
| Config / utils | kebab-case (archivo) / PascalCase (clase) |
| Tipos / DTOs   | kebab-case |
| Carpetas       | kebab-case |

---

# 🚀 Principios del Proyecto

* Separación por features
* Escalabilidad alineada con backend
* Bajo acoplamiento
* Reutilización controlada
* Código legible y mantenible

---

# 📈 Estado actual

Actualmente incluye:

* Autenticación (login)
* Configuración base
* Arquitectura lista para crecimiento
* Integración preparada con backend de inventario

---

# 🔜 Próximos módulos

* Inventory (Farmacia)
* Atención médica
* Reportería
* Seguridad

---

# 🧠 Notas finales

Este frontend está diseñado para crecer al mismo nivel que el backend, manteniendo:

* claridad estructural
* consistencia
* facilidad de mantenimiento

---
