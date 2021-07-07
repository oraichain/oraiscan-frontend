import consts from "src/constants/consts";
import firebase from "firebase/app";
import "firebase/messaging";
import axios from "axios";

const firebaseConfig = {
	apiKey: "AIzaSyCQE9atWDwB8sVlHx_91NaGm-SwjfYjEdk",
	authDomain: "notification-a7ca1.firebaseapp.com",
	projectId: "notification-a7ca1",
	storageBucket: "notification-a7ca1.appspot.com",
	messagingSenderId: "348587976913",
	appId: "1:348587976913:web:0e9cdeadba09e1219cbdf0",
	measurementId: "G-5FLVL9G1ZK",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const updateToken = (address, saveToken = true) => {
	return messaging
		.getToken({ vapidKey: process.env.FCM_KEYPAIR })
		.then(async currentToken => {
			if (currentToken) {
				console.log("current token for client: ", currentToken);
				// Track the token -> client mapping, by sending to backend server
				if (address) {
					axios.patch(`${consts.API_BASE}${consts.API.FIREBASE_FCM_TOKEN}/${address}`, {
						token: currentToken,
						save_token: saveToken
					});
				}
			} else {
				console.log("No registration token available. Request permission to generate one.");
			}
		})
		.catch(err => {
			console.log("An error occurred while retrieving token. ", err);
			// catch error while creating client token
		});
};

export const onMessageListener = () =>
	new Promise(resolve => {
		messaging.onMessage(payload => {
			resolve(payload);
		});
	});
