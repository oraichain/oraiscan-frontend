// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDHv50BQBbIeaPF7Pb-zdLcEQHRVZpjvtc",
  authDomain: "oraiscanmainnet.firebaseapp.com",
  projectId: "oraiscanmainnet",
  storageBucket: "oraiscanmainnet.appspot.com",
  messagingSenderId: "638011726290",
  appId: "1:638011726290:web:868324cdcc5f737e2ed00b",
  measurementId: "G-W00QTDB1QE"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
let messaging = null;

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    try {
      const notificationTitle = payload.data.title;
      const notificationOptions = {
        body: payload.data.body,
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    } catch (e) {
      console.log(e);
    }
  });
}

// self.addEventListener('notificationclick', event => {
//   console.log(event)
//   return event;
// });
