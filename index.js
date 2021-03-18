import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "core-js";
import express from "express";
const app = express();

const PORT = 4000;

const handleListening = () => 
    console.log(`Listening on : http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Home");
const handleAbout = (req, res) => res.send("About us.");
const handleContact = (req, res) => res.send("Contact.");
const handleProtected = (req, res) => res.send("Protected.");

const handleBetween = (req, res, next) => {
    console.log("I'm a middleware!");
    next();
};

const handleProhibit = (req, res, next) => {
    if(req.url === "/protected"){
        res.redirect("/");
    }else{
        next();
    }
};

app.use(handleBetween);
app.use(handleProhibit);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/about-us", handleAbout);

app.get("/contact", handleContact);

app.get("/protected", handleProhibit, handleProtected);

app.listen(PORT, handleListening);