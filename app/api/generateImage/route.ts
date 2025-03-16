import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const response = await generateImage(prompt);

  if (!response.success) {
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }

  return NextResponse.json(response);
}

async function generateImage(prompt: string) {
    const client = new OpenAI({
        baseURL: 'https://api.studio.nebius.com/v1/',
        apiKey: process.env.NEBIUS_API_KEY,
    });

    try{
        const response = await client.images.generate({
            "model": "black-forest-labs/flux-dev",
            "response_format": "url",
            "extra_body": {
                "response_extension": "webp",
                "width": 2000,
                "height": 2000,
                "num_inference_steps": 30,
                "negative_prompt": "",
                "seed": -1
            },
            "prompt": prompt
        })
        return { success: true, imageUrl: response.data[0].url };
    } catch (error) {
        return { success: false, message: "Failed to generate image" };
    }
}