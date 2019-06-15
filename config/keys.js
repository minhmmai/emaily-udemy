// Figure out what set of credentials to return
if (process.env.NODE_ENV === "production") {
// This is production environment => return prod keys set
module.exports = require("./prod");
}else {
// This is dev environment => return dev keys set
module.exports = require("./dev");
}