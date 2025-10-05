import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading";

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
      <div className="p-8 text-center text-gray-500">
        Portfolio not found.
      </div>
    );

  const user = portfolioData;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">
        {user.firstName} {user.lastName}
      </h1>

      <p><strong>Location:</strong> {user.location}</p>
      <p><strong>Role:</strong> {user.currentRole}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
      <p><strong>Contact Email:</strong> {user.contactEmail}</p>
      <p><strong>Contact Phone:</strong> {user.contactPhone}</p>

      {user.links?.length > 0 && (
        <div>
          <strong>Links:</strong>
          <ul>
            {user.links.map((link, i) => (
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

      {user.skills?.length > 0 && (
        <div>
          <strong>Skills:</strong>
          <ul>
            {user.skills.map((skill, i) => (
              <li key={i}>
                {skill.type} - {skill.name} (Level {skill.level})
              </li>
            ))}
          </ul>
        </div>
      )}

      {user.experiences?.length > 0 && (
        <div>
          <strong>Experiences:</strong>
          <ul>
            {user.experiences.map((exp, i) => (
              <li key={i}>
                {exp.position} at {exp.companyName} (
                {exp.startDate} - {exp.endDate || "Present"})
              </li>
            ))}
          </ul>
        </div>
      )}

      {user.education?.length > 0 && (
        <div>
          <strong>Education:</strong>
          <ul>
            {user.education.map((edu, i) => (
              <li key={i}>
                {edu.schoolName} ({edu.startDate} - {edu.endDate})
              </li>
            ))}
          </ul>
        </div>
      )}

      {user.resume && (
        <div>
          <strong>Resume:</strong>{" "}
          <a href={user.resume} target="_blank" rel="noopener noreferrer">
            {user.resume}
          </a>
        </div>
      )}

      {user.pfp && (
        <div>
          <img
            src={user.pfp}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full"
          />
        </div>
      )}
    </div>
  );
}