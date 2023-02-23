import {useContext} from 'react'
import './App.css'
import {SiteContext} from "./SiteContext";
import IframeBuilder from "./IframeBuilder";

function Output() {
    const { site } = useContext(SiteContext);

    return (
        <div>
            <IframeBuilder content={site.html} />
        </div>
    );
}

export default Output
