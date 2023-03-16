import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import {OpenAIStream} from "@/util/openAiStream";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const config = {
    runtime: "edge",
};


const handler = async (req: Request): Promise<Response> => {
    const { prompt } = (await req.json()) as {
        prompt?: string;
    };

    const payload = {
        model: "text-davinci-003",
        prompt,
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
