import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCtzUWWwA48_DJkRqcnD2NvX_aYyjqjTWQ",
  authDomain: "chatapp2024-174b6.firebaseapp.com",
  projectId: "chatapp2024-174b6",
  storageBucket: "chatapp2024-174b6.appspot.com",
  messagingSenderId: "276270897395",
  appId: "1:276270897395:web:9bba4afab1e6c0cdc43f86",
  measurementId: "G-H3P747XDRH"
  //   @deprecated is deprecated Constants.manifest
};
// initialize firebase
  initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();