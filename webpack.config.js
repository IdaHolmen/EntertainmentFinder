import path from "path";
import {fileURLToPath} from "url";
import Dotenv from "dotenv-webpack";

// Resolve __dirname and __filename for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	mode: "development",
	entry: "./src/js/app.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/preset-env"]],
					},
				},
			},
		],
	},
	watch: true,
	plugins: [
		new Dotenv({
			path: "./.env",
		}),
	],
	resolve: {
		fallback: {
			path: false,
			os: false,
			crypto: false,
		},
	},
};
