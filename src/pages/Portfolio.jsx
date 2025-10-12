import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading";
import PageTemplate from "../components/PageTemplate";

export default function Portfolio({ subdomain }) {
  const [portfolioData, setPortfolioData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subdomain) return;

    const fetchPortfolioData = async () => {
      try {
        const subdomainKey = subdomain.toLowerCase().trim();
        const subRef = doc(db, "subdomains", subdomainKey);
        const subSnap = await getDoc(subRef);

        if (!subSnap.exists()) {
          console.warn(`Subdomain "${subdomainKey}" not found.`);
          setNotFound(true);
          setLoading(false);
          return;
        }

        setPortfolioData(subSnap.data());
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [subdomain]);

  if (loading) return <Loading />;
  if (notFound)
    return (
      <div>Portfolio not found.</div>
    );

  const user = portfolioData;

  return (
    <div className="container">
      <PageTemplate data={user} />
    </div>
  );
}