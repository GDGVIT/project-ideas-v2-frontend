import * as firebase from 'firebase/app';
import 'firebase/messaging';

export const initializeFirebase = () => { 
firebase.initializeApp({
    apiKey: "AIzaSyBD-obspwlCYjrnwvwE2KLoy_b8dTOy1PA",
  authDomain: "dsc-daily-challenges.firebaseapp.com",
  databaseURL: "https://dsc-daily-challenges.firebaseio.com",
  projectId: "dsc-daily-challenges",
  storageBucket: "dsc-daily-challenges.appspot.com",
  messagingSenderId: "154615398297",
  appId: "1:154615398297:web:b4a2966008ca840a995d08",
  measurementId: "G-VWG85WSS5J"
  });

  const messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BDRJEBnNqj6rC4Lp43r-otkXXnYGwJdU_zcSX6TRW2zVFnLNls69rz4cO222EuOfBQPjtdtSZQxjnLOq1yyNR34"
  );
  // const messaging = firebase.messaging();
  messaging.onMessage(function(payload){
  console.log('OnMessage :', payload)
})
}

// export { messaging };


export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token:', token);
   localStorage.setItem("server",token)
   localStorage.setItem("registration_id", "258042889226");
    return token;
  } catch (error) {
    console.error(error);
  }
  navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
  const messaging = firebase.messaging();
  messaging.onMessage(function(payload){
  console.log('OnMessage :', payload)
})
}