import {useContext} from 'react'
import {SiteContext} from "./context/SiteContext";

function Export() {
    const { site } = useContext(SiteContext);

    const uploadToServer = async (event: any) => {
        const body = new FormData();
        body.append("file", site.html);
        const response = await fetch("/api/export", {
            method: "POST",
            body
        });
    };

    return (
        <button
            onClick={() => uploadToServer(event)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Export
        </button>
    );
}

export default Export
