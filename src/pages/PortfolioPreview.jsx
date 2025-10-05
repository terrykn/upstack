import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading";

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
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">
        {portfolioData.firstName} {portfolioData.lastName}
      </h1>
      <p><strong>Location:</strong> {portfolioData.location}</p>
      <p><strong>Role:</strong> {portfolioData.currentRole}</p>
      <p><strong>Bio:</strong> {portfolioData.bio}</p>
      <p><strong>Contact Email:</strong> {portfolioData.contactEmail}</p>
      <p><strong>Contact Phone:</strong> {portfolioData.contactPhone}</p>

      {portfolioData.links && (
        <div>
          <strong>Links:</strong>
          <ul>
            {portfolioData.links.map((link, i) => (
              <li key={i}>
                {link.platform}:{" "}
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {portfolioData.skills && (
        <div>
          <strong>Skills:</strong>
          <ul>
            {portfolioData.skills.map((skill, i) => (
              <li key={i}>
                {skill.type} - {skill.name} (Level {skill.level})
              </li>
            ))}
          </ul>
        </div>
      )}

      {portfolioData.experiences && (
        <div>
          <strong>Experiences:</strong>
          <ul>
            {portfolioData.experiences.map((exp, i) => (
              <li key={i}>
                {exp.position} at {exp.companyName} ({exp.startDate} -{" "}
                {exp.endDate || "Present"})
              </li>
            ))}
          </ul>
        </div>
      )}

      {portfolioData.education && (
        <div>
          <strong>Education:</strong>
          <ul>
            {portfolioData.education.map((edu, i) => (
              <li key={i}>
                {edu.schoolName} ({edu.startDate} - {edu.endDate})
              </li>
            ))}
          </ul>
        </div>
      )}

      {portfolioData.resume && (
        <div>
          <strong>Resume:</strong>{" "}
          <a
            href={portfolioData.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            {portfolioData.resume}
          </a>
        </div>
      )}

      {portfolioData.pfp && (
        <div>
          <img
            src={portfolioData.pfp}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full"
          />
        </div>
      )}
    </div>
  );
}