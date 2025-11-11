const toggles = [
  { id: "maintenanceToggle", key: "maintenanceMode" },
  { id: "testModeToggle", key: "testMode" },
  { id: "lockAdminToggle", key: "lockAdmin" },
  { id: "compactNavToggle", key: "compactNav" },
  { id: "themeToggle", key: "darkMode" }
];

toggles.forEach(({ id, key }) => {
  const el = document.getElementById(id);
  el.checked = localStorage.getItem(key) === "true";
  el.addEventListener("change", () => {
    localStorage.setItem(key, el.checked);
    showStatus(`${key} set to ${el.checked}`);
  });
});


function clearAllData() {
  if (confirm("Clear all saved data? This cannot be undone.")) {
    localStorage.clear();
    toggles.forEach(({ id }) => document.getElementById(id).checked = false);
    showStatus("All data cleared.");
  }
}

function showStatus(msg) {
  document.getElementById("statusMsg").textContent = msg;
}
function handleMaintenanceToggle() {
  const isChecked = document.getElementById("maintenanceToggle").checked;
  localStorage.setItem("maintenanceMode", isChecked.toString());

  if (!isChecked) {
    window.location.href = "index.html"; // Redirect to homepage when disabled
  }
}

function syncMaintenanceCheckbox() {
  const isOn = localStorage.getItem("maintenanceMode") === "true";
  const checkbox = document.getElementById("maintenanceToggle");
  if (checkbox) checkbox.checked = isOn;
}

document.addEventListener("DOMContentLoaded", syncMaintenanceCheckbox);