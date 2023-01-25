require('dotenv').config({path: './config/config.env'});
const app = require("./app");
const connectDB = require("./config/db.js");

connectDB();

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
