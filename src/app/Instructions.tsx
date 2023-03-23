import {useState} from 'react'
import { Disclosure } from "@headlessui/react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid";

function Instructions() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full px-4 pt-6">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                <Disclosure>
                        <div>
                            <Disclosure.Button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"                            >
                                <span>What to do</span>
                                {isOpen ?
                                    <ChevronDownIcon className="h-6 w-6" /> : <ChevronUpIcon className="h-6 w-6" />
                                }
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <strong className='block py-2'>👉👉👉 Click an element in the generated webpage below, and its HTML will be copied to your clipboard👈👈👈</strong>
                                <ul className="list-disc">
                                    <li>🤖 gpt-3.5-turbo generates a page based on the above description, and is instructed to add `data-export` to each major section. </li>
                                    <li>👨‍💻 The HTML+CSS outputted is then inlined, and processed to add click-handlers and on-click animation to each section.</li>
                                    <li>⏲  Results may take up to 20 seconds to begin loading</li>
                                    <li>📋 Content is saved to local storage if you need to refresh</li>
                                    <li>👩‍💼 The intent of this util is to demo functionality without too much time spent, and is rough around the edges. <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={"https://github.com/jdodsoncollins/llm-page-builder"}>View on GitHub.</a></li>
                                </ul>
                            </Disclosure.Panel>
                        </div>
                </Disclosure>
            </div>
        </div>
    );
}

export default Instructions
