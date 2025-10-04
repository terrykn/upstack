import { useState, useEffect } from "react"
import Home from "./pages/Home";
import 'primeicons/primeicons.css';
import Portfolio from "./pages/Portfolio";

function App() {
  const [subdomain, setSubdomain] = useState(null);

  useEffect(() => {
    const hostname = window.location.hostname; // example.upstack.cv
    const parts = hostname.split(".");
    if (parts.length > 2) {
      const sub = parts[0];
      setSubdomain(sub);
    }
  }, []);

  if (!subdomain) {
    return <Home />
  }

  return <Portfolio subdomain={subdomain} />
}

export default App
