const passport = require("passport");

const google = require("./strategy/google");

module.exports = () => {
    passport.use(google);
};
