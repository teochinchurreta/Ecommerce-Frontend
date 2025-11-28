# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

🛒 Frontend MERN – E-Commerce (Productos & Compras)

Este proyecto es el frontend de una aplicación web tipo e-commerce, desarrollada con React y conectada al backend construido con Express + MongoDB, cumpliendo con los requerimientos de un CRUD completo para:

Entidad principal: Compras

Entidad de soporte: Productos

La aplicación permite:

Registro e inicio de sesión

Visualización de productos

CRUD completo de compras

Paginación real

Manejo de errores

SPA con React Router

Hooks requeridos: useState, useEffect, useCallback, useContext

Hooks opcionales de React Router: useNavigate, useParams

📁 Tecnologías utilizadas
Frontend

React 18

Vite

React Router DOM

Context API

Fetch API

CSS puro (sin Tailwind)

Backend (para conexión)

Express

MongoDB

JWT