import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
    apiKey: "AIzaSyBD-obspwlCYjrnwvwE2KLoy_b8dTOy1PA",
  authDomain: "dsc-daily-challenges.firebaseapp.com",
  databaseURL: "https://dsc-daily-challenges.firebaseio.com",
  projectId: "dsc-daily-challenges",
  storageBucket: "dsc-daily-challenges.appspot.com",
  messagingSenderId: "154615398297",
  appId: "1:154615398297:web:b4a2966008ca840a995d08",
  measurementId: "G-VWG85WSS5J"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
	// Project Settings => Cloud Messaging => Web Push certificates
  "BDRJEBnNqj6rC4Lp43r-otkXXnYGwJdU_zcSX6TRW2zVFnLNls69rz4cO222EuOfBQPjtdtSZQxjnLOq1yyNR34"
);
export { messaging };