// Set current user (simulate login)
localStorage.setItem("currentUser", "eden");

// Load or initialize Eden's stats
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

// Save stats to localStorage
function saveStats() {
  localStorage.setItem("edenStats", JSON.stringify(userStats));
}

// Award a trophy (if not already earned)
function awardTrophy(trophyName) {
  if (!userStats.trophies.includes(trophyName)) {
    userStats.trophies.push(trophyName);
    saveStats();
    console.log(`🏆 Trophy awarded: ${trophyName}`);
  } else {
    console.log(`Trophy already earned: ${trophyName}`);
  }
}

// Update match stats
function updateStats({ played = 0, wins = 0, draws = 0, losses = 0, goals = 0 }) {
  userStats.matchesPlayed += played;
  userStats.wins += wins;
  userStats.draws += draws;
  userStats.losses += losses;
  userStats.goals += goals;
  saveStats();
  console.log("📊 Stats updated:", userStats);
}

// Example usage (you can remove or trigger these from buttons later)
awardTrophy("Premier League Champion");
updateStats({ played: 1, wins: 1, goals: 3 });
localStorage.setItem("currentUser", "eden"); // or whoever logs in



// Set current user (simulate login)
localStorage.setItem("currentUser", "eden");

// Load username
const currentUser = localStorage.getItem("currentUser") || "User";
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("usernameDisplay").textContent = currentUser;

  const toggle = document.getElementById("userToggle");
  const dropdown = document.querySelector(".user-dropdown");

  toggle.addEventListener("click", () => {
    dropdown.classList.toggle("open");
    toggle.classList.toggle("active");
  });
});

localStorage.setItem("currentUser", "eden");
localStorage.setItem("edenStats", JSON.stringify({
  matchesPlayed: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  goals: 0,
  team: "Unassigned",
  role: "Developer", // or "Founder"
  trophies: []
}));
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    logoutBtn.style.display = "inline-block";
  } else {
    logoutBtn.style.display = "none";
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html"; // or "index.html" if you prefer
  });
});
const maintenanceMode = localStorage.getItem("maintenance") === "true";

if (maintenanceMode) {
  window.location.href = "maintenance.html";
}