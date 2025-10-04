import { signInWithPopup, signOut as signOutFn } from "firebase/auth";
import { auth, googleProvider, db } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const signInWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userDocRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        firstName: user.firstName,
        lastName: user.lastName,
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
          specialTheme: "",
          primaryColor: "#4F46E5",
          secondaryColor: "#06B6D4",
          backgroundColor: "#F9FAFB",
          projectsLayout: "gallery",
          experiencesLayout: "timeline",
          skillsLayout: "chips",
          contactsLayout: "icons",
          showEmailForm: true,
          domain: `${user.uid}.upstack.cv`,
          favicon: "",
          footerLayout: "minimal",
        },
      });
    }

    console.log("User Info:", user);
    navigate("/manage-portfolio");
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

const signOut = async (navigate) => {
  try {
    await signOutFn(auth);
    console.log("User signed out successfully");
    navigate("/");
  } catch (error) {
    console.error("Error signing out:", error);
  }
}

export { signInWithGoogle, signOut };