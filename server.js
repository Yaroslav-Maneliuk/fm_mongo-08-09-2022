const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const hostDB = 'fm_mongo';

mongoose
  .connect(`mongodb://${hostDB}:27017/fm_mongo-08-09-2022`)
  .catch((err) => {
    console.log(err);
    process.exit(1)
  });

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("server started at port = " + PORT);
});
