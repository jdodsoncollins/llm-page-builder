import {FC, useRef} from 'react'
import {writeIframeDocument} from "@/util/iframe";

interface Props {
    content: string
}

const IframeBuilder: FC<Props> = ({ content }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    if (iframeRef.current) writeIframeDocument(iframeRef.current, content)

    return (
        <div >
            <iframe className="resize" ref={iframeRef} />
        </div>
    );
}

export default IframeBuilder
