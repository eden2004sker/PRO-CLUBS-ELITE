// profile.js - COMPLETE FIREBASE IMPLEMENTATION

// ------------------------------------------------------------------
// 1. FIREBASE IMPORTS
// ------------------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"; 

// ------------------------------------------------------------------
// 2. CONFIG AND INITIALIZATION
// ------------------------------------------------------------------
const firebaseConfig = { 
  apiKey: "AIzaSyB0C5O-9xh9CrmLnsD2kquCyJ1zTtYkiLg",
  authDomain: "fifa-super-league.firebaseapp.com",
  projectId: "fifa-super-league",
  storageBucket: "fifa-super-league.firebasestorage.app",
  messagingSenderId: "407346622789",
  appId: "1:407346622789:web:6b48448ca0410ccf588e2c",
  measurementId: "G-Y8HVMK7SZ1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ------------------------------------------------------------------
// 3. RENDERING FUNCTIONS (Adapted for Firebase data)
// ------------------------------------------------------------------

function renderTrophies(trophies = []) {
    const container = document.getElementById("trophyCabinet");
    container.innerHTML = "";
  
    if (trophies.length === 0) {
      container.innerHTML = `<div class="trophy">No trophies yet.</div>`;
      return;
    }
  
    trophies.forEach(trophy => {
      const div = document.createElement("div");
      div.className = "trophy";
      div.textContent = trophy;
      container.appendChild(div);
    });
}

// ------------------------------------------------------------------
// 4. SECURE ACCESS CHECK AND DATA FETCHING
// ------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        // Elements from profile.html
        // NOTE: Ensure your <h1> tag is updated in profile.html: 
        // <h1>👤 Profile: <span id="profileUsernameHeader">Loading...</span></h1>
        const usernameHeaderEl = document.getElementById("profileUsernameHeader");
        const roleEl = document.getElementById("role");
        const teamEl = document.getElementById("team");
        
        if (user) {
            // User is signed in, fetch their details from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();

                // 1. UPDATE THE HEADER USERNAME
                usernameHeaderEl.textContent = userData.username || user.email; 
                
                // 2. UPDATE THE TABLE FIELDS
                teamEl.textContent = userData.team || "Unassigned";
                roleEl.textContent = userData.websiteRole || "Member";
                
                // 3. UPDATE STATS 
                document.getElementById("matchesPlayed").textContent = userData.matchesPlayed || 0;
                document.getElementById("wins").textContent = userData.wins || 0;
                document.getElementById("draws").textContent = userData.draws || 0;
                document.getElementById("losses").textContent = userData.losses || 0;
                document.getElementById("goals").textContent = userData.goalsScored || 0;

                // 4. RENDER TROPHIES
                renderTrophies(userData.trophies || []);
                
            } else {
                // Profile not found in Firestore
                usernameHeaderEl.textContent = user.email;
                roleEl.textContent = "Error: Profile Missing";
            }
        } else {
            // No user is signed in
            alert("Please log in to view your profile.");
            window.location.href = "index.html"; // Redirect to your main login page
        }
    });
});