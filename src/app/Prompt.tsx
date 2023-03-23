import React, {FormEvent, useContext, useEffect, useState} from 'react'
import {Site, SiteContext} from "./context/SiteContext";
import {useLocalStorage} from "@/util/hooks/localStorage";

const awesomeThings = ["dinosaurs", "dolphins", "sharks", "tigers", "airplanes", "rocket ships", "space"]

const DEFAULT_PROMPT = `a three column landing page about ${awesomeThings[Math.floor(Math.random() * 7)]} with a large hero section`

const Spinner = () =>
    <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"/>
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>

const Slider = ({value, setValue}: {value: number, setValue: (v: number) => void}) =>
    <div className="pt-2 pb-3">
        <label htmlFor="default-range" className="block tracking-wide text-gray-700 text-xs font-bold mb-2e">Temperature (Higher means more `&quot;randomness`&quot;. Currently {value})</label>
        <div className="flex items-center">
            <span className="p-1">❄️</span><input id="default-range" type="range" min="0" max="1" step="0.1" value={value} onChange={(e) => setValue(Number(e.target.value))}
                                                 className="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" /><span className="p-1">🔥</span>
        </div>
    </div>


function Prompt() {

    // todo: messy!
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const [temperature, setTemperature] = useState(0.7);
    const [loading, setLoading] = useState(false);
    const [siteStream, setSiteStream] = useState('');
    const { setSite, preferences } = useContext(SiteContext);
    const [siteStorage, setSiteStorage] = useLocalStorage<Site>("site", {
        html: ''
    });

    // todo: move to wrapper
    useEffect(() => {
        setSite({
            html: siteStorage.html
        })

    }, [])

    useEffect(() => {
        if (!loading && siteStream) {
            inlineHTML().then(inlinedHTMLRes => inlinedHTMLRes.json()).then((inlinedHTML) => {
                console.log({inlinedHTML})
                setSite({
                    html: String(inlinedHTML)
                })
                setSiteStorage({
                    html: String(inlinedHTML)
                })
            })
        }
    }, [siteStream, loading])

    const inlineHTML = async () => {
        return await fetch("/api/inline", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                htmlString: siteStream
            }),
        });
    }

    // todo: move to service
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setSite({html: ''})
        setSiteStorage({html: ''})

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: preferences.apiKey,
                temperature,
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
            if (doneReading) setLoading(false)
            const chunkValue = decoder.decode(value);
            setSiteStream((prev) => prev + chunkValue);
        }
    };

    return (
        <div className="w-full py-3">
            <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                        <label htmlFor="prompt" className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Generate me a website with the contents...
                        </label>
                        <textarea id="prompt"
                                  value={prompt}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  onChange={(e) => setPrompt(e.target.value)}
                                  placeholder="Write your prompt here..."></textarea>
                </div>
                <Slider value={temperature} setValue={setTemperature} />
                <div className="flex items-center justify-between pb-8 ">
                    <button
                        type="submit"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        disabled={loading}
                        >
                        {loading ? <Spinner /> : siteStream ? "Re-generate" : "Generate" }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Prompt
