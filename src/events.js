const Logger = require("./logger");
const respawn = require("./respawn");

function registerEvents(client) {

    client.on("join", () => {
        Logger.success("Bot joined the server.");
    });

    client.on("disconnect", () => {
        Logger.warn("Bot disconnected.");
    });

    client.on("error", (err) => {
        Logger.error(err.message);
    });

    client.on("text", (packet) => {

        if (!packet.message) return;

        Logger.info(`[CHAT] ${packet.message}`);

        const msg = packet.message.toLowerCase();

        if (
            msg.includes("died") ||
            msg.includes("killed") ||
            msg.includes("slain")
        ) {

            Logger.warn("Death detected.");

            respawn(client);

        }

    });

}

module.exports = registerEvents;
