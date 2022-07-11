const webpack = require("webpack");
const path = require("path");
const package = require("../package.json");

const ignores = ["@babel/helper-plugin-test-runner", "firebase"];

module.exports = {
	mode: "development",
	target: "web",
	entry: {
		vendor: Object.keys(package.dependencies).filter(dep => !ignores.includes(dep)),
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
	},
	output: {
		filename: "vendor.bundle.js",
		path: path.join(__dirname, "..", "vendor"),
		library: "vendor_lib",
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new webpack.DllPlugin({
			name: "vendor_lib",
			path: path.join(__dirname, "..", "vendor", "manifest.json"),
		}),
	],
};
