"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
	throw err;
});

// Ensure environment variables are read.
require("../config/env");

const chalk = require("react-dev-utils/chalk");
const webpack = require("webpack");
const config = require("../config/webpack.vendor.config");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");

// We used to support resolving modules according to `NODE_PATH`.
// This now has been deprecated in favor of jsconfig/tsconfig.json
// This lets you use absolute paths in imports inside large monorepos:
if (process.env.NODE_PATH) {
	console.log(
		chalk.yellow(
			"Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app."
		)
	);
	console.log();
}

console.log("Creating an optimized production build...");

const compiler = webpack(config);

compiler.run((err, stats) => {
	let messages;
	if (err) {
		if (!err.message) {
			return console.log(err.message);
		}

		let errMessage = err.message;

		// Add additional information for postcss errors
		if (Object.prototype.hasOwnProperty.call(err, "postcssNode")) {
			errMessage += "\nCompileError: Begins at CSS selector " + err["postcssNode"].selector;
		}

		messages = formatWebpackMessages({
			errors: [errMessage],
			warnings: [],
		});
	} else {
		messages = formatWebpackMessages(stats.toJson({all: false, warnings: true, errors: true}));
	}
	if (messages.errors.length) {
		// Only keep the first error. Others are often indicative
		// of the same problem, but confuse the reader with noise.
		if (messages.errors.length > 1) {
			messages.errors.length = 1;
		}
		return console.log(messages.errors.join("\n\n"));
	}
	if (process.env.CI && (typeof process.env.CI !== "string" || process.env.CI.toLowerCase() !== "false") && messages.warnings.length) {
		console.log(chalk.yellow("\nTreating warnings as errors because process.env.CI = true.\n" + "Most CI servers set it automatically.\n"));
	}
});
