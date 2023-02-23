import {ReactElement} from "react";

export const writeIframeDocument = (iframe: HTMLIFrameElement, htmlString: string) => {
    iframe.contentWindow!.document.open();
    iframe.contentWindow!.document.write(htmlString);
    iframe.contentWindow!.document.close();
}