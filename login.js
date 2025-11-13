import { auth, db } from "./auth.js"; 
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const DEFAULT_ROLE = "user"; 

// --- UTILITY: Message Box (Assumes login.html has 'messageBox' and 'messageText' IDs) ---
const showMessage = (message) => {
    document.getElementById('messageText').textContent = message;
    document.getElementById('messageBox').style.display = 'block';
};
window.showMessage = showMessage; // Expose globally for HTML onclick

// --- LOGIN HANDLER ---
const handleLogin = async (event) => {
    event.preventDefault(); // STOP THE PAGE FROM REFRESHING!

    if (!auth || !db) {
        showMessage("Login service not ready. Check auth.js configuration.");
        return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // 1. Authenticate user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Fetch the user's role document from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
        
        let userRole = DEFAULT_ROLE;

        // 3. Check NESTED FIELD: websiteRole.value (Based on your Firestore image)
        if (docSnap.exists() && docSnap.data().websiteRole && docSnap.data().websiteRole.value) {
            userRole = docSnap.data().websiteRole.value;
        } else {
            // If role document is missing, create one with the default role (best practice)
            await setDoc(userDocRef, { 
                websiteRole: { value: DEFAULT_ROLE },
                email: user.email,
                createdAt: new Date()
            }, { merge: true }); 
            userRole = DEFAULT_ROLE;
        }

        // 4. Save role to localStorage for quick access on home.html
        localStorage.setItem("loggedInUser", JSON.stringify({
            uid: user.uid,
            email: user.email,
            role: userRole 
        }));

        showMessage("Login successful! Redirecting to home page...");
        
        // 5. REDIRECT
        setTimeout(() => {
            window.location.href = 'home.html'; 
        }, 1000);

    } catch (error) {
        console.error("Login Error:", error.code, error.message);
        
        // Sign out on failed login attempts for security
        if (auth.currentUser) {
            await signOut(auth); 
        }

        let userMessage = "Login failed. Please check your email and password.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            userMessage = "Invalid email or password. Please check your credentials.";
        } else if (error.code === 'auth/too-many-requests') {
            userMessage = "Too many failed attempts. Try again later.";
        }

        showMessage(userMessage);
    }
};

// --- EVENT LISTENER (Attaches the handler when the page loads) ---
document.addEventListener('DOMContentLoaded', () => {
    // We attach the handler to the FORM's submit event, not just the button.
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
});