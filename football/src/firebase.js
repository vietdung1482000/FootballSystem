import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA35MlxAXHIVuZ55a3rw4npISkIRXTUXhA",
  authDomain: "chat-ebabb.firebaseapp.com",
  projectId: "chat-ebabb",
  storageBucket: "chat-ebabb.appspot.com",
  messagingSenderId: "262562895371",
  appId: "1:262562895371:web:dae98367474cab0edc190e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()