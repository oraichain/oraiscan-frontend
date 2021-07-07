// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCQE9atWDwB8sVlHx_91NaGm-SwjfYjEdk",
  authDomain: "notification-a7ca1.firebaseapp.com",
  projectId: "notification-a7ca1",
  storageBucket: "notification-a7ca1.appspot.com",
  messagingSenderId: "348587976913",
  appId: "1:348587976913:web:0e9cdeadba09e1219cbdf0",
  measurementId: "G-5FLVL9G1ZK"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  try {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  } catch (e) {
    console.log(e);
  }
});

// self.addEventListener('notificationclick', event => {
//   console.log(event)
//   return event;
// });
