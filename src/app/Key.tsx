import React, {FormEvent, useContext, useEffect, useState} from 'react'
import {Preferences, SiteContext} from "./context/SiteContext";
import {useLocalStorage} from "@/util/hooks/localStorage";

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
                    <label htmlFor="key" className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                        OpenAI API key
                    </label>
                        <input id="key" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your OpenAI API key here, or set in .env if running locally" value={key} onBlur={(e) => setKey(e.target.value)} onChange={(e) => setKey(e.target.value)}
                        />
                </div>
            </form>
        </div>
    );
}

export default Key
