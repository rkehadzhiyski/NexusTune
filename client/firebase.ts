import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAG-iFOiPX0Z203CGfxcdO230HMX92nU9Q",
    authDomain: "nexus-tunes.firebaseapp.com",
    projectId: "nexus-tunes",
    storageBucket: "nexus-tunes.appspot.com",
    messagingSenderId: "947543577154",
    appId: "1:947543577154:web:61806889850a375b38d3db"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);