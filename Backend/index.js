const app = require('./app');
const bodyParser = require('body-parser');
const route = require("./route/user");
const con = require("./Controller/user")
require('dotenv').config();
const database = require("./Config/database");
const email    = require('./Config/email');

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    try{
        console.log(`listening on http://localhost:${port}`);
    } catch(err) {
        console.log("Error starting up database: " + err);
        process.exit(1);
    }
});