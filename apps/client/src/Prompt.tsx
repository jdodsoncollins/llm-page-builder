import {FormEvent, useContext, useState} from 'react'
import './App.css'
import axios from "axios";
import {SiteContext} from "./SiteContext";

const DEFAULT_PROMPT = `create a three column landing page about dolphins with a large hero section. in html and css please, with responsive design.`

function Prompt() {
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const { setSite, loading, setLoading } = useContext(SiteContext);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Send a request to the server with the prompt
        axios
            .post(`${import.meta.env.VITE_BACKEND}/chat`, { prompt })
            .then((res) => {
                // Update the response state with the server's response
                console.log(res.data)
                setLoading(false);
                setSite({
                    html: res.data
                })

            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit">Shuffle</button>
            </form>
        </div>
    );
}

export default Prompt
