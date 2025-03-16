"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post("/api/generateImage", { prompt });
      console.log(response);
      if (response.data.success) {
        setGeneratedImage(response.data.imageUrl);
      } else {
        setGeneratedImage(null);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
    setIsGenerating(false);
  };

  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 w-10/12 mt-10"
          placeholder="Enter your prompt"
        />

        {isGenerating ? (
          <button
            className="bg-blue-400 text-white p-2 rounded-md w-1/12 mt-10 ml-4 cursor-pointer disabled:opacity-50"
            disabled
          >
            Generating...
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white p-2 rounded-md w-1/12 mt-10 ml-4 cursor-pointer hover:bg-blue-600"
            onClick={handleGenerate}
          >
            Generate
          </button>
        )}
      </div>

      {generatedImage && (
        <div className="w-10/12 mt-10 flex justify-center">
          <img
            src={generatedImage}
            alt="Generated Image"
          />
        </div>
      )}
    </div>
  );
}
