"use client";

import { use } from "react";
import { Navbar, Footer } from "@/components";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { notFound } from "next/navigation";

// Service data structure
const SERVICES_DATA = {
  "social-media-management": {
    slug: "social-media-management",
    number: "02",
    title: "Social Media Management",
    tagline: "Building digital ecosystems that convert followers into loyal customers",
    heroVideo: "/videos/hero.mp4",
    heroPoster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&h=1080&fit=crop",
    
    // Strategic Value
    marketInsight: {
      stat: "87%",
      description: "of consumers say social media helps them make purchasing decisions, yet only 23% of businesses have a consistent content strategy.",
    },
    problemSolution: {
      problem: "Bali's hospitality and F&B businesses struggle to maintain consistent, engaging social media presence while managing daily operations. Generic content fails to capture the unique essence of their brand.",
      solution: "We create and manage a complete social media ecosystem—from content strategy to daily posting and paid advertising—allowing you to focus on your business while we build your digital community.",
    },

    // Service Scope
    scope: [
      {
        number: "01",
        title: "Content Strategy & Planning",
        description: "We develop a comprehensive content calendar aligned with your brand voice, seasonal trends, and business objectives. Every post is strategically planned to maximize engagement and conversions.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
      },
      {
        number: "02",
        title: "Content Creation & Production",
        description: "Professional photography, videography, and graphic design tailored for each platform. From Instagram Reels to Facebook carousels, we create thumb-stopping content that tells your story.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      },
      {
        number: "03",
        title: "Community Management",
        description: "Daily monitoring, engagement, and response to comments and messages. We build relationships with your audience, turning casual followers into brand advocates.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
      },
      {
        number: "04",
        title: "Paid Advertising & Analytics",
        description: "Strategic ad campaigns on Meta, Instagram, and TikTok with detailed performance tracking. We optimize spend to maximize ROI and provide monthly reports with actionable insights.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      },
    ],

    // The Gumi Edge
    edge: {
      expertise: {
        title: "Niche Expertise in Bali's Hospitality Scene",
        description: "We specialize in restaurants, villas, cafes, and destination experiences. We understand what makes Bali's F&B and hospitality unique—and how to showcase it authentically.",
      },
      growth: {
        title: "Proven Growth Track Record",
        stats: [
          { value: "+245%", label: "Average Engagement Increase" },
          { value: "50K+", label: "New Followers Generated" },
          { value: "3.2M+", label: "Total Content Reach" },
        ],
        description: "Our clients see measurable results within 90 days. From increased foot traffic to direct bookings through Instagram, we deliver growth that impacts your bottom line.",
      },
    },

    // Case Studies
    caseStudies: [
      {
        slug: "madhuban-social-media",
        title: "Madhuban: Vegetarian Indian Resto",
        category: "Social Media Management",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
        results: "+245% Engagement, 50K+ Followers",
      },
      {
        slug: "madhuban-social-media",
        title: "Karma Beach Club",
        category: "Social Media Management",
        image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop",
        results: "1.2M+ Reach, 35% Booking Increase",
      },
      {
        slug: "madhuban-social-media",
        title: "Medin Bali Café",
        category: "Social Media Management",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
        results: "80K+ Followers, Featured by TimeOut Bali",
      },
    ],
  },
  // Add other services here: company-profile, content-creation, music-video-film
};

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const service = SERVICES_DATA[slug as keyof typeof SERVICES_DATA];

  if (!service) {
    notFound();
  }

  return (
    <main className="relative bg-black text-white">
      <Navbar />
      <ServiceDetail service={service} />
      <Footer />
    </main>
  );
}
