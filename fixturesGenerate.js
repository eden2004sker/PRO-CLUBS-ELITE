import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
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

let selectedTeams = [];

async function loadTeams() {
  const teamSnap = await getDocs(collection(db, "teams"));
  const select = document.getElementById("teamSelect");

  teamSnap.forEach(doc => {
    const team = doc.data();
    const option = document.createElement("option");
    option.value = team.name;
    option.textContent = team.name;
    select.appendChild(option);
  });
}

function addTeamToFixture() {
  const select = document.getElementById("teamSelect");
  const teamName = select.value;
  if (!teamName || selectedTeams.includes(teamName)) return;

  selectedTeams.push(teamName);

  if (selectedTeams.length % 2 === 0) {
    const home = selectedTeams[selectedTeams.length - 2];
    const away = selectedTeams[selectedTeams.length - 1];

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${home}</td>
      <td>${away}</td>
      <td><input type="date" /></td>
    `;
    document.querySelector("#fixtureTable tbody").appendChild(row);
  }
}

function generateFixtures() {
  const rows = document.querySelectorAll("#fixtureTable tbody tr");
  const fixtures = [];

  rows.forEach(row => {
    const home = row.children[0].textContent;
    const away = row.children[1].textContent;
    const date = row.children[2].querySelector("input").value;
    fixtures.push({ home, away, date });
  });

  console.log("Generated Fixtures:", fixtures);
  // Optional: Save to Firestore or sync with carousel/table page
}

document.addEventListener("DOMContentLoaded", () => {
  loadTeams();
  document.getElementById("addTeamBtn").addEventListener("click", addTeamToFixture);
  document.getElementById("generateBtn").addEventListener("click", generateFixtures);
});