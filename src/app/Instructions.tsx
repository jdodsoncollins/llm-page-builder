import {useState} from 'react'
import { Disclosure } from "@headlessui/react";
import {cx} from "@vechaiui/react";

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
                        <span>What is this?</span>
                        {isOpen ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>

                        }
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-muted">
                        <ul>
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
