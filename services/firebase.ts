
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// These are placeholders. In a production app, these would come from environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyAeAU8FKOTfheY6aBLMqtgRo87HuS9mbzA",
  authDomain: "learningapp-92e34.firebaseapp.com",
  projectId: "learningapp-92e34",
  storageBucket:"learningapp-92e34.firebasestorage.app",
  messagingSenderId:  "698040680837",
  appId: "1:698040680837:web:d9975b2068bf105787c4ec"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
