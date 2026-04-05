---
name: Frontend Developer Skill
description: Core guidelines and instructions for building frontend components, specifically tailored for Next.js, Tailwind CSS, and structured UI components.
---

# Frontend Developer Skill

## Core Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS (Vanilla CSS where absolutely necessary, but prefer Tailwind utilities)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Components:** Functional React components

## Aesthetic & Design Rules
1. **Premium & Modern UI:** 
   - Ensure the use of smooth gradients, high-contrast typography, and curated color palettes.
   - Use sufficient whitespace and breathing room inside components to give them a premium feel.
2. **Dynamic Elements:**
   - Incorporate micro-animations (`framer-motion` or Tailwind's `transition`, `hover`, `focus` classes) to make elements feel responsive and alive.
3. **Common Structural Patterns:**
   - **Cards & Modals:** Use extra-large rounded corners (e.g., `rounded-2xl` to `rounded-4xl`) and soft shadow offsets.
   - **Borders:** Avoid strict 1px harsh borders; use tonal background color shifts and spacing to define hierarchy, or at most a subtle 10-15% opacity border on a contrasting surface.

## Quality Standards
- **Responsiveness:** Always ensure mobile-first responsiveness using Tailwind's `md:`, `lg:` breakpoints.
- **Components:** Keep components highly reusable and scoped to their specific domains (e.g., separating Heroes, Navbars, and individual generic lists).
- **SEO & Accessibility:**
   - Use semantic HTML tags (`<nav>`, `<header>`, `<main>`, `<section>`, `<article>`).
   - Include unique descriptive IDs, appropriate generic tags, hover states, and meaningful descriptions.

## Code Standards
- Code cleanly in TypeScript or JavaScript.
- Manage state concisely. 
- Avoid placeholder generic colors (e.g., standard red/blue/green). Use tailored, rich colors (e.g., deep dark blue `text-blue-950` or vivid teal).

## Running Tasks
- When developing or modifying components, test visual changes using the existing development server (`npm run dev`).
