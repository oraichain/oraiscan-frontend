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
		fallback: {
			module: false,
			http: false,
			dgram: false,
			zlib: false,
			dns: "mock",
			fs: false,
			http2: false,
			net: false,
			tls: false,
			constants: false,
			child_process: false,
			tty: false,
			crypto: require.resolve("crypto-browserify"),
			stream: require.resolve("stream-browserify"),
			// string_decoder: require.resolve('string_decoder'),
			path: require.resolve("path-browserify"),
			https: require.resolve("https-browserify"),
			os: require.resolve("os-browserify"),
		},
	},
	output: {
		filename: "vendor.bundle.js",
		path: path.join(__dirname, "build"),
		library: "vendor_lib",
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new webpack.DllPlugin({
			name: "vendor_lib",
			path: path.join(__dirname, "..", "build", "vendor-manifest.json"),
		}),
	],
};
