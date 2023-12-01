import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0uh2cap9ebRyjLnDf8zIrMzQdUjgzg84",
  authDomain: "image-upload-f6a6f.firebaseapp.com",
  projectId: "image-upload-f6a6f",
  storageBucket: "image-upload-f6a6f.appspot.com",
  messagingSenderId: "618591478001",
  appId: "1:618591478001:web:c084ccee61d3eb61784950",
  measurementId: "G-RJ04YB1EMB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();