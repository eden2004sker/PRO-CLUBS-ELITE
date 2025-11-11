form.addEventListener("submit", async e => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) return alert("You must be logged in.");

  const age = parseInt(document.getElementById("age").value);
  const experience = document.getElementById("experience").value.trim();
  const contribution = document.getElementById("contribution").value.trim();
  const motivation = document.getElementById("motivation").value.trim();
  const role = document.getElementById("role").value;
  const activity = document.getElementById("activity").value;

  if (age < 16) return alert("You must be at least 16 to apply.");
  if (motivation.split(" ").length < 6) return alert("Your motivation response must be longer than 5 words.");

  const application = {
    uid: user.uid,
    email: user.email,
    age,
    experience,
    contribution,
    motivation,
    role,
    activity,
    submittedAt: serverTimestamp()
  };

  await addDoc(collection(db, "staffApplications"), application);
  alert("Application submitted successfully!");
  form.reset();
})
const application = {
  uid: user.uid,
  email: user.email,
  age: ageInput.value,
  experience: experienceInput.value,
  contribution: contributionInput.value,
  motivation: motivationInput.value,
  role: roleSelect.value,
  activity: activitySelect.value,
  submittedAt: serverTimestamp()
};
import { db } from "./firestore-config.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();

document.getElementById("staffForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) return;

  const application = {
    uid: user.uid,
    email: user.email,
    age: document.getElementById("age").value,
    experience: document.getElementById("experience").value,
    contribution: document.getElementById("contribution").value,
    motivation: document.getElementById("motivation").value,
    role: document.getElementById("role").value,
    activity: document.getElementById("activity").value,
    submittedAt: serverTimestamp()
  };

  await addDoc(collection(db, "staffApplications"), application);
});
