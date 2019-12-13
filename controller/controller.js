//Declarin constants
const dataLogger = require("../models/model.js"),
//Using File System to server files
fs = require("fs"),
//Using Nodemailer to send Email. Email is sent to input address and login credentials are stored in the message
nodemailer = require("nodemailer"),
transporter = nodemailer.createTransport({
  service: "gmail",
  //use following email to send mail
  auth: {
    user: "authenticator2000@gmail.com",
    pass: "authenticator"
  }
});

//Following functions are used in /route/routes.js
const getGalleryPage = (req, res) => {
    //readStream variable handles file reading
    const readStream = fs.createReadStream("./public/androidBG.png");
    //Declaring type of file and creating statuscode
    res.writeHead(200, { "Content-Type": "image/png" });
    readStream.pipe(res);
}

const getLogOutPage = (req, res) => {
    const readStream = fs.createReadStream("./public/Logout.html");
    res.writeHead(200, { "Content-Type": "HTML" });
    readStream.pipe(res);
}

const getRegisterPage = (req, res) => {
    const readStream = fs.createReadStream("./public/Register.html");
    res.writeHead(200, { "Content-Type": "HTML" });
    readStream.pipe(res);
}

const getLandingPage = (req, res) => {
    const readStream = fs.createReadStream("./public/Login.html");
    res.writeHead(200, { "Content-Type": "HTML" });
    readStream.pipe(res);
}

const getHomePage = (req, res) => {
    const readStream = fs.createReadStream("./public/Home.html");
    res.writeHead(200, { "Content-Type": "TEXT/HTML" });
    readStream.pipe(res);
}

const postLoginPage = (req, res) => {
    //reading Email and Password inputs from reqLogIn html file
    let Email = req.body.Email;
    let Password = req.body.Password;
    //check if data is found
    dataLogger.findOne({ Email: Email, Password: Password}, function(err, doc) {
        //do error logging
        if(err) console.log(err)
        if (doc) {
            //if email and password are found:
            console.log("Found " + Email + ", Password= " + Password);
            //Serve reqLogin html
            const readStream = fs.createReadStream("./public/reqLogIn.html");
            res.writeHead(200, { "Content-Type": "HTML" });
            readStream.pipe(res);

            //if Email and Password aren't found:
        } else {
            console.log("Invalid Email or password " + Email);
            //forward user to Invalid.html page
            const readStream = fs.createReadStream("./public/Invalid.html");
            res.writeHead(200, { "Content-Type": "HTML" });
            readStream.pipe(res);
        }
    })
}

//Reading user inputs and save them in mongodb
const postRegisterPage = (req, res) => {
    //read Email and check if found in database
    let Email = req.body.Email;
    dataLogger.findOne({ Email: Email }, function (err, doc) {
        if (err) console.log(err);
        if (doc) {
            //if Email is found: render page and show that email is taken
            console.log("Data exist");
            res.send("Username :" + Email + " is taken, please use another email adrress");
            //if Email is not found, create one and save all the inputs
        } else {
            let postRegisterPage = new dataLogger(req.body);
            postRegisterPage.save(function(err, postRegisterPage) {
                console.log("Data created")
                console.log(postRegisterPage)
                postRegisterPage.save();

                //Use node-mailer and store data to message
                let mailOptions = {
                    from: "authenticator2000@gmail.com",
                    to: req.body.Email,
                    subject: "Login credentials",
                    text: "Your username is: " + req.body.Name + "\n and password is: " + req.body.Password + ". Use your email address and password to sign in."
                  };
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("Email sent: " + info.response);
                    }
                  });
                  //if user was created, forward to login page using route
              res.redirect("/Login")
            })
            
        }
    })};
//exports
module.exports = { dataLogger, getRegisterPage, postRegisterPage, getLandingPage, postLoginPage, getHomePage, getLogOutPage, getGalleryPage }