
require("dotenv-safe").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../app/models");

const PORT = process.env.PORT || 3000;

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit:'50mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));


require("../app/routes/patient.routes")(app);
require("../app/routes/study.routes")(app);
require("../app/routes/login.routes")(app);
require("../app/routes/patient_arquivo.routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});