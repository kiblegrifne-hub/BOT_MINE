class Logger {
    static time() {
        return new Date().toLocaleTimeString();
    }

    static info(message) {
        console.log(`[${this.time()}] [INFO] ${message}`);
    }

    static success(message) {
        console.log(`[${this.time()}] [SUCCESS] ${message}`);
    }

    static warn(message) {
        console.log(`[${this.time()}] [WARNING] ${message}`);
    }

    static error(message) {
        console.log(`[${this.time()}] [ERROR] ${message}`);
    }
}

module.exports = Logger;
