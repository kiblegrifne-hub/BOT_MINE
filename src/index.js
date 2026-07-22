const fs = require("fs");
const path = require("path");
const Logger = require("./logger");

const configPath = path.join(__dirname, "..", "config", "config.json");

if (!fs.existsSync(configPath)) {
    Logger.error("config/config.json not found!");
    process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

Logger.success("Configuration loaded successfully.");

global.CONFIG = config;

// سيتم استدعاء البوت من هذا الملف
const Bot = require("./bot");

Logger.info("Starting ANIMONIBOT...");

Bot.start();
