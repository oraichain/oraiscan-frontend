import consts from "src/constants/consts";
import firebase from "firebase/app";
import "firebase/messaging";
import axios from "axios";

const firebaseConfig = {
	apiKey: "AIzaSyDHv50BQBbIeaPF7Pb-zdLcEQHRVZpjvtc",
	authDomain: "oraiscanmainnet.firebaseapp.com",
	projectId: "oraiscanmainnet",
	storageBucket: "oraiscanmainnet.appspot.com",
	messagingSenderId: "638011726290",
	appId: "1:638011726290:web:868324cdcc5f737e2ed00b",
	measurementId: "G-W00QTDB1QE",
};

firebase.initializeApp(firebaseConfig);

let messaging = null;

if (firebase.messaging.isSupported()) {
	messaging = firebase.messaging();
}

export const updateToken = (address, saveToken = true) => {
	return firebase.messaging.isSupported()
		? messaging
				.getToken({vapidKey: process.env.FCM_KEYPAIR})
				.then(async currentToken => {
					if (currentToken) {
						console.log("current token for client: ", currentToken);
						// Track the token -> client mapping, by sending to backend server
						if (address) {
							axios.patch(`${consts.API_BASE}${consts.API.FIREBASE_FCM_TOKEN}/${address}`, {
								token: currentToken,
								save_token: saveToken,
							});
						}
					} else {
						console.log("No registration token available. Request permission to generate one.");
					}
				})
				.catch(err => {
					console.log("An error occurred while retrieving token. ", err);
					// catch error while creating client token
				})
		: null;
};

export const onMessageListener = () =>
	new Promise(resolve => {
		firebase.messaging.isSupported()
			? messaging.onMessage(payload => {
					resolve(payload);
			  })
			: resolve();
	});
