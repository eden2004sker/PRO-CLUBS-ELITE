document.addEventListener("DOMContentLoaded", () => {
  // Get current user and role
  const currentUser = localStorage.getItem("currentUser") || "unknown";
  const userStats = JSON.parse(localStorage.getItem(`${currentUser}Stats`)) || { role: "Member" };

  // Sidebar buttons
  const statsBtn = document.getElementById("statsAdminBtn");
  const usersBtn = document.getElementById("usersBtn");
  const fixturesBtn = document.getElementById("fixturesBtn");

  // Role-based visibility
  const allowedStatsRoles = ["Stats Admin", "Founder", "Owner"];
  const allowedUserRoles = ["Admin", "Founder", "Owner", "Dev"];
  const allowedFixtureRoles = ["Founder", "Owner", "Dev"];

  if (statsBtn && allowedStatsRoles.includes(userStats.role)) {
    statsBtn.style.display = "block";
  }

  if (usersBtn && allowedUserRoles.includes(userStats.role)) {
    usersBtn.style.display = "block";
  }

  if (fixturesBtn && allowedFixtureRoles.includes(userStats.role)) {
    fixturesBtn.style.display = "block";
  }

  // Optional: show welcome message
  const welcomeMsg = document.getElementById("welcomeMsg");
  if (welcomeMsg) {
    welcomeMsg.textContent = `Logged in as ${currentUser} (${userStats.role})`;
  }

  // Optional: logout logic if shared across pages
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html"; // or login.html if you prefer
    });
  }
});
async function loadApplications() {
  const res = await fetch("/api/getApplications"); // or Firebase logic
  const applications = await res.json();

  const container = document.getElementById("applications");
  applications.forEach(app => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${app.name}</strong> (${app.role}, ${app.activity})<br>
      Age: ${app.age}<br>
      Motivation: ${app.motivation}<br>
      Contribution: ${app.contribution}<br>
      Experience: ${app.experience}<br>
      Submitted: ${new Date(app.submittedAt).toLocaleString()}<hr>
    `;
    container.appendChild(div);
  });
}
function loadApplications() {
  const applications = JSON.parse(localStorage.getItem("staffApplications") || "[]");
  const container = document.getElementById("applications");
  container.innerHTML = "";

  applications.forEach(app => {
    const div = document.createElement("div");
    div.className = "application-card";
    div.innerHTML = `
      <strong>${app.name}</strong><br>
      Motivation: ${app.motivation}<br>
      Status: <span id="status-${app.id}">${app.status}</span><br>
      <button onclick="updateStatus(${app.id}, 'approved')">✅ Approve</button>
      <button onclick="updateStatus(${app.id}, 'rejected')">❌ Reject</button>
      <hr>
    `;
    container.appendChild(div);
  });
}

function updateStatus(id, newStatus) {
  const applications = JSON.parse(localStorage.getItem("staffApplications") || "[]");
  const updated = applications.map(app => {
    if (app.id === id) app.status = newStatus;
    return app;
  });
  localStorage.setItem("staffApplications", JSON.stringify(updated));
  document.getElementById(`status-${id}`).textContent = newStatus;
}

// Load applications when admin panel loads
loadApplications();

