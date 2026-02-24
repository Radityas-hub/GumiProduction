"use client";

import { use } from "react";
import { Navbar, Footer } from "@/components";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { notFound } from "next/navigation";

// Dummy data - will be replaced with real data
const PROJECTS_DATA = {
  "the-chowk": {
    slug: "the-chowk",
    title: "The Chowk: Indian Gourmet House",
    category: "Content Creation",
    year: "2024",
    heroVideo: "/videos/theChowk.webm",
    heroPoster: "/images/TheChowk/GWR02339.webp",
    challenge: "The Chowk membutuhkan solusi branding media sosial yang kuat untuk membangun awareness, meningkatkan penghasilan, serta mempromosikan layanan restoran gourmet mereka secara efektif agar dapat menjangkau audiens yang lebih luas.",
    solution: "Gumi menghadirkan strategi Content Creation menyeluruh yang mencakup fotografi makanan profesional, videografi sinematik, desain grafis, hingga dokumentasi live buffet pada event-event mereka untuk memastikan identitas brand yang premium, konsisten, dan menarik.",
    gallery: [
      { type: "image" as const, src: "/images/TheChowk/GWR00157.webp", caption: "Professional food photography untuk menu premium" },
      { type: "video" as const, src: "/videos/theChowk.webm", caption: "Dokumentasi live buffet at event" },
      { type: "image" as const, src: "/images/TheChowk/GWR02121.webp", caption: "Capture suasana dan ambiance restoran" },
      { type: "video" as const, src: "/videos/theChowk.webm", caption: "Short-form video content untuk social media awareness" },
      { type: "image" as const, src: "/images/TheChowk/GWR02195.webp", caption: "Design grafis dan visual promosi" },
    ],
    btsImage: "/images/TheChowk/GWR02268.webp",
    btsQuote: "Menampilkan detail terkecil dalam pencahayaan dan penataan adalah kunci untuk membuat hidangan benar-benar 'berbicara' kepada audiens.",
    impact: [
      { metric: "1000+", label: "Followers Gained" },
      { metric: "36.2k", label: "Max Reels Views" },
      { metric: "3", label: "Outlets (inc. Intercon Hotel)" },
    ],
    nextProject: {
      slug: "medin-bali-cafe",
      title: "Medin Bali Café: Mediterranean Experience",
      category: "Full Social Media Management",
    },
  },
  "medin-bali-cafe": {
    slug: "medin-bali-cafe",
    title: "Medin Bali Café: Mediterranean Experience",
    category: "Full Social Media Management",
    year: "2024",
    heroVideo: "/videos/hero.mp4",
    heroPoster: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop",
    challenge: "Medin Bali Café wanted to bring a unique Mediterranean nuance to the Bali dining scene. They needed a cohesive digital strategy that could blend natural, warm aesthetics with clinical attention to detail to attract a global audience.",
    solution: "We implemented full social media management, integrating content strategy with high-end visual production and targeted digital advertising. Our creative direction combined warm, natural tones with authentic Mediterranean vibes, creating an inviting digital experience for guests.",
    gallery: [
      { type: "image" as const, src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop", caption: "Natural lighting for signature breakfast dishes" },
      { type: "video" as const, src: "/videos/hero.mp4", caption: "Atmospheric evening vibes at the café" },
      { type: "image" as const, src: "https://images.unsplash.com/photo-1544124499-58ec526976fc?w=800&h=600&fit=crop", caption: "Mediterranean-inspired interior details" },
      { type: "video" as const, src: "/videos/hero.mp4", caption: "Chef's special preparation series" },
    ],
    btsImage: "https://images.unsplash.com/photo-1534433832727-65f67307e33a?w=1200&h=800&fit=crop",
    btsQuote: "Visualizing the warmth of a Mediterranean summer in the heart of Bali requires constant dialogue with the brand's essence.",
    impact: [
      { metric: "+180%", label: "Digital Growth" },
      { metric: "25k+", label: "Monthly Reach" },
      { metric: "92%", label: "Reservation Rate" },
    ],
    testimonial: {
      quote: "Gumi captured the exact Mediterranean feel we wanted. Their ability to blend our cultural roots with a modern Balinese touch was exceptional.",
      author: "Medin Owner",
      position: "Owner, Medin Bali Café",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    },
    nextProject: {
      slug: "madhuban-social-media",
      title: "Madhuban: Vegetarian Indian Resto",
      category: "Social Media Management",
    },
  },
  "madhuban-social-media": {
    slug: "madhuban-social-media",
    title: "Madhuban: Vegetarian Indian Resto",
    category: "Social Media Management",
    year: "2024",
    heroVideo: "/videos/hero.mp4",
    heroPoster: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&h=1080&fit=crop",
    challenge: "Madhuban needed to establish a strong digital presence in Bali's competitive F&B scene. As a vegetarian Indian restaurant, they required content that could showcase their authentic cuisine while appealing to both local and international audiences on social media.",
    solution: "We developed a comprehensive social media strategy focusing on vibrant food photography and short-form video content. Our approach highlighted the colorful, fresh ingredients and the cultural authenticity of their dishes, creating a visual narrative that resonates with health-conscious diners and food enthusiasts.",
    gallery: [
      { type: "video" as const, src: "/videos/hero.mp4", caption: "Instagram Reels showcasing daily specials" },
      { type: "image" as const, src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&h=600&fit=crop", caption: "Flat lay composition for menu highlights" },
      { type: "video" as const, src: "/videos/hero.mp4", caption: "Behind-the-scenes kitchen stories" },
      { type: "image" as const, src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop", caption: "Vibrant color grading to enhance appetite appeal" },
      { type: "video" as const, src: "/videos/hero.mp4", caption: "Customer testimonial series" },
      { type: "image" as const, src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop", caption: "Seasonal campaign visuals with natural lighting" },
    ],
    btsImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=800&fit=crop",
    btsQuote: "It's not just about the final frame, it's about the soul we put into every second of the process.",
    impact: [
      { metric: "+245%", label: "Engagement Rate" },
      { metric: "50K+", label: "New Followers" },
      { metric: "1.2M+", label: "Total Reach" },
    ],
    testimonial: {
      quote: "Gumi Production transformed our social media presence completely. Their understanding of food aesthetics and storytelling helped us connect with our audience in ways we never imagined.",
      author: "Rajesh Kumar",
      position: "Owner, Madhuban Restaurant",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    },
    nextProject: {
      slug: "the-chowk",
      title: "The Chowk: Indian Gourmet House",
      category: "Content Creation",
    },
  },
};

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the params Promise using React.use()
  const { slug } = use(params);
  
  const project = PROJECTS_DATA[slug as keyof typeof PROJECTS_DATA];

  if (!project) {
    notFound();
  }

  return (
    <main className="relative bg-black text-white">
      <Navbar />
      <ProjectDetail project={project} />
      <Footer />
    </main>
  );
}
