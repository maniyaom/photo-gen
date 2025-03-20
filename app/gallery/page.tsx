"use client"
import React, { useEffect, useState } from 'react';
import { Moon, Sun, Sparkles, Camera, Zap, Clock, Crown, Star, Users, ArrowRight, Download, Heart, Share2, Bookmark, Twitter, Facebook, Link } from 'lucide-react';
import axios from 'axios';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  tags: string[];
}

export default function Gallery() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  // const galleryImages: GalleryImage[] = [
  //   {
  //     id: 1,
  //     url: "https://plus.unsplash.com/premium_photo-1675433344518-21eb72dfc7a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Misty Mountain Dawn",
  //     tags: ["nature", "mountains", "mist", "landscape"]
  //   },
  //   {
  //     id: 2,
  //     url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Sunset Valley",
  //     tags: ["sunset", "valley", "nature", "scenic"]
  //   },
  //   {
  //     id: 3,
  //     url: "https://images.unsplash.com/photo-1529419412599-7bb870e11810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Tranquil Lake",
  //     tags: ["lake", "reflection", "peaceful", "nature"]
  //   },
  //   {
  //     id: 4,
  //     url: "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Mountain Peaks",
  //     tags: ["mountains", "peaks", "snow", "altitude"]
  //   },
  //   {
  //     id: 5,
  //     url: "https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Forest Path",
  //     tags: ["forest", "path", "nature", "trees"]
  //   },
  //   {
  //     id: 6,
  //     url: "https://plus.unsplash.com/premium_photo-1675368244123-082a84cf3072?q=80&w=2150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Desert Dunes",
  //     tags: ["desert", "dunes", "sand", "landscape"]
  //   }
  // ];

  const handleShare = (id: number, platform: string) => {
    const image = galleryImages.find(img => img.id === id);
    if (!image) return;

    const shareUrl = encodeURIComponent(image.url);
    const shareTitle = encodeURIComponent(image.title);

    let shareLink = '';
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(image.url);
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get("/api/getAllImages");
      setGalleryImages(response.data.message);
      console.log(response);
    };
    fetchImages();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`fixed w-full p-6 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
      } backdrop-blur-lg z-50`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span className="text-xl font-bold">PhotoAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-800 text-yellow-500' : 'bg-gray-100 text-gray-600'
              } hover:scale-110 transition-transform`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Gallery Section */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Image Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3] cursor-pointer"
            >
              {/* Image */}
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Top Row - Title */}
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2">{image.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/20 rounded-full text-white text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Bottom Row - Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button 
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-200 cursor-pointer"
                    onClick={() => window.open(image.url, '_blank')}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-200 cursor-pointer">
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <button 
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-200 cursor-pointer"
                      onClick={() => setShowShareMenu(showShareMenu === image.id ? null : image.id)}
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    
                    {/* Share Menu Popup */}
                    {showShareMenu === image.id && (
                      <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-2 min-w-[120px]">
                        <button
                          onClick={() => handleShare(image.id, 'twitter')}
                          className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded text-gray-700"
                        >
                          <Twitter className="w-4 h-4" />
                          <span>Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare(image.id, 'facebook')}
                          className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded text-gray-700"
                        >
                          <Facebook className="w-4 h-4" />
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={() => handleShare(image.id, 'copy')}
                          className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded text-gray-700"
                        >
                          <Link className="w-4 h-4" />
                          <span>Copy Link</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-200">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}