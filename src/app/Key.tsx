import React, {FormEvent, useContext, useEffect, useState} from 'react'
import {Preferences, SiteContext} from "./context/SiteContext";
import {useLocalStorage} from "@/util/hooks/localStorage";
import { Input } from "@vechaiui/react"
import {
    FormControl,
} from "@vechaiui/react"
import {KeyIcon} from "@heroicons/react/20/solid";
import {DomEvent} from "@react-three/fiber/dist/declarations/src/core/events";

const DEFAULT_KEY = (process.env.NEXT_PUBLIC_OPENAI_API_KEY);

function Key() {
    const [key, setKey] = useState(DEFAULT_KEY);
    const { preferences, setPreferences } = useContext(SiteContext);
    const [siteStorage, setSiteStorage] = useLocalStorage<Preferences>("preferences", {
        apiKey: key
    });

    // todo: move to wrapper
    useEffect(() => {
        if (siteStorage.apiKey)
            setPreferences({
                apiKey: key
            })
    }, [])

    return (
        <div className="w-full max-w-xs py-3">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <FormControl id="key">
                        <Input.Group>
                            <Input placeholder="Enter your OpenAI API key here, or set in .env if running locally" value={key} onBlur={(e) => setKey(e.target.value)} onChange={(e) => setKey(e.target.value)}
                            />
                            <Input.RightElement>
                                <KeyIcon className="w-4 h-4 text-green-500" />
                            </Input.RightElement>
                        </Input.Group>
                    </FormControl>
                </div>
            </form>
        </div>
    );
}

export default Key
