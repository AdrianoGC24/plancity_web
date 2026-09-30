# PlanCity



PlanCity es una plataforma web para la gestión y visualización de eventos. Permite a los usuarios explorar eventos organizados por categorías, consultar información detallada de cada evento y agregarlos a una lista de favoritos.

Además, cuenta con un panel administrativo donde los usuarios con rol de administrador pueden gestionar eventos y categorías, permitiendo crear, editar y eliminar información dentro de la plataforma.

El proyecto busca mantener la información centralizada y organizada mediante una arquitectura basada en funcionalidades, separando la lógica, componentes y consumo de servicios para facilitar el mantenimiento y escalabilidad.


# Tecnologías utilizadas

## Frontend

- React
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Axios


## React Router

Para el manejo de rutas se utilizó **React Router DOM**, permitiendo crear diferentes tipos de rutas:

- Rutas públicas.
- Rutas protegidas para usuarios autenticados.
- Rutas exclusivas para administradores.

Ejemplos:

```
/events
/events/:id
/login
/register
/favorites
/admin
```


## Tailwind CSS

Para el diseño de la interfaz se utilizó **Tailwind CSS**, permitiendo crear componentes visuales mediante clases reutilizables y mantener los estilos directamente dentro de los componentes.


## Axios

Para la comunicación con la API se utilizó **Axios**, ya que facilita el manejo de peticiones HTTP, configuración de endpoints e interceptores para enviar el token de autenticación.

Axios permite una estructura más organizada comparado con el uso directo de Fetch.


# Arquitectura del proyecto

El proyecto utiliza una arquitectura basada en funcionalidades (**Feature Based Architecture**).

Cada funcionalidad tiene sus propias carpetas:

- Pages.
- Components.
- Services.
- Hooks.


Estructura principal:

```
src
├── app
│   ├── providers
│   │   └── AuthProvider.tsx
│   └── router
│       └── index.tsx
│
├── features
│   ├── admin
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   └── services
│   │
│   ├── auth
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   └── services
│   │
│   ├── categories
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   └── services
│   │
│   ├── events
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   └── services
│   │
│   └── favorites
│       ├── components
│       ├── hooks
│       ├── pages
│       └── services
│
├── lib
│   ├── api.ts
│   └── storage.ts
│
├── shared
│   ├── components
│   ├── ErrorBoundary
│   └── layouts
│
└── types
```


# Organización del proyecto


## Pages

La carpeta `pages` contiene las vistas principales de cada módulo.

Ejemplos:

- Login.
- Registro.
- Lista de eventos.
- Detalle de eventos.
- Crear eventos.
- Editar eventos.
- Favoritos.
- Dashboard administrativo.


Las páginas se encargan principalmente del renderizado de información y composición de componentes.


## Components

La carpeta `components` contiene componentes reutilizables.

Ejemplo:

```
events/components/eventcard.tsx
```

Los componentes permiten evitar repetir código y mantener una interfaz organizada.


Ejemplos de componentes:

- Tarjetas de eventos.
- Tarjetas de favoritos.
- Elementos reutilizables de interfaz.


## Services

La carpeta `services` contiene la lógica encargada de comunicarse con la API.

Ejemplo:

```
events/services/eventService.ts
```

Aquí se encuentran funciones para:

- Obtener eventos.
- Crear eventos.
- Actualizar eventos.
- Eliminar eventos.


Separar los servicios permite mantener limpia la lógica de las páginas.


## Hooks

La carpeta `hooks` contiene lógica reutilizable basada en React Hooks.

Ejemplo:

```
auth/hooks/useAuth.ts
```

Permite acceder al contexto de autenticación y manejar información del usuario.


# Carpetas globales


## Lib

La carpeta `lib` contiene configuraciones generales utilizadas en toda la aplicación.


Estructura:

```
lib
├── api.ts
└── storage.ts
```


### api.ts

Contiene la configuración de Axios y la conexión con la API.


### storage.ts

Permite manejar el almacenamiento del token de autenticación.


# Shared

La carpeta `shared` contiene componentes utilizados por diferentes módulos del proyecto.

Ejemplo:

```
shared
├── components
│   ├── AdminRoute.tsx
│   └── ProtectedRoute.tsx
│
└── layouts
    ├── DashboardLayout.tsx
    └── PublicLayout.tsx
```


Contiene:

- Layout público.
- Layout administrativo.
- Rutas protegidas.
- Componentes generales.


# Funcionalidades


## Usuarios

Permite:

- Crear una cuenta.
- Iniciar sesión.
- Cerrar sesión.
- Mantener autenticación mediante token.


## Eventos

Permite:

- Visualizar eventos.
- Ver detalles de eventos.
- Crear eventos.
- Editar eventos.
- Eliminar eventos.
- Asociar eventos a categorías.


## Favoritos

Permite:

- Agregar eventos favoritos.
- Eliminar favoritos.
- Visualizar favoritos del usuario.


## Administración

El administrador puede:

- Crear categorías.
- Editar categorías.
- Eliminar categorías.
- Crear eventos.
- Editar eventos.
- Eliminar eventos.


# Instalación


## Requisitos

Antes de iniciar el proyecto se necesita tener instalado:

- Node.js
- npm


Verificar instalación:

```bash
node -v

npm -v
```


# Clonar repositorio

```bash
git clone URL_DEL_REPOSITORIO
```


Ingresar a la carpeta:

```bash
cd frontend
```


# Instalar dependencias

Ejecutar:

```bash
npm install
```


# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.


Ejemplo:

```env
VITE_API_URL=http://localhost:3000
```


Esta variable permite establecer la conexión con la API.


# Ejecutar proyecto


Modo desarrollo:

```bash
npm run dev
```


Luego abrir:

```
http://localhost:5173
```


# Scripts disponibles


Ejecutar servidor:

```bash
npm run dev
```


Generar compilación:

```bash
npm run build
```


Vista previa:

```bash
npm run preview
```


# Flujo de autenticación


1. El usuario inicia sesión.
2. La API devuelve un token.
3. El token se almacena mediante storage.
4. Axios utiliza el token para peticiones protegidas.
5. ProtectedRoute y AdminRoute validan el acceso según el usuario.


# Rutas principales


## Rutas públicas

```
/events

/events/:id

/login

/register
```


## Rutas autenticadas

```
/favorites
```


## Rutas administrativas

```
/admin

/admin/events/create

/admin/events/edit/:id

/admin/categories

/admin/categories/create

/admin/categories/edit/:id
```


# Autor
ronaldo rodriguez