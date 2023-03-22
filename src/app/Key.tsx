import React, {FormEvent, useContext, useEffect, useState} from 'react'
import {Preferences, SiteContext} from "./context/SiteContext";
import {useLocalStorage} from "@/util/hooks/localStorage";
import {FormLabel, Input} from "@vechaiui/react"
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
        if (siteStorage.apiKey) {
            setPreferences({
                apiKey: siteStorage.apiKey
            })
            setKey(siteStorage.apiKey)
        }
    }, [])

    useEffect(() => {
        setPreferences({
            apiKey: key
        })
        setSiteStorage({
            apiKey: key
        })
    }, [key])

    return (
        <div className="w-full py-3">
            <form onSubmit={e => { e.preventDefault(); }} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <FormControl id="key">
                        <FormLabel htmlFor="key" className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                            OpenAI API key
                        </FormLabel>
                        <Input.Group>
                            <Input id="key" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your OpenAI API key here, or set in .env if running locally" value={key} onBlur={(e) => setKey(e.target.value)} onChange={(e) => setKey(e.target.value)}
                            />
                        </Input.Group>
                    </FormControl>
                </div>
            </form>
        </div>
    );
}

export default Key
