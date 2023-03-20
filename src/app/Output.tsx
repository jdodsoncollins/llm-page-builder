import {useContext} from 'react'
import {SiteContext} from "./context/SiteContext";
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
