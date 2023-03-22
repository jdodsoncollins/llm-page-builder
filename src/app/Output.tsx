import React, {useContext} from 'react'
import {SiteContext} from "./context/SiteContext";
import IframeBuilder from "./IframeBuilder";
import { RadioGroup } from "@headlessui/react";
import {IconButton} from "@vechaiui/react";
import {ComputerDesktopIcon, DevicePhoneMobileIcon, DeviceTabletIcon} from "@heroicons/react/20/solid";
import Instructions from "@/app/Instructions";

function Output() {
    const { site, preferences, setPreferences } = useContext(SiteContext);

    return (
        <>
            <Instructions />
            <div className="rounded px-8 pt-6 pb-8 mb-4 relative">
                <div style={{position: 'absolute', top: '30px', left: '40px'}}>
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
