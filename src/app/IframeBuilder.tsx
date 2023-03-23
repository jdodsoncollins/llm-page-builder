import {FC, useContext, useRef} from 'react'
import {writeIframeDocument} from "@/util/iframe";
import {Preferences, SiteContext} from "@/app/context/SiteContext";
import toast from 'react-hot-toast';

interface Props {
    content: string,
    size: Preferences['size']
}

const IframeBuilder: FC<Props> = ({ content, size }) => {
    const { preferences } = useContext(SiteContext);

    const onCopy = (e: Element) => {
        e.classList.add('element-clicked');
        setTimeout(() => {
            e.classList.remove('element-clicked')
        }, 1000)
        toast("Element copied to clipboard");
    };

    const sizeClass = () => {
        return `device-${preferences.size || 'sm'}`
    }

    const iframeRef = useRef<HTMLIFrameElement>(null);
    if (iframeRef.current) writeIframeDocument(iframeRef.current, content);
    iframeRef.current?.contentDocument?.querySelectorAll('*[data-export]').forEach((e) => {

        e.addEventListener('click', async (l) => {
            l.stopPropagation();
            if (!navigator.clipboard) {
                toast('Copy to clipboard failed')
            }
            await navigator.clipboard.writeText(e.innerHTML).catch((e) => {
            })
            onCopy(e);
        });

    })

    return (
        <div >
            <iframe className={sizeClass() + ' bg-white border-dashed border-2'} ref={iframeRef} />
        </div>
    );
}

export default IframeBuilder
