import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest, res: NextResponse) {
    const { prompt } = await req.json();
    if (!prompt) {
        return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    const refinedPrompt = await refinePrompt(prompt);
    return NextResponse.json({ success: true, message: refinedPrompt }, { status: 200 });
}

async function refinePrompt(prompt: string) {

    const client = new OpenAI({
        baseURL: 'https://api.studio.nebius.com/v1/',
        apiKey: process.env.NEBIUS_API_KEY,
    });

    const response = await client.chat.completions.create({
        "model": "deepseek-ai/DeepSeek-V3",
        "max_tokens": 5461,
        "temperature": 0.3,
        "top_p": 0.95,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": `You are an AI agent that refines user-provided prompts for image generation.\n\nInstructions:\nI will provide a prompt for image generation.\nYour task is to only refine it, making it more detailed and realistic for better output.\nReturn only the refined prompt as plain text, without any introductions, explanations, or follow-ups.\n\n🚫 Do not include any extra text—just return the refined prompt.\n\nPrompt: ${prompt}`
                    }
                ]
            }
        ]
    })
    return response.choices[0].message.content;
}