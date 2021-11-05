const logger = require("../utils/logger")(module);
const User = require("../models/User");

module.exports = async () => {
    logger.info("Checking DB for data")
    const users = await User.find();
    if(!users || users.length < 1) {
        logger.info("Seeding Db with users");
        const user1 = new User({name: "Jorge"});
        const user2 = new User({name: "Jorgelina"});
        await user1.save();
        await user2.save();
    }
}