const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// disable powered by cookies
app.disable("x-powered-by");

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
