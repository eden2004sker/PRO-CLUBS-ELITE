import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

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

const allTeams = [
  "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton",
  "Burnley", "Chelsea", "Crystal Palace", "Everton", "Fulham",
  "Leeds United", "Liverpool", "Manchester City", "Manchester United", "Newcastle",
  "Nottingham Forest", "Sunderland", "Tottenham", "West Ham", "Wolves"
];

function populateTeamSelect() {
  const select = document.getElementById("teamSelect");
  allTeams.forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    select.appendChild(option);
  });
}

function generateFixtures(teams) {
  const fixtures = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      fixtures.push({ home: teams[i], away: teams[j] });
    }
  }
  return fixtures;
}

function displayFixtures(fixtures) {
  const tbody = document.querySelector("#fixtureTable tbody");
  tbody.innerHTML = "";
  fixtures.forEach(f => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${f.home}</td><td>${f.away}</td>`;
    tbody.appendChild(row);
  });
}

async function saveFixturesToFirestore(fixtures) {
  const fixtureCollection = collection(db, "fixtures");
  for (const fixture of fixtures) {
    await addDoc(fixtureCollection, fixture);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateTeamSelect();

  document.getElementById("generateBtn").addEventListener("click", async () => {
    const selected = Array.from(document.getElementById("teamSelect").selectedOptions).map(opt => opt.value);
    if (selected.length < 2) {
      alert("Select at least two teams to generate fixtures.");
      return;
    }

    const fixtures = generateFixtures(selected);
    displayFixtures(fixtures);
    await saveFixturesToFirestore(fixtures);
    alert("Fixtures generated and saved!");
  });
});