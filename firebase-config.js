import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0C5O-9xh9CrmLnsD2kquCyJ1zTtYkiLg",
  authDomain: "fifa-super-league.firebaseapp.com",
  projectId: "fifa-super-league",
  storageBucket: "fifa-super-league.appspot.com",
  messagingSenderId: "407346622789",
  appId: "1:407346622789:web:6b48448ca0410ccf588e2c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);