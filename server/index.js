const express = require("express");
const app = express();
const port = 5050;

app.use("/lsr", express.static("normal-equation"));

app.listen(port, () => console.log("Server is up and running on port " + port));
