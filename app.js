const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

// Create schemas and models here

const app = express();
app.set('view engine', 'ejs');
app.use(parser.urlencoded({ extended: true }));
app.use("*/css", express.static("public/css"));
app.use("*/img", express.static("public/img"));
app.use("*/js", express.static("public/js"));

// Create responses to get, post etc here.

app.listen(3000, () => {
    console.log("Server set up to listen on port 3000.");
});