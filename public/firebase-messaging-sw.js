importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

firebase.initializeApp({
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
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
  window.location='https://ideas.dscvit.com'
});