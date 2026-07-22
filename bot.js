const bedrock = require("bedrock-protocol");
const Logger = require("./logger");
const registerEvents = require("./events");

let client = null;
let reconnecting = false;

function connect() {
    Logger.info("Connecting to server...");

    client = bedrock.createClient({
        host: CONFIG.server.host,
        port: CONFIG.server.port,
        username: CONFIG.bot.username,
        offline: CONFIG.bot.offline
    });

    // تسجيل جميع الأحداث
    registerEvents(client);

    client.on("join", () => {
        Logger.success("ANIMONIBOT joined the server!");
        reconnecting = false;
    });

    client.on("disconnect", () => {
        Logger.warn("Disconnected from server.");

        if (CONFIG.options.autoReconnect && !reconnecting) {
            reconnecting = true;

            Logger.info(
                `Reconnecting in ${CONFIG.options.reconnectDelay / 1000} seconds...`
            );

            setTimeout(() => {
                connect();
            }, CONFIG.options.reconnectDelay);
        }
    });

    client.on("error", (err) => {
        Logger.error(err.message);

        if (CONFIG.options.autoReconnect && !reconnecting) {
            reconnecting = true;

            Logger.info(
                `Retrying in ${CONFIG.options.reconnectDelay / 1000} seconds...`
            );

            setTimeout(() => {
                connect();
            }, CONFIG.options.reconnectDelay);
        }
    });

    process.on("SIGINT", () => {
        Logger.warn("Stopping ANIMONIBOT...");
        process.exit();
    });
}

module.exports = {
    start() {
        connect();
    },

    getClient() {
        return client;
    }
};
