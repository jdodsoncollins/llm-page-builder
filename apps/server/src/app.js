"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "YOUR_API_KEY",
});
const openai = new OpenAIApi(configuration);
// Set up the server
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Set up the ChatGPT endpoint
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the prompt from the request
    const { prompt } = req.body;
    // Generate a response with ChatGPT
    const completion = yield openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
    });
    res.send(completion.data.choices[0].text);
}));
// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
