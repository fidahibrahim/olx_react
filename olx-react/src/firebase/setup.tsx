import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC4DgpRPS-zplb64PV36SF1LGLF2_cLNvY",
  authDomain: "olx-clone-2ce9d.firebaseapp.com",
  projectId: "olx-clone-2ce9d",
  storageBucket: "olx-clone-2ce9d.appspot.com",
  messagingSenderId: "674979134126",
  appId: "1:674979134126:web:571b4908d1677b4a050b3f"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()