import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyD5JauYyLooqhbXzshOo3GkEyGUDzR3zoY",
	authDomain: "se4450-group25-sonicscribe.firebaseapp.com",
	projectId: "se4450-group25-sonicscribe",
	storageBucket: "se4450-group25-sonicscribe.appspot.com",
	messagingSenderId: "254702056961",
	appId: "1:254702056961:web:880909aaec348116f7f200",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export { auth }
