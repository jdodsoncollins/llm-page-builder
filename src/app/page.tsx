"use client"; // this is a client component
import SiteProvider from "@/app/context/SiteProvider";
import Output from "@/app/Output";
import Prompt from "@/app/Prompt";
import Key from "@/app/Key";
import {Toaster} from "react-hot-toast";

export default function Home() {
  return (
    <main>
      <SiteProvider>
        <Key />
        <Prompt />
        <Output />
      </SiteProvider>
        <Toaster />
    </main>
  )
}
