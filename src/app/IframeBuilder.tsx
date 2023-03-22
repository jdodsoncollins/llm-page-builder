import {FC, useContext, useRef} from 'react'
import {writeIframeDocument} from "@/util/iframe";
import {cx, useNotification} from "@vechaiui/react";
import {Preferences, SiteContext} from "@/app/context/SiteContext";

interface Props {
    content: string,
    size: Preferences['size']
}

const IframeBuilder: FC<Props> = ({ content, size }) => {
    const notification = useNotification();
    const { preferences } = useContext(SiteContext);

    const onCopy = (e: Element) => {
        e.classList.add('element-clicked');
        setTimeout(() => {
            e.classList.remove('element-clicked')
        }, 1000)
        notification({
            title: "Element copied to clipboard",
            status: "success",
            position: "top",
        });
    };

    const sizeClass= () => {
        return `device-${preferences.size}`
    }

    const iframeRef = useRef<HTMLIFrameElement>(null);
    if (iframeRef.current) writeIframeDocument(iframeRef.current, content);
    iframeRef.current?.contentDocument?.querySelectorAll('*[data-export]').forEach((e) => {

        e.addEventListener('click', async (l) => {
            l.stopPropagation();
            console.log(e)
            if (!navigator.clipboard) {

            }
            await navigator.clipboard.writeText(e.innerHTML).catch((e) => {
            })
            onCopy(e);
        });

    })

    return (
        <div >
            <iframe className={cx(sizeClass(), 'resize bg-white border-dashed border-2')} style={{'resize': 'both'}} ref={iframeRef} />
        </div>
    );
}

export default IframeBuilder
