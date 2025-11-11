import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0C5O-9xh9CrmLnsD2kquCyJ1zTtYkiLg",
  authDomain: "fifa-super-league.firebaseapp.com",
  projectId: "fifa-super-league",
  storageBucket: "fifa-super-league.firebasestorage.app",
  messagingSenderId: "407346622789",
  appId: "1:407346622789:web:6b48448ca0410ccf588e2c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadFixtures() {
  const snap = await getDocs(collection(db, "fixtures"));
  const tbody = document.querySelector("#publicFixtures tbody");

  snap.forEach(doc => {
    const { home, away, date } = doc.data();
    const row = document.createElement("tr");
    row.innerHTML = `<td>${home}</td><td>${away}</td><td>${date || "TBD"}</td>`;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", loadFixtures);