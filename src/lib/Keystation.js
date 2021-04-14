import config from "src/config.js";

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

function PopupCenter(url, title, w, h) {
	const newWindow = window.open(
		url,
		title,
		"resizable=1, scrollbars=1, fullscreen=0, height=" +
			h +
			", width=" +
			w +
			", screenX=" +
			window.leftScreenBoundry +
			" , left=" +
			window.leftScreenBoundry +
			", toolbar=0, menubar=0, status=1"
	);
	return newWindow;
}

export default class Keystation {
	constructor(params) {
		if (!params) {
			return;
		}
		const {client, lcd, path, keystationUrl} = params;
		this.client = client;
		this.lcd = lcd;
		this.path = path;

		this.keystationUrl = keystationUrl;
	}

	openWindow(type, payload, account = "") {
		console.log(`open ${this.client}`);

		// The account parameter is required for users having multiple keychain accounts.
		let apiUrl = "";
		switch (type) {
			case "signin":
				apiUrl = "en/signin";
				break;
			case "transaction":
				apiUrl = "en/transaction";
				break;
			default:
				apiUrl = "en/signin";
				break;
		}

		return PopupCenter(
			this.keystationUrl +
				"/" +
				apiUrl +
				// "?account=" +
				// encodeURIComponent(account) +
				// "&client=" +
				// encodeURIComponent(this.client) +
				"?lcd=" +
				encodeURIComponent(this.lcd) +
				// "&path=" +
				// encodeURIComponent(this.path) +
				"&raw_message=" +
				encodeURIComponent(JSON.stringify(payload)) +
				"&signInFromScan=true",
			"",
			"470",
			"690"
		);
	}
}

export const myKeystation = new Keystation({
	client: config.walletapi,
	lcd: "https://lcd.orai.io",
	path: "44/118/0/0/0",
	keystationUrl: config.walletapi,
});
