# Fakestore Vue App

This project is an e-commerce web app built with **Vue 3, TypeScript, Tailwind CSS**, and deployed on **GitHub Pages**.

**Backend API used:** [Fake Store API](https://fakestoreapi.com/docs)

**Live Demo:** [https://pavlin05.github.io/fakestore-vue-app/](https://pavlin05.github.io/fakestore-vue-app/)

## Main Libraries

- **Vue 3**: The core framework for building the user interface.
- **TypeScript**: Adds static typing to JavaScript, enhancing code quality and developer productivity.
- **Vue Router**: The official router for Vue.js, used for navigation and routing in the single-page application.
- **Pinia**: A state management library for Vue 3, used for managing global state in the application.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Heroicons**: A set of free, MIT-licensed high-quality SVG icons for you to use in your web projects.
- **Tailwind Variants**: A utility for Tailwind CSS that allows you to create custom utility classes.
- **VueUse**: A collection of utility functions for Vue 3, used for common tasks like state management and DOM manipulations.
- **TankStack Query**: A library for fetching, caching, and updating data in Vue 3 applications.

## Prerequisites

- Node.js `v20` or `>=22`
- npm (comes with Node.js)

Check Node.js version:

```bash
node -version
```

## Environment Variables

This project uses a **.env** file to store environment variables.  
The main variable is:

```bash
VITE_API_BASE_URL=https://fakestoreapi.com
```

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/pavlin05/fakestore-vue-app.git
   cd fakestore-vue-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (or the port specified in the output).

4. **Build for Production:**

   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages:**
   The project is configured with a **predeploy script**, so the deployment process automatically builds the project before publishing.

   ```bash
   npm run deploy
   ```
