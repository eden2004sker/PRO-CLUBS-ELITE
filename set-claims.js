import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

initializeApp({
  credential: cert(serviceAccount)
});

const uid = "USER_UID_HERE"; // Replace with actual UID

getAuth().setCustomUserClaims(uid, { role: "manager" })
  .then(() => {
    console.log("✅ Role set successfully");
  })
  .catch((error) => {
    console.error("❌ Error setting role:", error);
  });
