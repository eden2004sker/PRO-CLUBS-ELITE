const main = document.getElementById("main-content");

// Create Fixtures Section
const fixturesSection = document.createElement("section");
fixturesSection.className = "fixtures";

const fixturesTitle = document.createElement("h2");
fixturesTitle.textContent = "Fixtures";

const fixturesContent = document.createElement("div");
fixturesContent.id = "fixtures-content";
fixturesContent.textContent = "Next match: FSL FC vs United Pro — Sunday 8PM";

fixturesSection.appendChild(fixturesTitle);
fixturesSection.appendChild(fixturesContent);
main.appendChild(fixturesSection);

// Create League Table Section
const tableSection = document.createElement("section");
tableSection.className = "league-table";

const tableTitle = document.createElement("h2");
tableTitle.textContent = "League Table";

const tableContent = document.createElement("div");
tableContent.id = "table-content";
tableContent.textContent = "Coming soon: live standings!";

tableSection.appendChild(tableTitle);
tableSection.appendChild(tableContent);
main.appendChild(tableSection);


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
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html"; // or "index.html" if you want to refresh
    });
  }
})
;document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html"; // or "index.html" if you want to refresh
    });
  }
});
const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  logoutBtn.style.display = "none";
}document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const currentUser = localStorage.getItem("currentUser");

  if (logoutBtn) {
    if (currentUser) {
      logoutBtn.style.display = "inline-block";
    } else {
      logoutBtn.style.display = "none";
    }

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html"; // or "index.html" if you don’t have login.html
    });
  }
});