# 💰 Finanzas de Cero

[![Estado del Proyecto](https://img.shields.io/badge/estado-en--desarrollo-brightgreen)](https://github.com/tu-usuario/finanzas-de-cero)
[![Licencia](https://img.shields.io/badge/licencia-MIT-blue)](https://opensource.org/licenses/MIT)
[![Versión](https://img.shields.io/badge/versión-1.0.0-informational)](https://github.com/tu-usuario/finanzas-de-cero/releases)

Un blog interactivo y moderno sobre finanzas personales, diseñado para ayudarte a tomar el control de tu dinero de una manera sencilla y visualmente atractiva.

---

### 🤔 ¿Qué es y qué problema resuelve?

**Finanzas de Cero** es una plataforma educativa que descomplica el mundo de las finanzas. Ofrece artículos, noticias, herramientas y calculadoras interactivas para que cualquier persona, sin importar su nivel de conocimiento, pueda aprender a gestionar mejor su dinero, planificar su futuro y alcanzar sus metas financieras.

El problema que resuelve es la falta de recursos accesibles y fáciles de entender sobre finanzas personales. En lugar de contenido denso y aburrido, ofrecemos una experiencia de usuario amigable y moderna.

---

### 📸 Capturas de Pantalla / Demo

![Demo de Finanzas de Cero](https://i.imgur.com/link-a-tu-imagen.png)

---

### 🛠️ Tecnologías Usadas

Este proyecto está construido con un stack de tecnologías modernas y eficientes:

*   **Framework Principal:** [Next.js](https://nextjs.org/) (React)
*   **Gestión de Contenido (CMS):** [Sanity.io](https://www.sanity.io/)
*   **Estilos y UI:**
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Radix UI](https://www.radix-ui.com/) y [Headless UI](https://headlessui.dev/) para componentes accesibles.
    *   [Framer Motion](https://www.framer.com/motion/) para animaciones.
*   **Visualización de Datos:** [Chart.js](https://www.chartjs.org/)
*   **Gestión de Estado:** [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)

---

### ✅ Requisitos Previos

Antes de empezar, asegúrate de tener instalado lo siguiente:

*   [Node.js](https://nodejs.org/es/) (versión 20 o superior)
*   [pnpm](https://pnpm.io/installation) (o el gestor de paquetes de tu preferencia)

---

### 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/finanzas-de-cero.git
    cd finanzas-de-cero
    ```

2.  **Instala las dependencias:**
    ```bash
    pnpm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade las credenciales de Sanity:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID="tu-project-id"
    NEXT_PUBLIC_SANITY_DATASET="tu-dataset"
    NEXT_PUBLIC_SANITY_API_VERSION="2023-05-03"
    ```

---

### 💻 Cómo Usarlo

Una vez configurado, puedes correr el servidor de desarrollo local:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el proyecto en acción.

---

### 📂 Estructura del Proyecto

El proyecto está organizado de la siguiente manera para mantener el código limpio y escalable:

```
/
├── app/                  # Rutas principales de la aplicación (Next.js App Router)
│   ├── (categorias)/     # Rutas para las diferentes secciones del blog
│   ├── api/              # Endpoints de la API
│   └── layout.tsx        # Layout principal
│
├── components/           # Componentes de React reutilizables
│   ├── ui/               # Componentes de UI genéricos (botones, cards, etc.)
│   ├── (funcionales)/    # Componentes con lógica específica (calculadoras, etc.)
│
├── lib/                  # Lógica de negocio, helpers y conexión con Sanity
│
├── public/               # Archivos estáticos (imágenes, iconos)
│
├── store/                # Configuración de Redux (slices, store)
│
└── studio-nextjs-blog/   # Estudio de Sanity para la gestión de contenido
```

---

### 🤝 Contribución y Licencia

¡Las contribuciones son bienvenidas! Si quieres mejorar el proyecto, por favor abre un *issue* o envía un *pull request*.

Este proyecto está bajo la **Licencia MIT**. Puedes ver los detalles en el archivo `LICENSE`.
