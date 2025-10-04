import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading";

export default function Portfolio() {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading || !userData) return <Loading />;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h1>
      <p><strong>Location:</strong> {userData.location}</p>
      <p><strong>Role:</strong> {userData.currentRole}</p>
      <p><strong>Bio:</strong> {userData.bio}</p>
      <p><strong>Contact Email:</strong> {userData.contactEmail}</p>
      <p><strong>Contact Phone:</strong> {userData.contactPhone}</p>
      
      <div>
        <strong>Links:</strong>
        <ul>
          {userData.links.map((link, i) => (
            <li key={i}>
              {link.platform}: <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Skills:</strong>
        <ul>
          {userData.skills.map((skill, i) => (
            <li key={i}>{skill.type} - {skill.name} (Level {skill.level})</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Experiences:</strong>
        <ul>
          {userData.experiences.map((exp, i) => (
            <li key={i}>
              {exp.position} at {exp.companyName} ({exp.startDate} - {exp.endDate || "Present"})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Education:</strong>
        <ul>
          {userData.education.map((edu, i) => (
            <li key={i}>
              {edu.schoolName} ({edu.startDate} - {edu.endDate})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Resume:</strong> <a href={userData.resume} target="_blank" rel="noopener noreferrer">{userData.resume}</a>
      </div>

      {userData.pfp && (
        <div>
          <img src={userData.pfp} alt="Profile Picture" className="w-32 h-32 rounded-full" />
        </div>
      )}
    </div>
  );
}
