import React, {FormEvent, useContext, useEffect, useState} from 'react'
import {Site, SiteContext} from "./context/SiteContext";
import {useLocalStorage} from "@/util/hooks/localStorage";
import {Textarea} from "@vechaiui/forms";
import {Button} from "@vechaiui/button";
import {
    FormControl,
    FormLabel,
} from "@vechaiui/react"

const DEFAULT_PROMPT = `create a three column landing page about dolphins with a large hero section`

function Prompt() {
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const [siteStream, setSiteStream] = useState('');
    const { setSite, loading } = useContext(SiteContext);
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
            console.log({siteStream})
            setSite({
                html: siteStream
            })
            setSiteStorage({
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

        // todo: move to service
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
                <div className="flex items-center justify-between">
                    <Button
                        variant="solid"
                        type="submit"
                        >
                        Shuffle
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Prompt
