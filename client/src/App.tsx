import BackgroundElements from "./components/BackgroundElements"
import Notification from "./components/Notification";
import InputSection from "./components/InputSection";
import Result from "./components/Result";
import { useCallback, useEffect, useState } from "react";
import './styles/main.css';

interface ApiResponse{
  message:string;
  shortCode: string;
}

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [buttonState, setButtonState] = useState<"empty" | "typing" | "loading">("empty");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [notification, setNotification] = useState<{show:boolean,type:"success" | "error", message:string}>({show:false, type:"success", message:""});
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const showNotification = useCallback((type:"success" | "error", message:string)=>{
    setNotification({show:true, type, message});
    setTimeout(()=>{
      setNotification(prev=>({...prev, show:false}));
    }, 3000);
  }, []);
  
  const handlePasting = useCallback(async ()=>{
    try{
      if(!navigator.clipboard) throw new Error("Clipboard API not supported");
      const text = await navigator.clipboard.readText();
      setInputUrl(text);
      showNotification('success', 'URL pasted from clipboard');
    }catch(err){
      showNotification('error', 'Failed to paste from clipboard');
      console.log(err);
    }
  }, [showNotification]);

  const validateUrl = useCallback((url:string):boolean=>{
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
  }, []);

  useEffect(()=>{
    if(!inputUrl){
      setButtonState("empty");
    }else{
      setButtonState("typing");
    }
  },[inputUrl])


  const handleShortening = useCallback(async ()=>{
    if(!validateUrl(inputUrl)){
      showNotification("error", "Please enter a valid URL");
      return;
    }
    setButtonState("loading");
    try{
      const apiUrl = import.meta.env.VITE_API_URL as string;
      console.log("API URL:", apiUrl);
      const response = await fetch(`${apiUrl}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({originalUrl: inputUrl, expiresAt: expirationDate?.toISOString()})
      });

      const data:ApiResponse = await response.json();
      setButtonState("typing");
      if(response.ok){
        showNotification("success", "URL shortened successfully");
        const shortUrl = `${apiUrl}/${data.shortCode}`;
        setShortenedUrl(shortUrl);
        setShowResult(true);
        setInputUrl("");
        setExpirationDate(null);
      }else{
        showNotification("error", data.message || "Failed to shorten URL");
      }
    }catch(err){
      showNotification("error", "An error occurred while shortening the URL");
      setButtonState("typing");
      console.log(err);
    }
  }, [inputUrl, expirationDate, showNotification, validateUrl]);
    
  return(
    <>
      <BackgroundElements />
      <Notification 
            message={notification.message}
            type={notification.type}
            show={notification.show}
        />
      <div className="page-container">
        <h1>URL Shortener</h1>
        <h3>Shorten links. Share with confidence.</h3>
        
        <InputSection 
            inputUrl={inputUrl}
            setInputUrl={setInputUrl}
            handlePasting={handlePasting}
            expirationDate={expirationDate}
            setExpirationDate={setExpirationDate}
            handleShortening={handleShortening}
            buttonState={buttonState}
        />
        
        {showResult && shortenedUrl && 
          <Result 
              inputUrl={inputUrl}
              shortenedUrl={shortenedUrl}
              showNotification={showNotification}
          />
        }
        
        <footer>
            <p>© 2026 URL Shortener. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}

export default App
