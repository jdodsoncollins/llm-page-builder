This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## OpenAI-powered webpage generator

This project generates pages via a formatted prompt sent to gpt3-turbo, and then renders output with the ability to click DOM nodes to copy to your clipboard.

## Why
The intent of this project is to leverage openAI products' abilities to generate valid webpages based on a prompt, and experiment with processing the output for actual usage outside this utility webapp. 

The backend of this system does some light [Prompt Engineering](https://github.com/dair-ai/Prompt-Engineering-Guide) on top of user input to encourage consistent display.

Output from gpt3-turbo is recieved from the nextJS API route, then further processed on the client to inline CSS, and add JS and CSS to the DOM for element export.

TODO:
- UI Refinements
- "Login" UI for setting API key

⚠️ As of right now, this project is very much a WIP ⚠️

## Getting Started

Do your basic setup

```bash
npm i
```
(or yarn or pnpm equivalent)

Then, set your [OpenAI API key](https://platform.openai.com/account/api-keys) (or use the GUI if you prefer)

```bash
cp .env.sample .env
```
and set your API key in place of the sample key

Finally, run the development server:

```bash
npm run dev
```
(or yarn or pnpm equivalent)


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
