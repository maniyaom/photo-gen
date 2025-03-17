"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import Link from "next/link";

// const images = [
//   'https://images.unsplash.com/photo-1735825764460-c5dec05d6253?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   'https://images.unsplash.com/photo-1741524916198-c1ddeaf89bc9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   'https://images.unsplash.com/photo-1734760418281-62c3f2279296?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   'https://images.unsplash.com/photo-1731964877423-364ed1e13a7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   'https://images.unsplash.com/photo-1726661025461-5635b785ec23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   'https://images.unsplash.com/photo-1741531472824-b3fc55e2ff9c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
// ];

export default function Gallery() {
  const [images, setImages] = useState<String[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get("/api/getAllImages");
      setImages(response.data.message);
      console.log(response);
    };
    fetchImages();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center">
            Image Gallery
          </h1>
          <p className="mt-4 text-gray-400 text-center max-w-2xl mx-auto">
            Explore our collection of stunning images. Each piece tells its own
            unique story.
          </p>
        </div>
      </header>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <Link href={image} key={index}>
              <div
                className="relative group cursor-pointer rounded-xl overflow-hidden"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modal */}
      {/* {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Selected Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )} */}
    </div>
  );
}
