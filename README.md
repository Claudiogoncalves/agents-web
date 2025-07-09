# Agents Web

A simple React web application for managing and viewing rooms.

## Tech Stack

- **React** (with TypeScript)
- **React Router DOM** (routing)
- **Vite** (build tool)
- **Radix UI** (accessible UI primitives)
- **class-variance-authority** (utility for managing class variants)
- **Biome** (code formatting and linting)

## Project Structure & Patterns

- **Component-based architecture**: UI is split into reusable components (e.g., `Button`).
- **Pages**: Located in `src/pages/` (e.g., `room.tsx`).
- **Utilities**: Shared helpers in `src/lib/`.
- **Styling**: Utility classes (Tailwind CSS or similar, inferred from class names).

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd agents/web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Lint and format code**
   ```bash
   npm run biome
   ```

## Configuration

- **Environment variables**: If needed, create a `.env` file in the project root.
- **Formatting**: Configured via `biome.jsonc`.

---

**Note:**  
Make sure you have Node.js and npm installed on your machine.