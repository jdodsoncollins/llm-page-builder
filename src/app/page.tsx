"use client"; // this is a client component
import SiteProvider from "@/app/SiteProvider";
import Output from "@/app/Output";
import Prompt from "@/app/Prompt";

export default function Home() {
  return (
    <main >
      <SiteProvider>
        <Prompt />
        <Output />
      </SiteProvider>
    </main>
  )
}
