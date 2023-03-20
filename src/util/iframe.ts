import {ReactElement} from "react";
import {embedNodeSelectorScript} from "@/util/nodeSelector";

export const writeIframeDocument = (iframe: HTMLIFrameElement, htmlString: string) => {
    iframe.contentWindow!.document.open();
    iframe.contentWindow!.document.write(htmlString);
    iframe.contentWindow!.document.close();

    embedNodeSelectorScript(iframe)
}