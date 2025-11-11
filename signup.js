function addNewUser(username, email, tag, password) {
  const users = JSON.parse(localStorage.getItem("fslUsers")) || [];

  const exists = users.some(u => u.email === email || u.tag === tag);
  if (exists) {
    alert("Email or tag already exists.");
    return;
  }

  const newUser = {
    username,
    email,
    tag,
    password,
    team: "Unassigned",
    manager: "Unassigned",
    role: "Member",
    banned: false,
    activity: "0%",
    joinedAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem("fslUsers", JSON.stringify(users));
  localStorage.setItem("loggedInUser", JSON.stringify(newUser)); // ✅ auto-login

  alert("User created and logged in!");
  window.location.href = "dashboard.html"; // or wherever you want them to land
}