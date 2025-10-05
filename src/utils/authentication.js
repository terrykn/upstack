import { signInWithPopup, signOut as signOutFn } from "firebase/auth";
import { auth, googleProvider, db } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const signInWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result?.user;

    if (!user || !user.uid) {
      throw new Error("No user data returned from Google sign-in.");
    }

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
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
      });

      const subdomainKey = user.uid; 
      const subdomainRef = doc(db, "subdomains", subdomainKey);
      await setDoc(subdomainRef, {
        uid: user.uid,
      });

      console.log("Created new user and subdomain entry.");
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
};

export { signInWithGoogle, signOut };