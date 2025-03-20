import OpenAI from "openai";

const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: process.env.NEBIUS_API_KEY,
}); 

export default async function generateCaptionAndTagsFromImage(image_base64: string) {
    const response = await client.chat.completions.create({
        "model": "Qwen/Qwen2-VL-72B-Instruct",
        "temperature": 0,
        "messages": [
            {
                "role": "system",
                "content": "You are an AI agent that generates a suitable title and relevant tags for an image based on its content. The title should be a short, descriptive phrase, and the tags should include relevant keywords without any `#` symbols. You can generate up to 5 tags, but not more than 5. The number of tags may vary based on the image content.\n\nEnsure that your response strictly follows this JSON format:\n\nSuccess Case:\n{\n  \"success\": true,\n  \"message\": {\n    \"title\": \"Generated Title\",\n    \"tags\": [\"tag1\", \"tag2\", \"tag3\"]\n  }\n}\n\n(Where `tags` can have between 1 to 5 entries.)\n\nFailure Case:\n{\n  \"success\": false,\n  \"message\": \"Error message\"\n}\n\nIf the image lacks recognizable elements, return a failure response with an appropriate message.\n"
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Perform analysis on this image"
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_base64
                        }
                    }
                ]
            }
        ]
    });
    if (response.choices[0].message.content) {
        return JSON.parse(response.choices[0].message.content.toString());
    } else {
        return { success: false, message: "Unexpected error occurred" };
    }
}