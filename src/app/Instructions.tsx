import {useState} from 'react'
import { Disclosure } from "@headlessui/react";
import {cx} from "@vechaiui/react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid";

function Instructions() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Disclosure as="div" className="mt-2">
                <>
                    <Disclosure.Button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cx(
                            "flex items-center justify-between w-full px-4 py-2 rounded-base cursor-base focus:outline-none bg-primary-500 text-white"
                        )}
                    >
                        <span>What to do</span>
                        {isOpen ?
                            <ChevronDownIcon className="h-6 w-6" /> : <ChevronUpIcon className="h-6 w-6" />
                        }
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-muted">
                        <ul className="list-disc">
                            <li>gpt-3.5-turbo generates a page based on the above description, and is instructed to add `data-export` to each major section. The HTML/CSS outputted is processed to add click-handlers to each of these sections.</li>
                            <li>Results may take a few seconds to begin loading</li>
                            <li>Click an element below, and its HTML will be copied to your clipboard</li>
                        </ul>
                    </Disclosure.Panel>
                </>
        </Disclosure>
    );
}

export default Instructions
