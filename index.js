const bedrock = require("bedrock-protocol");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("./config.json"));

function startBot() {
    console.log("Starting ANIMONIBOT...");

    const client = bedrock.createClient({
        host: config.host,
        port: config.port,
        username: config.username,
        offline: true
    });

    client.on("join", () => {
        console.log("ANIMONIBOT joined the server!");
    });

    client.on("disconnect", () => {
        console.log("Disconnected. Reconnecting in 5 seconds...");
        setTimeout(startBot, 5000);
    });

    client.on("error", (err) => {
        console.log(err);
    });
}

startBot();
