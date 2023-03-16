import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import {ChatGPTMessage, OpenAIStream} from "@/util/openAiStream";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const formatPrompt = (prompt?: string) => {
    return `
    Create a HTML webpage with inline CSS. Each column or major section should have the attribute "data-export". Use the following content:
    ${prompt || ''}
    `
}

const handler = async (req: Request): Promise<Response> => {
    const { prompt } = (await req.json())

    const payload = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: formatPrompt(prompt) } as ChatGPTMessage], // todo: unsure why this is a type failure
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 4000,
        stream: true,
        n: 1,
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
};


export async function POST(request: Request) {
    return handler(request)
}
