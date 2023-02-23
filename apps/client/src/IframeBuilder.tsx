import {FC, useContext, useEffect, useRef} from 'react'
import styles from './IframeBuilder.module.css'
import {writeIframeDocument} from "./util/iframe";

interface Props {
    content: string
}

const IframeBuilder: FC<Props> = ({ content }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    if (iframeRef.current) writeIframeDocument(iframeRef.current, content)

    return (
        <div className={styles.resizer}>
            <iframe className={styles.resized} ref={iframeRef} />
        </div>
    );
}

export default IframeBuilder
