import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Authentication
import { getFirestore } from "firebase/firestore"; // firestore
import { getStorage } from "firebase/storage"; // storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9iBSluoGbFHjHZHQHyVytWCvP3sQTukc",
  authDomain: "instar-b7972.firebaseapp.com",
  projectId: "instar-b7972",
  storageBucket: "instar-b7972.appspot.com",
  messagingSenderId: "822515673172",
  appId: "1:822515673172:web:43d2d39888f63d9f0165c1",
};

// 변수 app : 키 값을 전송하는 역할
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); //데이터베이스 연결
export const storage = getStorage(app);
