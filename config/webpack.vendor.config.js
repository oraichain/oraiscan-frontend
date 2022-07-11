const webpack = require("webpack");
const path = require("path");
const paths = require("./paths");
const package = require("../package.json");
require("./env");

const ignores = [];
const isDevelopment = process.env.NODE_ENV === "development";
console.log("is development: ", isDevelopment);
const vendorPath = path.resolve(isDevelopment ? "" : paths.appPublic, "vendor");

console.log("vendor path: ", vendorPath);

module.exports = {
	mode: process.env.NODE_ENV,
	target: "web",
	entry: {
		vendor: Object.keys(package.dependencies).filter(dep => !ignores.includes(dep)),
	},
	node: {
		fs: "empty",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
	},
	output: {
		filename: "vendor.bundle.js",
		path: vendorPath,
		library: "vendor_lib",
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new webpack.DllPlugin({
			name: "vendor_lib",
			path: path.join(vendorPath, "manifest.json"),
		}),
	],
};
