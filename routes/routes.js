//Declare express framework
const express = require("express"),
route = express.Router(),
//get variables and functions from controller.js
controller = require("../controller/controller.js");

//using /gallery route to server my image in several sites
route.get("/gallery", (req, res) => {
    controller.getGalleryPage(req, res);
});

//get regiter functions
route.get("/register", (req, res) => {
    controller.getRegisterPage(req, res);
});

//get login functions
route.get("/Login", (req, res) => {
    controller.getLandingPage(req, res);
    
});

//get home
route.get("/Home", (req, res) => {
    controller.getHomePage(req, res);
    route.use(express.static(__dirname + "/public/androidBG.png"))
});

//post login
route.post("/Login", (req, res) => {
    controller.postLoginPage(req, res);
});

//post root
route.post("/", (req, res) => {
    controller.postRegisterPage(req, res);
});


module.exports = route;