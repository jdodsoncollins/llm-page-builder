import {FormEvent, useContext, useEffect, useState} from 'react'
import {SiteContext} from "./SiteContext";

const DEFAULT_PROMPT = `create a three column landing page about dolphins with a large hero section. in html and css please, with responsive design.`

function Prompt() {
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const [siteStream, setSiteStream] = useState('');
    const { setSite, loading } = useContext(SiteContext);

    useEffect(() => {
        if (!loading && siteStream) {
            console.log({siteStream})
            setSite({
                html: siteStream
            })
        }
    }, [siteStream, loading])
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = response.body;
        if (!data) {
            return;
        }
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setSiteStream((prev) => prev + chunkValue);
        }
    };

    return (
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                        <textarea id="prompt"
                                  value={prompt}
                                  onChange={(e) => setPrompt(e.target.value)}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Write your prompt here..."></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Shuffle
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Prompt
