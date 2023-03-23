import React, {useContext, useEffect, useState} from 'react'
import {SiteContext} from "./context/SiteContext";
import IframeBuilder from "./IframeBuilder";
import { Tab } from "@headlessui/react";
import {ComputerDesktopIcon, DevicePhoneMobileIcon, DeviceTabletIcon} from "@heroicons/react/20/solid";
import Instructions from "@/app/Instructions";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Output() {
    const { site, preferences, setPreferences } = useContext(SiteContext);
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        if (preferences.size === 'md') return setSelectedIndex(1);
        if (preferences.size === 'lg') return setSelectedIndex(2);
        setSelectedIndex(0);
    }, [preferences])

    const tabClasses = ({ selected }: { selected: boolean }) =>
        classNames(
            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
            'focus:outline-none focus:ring-2 flex justify-center',
            selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
        )

    return (
        <>
            <Instructions />
            <div className="rounded px-8 pt-6 pb-8 mb-4 relative">
                <div className="w-full px-2 sm:px-0">
                    <Tab.Group selectedIndex={selectedIndex}>
                        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                            <Tab className={tabClasses} onClick={() => setPreferences({size: 'sm'})}><DevicePhoneMobileIcon className="h-6 w-6"/></Tab>
                            <Tab className={tabClasses} onClick={() => setPreferences({size: 'md'})}><DeviceTabletIcon className="h-6 w-6"/></Tab>
                            <Tab className={tabClasses} onClick={() => setPreferences({size: 'lg'})}><ComputerDesktopIcon className="h-6 w-6"/></Tab>
                        </Tab.List>
                    </Tab.Group>
                </div>
            <IframeBuilder content={site.html} size={preferences.size} />
            </div>
        </>
    );
}

export default Output
