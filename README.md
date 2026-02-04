# GUMI Website

A modern website built with Next.js 14+, GSAP animations, and Lenis smooth scrolling.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: [GSAP](https://gsap.com/) (GreenSock Animation Platform)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

### Start

Run the production server:

```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Home page
├── components/             # Reusable React components
├── hooks/                  # Custom React hooks
│   ├── useGSAP.ts          # GSAP animation hook
│   └── useSmoothScroll.ts  # Lenis smooth scroll hook
├── providers/              # Context providers
│   ├── GSAPProvider.tsx    # GSAP context
│   └── LenisProvider.tsx   # Lenis smooth scroll provider
└── lib/                    # Utility functions
```

## Usage Examples

### Using GSAP Animations

```tsx
import { useGSAP } from "@/hooks/useGSAP";
import { useRef } from "react";

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap, ScrollTrigger) => {
    gsap.from(".box", {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: ".box",
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <div className="box">Animated content</div>
    </div>
  );
}
```

### Using Lenis Smooth Scroll

The Lenis smooth scroll is automatically enabled globally through the `LenisProvider` in the root layout.

For programmatic scrolling:

```tsx
import { useLenis } from "@/providers/LenisProvider";

function MyComponent() {
  const { lenis } = useLenis();

  const scrollToTop = () => {
    lenis?.scrollTo(0);
  };

  const scrollToSection = () => {
    lenis?.scrollTo("#section-id");
  };

  return (
    <button onClick={scrollToTop}>Scroll to Top</button>
  );
}
```

## Animation Guidelines

1. **Use `gsap.context()`**: Always wrap GSAP animations in a context for proper cleanup
2. **Clean up animations**: The `useGSAP` hook handles cleanup automatically
3. **ScrollTrigger integration**: Lenis is automatically synced with GSAP ScrollTrigger
4. **Scope animations**: Use the `scope` option in `useGSAP` to scope animations to a container

## License

ISC
