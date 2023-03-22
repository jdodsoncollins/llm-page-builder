import {ChatGPTMessage, OpenAIStream} from "@/util/openAiStream";

export const config = {
    runtime: 'edge'
}

const formatPrompt = (prompt?: string) => {
    return `
    You are a webpage builder, generating valid HTML and CSS landing pages. You use only simple, inline CSS, and you do not load any images. The document body, each column, or major section should have the attribute "data-export". Use the following content:
    ${prompt || ''}
    `
}

const handler = async (req: Request): Promise<Response> => {
    const { prompt, apiKey, temperature } = (await req.json())

    const payload = {
        apiKey,
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
