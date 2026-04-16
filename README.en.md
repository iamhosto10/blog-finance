# 💰 Monopolombiano

[![Project Status](https://img.shields.io/badge/status-active-brightgreen)](https://monopolombiano.com/)
[![License](https://img.shields.io/badge/license-private-blue)]()
[![Version](https://img.shields.io/badge/version-1.0.0-informational)]()

An interactive and modern blog about personal finance in Colombia, designed to help you take control of your money in a simple and visually appealing way.

---

### 🤔 What is it and what problem does it solve?

**Monopolombiano** is an educational platform focused on the Colombian financial ecosystem. Its mission is to demystify the world of finance and make it accessible to everyone. Through detailed articles, current news, and interactive tools such as budget calculators and currency converters, the platform guides users so they can:

*   **Understand financial products:** From savings accounts and credit cards to investment options and mortgages.
*   **Make informed decisions:** We compare and analyze different market options so you can choose the one that best suits your needs.
*   **Improve your financial health:** We offer practical advice on saving, debt management, and planning for the future.

The main problem that **Monopolombiano** solves is the financial knowledge gap that exists in the country. Many people make important decisions about their money based on incomplete, outdated, or overly complex information. Our platform centralizes and simplifies this information, presenting it in a clear, objective, and easy-to-digest manner.

---

### 📸 Screenshots / Demo

Visit our live demo to explore all the features!

**[➡️ View Live Demo at monopolombiano.com](https://monopolombiano.com/)**

![Monopolombiano Demo](https://i.imgur.com/link-a-tu-imagen.png)

---

### 🛠️ Technologies Used

This project is built with a stack of modern and efficient technologies:

*   **Main Framework:** [Next.js](https://nextjs.org/) (React)
*   **Content Management (CMS):** [Sanity.io](https://www.sanity.io/)
*   **Styles and UI:**
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Radix UI](https://www.radix-ui.com/) and [Headless UI](https://headlessui.dev/) for accessible components.
    *   [Framer Motion](https://www.framer.com/motion/) for animations.
*   **Data Visualization:** [Chart.js](https://www.chartjs.org/)
*   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

---

### ✅ Prerequisites

Before you start, make sure you have the following installed:

*   [Node.js](https://nodejs.org/en/) (version 20 or higher)
*   [pnpm](https://pnpm.io/installation) (or your preferred package manager)

---

### 🚀 Installation and Configuration

Follow these steps to set up the project in your local environment:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/tu-usuario/monopolombiano.git
    cd monopolombiano
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Configure environment variables:**
    Create a `.env.local` file in the root of the project and add the Sanity credentials:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
    NEXT_PUBLIC_SANITY_DATASET="your-dataset"
    NEXT_PUBLIC_SANITY_API_VERSION="2023-05-03"
    ```

---

### 💻 How to Use

Once configured, you can run the local development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the project in action.

---

### 📂 Project Structure

The project is organized as follows to keep the code clean and scalable:

```
/
├── app/                  # Main application routes (Next.js App Router)
│   ├── (categorias)/     # Routes for the different blog sections
│   ├── api/              # API Endpoints
│   └── layout.tsx        # Main layout
│
├── components/           # Reusable React components
│   ├── ui/               # Generic UI components (buttons, cards, etc.)
│   ├── (funcionales)/    # Components with specific logic (calculators, etc.)
│
├── lib/                  # Business logic, helpers, and Sanity connection
│
├── public/               # Static files (images, icons)
│
├── store/                # Redux configuration (slices, store)
│
└── studio-nextjs-blog/   # Sanity studio for content management
```