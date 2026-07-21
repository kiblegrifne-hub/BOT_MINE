const bedrock = require("bedrock-protocol");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

let client;

function connect() {
    console.log("Starting ANIMONIBOT...");

    client = bedrock.createClient({
        host: config.host,
        port: config.port,
        username: config.username,
        offline: config.offline
    });

    client.on("join", () => {
        console.log("✅ Connected to server!");

        setInterval(() => {
            try {
                client.queue("text", {
                    type: "chat",
                    needs_translation: false,
                    source_name: config.username,
                    message: "",
                    xuid: "",
                    platform_chat_id: ""
                });
            } catch (e) {}
        }, 60000);
    });

    client.on("disconnect", () => {
        console.log("❌ Disconnected");

        setTimeout(connect, 5000);
    });

    client.on("error", (err) => {
        console.log(err);
    });
}

connect();
