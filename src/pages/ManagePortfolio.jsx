import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loading from "./Loading";
import TextField from "../components/TextField";
import ArrayField from "../components/ArrayField";
import LayoutSettings from "../components/LayoutSettings";
import Portfolio from "./Portfolio";
import { useNavigate } from "react-router";

export default function ManagePortfolio() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
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
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, formData, { merge: true });
            alert("Portfolio saved!");
        } catch (err) {
            console.error(err);
            alert("Error saving portfolio.");
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
                        <Portfolio data={formData} />
                    </div>

                </SplitterPanel>
            </Splitter>
        </div>
    );
}
