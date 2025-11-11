let activityLog = JSON.parse(localStorage.getItem("fslActivityLog")) || [];

function logActivity(action, actor = "System") {
  const entry = {
    timestamp: new Date().toLocaleString(),
    actor,
    action
  };
  activityLog.unshift(entry); // newest first
  localStorage.setItem("fslActivityLog", JSON.stringify(activityLog));
  renderActivityLog(); // live update
}

function renderActivityLog() {
  const panel = document.getElementById("activityLogPanel");
  if (!panel) return;

  const log = JSON.parse(localStorage.getItem("fslActivityLog")) || [];
  panel.innerHTML = log.map(entry => `
    <div class="log-entry">
      <strong>${entry.actor}</strong> — ${entry.action}<br>
      <small>${entry.timestamp}</small>
    </div>
  `).join("");
}
function renderActivityLog() {
  const panel = document.getElementById("activityLogPanel");
  const log = JSON.parse(localStorage.getItem("fslActivityLog")) || [];

  if (log.length === 0) {
    panel.innerHTML = "<div>No activity yet.</div>";
    return;
  }

  panel.innerHTML = log.map(entry => `
    <div class="log-entry">
      <strong>${entry.actor}</strong> — ${entry.action}<br>
      <small>${entry.timestamp}</small>
    </div>
  `).join("");
}

renderActivityLog();