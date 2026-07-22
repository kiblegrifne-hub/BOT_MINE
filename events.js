const Logger = require("./logger");

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
        try {

            if (!packet.message) return;

            Logger.info(`[CHAT] ${packet.message}`);

            // إذا ظهرت رسالة الموت نحاول إعادة الإحياء
            const msg = packet.message.toLowerCase();

            if (
                msg.includes("died") ||
                msg.includes("killed") ||
                msg.includes("slain")
            ) {

                Logger.warn("Death detected.");

                try {
                    client.queue("respawn", {});
                    Logger.success("Respawn packet sent.");
                } catch (e) {
                    Logger.error("Respawn failed.");
                }

            }

        } catch (e) {
            Logger.error(e.message);
        }
    });

}

module.exports = registerEvents;
