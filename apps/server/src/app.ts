import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';
dotenv.config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app: Express = express();
app.use(bodyParser.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/chat", async (req: Request, res: Response) => {
    // Get the prompt from the request
    const { prompt } = req.body;

    // Generate a response with ChatGPT
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        temperature: 1,
        "max_tokens": 4000,
    });
    console.warn('RESPONSE', completion.data);
    res.send(completion.data.choices[0].text);
});

// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});