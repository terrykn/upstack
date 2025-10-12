import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import Loading from "./Loading";
import TextField from "../components/TextField";
import ArrayField from "../components/ArrayField";
import PrimitiveArrayField from "../components/PrimitiveArrayField";
import ExperiencesEditor from "../components/ExperiencesEditor";
import EducationEditor from "../components/EducationEditor";
import LayoutSettings from "../components/LayoutSettings";
import PortfolioPreview from "./PortfolioPreview";

export default function ManagePortfolio() {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [subdomainKey, setSubdomainKey] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchPortfolioData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        let subKey = userSnap.exists() ? userSnap.data().subdomain?.toLowerCase() : null;
        if (!subKey) {
          subKey = user.uid.toLowerCase();
          await setDoc(userRef, { subdomain: subKey }, { merge: true });
        }

        setSubdomainKey(subKey);

        const subRef = doc(db, "subdomains", subKey);
        const subSnap = await getDoc(subRef);

        if (subSnap.exists()) {
          setFormData({ ...subSnap.data(), subdomain: subSnap.id });
        } else {
          const defaultData = {
            uid: user.uid,
            firstName: "",
            lastName: "",
            location: "",
            contactEmail: user.email || "",
            contactPhone: "",
            currentRole: "",
            bio: "",
            links: [],
            projects: [],
            skills: [],
            resume: "",
            experiences: [],
            education: [],
            pfp: "",
            subdomain: subKey,
            layout: {
              pageLayout: "single",
              navLayout: "top",
              fontFamily: "Poppins",
              fontSizeScale: 1.0,
              defaultTheme: "light",
              specialTheme: "",
              primaryColor: "#4F46E5",
              secondaryColor: "#06B6D4",
              backgroundColor: "#F9FAFB",
              projectsLayout: "gallery",
              experiencesLayout: "timeline",
              skillsLayout: "chips",
              contactsLayout: "icons",
              showEmailForm: true,
              favicon: "",
              footerLayout: "minimal",
            },
          };

          await setDoc(subRef, defaultData);
          setFormData({ ...defaultData, subdomain: subRef.id });
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolioData();
  }, [user]);

  if (loading || !formData) return <Loading />;

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!user || !subdomainKey) return;
    setSaving(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const oldSubdomain = userSnap.exists() ? userSnap.data().subdomain?.toLowerCase() : null;
      const newSubdomain = formData.subdomain.trim().toLowerCase();

      if (!newSubdomain) {
        alert("Subdomain cannot be empty.");
        setSaving(false);
        return;
      }

      const newSubRef = doc(db, "subdomains", newSubdomain);
      const newSubSnap = await getDoc(newSubRef);

      if (newSubSnap.exists() && newSubSnap.data().uid !== user.uid) {
        alert("This subdomain is already taken. Please choose another.");
        setSaving(false);
        return;
      }

      if (oldSubdomain && oldSubdomain !== newSubdomain) {
        const oldSubRef = doc(db, "subdomains", oldSubdomain);
        await deleteDoc(oldSubRef);
        await setDoc(userRef, { subdomain: newSubdomain }, { merge: true });
        setSubdomainKey(newSubdomain);
      }

      await setDoc(
        doc(db, "subdomains", newSubdomain),
        { ...formData, subdomain: newSubdomain, uid: user.uid },
        { merge: true }
      );

      alert("Portfolio saved successfully!");
    } catch (err) {
      console.error("Error saving portfolio:", err);
      alert("Error saving portfolio. Check the console for details.");
    }

    setSaving(false);
  };

return (
  <div>
    <Splitter>
      <SplitterPanel size={30} minSize={20}>
        <div className="container">
          <h2>Manage Portfolio</h2>

          <div className="form-section">
            <TextField
              label="Subdomain"
              value={formData.subdomain}
              onChange={(val) => handleChange("subdomain", val.toLowerCase())}
              helperText={`Your portfolio will be available at https://${formData.subdomain}.upstack.cv`}
            />
            <TextField
              label="First Name"
              value={formData.firstName}
              onChange={(val) => handleChange("firstName", val)}
            />
            <TextField
              label="Last Name"
              value={formData.lastName}
              onChange={(val) => handleChange("lastName", val)}
            />
          </div>

          <div className="form-section">
            <TextField
              label="Portfolio Contact Email"
              value={formData.contactEmail}
              onChange={(val) => handleChange("contactEmail", val)}
            />
            <TextField
              label="Portfolio Contact Phone"
              value={formData.contactPhone}
              onChange={(val) => handleChange("contactPhone", val)}
            />
          </div>

          <div className="form-section">
            <TextField
              label="Bio"
              value={formData.bio}
              onChange={(val) => handleChange("bio", val)}
              textarea
            />
            <TextField
              label="Profile Image URL"
              value={formData.pfp}
              onChange={(val) => handleChange("pfp", val)}
            />
          </div>

          <div className="form-section">
            <TextField
              label="Current Role"
              value={formData.currentRole}
              onChange={(val) => handleChange("currentRole", val)}
            />
            <TextField
              label="Location"
              value={formData.location}
              onChange={(val) => handleChange("location", val)}
            />
            <TextField
              label="Resume URL"
              value={formData.resume}
              onChange={(val) => handleChange("resume", val)}
            />
          </div>

          <div className="form-section">
            <ArrayField
              label="Links"
              arrayData={formData.links}
              setArrayData={(val) => handleChange("links", val)}
              fields={["platform", "url"]}
            />
            <ArrayField
              label="Skills"
              arrayData={formData.skills}
              setArrayData={(val) => handleChange("skills", val)}
              fields={["type", "name"]}
            />
            <ArrayField
              label="Projects"
              arrayData={formData.projects}
              setArrayData={(val) => handleChange("projects", val)}
              fields={["title", "link", "description"]}
            />
          </div>

          <div className="form-section">
            <ExperiencesEditor
              data={formData.experiences}
              setData={(val) => handleChange("experiences", val)}
            />
            <EducationEditor
              data={formData.education}
              setData={(val) => handleChange("education", val)}
            />
            <LayoutSettings
              layout={formData.layout}
              setLayout={(val) => handleChange("layout", val)}
            />
          </div>

          <div className="form-section">
            <Button
              label={saving ? "Saving..." : "Save Portfolio"}
              onClick={handleSave}
              disabled={saving}
            />
          </div>
        </div>
      </SplitterPanel>

      <SplitterPanel size={70} minSize={50}>
        <div className="container">
          <h2>Live Preview</h2>
          <PortfolioPreview data={formData} />
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
);
}