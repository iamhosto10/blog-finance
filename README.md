# 💰 Monopolombiano

[![Estado del Proyecto](https://img.shields.io/badge/estado-activo-brightgreen)](https://monopolombiano.com/)
[![Licencia](https://img.shields.io/badge/licencia-privada-blue)]()
[![Versión](https://img.shields.io/badge/versión-1.0.0-informational)]()

Un blog interactivo y moderno sobre finanzas personales en Colombia, diseñado para ayudarte a tomar el control de tu dinero de una manera sencilla y visualmente atractiva.

---

### 🤔 ¿Qué es y qué problema resuelve?

**Monopolombiano** es una plataforma educativa enfocada en el ecosistema financiero de Colombia. Su misión es desmitificar el mundo de las finanzas y hacerlo accesible para todos. A través de artículos detallados, noticias de actualidad, y herramientas interactivas como calculadoras de presupuesto y conversores de divisas, la plataforma guía a los usuarios para que puedan:

*   **Entender productos financieros:** Desde cuentas de ahorro y tarjetas de crédito hasta opciones de inversión y créditos hipotecarios.
*   **Tomar decisiones informadas:** Comparamos y analizamos diferentes opciones del mercado para que elijas la que mejor se adapte a tus necesidades.
*   **Mejorar su salud financiera:** Ofrecemos consejos prácticos sobre ahorro, manejo de deudas y planificación para el futuro.

El problema principal que **Monopolombiano** resuelve es la brecha de conocimiento financiero que existe en el país. Mucha gente toma decisiones importantes sobre su dinero basándose en información incompleta, desactualizada o demasiado compleja. Nuestra plataforma centraliza y simplifica esta información, presentándola de una manera clara, objetiva y fácil de digerir.

---

### 📸 Capturas de Pantalla / Demo

¡Visita nuestro demo en vivo para explorar todas las funcionalidades!

**[➡️ Ver Demo en vivo en monopolombiano.com](https://monopolombiano.com/)**

![Demo de Monopolombiano](https://i.imgur.com/link-a-tu-imagen.png)

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
    git clone https://github.com/tu-usuario/monopolombiano.git
    cd monopolombiano
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
