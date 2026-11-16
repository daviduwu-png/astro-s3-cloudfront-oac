# Portafolio Web Modular en Astro — Despliegue en AWS S3 + CloudFront con OAC

Plantilla de portafolio profesional para desarrolladores de software construida en **Astro** bajo un patrón de **Arquitectura Modular**, optimizada para compilarse como sitio estático de alto rendimiento y desplegarse de forma segura en **Amazon S3 (Bucket Privado)** distribuido globalmente con **Amazon CloudFront** mediante **Origin Access Control (OAC)**.

---

## Tabla de Contenidos

1. [Requisitos e Instalación Rápida (Clonar el Repositorio)](#1-requisitos-e-instalación-rápida-clonar-el-repositorio)
2. [Estructura del Proyecto](#2-estructura-del-proyecto)
3. [Arquitectura de Despliegue en AWS (S3 Privado + CloudFront + OAC)](#3-arquitectura-de-despliegue-en-aws-s3-privado--cloudfront--oac)
4. [Compatibilidad con Otros Frameworks Frontend](#4-compatibilidad-con-otros-frameworks-frontend)
5. [Seguridad IAM (Mínimo Privilegio) y Configuración de AWS CLI](#5-seguridad-iam-mínimo-privilegio-y-configuración-de-aws-cli)
6. [Guía de Despliegue: Opción 1 — Consola Web de AWS](#6-guía-de-despliegue-opción-1--consola-web-de-aws)
7. [Guía de Despliegue: Opción 2 — Terminal con AWS CLI](#7-guía-de-despliegue-opción-2--terminal-con-aws-cli)
8. [Verificación y Pruebas de Seguridad](#8-verificación-y-pruebas-de-seguridad)
9. [Actualización del Sitio e Invalidación de Caché](#9-actualización-del-sitio-e-invalidación-de-caché)

---

## 1. Requisitos e Instalación Rápida (Clonar el Repositorio)

### Requisitos previos
- **Node.js** `>= 22.22.0`
- **npm** `>= 9.x`
- Cuenta de **AWS** (y opcionalmente **AWS CLI v2** configurado si deseas desplegar desde terminal)

### Clonar y ejecutar en local

```bash
# 1. Clonar el repositorio
git clone https://github.com/<tu-usuario>/astro-s3-cloudfront-oac.git
cd astro-s3-cloudfront-oac

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo en http://localhost:4321
npm run dev

# 4. Generar el build estático de producción en ./dist
npm run build

# 5. Previsualizar localmente el build de producción
npm run preview
```

---

## 2. Estructura del Proyecto

El proyecto está organizado de forma modular (separando datos, componentes UI, módulos de sección y páginas) para que sea fácil de mantener y compilar a archivos estáticos en `./dist/`:

```text
/
├── public/                        # Activos estáticos puros (favicons)
├── src/
│   ├── config/
│   │   └── site.config.ts         # Configuración global, navegación y contacto
│   ├── types/
│   │   └── portfolio.ts           # Contratos e interfaces TypeScript
│   ├── data/                      # Capa de datos desacoplada de la vista
│   │   ├── profile.data.ts        # Información del desarrollador y métricas
│   │   ├── services.data.ts       # Servicios y especialidades técnicas
│   │   ├── projects.data.ts       # Proyectos destacados del portafolio
│   │   ├── skills.data.ts         # Stack tecnológico por categorías
│   │   └── experience.data.ts     # Trayectoria laboral
│   ├── styles/
│   │   └── global.css             # Variables CSS (paleta azul/morado) y utilidades
│   ├── layouts/
│   │   └── MainLayout.astro       # Estructura HTML base y metadatos SEO
│   ├── components/
│   │   ├── ui/                    # Componentes base reutilizables
│   │   │   ├── Icon.astro         # Sistema de iconos vectoriales SVG
│   │   │   ├── Badge.astro        # Etiquetas visuales
│   │   │   └── SectionHeader.astro# Encabezados de sección estandarizados
│   │   ├── layout/
│   │   │   ├── Navbar.astro       # Navegación principal
│   │   │   └── Footer.astro       # Pie de página
│   │   └── modules/               # Módulos independientes del portafolio
│   │       ├── hero/HeroModule.astro
│   │       ├── services/ServicesModule.astro
│   │       ├── projects/ProjectsModule.astro
│   │       ├── skills/SkillsModule.astro
│   │       ├── experience/ExperienceModule.astro
│   │       └── contact/ContactModule.astro
│   └── pages/
│       ├── index.astro            # Página principal que ensambla los módulos
│       └── 404.astro              # Página 404 para respuestas de error en CloudFront
└── package.json
```

---

## 3. Arquitectura de Despliegue en AWS (S3 Privado + CloudFront + OAC)

En lugar de exponer un bucket de S3 al público mediante el antiguo modo *Static Website Hosting*, esta arquitectura implementa la práctica recomendada de seguridad en AWS: **Origin Access Control (OAC)**.

- **Bucket S3 100% Privado:** Mantiene activa la opción `Block all public access`. Cualquier intento de abrir objetos usando la URL directa de S3 recibe `403 Access Denied`.
- **Origin Access Control (OAC):** CloudFront autentica y firma cada solicitud hacia S3 utilizando el protocolo criptográfico **AWS Signature Version 4 (SigV4)**.
- **Política de Recursos (Bucket Policy):** El bucket de S3 solo acepta peticiones `s3:GetObject` provenientes del servicio `cloudfront.amazonaws.com` cuando la clave de condición (`Condition Key`) `AWS:SourceArn` coincide exactamente con el ARN de nuestra distribución de CloudFront.

### Diagrama 1: Arquitectura General en AWS (Despliegue IAM + Entrega Segura OAC)

![Arquitectura General en AWS (Despliegue IAM + Entrega Segura OAC)](./docs/images/Arquitectura%20General%20en%20AWS%20%28Despliegue%20IAM%20%2B%20Entrega%20Segura%20OAC%29.png)

### Diagrama 2: Flujo de Petición y Seguridad con CloudFront OAC

![Flujo de Petición y Seguridad con CloudFront OAC](./docs/images/Flujo%20de%20Petici%C3%B3n%20y%20Seguridad%20con%20CloudFront%20OAC.png)

---

## 4. Compatibilidad con Otros Frameworks Frontend

Esta misma infraestructura de **S3 + CloudFront con OAC** sirve para alojar cualquier framework de frontend que compile a archivos estáticos. Solo debes tener en cuenta qué directorio genera cada herramienta al compilar y cómo configurar las páginas de error (`403` / `404`) en CloudFront:

| Framework | Tipo de Aplicación | Comando Build | Carpeta a subir a S3 | Configuración en CloudFront (`Custom Error Response` para `403`) |
| :--- | :--- | :--- | :--- | :--- |
| **Astro** *(este repositorio)* | **SSG / MPA** | `npm run build` | `dist/` | Redirigir a `/404.html` con código de respuesta **`404 Not Found`** |
| **React + Vite** | **SPA** (Client Router) | `npm run build` | `dist/` | Redirigir a `/index.html` con código de respuesta **`200 OK`** |
| **Angular (v17 / v18 / v19+)** | **SPA** (Client Router) | `ng build` | `dist/<proyecto>/browser/` | Redirigir a `/index.html` con código de respuesta **`200 OK`** |
| **Vue 3 + Vite** | **SPA** (Client Router) | `npm run build` | `dist/` | Redirigir a `/index.html` con código de respuesta **`200 OK`** |
| **Next.js (`output: 'export'`)** | **SSG Híbrido** | `npm run build` | `out/` | Redirigir a `/404.html` con código **`404 Not Found`** |
| **SvelteKit (`adapter-static`)** | **SSG / SPA** | `npm run build` | `build/` | `/404.html` (`404`) para SSG o `/index.html` (`200 OK`) para SPA |

> [!TIP]
> **Sitios Astro / Next.js con múltiples rutas (subcarpetas):** `DefaultRootObject` (`index.html`) en CloudFront solo aplica a la ruta raíz `/`. Si agregas subrutas como `/blog/` en Astro, configura `build: { format: 'file' }` en `astro.config.mjs` (o usa una *CloudFront Function* para reescribir `/` a `/index.html`).

---

## 5. Seguridad IAM (Mínimo Privilegio) y Configuración de AWS CLI

Por buenas prácticas de seguridad en AWS (**Well-Architected Framework**), **nunca debes operar con el usuario Root** ni asignar políticas amplias como `AdministratorAccess` o `AmazonS3FullAccess` para tareas rutinarias de despliegue.

### Política IAM de Mínimo Privilegio

Esta política restringe las acciones de S3 exclusivamente a buckets cuyo nombre comience por `portafolio-astro-*` y limita CloudFront a las operaciones necesarias para OAC, distribución e invalidación:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3ListBucketsForConsoleUI",
      "Effect": "Allow",
      "Action": [
        "s3:ListAllMyBuckets"
      ],
      "Resource": "*"
    },
    {
      "Sid": "S3BucketManagementScoped",
      "Effect": "Allow",
      "Action": [
        "s3:CreateBucket",
        "s3:DeleteBucket",
        "s3:ListBucket",
        "s3:GetBucketLocation",
        "s3:GetBucketOwnershipControls",
        "s3:PutBucketOwnershipControls",
        "s3:GetEncryptionConfiguration",
        "s3:PutEncryptionConfiguration",
        "s3:GetBucketPublicAccessBlock",
        "s3:PutBucketPublicAccessBlock",
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy"
      ],
      "Resource": "arn:aws:s3:::portafolio-astro-*"
    },
    {
      "Sid": "S3ObjectOperationsScoped",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::portafolio-astro-*/*"
    },
    {
      "Sid": "CloudFrontOACAndDistributionScoped",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateOriginAccessControl",
        "cloudfront:GetOriginAccessControl",
        "cloudfront:ListOriginAccessControls",
        "cloudfront:DeleteOriginAccessControl",
        "cloudfront:CreateDistribution",
        "cloudfront:GetDistribution",
        "cloudfront:GetDistributionConfig",
        "cloudfront:UpdateDistribution",
        "cloudfront:DeleteDistribution",
        "cloudfront:ListDistributions",
        "cloudfront:ListCachePolicies",
        "cloudfront:GetCachePolicy",
        "cloudfront:ListOriginRequestPolicies",
        "cloudfront:ListResponseHeadersPolicies",
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:ListInvalidations"
      ],
      "Resource": "*"
    }
  ]
}
```

### Cómo crear la identidad IAM y adjuntarle esta política

Tienes dos caminos dependiendo de cómo administres tu cuenta de AWS:

#### Opción A: En una cuenta personal (IAM User de laboratorio — Consola Web)
1. **Crear la política:**
   - Entra a la consola de **IAM** -> **Policies** -> **Create policy**.
   - Cambia a la pestaña **JSON**, pega el bloque anterior y haz clic en **Next**.
   - Nómbrala `Politica-Astro-S3-CloudFront-OAC` y haz clic en **Create policy**.
2. **Crear el usuario y adjuntar la política:**
   - Ve a **IAM** -> **Users** -> **Create user** (por ejemplo `deployer-astro-oac`).
   - *(Opcional si usarás la Consola Web)*: Marca **Provide user access to the AWS Management Console** -> elige **I want to create an IAM user** -> asigna una contraseña personalizada y desmarca *Users must create a new password at next sign-in*.
   - En **Permissions options**, selecciona **Attach policies directly**, busca `Politica-Astro-S3-CloudFront-OAC`, márcala y finaliza en **Create user**.
3. **Obtener credenciales según el modo que vayas a usar:**
   - **Si desplegarás por Consola Web:** Cierra sesión de tu cuenta principal e inicia sesión con la **Sign-in URL** y la contraseña de `deployer-astro-oac`.
   - **Si desplegarás por AWS CLI:** Entra al usuario `deployer-astro-oac` -> pestaña **Security credentials** -> **Create access key** -> elige **Command Line Interface (CLI)** -> copia el `Access Key ID` y el `Secret Access Key`, y configúralo en un perfil aislado:

```bash
# Configurar un perfil dedicado sin sobrescribir el perfil default
aws configure --profile tutorial-oac
# Ingresa Access Key ID, Secret Access Key, región (ej. us-east-1) y formato (json)

# Activar el perfil en la sesión actual de la terminal
export AWS_PROFILE=tutorial-oac

# Verificar identidad activa
aws sts get-caller-identity
```

*(Por seguridad, si creaste un usuario y Access Keys solo para este laboratorio, desactiva o elimina las llaves y el usuario al terminar).*

#### Opción B: En entornos productivos / AWS Organizations (Estándar moderno con IAM Identity Center)
En lugar de crear un IAM User con Access Keys estáticas:
1. En **AWS IAM Identity Center**, crea un **Permission Set** personalizado y adjúntale la misma política JSON `Politica-Astro-S3-CloudFront-OAC` como *Inline policy*.
2. Asigna ese Permission Set a tu usuario y cuenta de AWS.
3. Inicia sesión en la Consola desde el portal de acceso o en la terminal con credenciales temporales:

```bash
aws configure sso --profile tutorial-oac
aws sso login --profile tutorial-oac
export AWS_PROFILE=tutorial-oac
```

---

## 6. Guía de Despliegue: Opción 1 — Consola Web de AWS

### Paso 1: Compilar el proyecto
Ejecuta `npm run build` en tu máquina local para generar la carpeta `dist/`.

### Paso 2: Crear el Bucket S3 Privado y subir los archivos

> [!IMPORTANT]
> **Prefijo obligatorio del Bucket (`portafolio-astro-`):** Si estás usando la política IAM de mínimo privilegio de la Sección 5, el nombre de tu bucket **debe comenzar obligatoriamente por `portafolio-astro-`** (por ejemplo `portafolio-astro-oac-web-2026`). Si eliges otro nombre como `mi-sitio-personal`, recibirás un error **`Access Denied`** en S3.

1. En la consola de **Amazon S3**, haz clic en **Create bucket**.
2. Asigna un nombre único respetando el prefijo (por ejemplo `portafolio-astro-oac-web`) y selecciona tu región (`us-east-1`).
3. Asegúrate de mantener marcada la casilla **Block all public access** (Bloquear todo el acceso público).
4. Crea el bucket, entra en él y presiona **Upload** para subir **el contenido interno de la carpeta `dist/`** (`index.html`, `404.html`, `favicon.svg` y la carpeta `_astro/`).

### Paso 3: Crear la Distribución de CloudFront y el OAC
1. Ve a **Amazon CloudFront** -> **Create a CloudFront distribution**.
2. **Origin domain**: Selecciona tu bucket de S3.
3. **Origin access**: Elige **Origin access control settings (recommended)** -> haz clic en **Create new OAC** -> mantén marcada la opción **Sign requests (recommended)** y créalo.
4. **Viewer protocol policy**: Selecciona **Redirect HTTP to HTTPS**.
5. **Default root object**: Escribe `index.html`.
6. Haz clic en **Create distribution**.

### Paso 4: Aplicar la Política del Bucket en S3
1. En el aviso superior de CloudFront, haz clic en **Copy policy**.
2. Ve a tu bucket en **Amazon S3** -> pestaña **Permissions** -> sección **Bucket policy** -> **Edit**.
3. Pega la política copiada y guarda los cambios:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::portafolio-astro-oac-web/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::<AWS_ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>"
        }
      }
    }
  ]
}
```

4. Haz clic en **Save changes** *(si acabas de crear la distribución hace pocos segundos y S3 rechaza temporalmente la política, espera 15–30 segundos a que el ARN de CloudFront termine de propagarse y vuelve a guardar)*.

### Paso 5: Configurar Respuesta de Error Personalizada (404)
1. En tu distribución de CloudFront, abre la pestaña **Error pages** -> **Create custom error response**.
2. Selecciona **HTTP error code**: `403: Forbidden`, activa **Customize error response: Yes**, define **Response page path**: `/404.html` y **HTTP Response code**: `404: Not Found`.

---

## 7. Guía de Despliegue: Opción 2 — Terminal con AWS CLI

Puedes realizar todo el aprovisionamiento y despliegue directamente desde la terminal con **AWS CLI v2**:

> [!NOTE]
> **Importante antes de empezar (Windows y Sesión de Terminal):**
> - **Usuarios de Windows:** Los comandos de esta sección utilizan sintaxis Bash (`export`, `<<EOF`, JSON en línea con comillas escapadas y `/tmp/`), por lo que fallarán en CMD o PowerShell nativo. Ejecútalos desde **WSL (Windows Subsystem for Linux)** o **Git Bash**.
> - **No cierres la terminal:** Ejecuta todos los pasos en la misma sesión de terminal para no perder las variables exportadas (`$AWS_PROFILE`, `$BUCKET_NAME`, `$OAC_ID`, `$DISTRIBUTION_ID`). Si cierras la ventana, deberás volver a exportarlas.
> - **Prefijo obligatorio:** `$BUCKET_NAME` debe mantener el prefijo `portafolio-astro-` si usas la política IAM de la Sección 5.

### Paso 1: Configurar variables y crear el Bucket S3 Privado

```bash
export AWS_REGION="us-east-1"
export ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
export BUCKET_NAME="portafolio-astro-oac-${ACCOUNT_ID}"

# Crear el bucket S3 (en us-east-1; si usas otra región, agrega: --create-bucket-configuration LocationConstraint="$AWS_REGION")
aws s3api create-bucket \
  --bucket "$BUCKET_NAME" \
  --region "$AWS_REGION"

# Asegurar que el bloqueo de acceso público esté activo
aws s3api put-public-access-block \
  --bucket "$BUCKET_NAME" \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### Paso 2: Compilar Astro y sincronizar archivos hacia S3

```bash
npm run build
aws s3 sync ./dist "s3://${BUCKET_NAME}" --delete
```

### Paso 3: Crear el Origin Access Control (OAC)

```bash
export OAC_ID=$(aws cloudfront create-origin-access-control \
  --origin-access-control-config "{
    \"Name\": \"OAC-${BUCKET_NAME}\",
    \"Description\": \"Control de acceso OAC SigV4 para ${BUCKET_NAME}\",
    \"SigningProtocol\": \"sigv4\",
    \"SigningBehavior\": \"always\",
    \"OriginAccessControlOriginType\": \"s3\"
  }" \
  --query "OriginAccessControl.Id" \
  --output text)
```

### Paso 4: Crear la Distribución de CloudFront

```bash
cat <<EOF > /tmp/cf-distribution-config.json
{
  "CallerReference": "astro-oac-$(date +%s)",
  "Comment": "Distribucion CloudFront con OAC para ${BUCKET_NAME}",
  "Enabled": true,
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3Origin-${BUCKET_NAME}",
        "DomainName": "${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com",
        "OriginPath": "",
        "CustomHeaders": { "Quantity": 0 },
        "S3OriginConfig": { "OriginAccessIdentity": "" },
        "OriginAccessControlId": "${OAC_ID}"
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3Origin-${BUCKET_NAME}",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": { "Quantity": 2, "Items": ["GET", "HEAD"] }
    },
    "Compress": true,
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
  },
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 403,
        "ResponsePagePath": "/404.html",
        "ResponseCode": "404",
        "ErrorCachingMinTTL": 10
      }
    ]
  },
  "PriceClass": "PriceClass_100"
}
EOF

export DISTRIBUTION_ID=$(aws cloudfront create-distribution \
  --distribution-config file:///tmp/cf-distribution-config.json \
  --query "Distribution.Id" \
  --output text)

export CF_DOMAIN=$(aws cloudfront get-distribution \
  --id "$DISTRIBUTION_ID" \
  --query "Distribution.DomainName" \
  --output text)

echo "Distribución creada: https://${CF_DOMAIN}"
```

### Paso 5: Aplicar la Bucket Policy en S3 desde la Terminal

```bash
cat <<EOF > /tmp/s3-bucket-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${BUCKET_NAME}/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::${ACCOUNT_ID}:distribution/${DISTRIBUTION_ID}"
        }
      }
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket "$BUCKET_NAME" \
  --policy file:///tmp/s3-bucket-policy.json

# Opcional: esperar a que CloudFront termine de propagar la distribución (tarda 2-5 min)
aws cloudfront wait distribution-deployed --id "$DISTRIBUTION_ID"
echo "Sitio disponible en: https://${CF_DOMAIN}"
```

---

## 8. Verificación y Pruebas de Seguridad

Una vez que la distribución de CloudFront pase a estado `Deployed`, ejecuta estas 4 pruebas (en el navegador o desde terminal con `curl`) para confirmar que el bucket es privado y OAC funciona correctamente:

| Prueba | URL a consultar | Resultado esperado | Qué valida |
| :--- | :--- | :--- | :--- |
| **1. Acceso directo a S3** | `https://<BUCKET>.s3.<REGION>.amazonaws.com/index.html` | **`403 Access Denied`** | El bucket es 100% privado (`Block Public Access` activo) |
| **2. Acceso vía CloudFront** | `https://<CF_DOMAIN>/` | **`200 OK`** | CloudFront firma con OAC (SigV4) y S3 valida `AWS:SourceArn` |
| **3. Redirección HTTPS** | `http://<CF_DOMAIN>/` | **`301 Moved Permanently`** -> `https://` | Política `redirect-to-https` funcionando |
| **4. Ruta inexistente (404)** | `https://<CF_DOMAIN>/ruta-inexistente` | **`404 Not Found`** (`/404.html`) | `Custom Error Response` interceptando el `403` de S3 |

### Comandos rápidos de verificación desde terminal

```bash
# 1. Confirmar bloqueo directo del bucket S3 (debe responder HTTP/1.1 403 Forbidden)
curl -I "https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/index.html"

# 2. Confirmar entrega segura por CloudFront + OAC (debe responder HTTP/2 200 y mostrar X-Cache)
curl -I "https://${CF_DOMAIN}/"

# 3. Confirmar redirección automática de HTTP a HTTPS (debe responder 301)
curl -I "http://${CF_DOMAIN}/"

# 4. Confirmar página 404 personalizada (debe responder 404)
curl -I "https://${CF_DOMAIN}/ruta-inexistente"
```

*(Tip: si ejecutas `curl -I "https://${CF_DOMAIN}/"` dos veces seguidas, verás cambiar la cabecera `x-cache` de `Miss from cloudfront` a `Hit from cloudfront`)*.

---

## 9. Actualización del Sitio e Invalidación de Caché

Cada vez que modifiques el portafolio y desees publicar los cambios en producción:

### Desde la Consola Web de AWS
1. Ejecuta `npm run build` y sube el nuevo contenido de `dist/` a tu bucket S3 (sobrescribiendo los archivos anteriores).
2. Ve a **Amazon CloudFront** -> entra a tu distribución -> pestaña **Invalidations** -> **Create invalidation**.
3. En **Object paths**, escribe `/*` y haz clic en **Create invalidation**.

### Desde AWS CLI

```bash
# 1. Compilar nuevos cambios
npm run build

# 2. Sincronizar carpeta dist/ con el bucket S3
aws s3 sync ./dist "s3://${BUCKET_NAME}" --delete

# 3. Invalidar caché en los nodos Edge de CloudFront
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*"
```
