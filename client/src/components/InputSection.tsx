import ExpirationDatePicker from "../components/ExpirationDatePicker";
import { FaPaste } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";



interface InputSectionProps {
  inputUrl: string;
  setInputUrl: (url: string) => void;
  handlePasting: () => void;
  expirationDate: Date | null;
  setExpirationDate: (date: Date | null) => void;
  handleShortening: () => void;
  buttonState?: "empty" | "typing" | "loading";
}


const InputSection = ({ inputUrl, setInputUrl, handlePasting, expirationDate, setExpirationDate, handleShortening, buttonState }: InputSectionProps) => {
  return (
    <div className="input-section">
        <div className="input-button-section">
          <input {...buttonState === "loading" ? {readOnly: true} : {}} type="text" value={inputUrl} onChange={(e)=>setInputUrl(e.target.value)} id="url-input" placeholder="Paste your long URL here..." />
          <button id="submit-btn" onClick={!inputUrl ? handlePasting : handleShortening}>
          {buttonState === "loading" ? <AiOutlineLoading className="icon loading-icon" /> : ""}
              {buttonState !== "loading" ? !inputUrl ? <FaPaste className="icon" /> : <><FaLink className="icon" /><span className="button-text">Shorten</span></> : ""}
          </button>
        </div>
        <ExpirationDatePicker 
            selectedDate={expirationDate}
            onDateChange={setExpirationDate}
            defaultOption="never"
        />
    </div>
  )
}

export default InputSection