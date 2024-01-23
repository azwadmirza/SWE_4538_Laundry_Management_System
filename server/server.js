require('dotenv').config({ path: ".env"});
const connectToDatabase = require("./config/db_connection");
const cors = require("cors");
const app= require("./app")
app.use(cors());
connectToDatabase(process.env._MONGO_URI,process.env._NODE_ENV);
const server=app.listen(process.env._PORT);

module.exports = server;