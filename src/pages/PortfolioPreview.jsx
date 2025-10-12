import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading";
import PageTemplate from "../components/PageTemplate";

export default function PortfolioPreview() {
  const { user, loading } = useAuth();
  const [portfolioData, setPortfolioData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchPortfolioData = async () => {
      try {
        setFetching(true);

        // Get the user document
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          console.warn("User document not found");
          setPortfolioData(null);
          setFetching(false);
          return;
        }

        // Get subdomain from user doc
        const { subdomain } = userSnap.data();
        if (!subdomain) {
          console.warn("User does not have a subdomain field");
          setPortfolioData(null);
          setFetching(false);
          return;
        }

        // Use subdomain as doc ID in subdomains collection
        const subdomainRef = doc(db, "subdomains", subdomain);
        const subdomainSnap = await getDoc(subdomainRef);

        if (subdomainSnap.exists()) {
          setPortfolioData(subdomainSnap.data());
        } else {
          console.warn("Subdomain document not found");
          setPortfolioData(null);
        }
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        setPortfolioData(null);
      } finally {
        setFetching(false);
      }
    };

    fetchPortfolioData();
  }, [user]);

  if (loading || fetching) return <Loading />;
  if (!portfolioData) return <p>No portfolio data found.</p>;

  return (
    <div className="container">
      <PageTemplate data={portfolioData} />
    </div>
  );
}