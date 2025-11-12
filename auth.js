auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    // ✅ Set role based on email
    const role = user.email === "edenskerman6@gmail.com" ? "developer" : "user";

    // ✅ Save to localStorage
    localStorage.setItem("loggedInUser", JSON.stringify({
      email: user.email,
      role: role
    }));

    alert("✅ Login successful!");
    window.location.href = "index.html";
  })
  .catch((error) => {
    alert("🚫 Login failed: " + error.message);
    window.location.href = "maintenance.html";
  });