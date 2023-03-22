import React, {useContext} from 'react'
import {SiteContext} from "./context/SiteContext";
import IframeBuilder from "./IframeBuilder";
import { Tab } from "@headlessui/react";
import { RadioGroup } from "@headlessui/react";
import {FormControl, FormLabel, Icon, Radio, cx, Avatar, IconButton} from "@vechaiui/react";
import {ComputerDesktopIcon, DevicePhoneMobileIcon, DeviceTabletIcon} from "@heroicons/react/20/solid";
import {Button} from "@vechaiui/button";
import Instructions from "@/app/Instructions";

function Output() {
    const { site, preferences, setPreferences } = useContext(SiteContext);

    return (
        <>
            <Instructions />
            <div className="flex flex-wrap w-full p-8 space-x-4 relative">
                <div style={{position: 'absolute', top: '10px', left: '10px'}}>
                    <RadioGroup value={preferences.size}>
                        <RadioGroup.Label className={'flex'}>
                            <RadioGroup.Option value="sm" onClick={() => setPreferences({size: 'sm'})}>
                                <IconButton variant="solid" color={preferences.size === 'sm' ? "primary" : "secondary"}><DevicePhoneMobileIcon className="h-6 w-6"/></IconButton>
                            </RadioGroup.Option>
                            <RadioGroup.Option value="md" onClick={() => setPreferences({size: 'md'})}>
                                <IconButton variant="solid" color={preferences.size === 'md' ? "primary" : "secondary"}><DeviceTabletIcon className="h-6 w-6"/></IconButton>
                            </RadioGroup.Option>
                            <RadioGroup.Option value="lg" onClick={() => setPreferences({size: 'lg'})}>
                                <IconButton variant="solid" color={preferences.size === 'lg' ? "primary" : "secondary"}><ComputerDesktopIcon className="h-6 w-6"/></IconButton>
                            </RadioGroup.Option>
                        </RadioGroup.Label>
                    </RadioGroup>
                </div>
            <IframeBuilder content={site.html} size={preferences.size} />
            </div>
        </>
    );
}

export default Output
