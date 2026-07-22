const Logger = require("./logger");

let antiAfk = null;

function startMovement(client) {

    if (!CONFIG.options.antiAFK) return;

    if (antiAfk) clearInterval(antiAfk);

    Logger.info("Anti-AFK started.");

    antiAfk = setInterval(() => {

        try {

            // حركة بسيطة (سيتم تطويرها لاحقًا)
            client.queue("player_auth_input", {
                pitch: 0,
                yaw: Math.random() * 360,
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                moveVector: {
                    x: 0,
                    z: 0
                },
                headYaw: Math.random() * 360,
                inputData: 0,
                inputMode: 2,
                playMode: 0,
                interactionModel: 0,
                tick: Date.now()
            });

            Logger.info("Anti-AFK movement sent.");

        } catch (err) {

            Logger.error(err.message);

        }

    }, CONFIG.options.antiAFKInterval);

}

function stopMovement() {

    if (antiAfk) {

        clearInterval(antiAfk);

        antiAfk = null;

    }

}

module.exports = {

    startMovement,

    stopMovement

};
