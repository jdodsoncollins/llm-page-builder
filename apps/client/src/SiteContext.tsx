import {createContext, useState} from 'react';

interface Site {
    html: string,
    css?: string
}

interface SiteState {
    site: Site,
    setSite: (site: Site) => void,
    loading: boolean,
    setLoading: (val: boolean) => void,
}

export let defaultSiteState: Site = {
    html: '',
    css: ''
}

export const SiteContext = createContext<SiteState>({site: defaultSiteState, setSite: (site: Site) => defaultSiteState = { ...site }, loading: false, setLoading: (val) => loading = val});