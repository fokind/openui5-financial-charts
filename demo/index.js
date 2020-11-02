"use strict";

require("dotenv").config();

const express = require("express");

const app = express();
const port = process.env.PORT;

app.use(express.static("./webapp"));
// app.use("/resources/openui5/financial/chart", express.static("../dist/resources/openui5/financial/chart"));
app.use("/resources/openui5/financial/chart/themes", express.static("../dist/resources/openui5/financial/chart/themes"));
app.use("/resources/openui5/financial/chart", express.static("../src/openui5/financial/chart"));

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
