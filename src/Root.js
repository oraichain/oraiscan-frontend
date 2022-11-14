import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RestfulProvider } from "restful-react"; //  Thank you Tejas - I'm not gonna lie, swr looks more juicy these days
import { PersistGate } from "redux-persist/integration/react";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";

import consts from "src/constants/consts";
import App from "./App";
// import "./firebase"
//  comment this out if you do not plan on using firebase
// import "./firebase";
//  redux
import store, { persistor } from "./store/configure";
import Keplr from "./lib/keplr";
import { network } from "./lib/config/networks";
import { render } from "react-dom";

const theme = createTheme({
	palette: {
		primary: {
			main: "#f0b90b",
		},
		secondary: {
			main: "#f5f5f5",
		},
	},
	typography: {
		useNextVariants: true,
	},
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: "0.8em",
			},
		},
	},
	// xs, extra-small: 0px or larger
	// sm, small: 600px or larger
	// md, medium: 960px or larger
	// lg, large: 1280px or larger
	// xl, extra-large: 1920px or larger
});

window.Keplr = new Keplr();


export default function (props) {
	return (
		<MuiThemeProvider theme={theme}>
			<RestfulProvider base={consts.API_BASE}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</PersistGate>
				</Provider>
			</RestfulProvider>
		</MuiThemeProvider>
	);
}
