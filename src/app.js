import express from "express";

import mongodb from 'mongodb';


import exphbs from "express-handlebars";
import session from "express-session";
import methodOverride from "method-override";
import flash from "connect-flash";
import passport from "passport";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pkg from 'body-parser';
const { bodyParser } = pkg;
import { MONGODB_URI, PORT } from "./config.js";


//Llamado a las rutas
import indexRoutes from "./routes/index.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import userRoutes from "./routes/auth.routes.js";
import empleosRoutes from "./routes/empleos.routes.js";

import "./config/passport.js";



// Initializations
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
var dbConn = mongodb.MongoClient.connect("mongodb+srv://nekocreativo:PCGAMER2024@cluster0.ldxp9.mongodb.net/?retryWrites=true&w=majority");

app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(join(__dirname, "public")));

// settings
app.set("port", PORT);
app.set("views", join(__dirname, "views"));

// config view engine
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

///////////////////////////////////////












/////////////////////////////



// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(notesRoutes);
app.use(empleosRoutes);



app.use((req, res) => {
  res.render("404");
});

app.post('/post-feedback', (req, res) => {
  dbConn.then((db) => {
    delete req.body._id; // for safety reasons
    db.collection('feedbacks').insertOne(req.body);
  });
  res.send('Data received:\n' + JSON.stringify(req.body));
});

app.get('/view-feedbacks', (req, res) => {
  dbConn.then((db) => {
    db.collection('feedbacks').find({}).toArray().then((feedbacks) => {
      res.status(200).json(feedbacks);
    });
  });
});

export default app;


