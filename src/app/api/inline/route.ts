
const juice = require('juice');

const handler = async (req: Request): Promise<Response> => {
    const { htmlString } = (await req.json())

    const inlineHTML = juice(htmlString)

    return new Response(inlineHTML);
};


export async function POST(request: Request) {
    return handler(request)
}
