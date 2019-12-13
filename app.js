//using express framework 
const express = require("express"),
app = express(),
routes = require("./routes/routes.js");
port = 3000;
//using mongoose as our database
mongoose = require("mongoose");
//use mongo string to connect to mongodb
db = require("./config/keys_dev.js").mongoURI;
route = require("./routes/routes.js");
//parsing middleware
bodyParser = require("body-parser");
//Parse Json and handle post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.set('useCreateIndex', true);
//Use routes
app.use("/", routes);

//connect to database
mongoose 
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

    app.listen(port, () => console.log("Server is running on port: " + port));
