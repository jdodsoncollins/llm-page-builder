"use client"; // this is a client component
import SiteProvider from "@/app/context/SiteProvider";
import Output from "@/app/Output";
import Prompt from "@/app/Prompt";
import {VechaiProvider} from "@vechaiui/react";
import Key from "@/app/Key";

export default function Home() {
  return (
    <main>
        <VechaiProvider>
          <SiteProvider>
            <Key />
            <Prompt />
            <Output />
          </SiteProvider>
        </VechaiProvider>
    </main>
  )
}
