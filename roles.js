localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("userRole", "founder"); // or "admin", etc.
const role = localStorage.getItem("userRole");
if (role === "founder") {
  document.getElementById("founderPanel").style.display = "block";
}
// 1. Define all roles and their permissions
const roles = {
  member: { type: "member", permissions: ["viewFixtures", "viewRules"] },
  manager: { type: "member", permissions: ["viewFixtures", "viewRules", "submitLineup"] },
  coManager: { type: "member", permissions: ["viewFixtures", "viewRules", "assistManager"] },
  signed: { type: "member", permissions: ["viewFixtures", "viewRules"] },
  freeAgent: { type: "member", permissions: ["viewFixtures"] },

  admin: { type: "staff", permissions: ["manageFixtures", "editRules", "viewStats"] },
  statAdmin: { type: "staff", permissions: ["viewStats", "editStats"] },
  transferAdmin: { type: "staff", permissions: ["manageTransfers"] },
  coOwner: { type: "staff", permissions: ["viewAll", "assistFounder"] },
  owner: { type: "staff", permissions: ["viewAll", "manageAdmins"] },
  founder: { type: "staff", permissions: ["viewAll", "assignRoles", "setMatchTimes", "fullControl"] },
  developer: { type: "staff", permissions: ["fullControl", "debug", "editBackend", "assignRoles"] }
};

function showPanels(username) {
  const users = JSON.parse(localStorage.getItem("userRoles")) || {};
  const role = users[username]?.role;

  if (!role) return;

  if (["founder", "developer"].includes(role)) {
    document.getElementById("userManagerPanel")?.classList.remove("hidden");
    document.getElementById("roleAssignmentPanel")?.classList.remove("hidden");
    document.getElementById("fixtureAutoPanel")?.classList.remove("hidden");
  }

  if (["admin", "owner", "coOwner", "founder", "developer"].includes(role)) {
    document.getElementById("fixturePanel")?.classList.remove("hidden");
  }
}
