// @ts-nocheck
/* eslint-disable eqeqeq */
import config, { isTestnet } from "src/config.js";
import { networks } from "src/constants/networks";

// Find Left Boundry of the Screen/Monitor
function FindLeftScreenBoundry() {
	// Check if the window is off the primary monitor in a positive axis
	// X,Y                  X,Y                    S = Screen, W = Window
	// 0,0  ----------   1280,0  ----------
	//     |          |         |  ---     |
	//     |          |         | | W |    |
	//     |        S |         |  ---   S |
	//      ----------           ----------
	if (window.leftWindowBoundry() > window.screen.width) {
		return window.leftWindowBoundry() - (window.leftWindowBoundry() - window.screen.width);
	}

	// Check if the window is off the primary monitor in a negative axis
	// X,Y                  X,Y                    S = Screen, W = Window
	// 0,0  ----------  -1280,0  ----------
	//     |          |         |  ---     |
	//     |          |         | | W |    |
	//     |        S |         |  ---   S |
	//      ----------           ----------
	// This only works in Firefox at the moment due to a bug in Internet Explorer opening new windows into a negative axis
	// However, you can move opened windows into a negative axis as a workaround
	if (window.leftWindowBoundry() < 0 && window.leftWindowBoundry() > window.screen.width * -1) {
		return window.screen.width * -1;
	}

	// If neither of the above, the monitor is on the primary monitor whose's screen X should be 0
	return 0;
}

window.leftScreenBoundry = FindLeftScreenBoundry;

function PopupCenter(url, title, w, h, type, objEvent, urlEvent) {
	let newWindow;
	let resizeWindow =
		"resizable=1, scrollbars=1, fullscreen=0, height=" +
		h +
		", width=" +
		w +
		", screenX=" +
		window.leftScreenBoundry +
		" , left=" +
		window.leftScreenBoundry +
		", toolbar=0, menubar=0, status=1";
	if (type === "transaction") {
		newWindow = window.open(urlEvent, title, resizeWindow);
		const handler = e => {
			if (e.origin !== "https://testnet-wallet.web.app" && e.origin !== "https://api.wallet.orai.io") {
				return;
			}
			if (e.data.data === "ready") {
				newWindow.postMessage(objEvent, "*");
				window.removeEventListener("message", handler);
			}
		};
		window.addEventListener("message", handler);

		// setTimeout(() => {
		// 	newWindow.postMessage(objEvent, "*");
		// }, 500);
	} else {
		newWindow = window.open(url, title, resizeWindow);
	}
	return newWindow;
}

function openWindowV1(type, payload, account = "", self) {
	console.log(`open ${self.client}`);

	// The account parameter is required for users having multiple keychain accounts.
	let apiUrl = "";
	switch (type) {
		case "signin":
			apiUrl = "signin";
			break;
		case "transaction":
			apiUrl = "tx";
			break;
		default:
			apiUrl = "signin";
			break;
	}
	return PopupCenter(
		self.keystationUrl +
		"/" +
		apiUrl +
		"?account=" +
		encodeURIComponent(account) +
		"&client=" +
		encodeURIComponent(self.client) +
		"&lcd=" +
		encodeURIComponent(self.lcd) +
		"&path=" +
		encodeURIComponent(self.path) +
		"&payload=" +
		encodeURIComponent(JSON.stringify(payload)),
		"",
		"470",
		"760",
		type,
		{
			account: encodeURIComponent(account),
			client: encodeURIComponent(self.client),
			lcd: encodeURIComponent(self.lcd),
			path: encodeURIComponent(self.path),
			payload: encodeURIComponent(JSON.stringify(payload)),
		},
		self.keystationUrl + "/" + apiUrl
	);
}

function openWindowV2(type, payload, account = "", self) {
	console.log(`open ${self.client}`);

	// The account parameter is required for users having multiple keychain accounts.
	let apiUrl = "";
	switch (type) {
		case "signin":
			apiUrl = "signin";
			break;
		case "transaction":
			apiUrl = "transaction";
			break;
		case "ai-request":
			apiUrl = "ai_request/set";
			break;
		default:
			apiUrl = "auth";
			break;
	}

	const network = isTestnet ? networks.TESTNET : networks.MAINNET;

	return PopupCenter(
		self.keystationUrl +
		"/" +
		apiUrl +
		"?lcd=" +
		encodeURIComponent(self.lcd) +
		"&raw_message=" +
		encodeURIComponent(JSON.stringify(payload)) +
		"&signInFromScan=true" +
		"&network=" +
		network,
		"",
		"470",
		"760",
		type,
		{
			lcd: self.lcd,
			raw_message: JSON.stringify(payload),
			signInFromScan: true,
			network,
		},
		self.keystationUrl + "/" + apiUrl
		// "http://localhost:8000" + "/" + apiUrl
	);
}

export default class Keystation {
	constructor(params) {
		if (!params) {
			return;
		}
		const { client, lcd, path, keystationUrl } = params;
		this.client = client;
		this.lcd = lcd;
		this.path = path;

		this.keystationUrl = keystationUrl;
	}

	openWindow(type, payload, account = "") {
		const self = this;
		return process.env.REACT_APP_WALLET_VERSION == 2 ? openWindowV2(type, payload, account, self) : openWindowV1(type, payload, account, self);
	}

	postMessage(popup, data) {
		popup.focus();
		popup.postMessage(data, "*");
	}
}

export const myKeystation = new Keystation({
	client: config.walletapi,
	lcd: config.LCD_API,
	path: "44/118/0/0/0",
	keystationUrl: config.walletapi,
});
