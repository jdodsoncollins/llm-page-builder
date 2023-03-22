import React, {useState, FC, ReactNode} from 'react';
import {SiteContext, defaultSiteState, defaultPreferences, Site, Preferences} from "./SiteContext";

interface Props {
    children: ReactNode;
}

const SiteProvider: FC<Props> = ({ children }) => {
    const [site, setSite] = useState<Site>(defaultSiteState);
    const [preferences, setPreferences] = useState<Partial<Preferences>>(defaultPreferences);

    return (
        <SiteContext.Provider
            value={{
                site,
                setSite,
                preferences,
                setPreferences,
            }}
        >
            {children}
        </SiteContext.Provider>
    );
};

export default SiteProvider