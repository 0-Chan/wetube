import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "core-js";
import express from "express";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import globalRouter from "./routers/globalRouter.js";
import routes from "./routes.js";

const app = express();

// const handleHome = (req, res) => res.send("Home");
// const handleAbout = (req, res) => res.send("About us.");
// const handleContact = (req, res) => res.send("Contact.");
// const handleProtected = (req, res) => res.send("Protected.");

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

app.use("/", globalRouter)
app.use("routes.users", userRouter);
app.use("routes.videos", videoRouter);
app.use("/contact", userRouter);


// app.get("/", handleHome);
// app.get("/about-us", handleAbout);
// app.get("/protected", handleProhibit, handleProtected);

export default app;