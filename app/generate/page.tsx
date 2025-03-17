"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Sparkles,
  Menu,
  X,
  Github,
  Download,
  Wand2,
  Image,
  LoaderCircle,
  Sparkle,
} from "lucide-react";
import Navbar from "../components/navbar/page";

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isRefiningPrompt, setIsRefiningPrompt] = useState<boolean>(false);

  const refinePrompt = async () => {
    setIsRefiningPrompt(true);
    try {
      const response = await axios.post("/api/refinePrompt", { prompt });
      if (response.data.success) {
        setPrompt(response.data.message);
      }
    } catch (error) {
      console.error("Error refining prompt");
    } finally {
      setIsRefiningPrompt(false);
    }
  };
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post("/api/generateImage", { prompt });
      if (response.data.success) {
        setGeneratedImage(
          `data:image/png;base64,${response.data.base64_image}`
        );
      } else {
        setGeneratedImage(null);
      }
      const uploadResponse = await axios.post("/api/uploadImage", { prompt, image_base64: `data:image/png;base64,${response.data.base64_image}` });
      console.log(uploadResponse);
    } catch (error) {
      console.error("Error generating image:", error);
    }
    setIsGenerating(false);
  };

  const handleDownload = async () => {
    try {
      // Fetch the image
      const response = await fetch(generatedImage!);
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;

      // Set the download attribute with a filename
      link.setAttribute("download", "downloaded-image.webp");

      // Append to the document, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Release the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Main Content */}
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              PhotoMagic AI
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
            </h1>
            <p className="text-xl text-gray-300">
              Transform your imagination into magical images ✨
            </p>
          </div>

          {/* Generation Area */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Prompt Section */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <label
                    htmlFor="prompt"
                    className="block text-lg font-semibold text-white"
                  >
                    Enter your prompt
                  </label>
                  <div className="relative">
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the image you want to create..."
                      className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 border border-purple-400/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    />
                    <button
                      onClick={refinePrompt}
                      disabled={!prompt.trim() || isRefiningPrompt}
                      className={`absolute right-3 bottom-3 text-purple-300 ${
                        !prompt.trim() || isRefiningPrompt
                          ? ""
                          : "hover:text-purple-100"
                      } transition-colors disabled:opacity-50 ${
                        !prompt.trim() || isRefiningPrompt
                          ? ""
                          : "cursor-pointer"
                      }`}
                      title="Refine with AI"
                    >
                      {isRefiningPrompt ? (
                        <LoaderCircle className="w-5 h-5 animate-spin" />
                      ) : (
                        <Sparkle className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Style Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Choose Magic Style
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {["Mystical", "Ethereal", "Fantasy", "Cosmic"].map(
                      (style) => (
                        <button
                          key={style}
                          className="p-3 bg-white/5 rounded-lg text-purple-200 hover:bg-white/10 transition-colors border border-purple-400/20"
                        >
                          {style}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
                {generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <p>Your generated image will appear here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleGenerate}
                className={`flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 ${
                  !prompt.trim() || isGenerating ? "" : "cursor-pointer"
                }`}
                disabled={!prompt.trim() || isGenerating}
              >
                {isGenerating ? (
                  <LoaderCircle className="w-6 h-6 animate-spin" />
                ) : (
                  <Wand2 className="w-5 h-5" />
                )}
                Generate Image
              </button>
              {generatedImage && (
                <button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                  disabled={!generatedImage}
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
              )}
            </div>
          </div>

          {/* Sample Gallery */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Featured Transformations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
                "https://images.unsplash.com/photo-1534447677768-be436bb09401",
                "https://images.unsplash.com/photo-1513745405825-efaf9a49315f",
              ].map((url, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src={url}
                    alt={`Sample ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
