import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import Loading from "./Loading";
import TextField from "../components/TextField";
import ArrayField from "../components/ArrayField";
import LayoutSettings from "../components/LayoutSettings";
import { useNavigate } from "react-router";
import PortfolioPreview from "./PortfolioPreview";

export default function ManagePortfolio() {
    const { user, loading } = useAuth();
    const [formData, setFormData] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setFormData(
                docSnap.exists()
                    ? docSnap.data()
                    : {
                        firstName: "",
                        lastName: "",
                        location: "",
                        contactEmail: user.email || "",
                        contactPhone: "",
                        currentRole: "",
                        bio: "",
                        links: [],
                        skills: [],
                        resume: "",
                        experiences: [],
                        education: [],
                        pfp: "",
                        subdomain: user.uid,
                        layout: {
                            pageLayout: "single",
                            navLayout: "top",
                            fontFamily: "Poppins",
                            fontSizeScale: 1.0,
                            defaultTheme: "light",
                        },
                    }
            );
        };
        fetchData();
    }, [user]);

    if (loading || !formData) return <Loading />;

    const handleChange = (field, value) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);

        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            const oldSubdomain = userSnap.exists() ? userSnap.data().subdomain : null;
            const newSubdomain = formData.subdomain.trim().toLowerCase();

            if (!newSubdomain) {
                alert("Subdomain cannot be empty.");
                setSaving(false);
                return;
            }

            // Check if subdomain already exists and isn't owned by this user
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
            }

            await setDoc(newSubRef, { uid: user.uid });
            await setDoc(userRef, { ...formData, subdomain: newSubdomain }, { merge: true });

            alert("Portfolio saved!");
        } catch (err) {
            console.error("Error saving portfolio:", err);
            alert("Error saving portfolio. Check the console for details.");
        }

        setSaving(false);
    };

    return (
        <div className="h-screen">
            <Splitter>

                {/* Input form */}
                <SplitterPanel size={30} minSize={20}>
                    <div className="flex flex-col">
                        <h2>Manage Portfolio</h2>

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
                        <TextField
                            label="Bio"
                            value={formData.bio}
                            onChange={(val) => handleChange("bio", val)}
                            textarea
                        />
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
                            fields={["type", "name", "level"]}
                        />

                        <LayoutSettings
                            layout={formData.layout}
                            setLayout={(val) => handleChange("layout", val)}
                        />

                        <Button
                            label={saving ? "Saving..." : "Save Portfolio"}
                            onClick={handleSave}
                            disabled={saving}
                            className="mt-4 w-full"
                        />
                    </div>
                </SplitterPanel>

                {/* Preview */}
                <SplitterPanel size={70} minSize={50}>
                    <div className="flex flex-col">
                        <h2>Live Preview</h2>
                        <PortfolioPreview data={formData} />
                    </div>

                </SplitterPanel>
            </Splitter>
        </div>
    );
}
