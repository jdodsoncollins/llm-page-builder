import React, {FormEvent, useState} from 'react'
import './App.css'
import Prompt from "./Prompt";
import Output from "./Output";
import {defaultSiteState} from "./SiteContext";
import SiteProvider from "./SiteProvider";

function App() {
    const [site, setSite] = useState(defaultSiteState);
    return (
        <SiteProvider>
            <Prompt />
            <Output />
        </SiteProvider>
    );
}

export default App
