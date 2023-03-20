"use client"; // this is a client component
import SiteProvider from "@/app/context/SiteProvider";
import Output from "@/app/Output";
import Prompt from "@/app/Prompt";
import {VechaiProvider} from "@vechaiui/react";

export default function Home() {
  return (
    <main className={'h-screen w-screen'}>
        <VechaiProvider>
          <SiteProvider>
            <Prompt />
            <Output />
          </SiteProvider>
        </VechaiProvider>
    </main>
  )
}
