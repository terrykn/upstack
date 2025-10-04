import { useState, useEffect } from "react"
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Navbar from "./components/Navbar";
import 'primeicons/primeicons.css';

function App() {

  const [subdomain, setSubdomain] = useState(null);

  useEffect(() => {
    const hostname = window.location.hostname; // example.upstack.cv
    const parts = hostname.split(".");
    if (parts.length > 2) {
      const sub = parts[0];
      setSubdomain(sub);
      //fetchTemplate(sub).then(template => setTemplate(template));
    }
  }, []);

  if (!subdomain) {
    return (
      <>
        <Home />
      </>
    )
  }

  if (!userConfig) {
    return <Loading />
  }

  return <Portfolio template={template} />
}

export default App
