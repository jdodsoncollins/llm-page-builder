import React, {useState, FC, ReactNode} from 'react';
import {SiteContext, defaultSiteState} from "./SiteContext";

interface Props {
    children: ReactNode;
}

const SiteProvider: FC<Props> = ({ children }) => {
    const [site, setSite] = useState(defaultSiteState);
    const [loading, setLoading] = useState(false);


    return (
        <SiteContext.Provider
            value={{
                site,
                setSite,
                loading,
            }}
        >
            {children}
        </SiteContext.Provider>
    );
};

export default SiteProvider