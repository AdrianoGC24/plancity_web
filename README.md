# 🏙️ PlanCity — Plataforma de Gestión y Descubrimiento de Eventos Urbanos

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

**Prueba de Desempeño Fullstack | Arquitectura Monorepo Cloud-Native**

[Despliegues en Vivo](#-enlaces-en-vivo-y-despliegues-cloud) •
[Arquitectura Cloud](#-arquitectura-cloud-en-aws) •
[Estructura del Proyecto](#-estructura-del-proyecto-monorepo) •
[Guía de Instalación](#-guía-de-instalación-y-ejecución-local) •
[Endpoints y Módulos](#-módulos-y-endpoints-de-la-api) •
[Seguridad y Decisiones Técnicas](#-decisiones-técnicas-y-seguridad)

</div>

---

## 📋 Descripción Ejecutiva

**PlanCity** es una solución web fullstack diseñada para centralizar la publicación, exploración y gestión de eventos culturales, recreativos y comunitarios en entornos urbanos. Permite a los ciudadanos descubrir eventos filtrados por categoría o búsqueda textual, consultar fechas, aforos, precios, galerías de imágenes y gestionar una lista personalizada de favoritos. Asimismo, provee un panel de administración con control de acceso basado en roles (**RBAC**) para crear, actualizar y dar de baja eventos y categorías.

### Objetivos de la Prueba Técnica
1. **Excelencia en Backend**: Implementar una API REST robusta, modular y desacoplada con **NestJS 11**, validación tipada estricta, control de excepciones centralizado y documentación viva bajo el estándar OpenAPI (Swagger).
2. **Persistencia e Integridad**: Diseñar un modelo relacional en **PostgreSQL**, gestionado rigurosamente mediante migraciones de **TypeORM** (`synchronize: false`) y sembrado inicial de datos administrativos.
3. **Frontend Reactivo y Modular**: Diseñar una Single Page Application (SPA) con **React 19**, **Vite** y **Tailwind CSS v4**, estructurada bajo una arquitectura orientada a características (*Feature-Based Architecture*) con rutas públicas, protegidas y exclusivas de administrador.
4. **Infraestructura Cloud en AWS**: Desplegar la solución en la nube mediante servicios gestionados de nivel de producción: contenedores en **Amazon ECS con AWS Fargate**, imágenes versionadas en **Amazon ECR**, base de datos relacional en **Amazon RDS** con SSL, y frontend estático distribuido mediante **Amazon S3** y **Amazon CloudFront**.

---

## 🌐 Enlaces en Vivo y Despliegues Cloud

| Componente | Servicio AWS | Región / Alcance | URL / Enlace Directo | Estado |
|---|---|---|---|---|
| **Frontend Web App** | Amazon CloudFront + S3 | Global (Edge CDN) | `[PEGA_AQUÍ_LA_URL_DE_CLOUDFRONT]` *(ej. https://dXXXXXXXXXXXXX.cloudfront.net)* | 🚀 Preparado para distribución global |
| **Backend REST API** | Amazon ECS (Fargate) + ECR | `us-east-2` (Ohio) | [http://13.59.27.78:3000](http://13.59.27.78:3000) | 🟢 En línea (Puerto 3000) |
| **Documentación Swagger** | NestJS OpenAPI UI | `us-east-2` (Ohio) | [http://13.59.27.78:3000/api/docs](http://13.59.27.78:3000/api/docs) | 🟢 Interactivo & Testeable |
| **Base de Datos** | Amazon RDS PostgreSQL | `us-east-2` (Ohio) | Endpoint gestionado con cifrado TLS/SSL | 🔒 Conectada y migrada |

> [!NOTE]
> La URL del frontend cuenta con el placeholder indicado para adjuntar la distribución final de CloudFront vinculada al bucket S3 correspondiente.

---

## ☁️ Arquitectura Cloud en AWS

La infraestructura fue diseñada bajo principios de **alta disponibilidad, bajo acoplamiento y mínimo costo operativo** mediante servicios administrados y serverless:

```mermaid
flowchart TD
    subgraph Clientes["🌐 Clientes & Usuarios"]
        Browser["Navegador Web / Dispositivo Móvil"]
    end

    subgraph CDN_Storage["📦 Frontend Delivery Layer"]
        CF["Amazon CloudFront (CDN Global)"]
        S3["Amazon S3 Bucket (Assets Estáticos SPA)"]
        CF -->|S3 Origin| S3
    end

    subgraph Compute["⚡ Backend Compute Layer (AWS Fargate)"]
        ECR["Amazon ECR (Docker Registry)"]
        ECS["Amazon ECS Cluster (Fargate Service)"]
        Task["Task: Contenedor NestJS (Node 22)"]
        ECR -.->|Pull Image| Task
        ECS --> Task
    end

    subgraph Database["🗄️ Database Layer"]
        RDS[("Amazon RDS PostgreSQL (Multi-AZ Ready, TLS/SSL)")]
    end

    Browser -->|HTTPS / Rutas SPA| CF
    Browser -->|HTTP REST / JWT / Swagger| Task
    Task -->|PostgreSQL Wire Protocol con SSL| RDS
```

### Componentes de la Arquitectura
1. **Amazon CloudFront & Amazon S3**: Hospedaje del frontend compilado (`dist/`). S3 almacena los artefactos estáticos (HTML, JS, CSS) mientras CloudFront provee terminación SSL, compresión gzip/brotli y caché en puntos de presencia (Edge Locations) a nivel mundial.
2. **Amazon ECR (Elastic Container Registry)**: Registro privado donde se almacena la imagen Docker del backend construida mediante un proceso multi-etapa (*multi-stage build*).
3. **Amazon ECS (Elastic Container Service) con AWS Fargate**: Orquestación de contenedores sin servidor en la región `us-east-2`. Fargate abstrae la administración de servidores EC2, asignando cómputo bajo demanda con IP pública y exponiendo el puerto 3000.
4. **Amazon RDS PostgreSQL**: Instancia relacional gestionada encargada del almacenamiento transaccional seguro con cifrado en reposo y conexiones protegidas por TLS/SSL.

---

## 📂 Estructura del Proyecto (Monorepo)

El repositorio está organizado como un **Monorepo desacoplado** que aloja tanto la API de backend como la aplicación frontend cliente:

```
prueba_desempeño/
├── README.md                     # Documentación técnica principal del proyecto
├── backend/                      # API REST construida con NestJS 11 y TypeORM
│   ├── dockerfile                # Dockerfile multi-stage optimizado (Node 22 Alpine)
│   ├── nest-cli.json             # Configuración del CLI de NestJS
│   ├── package.json              # Dependencias y scripts del backend
│   ├── tsconfig.json             # Configuración del compilador TypeScript
│   ├── .env.example              # Plantilla de variables de entorno para la API
│   ├── src/
│   │   ├── main.ts               # Punto de entrada, Swagger, CORS y ValidationPipe
│   │   ├── app.module.ts         # Módulo raíz e inyección de TypeOrmModule con SSL
│   │   ├── data-source.ts        # Data Source para CLI de migraciones TypeORM
│   │   ├── common/               # Elementos transversales reutilizables
│   │   │   ├── decorators/       # @CurrentUser(), @Roles()
│   │   │   └── guards/           # JwtAuthGuard, RolesGuard
│   │   ├── migrations/           # Migraciones de esquema y seed de cuenta Admin
│   │   └── modules/              # Módulos de dominio funcional
│   │       ├── auth/             # Registro, login, JWT strategy y auth decorator
│   │       ├── users/            # Perfil (/users/me) y cambio de contraseña
│   │       ├── categories/       # CRUD de categorías (creación/edición admin)
│   │       ├── events/           # CRUD de eventos, filtros y relación de imágenes
│   │       └── favorites/        # Gestión de eventos favoritos por usuario
│   └── test/                     # Suites de pruebas E2E con Jest y Supertest
└── frontend/                     # Single Page Application con React 19 y Vite
    ├── Dockerfile                # Dockerfile para servir la SPA en producción con 'serve'
    ├── index.html                # Plantilla HTML base
    ├── package.json              # Dependencias y scripts del frontend
    ├── vite.config.ts            # Configuración de compilación Vite y Tailwind
    ├── .env                      # Configuración de API URL local
    └── src/
        ├── main.tsx              # Montaje del Virtual DOM de React
        ├── App.tsx               # Componente raíz de la aplicación
        ├── index.css             # Estilos globales y directivas de Tailwind CSS
        ├── app/
        │   ├── providers/        # Contexto global de autenticación (AuthProvider)
        │   └── router/           # Enrutador principal (React Router DOM v7)
        ├── features/             # Arquitectura orientada a características
        │   ├── admin/            # Dashboard administrativo, gestión de categorías y eventos
        │   ├── auth/             # Páginas de Login/Registro y servicios de sesión
        │   ├── categories/       # Páginas de categorías y servicios
        │   ├── events/           # Catálogo, detalle de evento, tarjetas y administración
        │   └── favorites/        # Vista y servicios de eventos favoritos
        ├── lib/                  # Clientes HTTP (Axios interceptors) y local storage
        ├── shared/               # Componentes compartidos y layouts (Public, Dashboard)
        │   ├── components/       # ProtectedRoute, AdminRoute
        │   └── layouts/          # PublicLayout, DashboardLayout
        └── types/                # Definiciones de tipos TypeScript e interfaces
```

---

## 🛠️ Guía de Instalación y Ejecución Local

### Prerrequisitos
- **Node.js**: Versión `20.x` o `22.x` recomendada.
- **npm**: Versión `10.x` o superior.
- **PostgreSQL**: Servidor local (puerto 5432) o una instancia cloud accesible (Amazon RDS / Supabase).
- **Docker** *(opcional)*: Para ejecución contenerizada.

---

### 1. Clonar el Repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd prueba_desempeño
```

---

### 2. Configuración y Ejecución del Backend

1. **Navegar a la carpeta y copiar el archivo de entorno:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Configurar las variables de entorno en `backend/.env`:**
   ```env
   PORT=3000
   DATABASE_URL=postgresql://usuario:password@localhost:5432/plancity?schema=public
   JWT_SECRET=super_secreto_plancity_jwt_development_2026
   JWT_EXPIRES_IN=24h
   NODE_TLS_REJECT_UNAUTHORIZED=0
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Ejecutar las migraciones de TypeORM:**
   > [!IMPORTANT]
   > El comando de migración crea automáticamente las tablas relacionales y siembra el usuario administrador inicial.
   ```bash
   npm run migration:run
   ```

5. **Iniciar el servidor en modo desarrollo:**
   ```bash
   npm run start:dev
   ```
   *La API estará escuchando en `http://localhost:3000` y la documentación Swagger en `http://localhost:3000/api/docs`.*

---

### 3. Configuración y Ejecución del Frontend

1. **Abrir una nueva terminal y navegar a `frontend`:**
   ```bash
   cd frontend
   ```

2. **Configurar las variables de entorno en `frontend/.env`:**
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   *(Para apuntar al backend desplegado en AWS ECS, puedes usar: `VITE_API_URL=http://13.59.27.78:3000`)*

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo de Vite:**
   ```bash
   npm run dev
   ```
   *La aplicación abrirá por defecto en `http://localhost:5173`.*

---

### 4. Ejecución Alternativa mediante Docker

#### Backend
```bash
cd backend
docker build -t plancity-backend .
docker run -p 3000:3000 --env-file .env plancity-backend
```

#### Frontend
```bash
cd frontend
docker build -t plancity-frontend .
docker run -p 8080:3000 plancity-frontend
```

---

## 🔑 Credenciales de Acceso para Pruebas

El sistema cuenta con un usuario administrador pre-sembrado en la migración inicial de base de datos:

| Rol | Correo Electrónico | Contraseña | Capacidades |
|---|---|---|---|
| **Admin** | `admin@examen.com` | `Admin123!` | Acceso total al Dashboard administrativo, CRUD de Categorías y Eventos, favoritos. |
| **User** | *(Vía registro en `/register`)* | *(Definida por el usuario)* | Exploración pública de eventos, agregar/remover favoritos y gestionar su perfil. |

---

## 📡 Módulos y Endpoints de la API

La API cuenta con validación global mediante `ValidationPipe` con exclusión de propiedades no declaradas (`whitelist: true`, `forbidNonWhitelisted: true`) y control de autenticación mediante encabezados Bearer JWT:
```http
Authorization: Bearer <tu_token_jwt>
```

### 1. Módulo de Autenticación (`/auth`)
| Método | Endpoint | Acceso | Rol | Descripción |
|---|---|---|---|---|
| `POST` | `/auth/register` | Público | — | Registra un nuevo usuario con rol `user` y devuelve de inmediato el token de acceso JWT. |
| `POST` | `/auth/login` | Público | — | Autentica credenciales y retorna el token JWT junto con los datos básicos del usuario. |
| `POST` | `/auth/logout` | Protegido | Cualquiera | Confirmación de cierre de sesión para descarte seguro del token en el cliente. |

### 2. Módulo de Usuarios y Perfil (`/users`)
| Método | Endpoint | Acceso | Rol | Descripción |
|---|---|---|---|---|
| `GET` | `/users/me` | Protegido | Cualquiera | Retorna la información de perfil del usuario en sesión (`id`, `name`, `email`, `role`). |
| `PATCH` | `/users/me/password` | Protegido | Cualquiera | Permite actualizar la contraseña verificando previamente la contraseña actual. |

### 3. Módulo de Categorías (`/categories`)
| Método | Endpoint | Acceso | Rol | Descripción |
|---|---|---|---|---|
| `GET` | `/categories` | Público | — | Lista todas las categorías registradas en el sistema. |
| `GET` | `/categories/:id` | Público | — | Obtiene el detalle de una categoría específica mediante su UUID. |
| `POST` | `/categories` | Protegido | `admin` | Crea una nueva categoría con nombre y descripción. |
| `PATCH` | `/categories/:id` | Protegido | `admin` | Actualiza los datos de una categoría existente. |
| `DELETE` | `/categories/:id` | Protegido | `admin` | Elimina una categoría (protegida si posee eventos asociados vía FK `RESTRICT`). |

### 4. Módulo de Eventos (`/events`)
| Método | Endpoint | Acceso | Rol | Descripción |
|---|---|---|---|---|
| `GET` | `/events` | Público | — | Listado de eventos con soporte para búsqueda textual (`search`) y filtro por categoría (`categoryId`). |
| `GET` | `/events/:id` | Público | — | Retorna el detalle completo de un evento, incluyendo su categoría y galería de imágenes. |
| `POST` | `/events` | Protegido | `admin` | Crea un nuevo evento con fecha, ubicación, precio, capacidad y URLs de imágenes. |
| `PATCH` | `/events/:id` | Protegido | `admin` | Actualiza la información y galería de imágenes de un evento existente. |
| `DELETE` | `/events/:id` | Protegido | `admin` | Elimina un evento y sus imágenes asociadas en cascada. |

### 5. Módulo de Favoritos (`/favorites`)
| Método | Endpoint | Acceso | Rol | Descripción |
|---|---|---|---|---|
| `GET` | `/favorites` | Protegido | Cualquiera | Lista todos los eventos agregados a favoritos por el usuario autenticado. |
| `POST` | `/favorites/:eventId` | Protegido | Cualquiera | Marca un evento como favorito (restringido por unicidad `user_id` + `event_id`). |
| `DELETE` | `/favorites/:eventId` | Protegido | Cualquiera | Remueve un evento de la lista de favoritos del usuario. |

---

## 🔒 Decisiones Técnicas y Consideraciones de Seguridad

### 1. Conexión Cifrada a Amazon RDS (SSL/TLS)
Amazon RDS PostgreSQL implementa certificados SSL para el cifrado del tráfico en tránsito. En la configuración de TypeORM (`app.module.ts` y `data-source.ts`), se habilita la opción:
```typescript
ssl: { rejectUnauthorized: false }
```
Acompañado de la variable de entorno `NODE_TLS_REJECT_UNAUTHORIZED=0` en entornos contenerizados o de evaluación. Esta decisión permite establecer conexiones cifradas sin requerir la inyección manual de la cadena completa de certificados raíz de la Autoridad Certificadora (CA) de AWS dentro del contenedor, garantizando agilidad y compatibilidad en el aprovisionamiento.

### 2. Contenedorización Multi-Stage en AWS Fargate
El archivo `backend/dockerfile` utiliza una construcción multi-etapa con `node:22-alpine`:
- **Stage Builder**: Instala todas las dependencias (`npm ci`), compila TypeScript a JavaScript nativo en la carpeta `dist/`.
- **Stage Runner**: Inicia desde una imagen limpia de Alpine, copia únicamente las dependencias de producción (`npm ci --omit=dev`) y los artefactos compilados de `dist/`.
- **Beneficios**: Reduce drásticamente la superficie de ataque, disminuye el peso de la imagen transferida a Amazon ECR a menos de 200 MB y optimiza los tiempos de arranque de las tareas de AWS Fargate.

### 3. Autenticación y Autorización Robusta (RBAC & JWT)
- **Tokens Stateless**: Los tokens JWT contienen únicamente los datos necesarios (`sub`, `email`, `role`) y se firman con secreto criptográfico independiente.
- **Decorador Combinado `@Auth(role)`**: En NestJS se unifican la validación del token (`JwtAuthGuard`) y la comprobación de privilegios (`RolesGuard`) en un solo decorador declarativo, reduciendo la posibilidad de error humano al exponer endpoints.
- **Protección de Contraseñas**: Se utiliza `bcrypt` con un factor de coste de 10 rondas de salting tanto en el registro de usuarios como en la migración de siembra inicial.

### 4. Seguridad de Entrada y Control de Esquema
- **ValidationPipe con Whitelisting**: Ninguna propiedad no explícitamente declarada en los DTOs ingresa al flujo de ejecución (`whitelist: true`, `forbidNonWhitelisted: true`), mitigando ataques de inyección de parámetros masivos (*Mass Assignment*).
- **Inmutabilidad y Trazabilidad del Esquema**: `synchronize` se mantiene estrictamente en `false`. Cualquier modificación de tablas, índices o relaciones se aplica exclusivamente a través de migraciones versionadas en Git.

---

<div align="center">

**PlanCity** — Diseñado con los más altos estándares de ingeniería de software, seguridad y computación en la nube.

</div>
