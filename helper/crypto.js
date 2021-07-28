const crypto = require("crypto");

module.exports = {
    generateUUID: crypto.randomBytes(16).toString("hex"),
}
