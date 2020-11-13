const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(compression());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// disable powered by cookies
app.disable("x-powered-by");

// importing the routes
const allRoutes = require("./routes/index");

app.use("/api/", allRoutes);

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
