import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCS3JarffdIZ-rJW3qRE8Mc3-zMkCtglm8",
	authDomain: "signal-clone-build-95afe.firebaseapp.com",
	projectId: "signal-clone-build-95afe",
	storageBucket: "signal-clone-build-95afe.appspot.com",
	messagingSenderId: "800113029844",
	appId: "1:800113029844:web:3504201c0f29e418764141",
};

let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else app = firebase.app();

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
