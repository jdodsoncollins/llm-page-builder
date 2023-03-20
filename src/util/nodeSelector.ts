function toDOM(xmlString: string) {
    return new DOMParser().parseFromString(xmlString, "text/html");
}

function embedNodeSelectorScript(iframe: HTMLIFrameElement) {
    const scripts = [];
    iframe.contentDocument?.querySelectorAll('*[data-export]').forEach((e) => {

        e.addEventListener('click', async () => {
            if (!navigator.clipboard) {
                
            }
            await navigator.clipboard.writeText(e.innerHTML).catch((e) => {

            })
        });

        console.log(e);

    })
}

export {
    embedNodeSelectorScript
}