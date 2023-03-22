import {createContext, useState} from 'react';

export interface Site {
    html: string,
    css?: string
}

export interface Preferences {
    size?: 'sm' | 'md' | 'lg',
    apiKey?: string,
    localStorage?: boolean
}

interface DefaultState {
    site: Site,
    setSite: (site: Site) => void,
    preferences: Preferences,
    setPreferences: (value: Partial<Preferences>) => void,

}

export let defaultSiteState: Site = {
    html: '',
    css: ''
}

export let defaultPreferences: Preferences = {
    size: 'md',
    apiKey: 'enter open AI key here',
    localStorage: true
}



export const SiteContext = createContext<DefaultState>({site: defaultSiteState, setSite: (site: Site) => {}, preferences: defaultPreferences, setPreferences: (prefs: Partial<Preferences>) => {}});