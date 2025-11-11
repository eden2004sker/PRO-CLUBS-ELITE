// Load Eden's stats from localStorage or initialize defaults
let userStats = JSON.parse(localStorage.getItem("edenStats")) || {
  matchesPlayed: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  goals: 0,
  team: "Unassigned",
  role: "Developer",
  trophies: []
};

// Save stats back to localStorage
function saveStats() {
  localStorage.setItem("edenStats", JSON.stringify(userStats));
}

// Render stat values into the profile table
function renderStats() {
  document.getElementById("matchesPlayed").textContent = userStats.matchesPlayed;
  document.getElementById("wins").textContent = userStats.wins;
  document.getElementById("draws").textContent = userStats.draws;
  document.getElementById("losses").textContent = userStats.losses;
  document.getElementById("goals").textContent = userStats.goals;
  document.getElementById("team").textContent = userStats.team;
  document.getElementById("role").textContent = userStats.role;
}

// Render trophies into the trophy cabinet
function renderTrophies() {
  const container = document.getElementById("trophyCabinet");
  container.innerHTML = "";

  if (userStats.trophies.length === 0) {
    container.innerHTML = `<div class="trophy">No trophies yet.</div>`;
    return;
  }

  userStats.trophies.forEach(trophy => {
    const div = document.createElement("div");
    div.className = "trophy";
    div.textContent = trophy;
    container.appendChild(div);
  });
}

// Optional: award a new trophy
function awardTrophy(trophyName) {
  if (!userStats.trophies.includes(trophyName)) {
    userStats.trophies.push(trophyName);
    saveStats();
    renderTrophies();
  }
}

// Optional: update match stats
function updateStats({ played = 0, wins = 0, draws = 0, losses = 0, goals = 0 }) {
  userStats.matchesPlayed += played;
  userStats.wins += wins;
  userStats.draws += draws;
  userStats.losses += losses;
  userStats.goals += goals;
  saveStats();
  renderStats();
}

// Initialize profile view
renderStats();
renderTrophies();