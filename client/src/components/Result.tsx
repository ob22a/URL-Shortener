import {useState} from "react"
import {FaCopy} from "react-icons/fa"

interface ResultProps {
  shortenedUrl: string | null;
  showNotification: (type:"success" | "error", message:string)=>void;
}

const Result = ({shortenedUrl, showNotification }: ResultProps) => {
    const [copyStatus, setCopyStatus] = useState<"copy" | "copied">("copy");
    const copyToClipboard = async () => {
        try {
            if (!navigator.clipboard) throw new Error("Clipboard API not supported");
            await navigator.clipboard.writeText(shortenedUrl as string);
            setCopyStatus("copied");
            showNotification("success", "Shortened URL copied to clipboard");

            setTimeout(() => {
                setCopyStatus("copy");
            }, 3500);
        } catch (err) {
            showNotification("error", "Failed to copy shortened URL");
            console.log(err);
        }
    };
    return (
        <div className="result-section" id="result-section">
            <div className="shortened-link">
                <p id="shortened-url">{shortenedUrl}</p>
                <button className={`copy-button ${copyStatus === "copy" ? "copy" : "copied"}`} id="copy-btn" onClick={copyToClipboard}>
                    <FaCopy className="icon" />
                    <span className="button-text">{copyStatus === "copy" ? "Copy" : "Copied!"}</span>
                </button>
            </div>
        </div>
    )
}

export default Result