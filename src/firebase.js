import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const config = initializeApp({
    apiKey: "AIzaSyDHJQXQl0G-ipxIFKJb5Rl17dT74tM1EJs",
    authDomain: "sample-contact-app-bcf27.firebaseapp.com",
    databaseURL: "https://sample-contact-app-bcf27-default-rtdb.firebaseio.com",
    projectId: "sample-contact-app-bcf27",
    storageBucket: "sample-contact-app-bcf27.appspot.com",
    messagingSenderId: "918416240616",
    appId: "1:918416240616:web:1620356f52106c21db3e5d",
    measurementId: "G-VR4V8TX845"
});

export const db = getFirestore(config);
// connectFirestoreEmulator(db, 'localhost', 8080);