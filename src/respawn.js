const Logger = require("./logger");

function respawn(client) {

    try {

        Logger.warn("Trying to respawn...");

        client.queue("respawn", {});

        Logger.success("Respawn packet sent.");

    } catch (err) {

        Logger.error(err.message);

    }

}

module.exports = respawn;
