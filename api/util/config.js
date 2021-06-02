import dotenv from "dotenv";
import path from "path";

const filename = ".env";
const envPath = path.resolve(process.cwd(), filename);

const parsed = dotenv.config({
    path: envPath,
}).parsed;

let config = {};
Object.keys(parsed).forEach(function (key) {
    config[key.toLowerCase()] = parsed[key];
});

module.exports = config;
