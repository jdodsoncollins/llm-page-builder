import {ReactElement} from "react";

export const writeIframeDocument = (iframe: HTMLIFrameElement, htmlString: string) => {
    iframe.contentWindow!.document.open();
    iframe.contentWindow!.document.write(htmlString);
    iframe.contentWindow!.document.close();
    writeIframeAnimation(iframe);
}

const writeIframeAnimation = (iframe: HTMLIFrameElement) => {
    const styles = `
    .element-clicked {
      animation: fadeinout 1s linear forwards;
    }
    
    @keyframes fadeinout {
      0%,100% { outline: 4px solid rgba(0,0,0,0); }
      50% { outline: 4px solid tomato; }
    }`

    let styleNode : HTMLStyleElement = document.createElement('style');
    styleNode.type = 'text/css';
    styleNode.textContent = styles;

    iframe.contentWindow!.document.head.appendChild(styleNode);
}