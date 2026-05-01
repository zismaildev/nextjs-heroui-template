<div align="center">
  <h1>⚡ Next.js + HeroUI Template</h1>
  <p>
    A scalable, modern, and high-performance starter template built with Next.js App Router, HeroUI (v3), and Tailwind CSS.
  </p>
  
  <p>
    <a href="https://nextjs.org/"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js" /></a>
    <a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" /></a>
    <a href="https://www.heroui.com/"><img alt="HeroUI" src="https://img.shields.io/badge/HeroUI-3.0-006FEE?style=flat-square" /></a>
    <a href="https://tailwindcss.com/"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" /></a>
    <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white" /></a>
  </p>
</div>

<br />

> **Stop configuring and start coding.** This template provides a robust, pre-configured foundation so you can immediately begin developing your next big idea without spending hours on setup.

## ✨ Features

- 🚀 **Next.js 16 (App Router)** - The latest React framework for the web.
- ⚛️ **React 19** - Fast, modern React with built-in compiler support.
- 🎨 **HeroUI v3** - Beautiful, fast, and accessible UI components.
- 💅 **Tailwind CSS v4** - Utility-first CSS framework for rapid UI development.
- 🌙 **Dark Mode Support** - Fully integrated with `next-themes`.
- 📁 **Scalable Architecture** - Best practice folder structure separating UI, logic, and routing.
- 🛠️ **Utility Helpers** - Pre-configured `clsx` and `tailwind-merge` for elegant class management (`cn` function).

---

## 📂 Project Structure

This project adopts a highly scalable structure. The `app` directory is kept clean and strictly for routing, while other concerns are clearly separated:

```text
src/
├── app/         # 🛣️ Next.js App Router (Pages, Layouts, API routes)
├── components/  # 🧩 Reusable UI Components
├── config/      # ⚙️ Application configuration (e.g., site settings, navigation)
├── context/     # 🌐 Global React Context Providers (e.g., ThemeProvider)
├── hooks/       # 🪝 Custom React Hooks
├── lib/         # 🛠️ Utility functions and helpers (e.g., utils.ts)
├── styles/      # 🎨 Global styles and Tailwind CSS configurations
└── types/       # 🏷️ TypeScript types and interfaces
```

---

## 🚀 Getting Started

### 1. Clone & Install

Use this template by clicking the **"Use this template"** button on GitHub, or clone it directly.

```bash
# Install dependencies
pnpm install
# or npm install / yarn install
```

### 2. Run the Development Server

```bash
pnpm dev
# or npm run dev / yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛠️ Included Utilities

### The `cn` Function
Located in `src/lib/utils.ts`, this utility elegantly merges Tailwind CSS classes and resolves conflicts using `clsx` and `tailwind-merge`.

```typescript
import { cn } from "@/lib/utils";

// Example usage
<div className={cn("px-2 py-1 bg-blue-500", isError && "bg-red-500")} />
```

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
