import React, {FormEvent, useContext, useEffect, useState} from 'react'
import {Site, SiteContext} from "./context/SiteContext";
import {useLocalStorage} from "@/util/hooks/localStorage";
import {Textarea} from "@vechaiui/forms";
import {Button} from "@vechaiui/button";
import {
    FormControl,
    FormLabel, Spinner,
} from "@vechaiui/react"

const DEFAULT_PROMPT = `create a three column landing page about dolphins with a large hero section`

function Prompt() {
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
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
        <div className="w-full max-w-xs py-3">
            <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <FormControl id="Prompt">
                        <FormLabel htmlFor="prompt">
                            Generate me a website with the contents...
                        </FormLabel>
                        <Textarea id="prompt"
                                  value={prompt}
                                  onChange={(e) => setPrompt(e.target.value)}
                                  placeholder="Write your prompt here..."></Textarea>
                    </FormControl>
                </div>
                <div className="flex items-center justify-between pb-8 ">
                    <Button
                        variant="solid"
                        type="submit"
                        disabled={loading}
                        >
                        {loading ? <Spinner className="text-primary-500" /> : siteStream ? "Re-generate" : "Generate" }
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Prompt
