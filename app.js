const express = require('express');
require('dotenv').config();
const connectDB = require("./config/db");

const seedDb = require("./config/seed");
const logger = require('./utils/logger')(module);


//initialize express.
const app = express();

//Body Parser
app.use(express.json({ extended: false, limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb' }));

//Como hostear react directo desde express? Asi --> 
//Primero le decimos a express que use todos los archivos del build de react asi:
app.use(express.static(__dirname + "/frontend/build"));
//Luego le decimos a express que sirva todo eso desde el home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"))
});


//Initialize DB
connectDB().then(() => {
    seedDb();
});
const User = require("./models/User");

app.post("/api/user/create", async (req, res) => {  
    try {
        if(req.body.name) {
            const user = new User({name: req.body.name});
            await user.save();
            res.status(200).send(user);
        } else {
            res.status(400).send("Missing name");
        }  
    } catch (error) {
        res.status(500).send(error)
    }  

});

app.get("/api/user/all", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Add logger process.on
process.on('unhandledRejection', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason) );
    throw reason;
  });
process.on('unhandledException', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason));
    throw reason;
  });


//Puerto y arrancamos el servidor
const PORT = process.env.PORT || 6969;
app.listen(PORT, logger.info(`server started on ${PORT}`));