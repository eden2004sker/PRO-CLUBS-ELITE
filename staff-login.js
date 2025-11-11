import { auth } from "../firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdTokenResult();
    const role = token.claims.role;

    if (role === "staff") {
      window.location.href = "../portals/staff-portal.html";
    } else if (role === "manager") {
      window.location.href = "../portals/manager-portal.html";
    } else {
      alert("Unknown role");
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});
