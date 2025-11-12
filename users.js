const premTeams = [
  "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton", "Burnley",
  "Chelsea", "Crystal Palace", "Everton", "Fulham", "Liverpool", "Luton Town",
  "Man City", "Man United", "Newcastle", "Nottingham Forest", "Sheffield United",
  "Tottenham", "West Ham", "Wolves", "Unassigned"
];

const managerRoles = ["Manager", "Co-Manager", "Unassigned"];
const platformRoles = ["Developer", "Founder", "Owner", "Co-Owner", "Admin", "Staff", "Member"];

let currentPage = 1;
const pageSize = 10;

function renderUsers() {
  const users = JSON.parse(localStorage.getItem("fslUsers")) || [];
  const tbody = document.getElementById("userTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageUsers = users.slice(start, end);

  pageUsers.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.tag}</td>
      <td>${teamDropdown(user.team, index)}</td>
      <td>${managerDropdown(user.manager, index)}</td>
      <td>${roleDropdown(user.role, index)}</td>
      <td>${actionDropdown(index)}</td>
      <td><input type="text" value="${user.activity || ""}" onchange="updateActivity(${index}, this.value)" style="width:60px;" /></td>
    `;
    tbody.appendChild(row);
  });

  const pageIndicator = document.getElementById("pageIndicator");
  if (pageIndicator) pageIndicator.textContent = `Page ${currentPage}`;
}

function teamDropdown(selected, index) {
  return `<select onchange="updateTeam(${index}, this.value)">
    ${premTeams.map(t => `<option ${t === selected ? "selected" : ""}>${t}</option>`).join("")}
  </select>`;
}

function managerDropdown(selected, index) {
  return `<select onchange="updateManager(${index}, this.value)">
    ${managerRoles.map(r => `<option ${r === selected ? "selected" : ""}>${r}</option>`).join("")}
  </select>`;
}

function roleDropdown(selected, index) {
  return `<select onchange="updateRole(${index}, this.value)">
    ${platformRoles.map(r => `<option ${r === selected ? "selected" : ""}>${r}</option>`).join("")}
  </select>`;
}

function actionDropdown(index) {
  const users = JSON.parse(localStorage.getItem("fslUsers")) || [];
  const user = users[index];
  const banLabel = user.banned ? "Unban" : "Ban";
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const isSelf = loggedInUser && user.email === loggedInUser.email;

  return `
    <select onchange="handleUserAction(this.value, ${index})">
      <option value="">Actions</option>
      <option value="ban">${banLabel}</option>
      ${!isSelf ? '<option value="resetRole">Reset Role to Member</option>' : ''}
    </select>
  `;
}

function updateTeam(index, value) {
  const users = JSON.parse(localStorage.getItem("fslUsers")) || [];
  users[index].team = value;
  localStorage.setItem("fslUsers", JSON.stringify(users));
  renderUsers();
}

function updateManager(index, value) {
  const users = JSON.parse(localStorage.getItem("uplUsers")) || [];
  users[index].manager = value;
  localStorage.setItem("fslUsers", JSON.stringify(users));
  renderUsers();
}

function updateRole(index, value) {
  const users = JSON.parse(localStorage.getItem("fslUsers")) || [];
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const targetUser = users[index];

  const hierarchy = {
    Developer: 6,
    Founder: 5,
    Owner: 4,
    "Co-Owner": 3,
    Admin: 2,
    Staff: 1,
    Member: 0
  };

  const canAssign = () => {
    if (!loggedInUser) return false;
    const actorLevel = hierarchy[loggedInUser.role];
    const targetLevel = hierarchy[value];
    if (value === "Developer" && loggedInUser.role !== "Developer") return false;
    if (value === "Founder" && loggedInUser.role !== "Developer") return false;
    return actorLevel >= targetLevel;
  };

  if (canAssign()) {
    users[index].role = value;
    localStorage.setItem("fslUsers", JSON.stringify(users));
  } else {
    alert(`You don't have permission to assign the ${value} role.`);
  }

  renderUsers();
}

function handleUserAction(action, index) {
  const users = JSON.parse(localStorage.getItem("fslUsers")) || [];
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const targetUser = users[index];

  if (action === "ban") {
    users[index].banned = !users[index].banned;
  } else if (action === "resetRole") {
    if (loggedInUser && loggedInUser.email === targetUser.email) {
      alert("You can't reset your own role.");
      return;
    }
    users[index].role = "Member";
  }

  localStorage.setItem("fslUsers", JSON.stringify(users));
  renderUsers();
}

function updateActivity(index, value) {
  const users = JSON.parse(localStorage.getItem("fslUsers")) || [];
  users[index].activity = value;
  localStorage.setItem("fslUsers", JSON.stringify(users));
}

function nextPage() {
  const users = JSON.parse(localStorage.getItem("fslUsers")) || [];
  if ((currentPage * pageSize) < users.length) {
    currentPage++;
    renderUsers();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderUsers();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const devEmails = ["edenskerman6@gmail.com", ""];
  if (!user || !devEmails.includes(user.email)) {
    alert("Access denied.");
    window.location.href = "login.html";
  } else {
    renderUsers();
  }
});