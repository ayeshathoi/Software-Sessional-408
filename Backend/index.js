const app = require('./app');
const bodyParser = require('body-parser');
const route = require("./route/user");
const con = require("./Controller/user")
require('dotenv').config();
const database = require("./Config/database");
const email    = require('./Config/email');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use(bodyParser.json());
