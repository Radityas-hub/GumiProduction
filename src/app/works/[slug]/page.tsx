"use client";

import { use } from "react";
import { Navbar, Footer } from "@/components";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { notFound } from "next/navigation";

// Dummy data - will be replaced with real data
const PROJECTS_DATA = {
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
      { type: "video", src: "/videos/hero.mp4", caption: "Instagram Reels showcasing daily specials" },
      { type: "image", src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&h=600&fit=crop", caption: "Flat lay composition for menu highlights" },
      { type: "video", src: "/videos/hero.mp4", caption: "Behind-the-scenes kitchen stories" },
      { type: "image", src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop", caption: "Vibrant color grading to enhance appetite appeal" },
      { type: "video", src: "/videos/hero.mp4", caption: "Customer testimonial series" },
      { type: "image", src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop", caption: "Seasonal campaign visuals with natural lighting" },
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
      slug: "the-mulia-resort",
      title: "The Mulia Resort & Villas",
      category: "Hospitality Film",
    },
  },
  // Add more projects here
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
