"use client";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Moon,
  Sun,
  Sparkles,
  Camera,
  Zap,
  Clock,
  Crown,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Navbar from "./components/navbar/page";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();

  const features = [
    {
      icon: Camera,
      title: "Professional Quality",
      description:
        "Generate studio-quality images that rival professional photography",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get your AI-generated masterpieces in seconds, not minutes",
    },
    {
      icon: Crown,
      title: "Premium Models",
      description: "Access to the most advanced AI models in the industry",
    },
    {
      icon: Clock,
      title: "24/7 Generation",
      description: "Create stunning visuals whenever inspiration strikes",
    },
  ];

  const testimonials = [
    {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
      name: "Sarah Chen",
      role: "Digital Artist",
      quote:
        "PhotoAI has revolutionized my creative workflow. The quality is simply unmatched.",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
      name: "Mark Thompson",
      role: "Marketing Director",
      quote:
        "We've cut our content creation time in half while doubling our output quality.",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
      name: "Emily Rodriguez",
      role: "Freelance Designer",
      quote:
        "The speed and quality of PhotoAI have transformed how I deliver projects to clients.",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <ProgressBar />

      {/* Hero Section */}
      <main className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 pointer-events-none" />

        {/* Main Hero */}
        <div className="relative pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="flex items-center justify-center mb-6 space-x-2">
                <Star className="w-6 h-6 text-yellow-500" />
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Trusted by 10,000+ creative professionals
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Create Stunning Images
                <br />
                With Artificial Intelligence
              </h1>
              <p
                className={`text-xl ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } max-w-2xl mx-auto mb-8`}
              >
                Experience the next generation of AI-powered image generation.
                Create professional-quality visuals in seconds.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity flex items-center gap-2 group w-full sm:w-auto cursor-pointer" onClick={() => router.push("/generate")}>
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  className={`px-8 py-4 rounded-xl font-semibold border-2 cursor-pointer ${
                    isDarkMode
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-200 hover:border-gray-300"
                  } transition-colors w-full sm:w-auto`}
                  onClick={() => router.push("/gallery")}
                >
                  View Examples
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div
              className={`max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/50"
              } backdrop-blur-sm`}
            >
              {[
                { label: "Active Users", value: "50K+" },
                { label: "Images Created", value: "1M+" },
                { label: "Success Rate", value: "99.9%" },
                { label: "Response Time", value: "<2s" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-purple-500">
                    {stat.value}
                  </div>
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose PhotoAI?
              </h2>
              <p
                className={`${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } max-w-2xl mx-auto`}
              >
                Experience the most advanced AI image generation platform with
                features designed for professionals.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-800/80"
                      : "bg-white hover:bg-gray-50"
                  } transition-colors`}
                >
                  <feature.icon className="w-10 h-10 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section
          id="showcase"
          className={`py-24 px-6 ${
            isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stunning Results
              </h2>
              <p
                className={`${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } max-w-2xl mx-auto`}
              >
                See what's possible with our advanced AI image generation
                technology.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "http://res.cloudinary.com/dowkx2c16/image/upload/v1742476218/t0ny9cz2l5wdjfsi14tt.webp",
                "http://res.cloudinary.com/dowkx2c16/image/upload/v1742478176/v9unzripax0m3cvrajzn.webp",
                "http://res.cloudinary.com/dowkx2c16/image/upload/v1742478324/elrc4yk7lwnr4pzr4vch.webp",
              ].map((src, index) => (
                <div
                  key={index}
                  className={`group relative rounded-xl overflow-hidden aspect-square ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } shadow-xl`}
                >
                  <img
                    src={src}
                    alt={`Showcase ${index + 1}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-500 mr-2" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  What Our Users Say
                </h2>
              </div>
              <p
                className={`${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } max-w-2xl mx-auto`}
              >
                Join thousands of satisfied users who trust PhotoAI for their
                creative needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } shadow-xl`}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div
            className={`max-w-5xl mx-auto p-12 rounded-2xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-xl relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Creative Process?
              </h2>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } mb-8 max-w-2xl mx-auto`}
              >
                Join thousands of creators and experience the future of
                AI-powered image generation today.
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity inline-flex items-center gap-2 group cursor-pointer" onClick={() => router.push("/generate")}>
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
