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
      // Create minimal user doc (for auth tracking)
      await setDoc(userDocRef, {
        email: user.email || "",
        createdAt: new Date().toISOString(),
        subdomain: user.uid.toLowerCase(),
      });

      const subdomainKey = user.uid.toLowerCase();
      const subdomainRef = doc(db, "subdomains", subdomainKey);

      // Create subdomain doc containing portfolio data + uid
      await setDoc(subdomainRef, {
        uid: user.uid,
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
          specialTheme: "",
          projectsLayout: "gallery",
          experiencesLayout: "timeline",
          skillsLayout: "chips",
          contactsLayout: "icons",
          showEmailForm: true,
          favicon: "",
          footerLayout: "minimal",
        },
      });

      console.log("Created new user and portfolio subdomain document.");
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