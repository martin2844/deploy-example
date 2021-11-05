const mongoose = require('mongoose');
const logger = require('../utils/logger')(module);

const connectDB = async () => {
    let mongoURI = process.env.MONGO_URI;
    if(process.env.NODE_ENV === "test") {
        mongoURI = process.env.MONGO_URI + "-test"
    }
    await mongoose.connect(mongoURI,{useUnifiedTopology: true, useNewUrlParser: true});
    
    logger.info("mongoose status:" + mongoose.connection.readyState);
    logger.info("connected to " + mongoose.connection.name)
    return(mongoose.connection.readyState);
}


module.exports = connectDB;