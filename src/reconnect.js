const Logger = require("./logger");

function reconnect(connect) {

    Logger.warn(
        `Reconnecting in ${CONFIG.options.reconnectDelay / 1000} seconds...`
    );

    setTimeout(() => {

        connect();

    }, CONFIG.options.reconnectDelay);

}

module.exports = reconnect;
