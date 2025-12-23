
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { User } from "../types";

const USER_COLLECTION = "users";
const DEFAULT_USER_ID = "default_student_user"; // For demo purposes

export const firebaseService = {
  async getUserData(): Promise<User | null> {
    try {
      const docRef = doc(db, USER_COLLECTION, DEFAULT_USER_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as User;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user from Firebase:", error);
      return null;
    }
  },

  async saveUserData(user: User): Promise<void> {
    try {
      const docRef = doc(db, USER_COLLECTION, DEFAULT_USER_ID);
      await setDoc(docRef, user, { merge: true });
    } catch (error) {
      console.error("Error saving user to Firebase:", error);
    }
  },

  async addPoints(points: number): Promise<void> {
    try {
      const docRef = doc(db, USER_COLLECTION, DEFAULT_USER_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const currentPoints = docSnap.data().points || 0;
        await updateDoc(docRef, { points: currentPoints + points });
      }
    } catch (error) {
      console.error("Error updating points in Firebase:", error);
    }
  }
};
