# GUMI Website - Copilot Instructions

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Animation**: GSAP (GreenSock Animation Platform)
- **Smooth Scroll**: Lenis

## Project Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `providers/` - Context providers (Lenis, GSAP)
- `hooks/` - Custom React hooks
- `lib/` - Utility functions

## Animation Guidelines
- Use GSAP for complex animations and ScrollTrigger for scroll-based animations
- Lenis handles smooth scrolling globally
- Always clean up GSAP animations in useEffect cleanup functions
- Use `gsap.context()` for component-scoped animations

## Code Style
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use CSS Modules or Tailwind CSS for styling
