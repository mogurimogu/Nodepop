var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const LoginController = require("./controllers/loginController");
const sessionAuth = require("./lib/sessionAuthMiddleware");
const jwtAuth = require("./lib/jwtAuthMiddleware");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const MongoStore = require("connect-mongo");

var app = express();

// Arranca la conexión con la base de datos
require("./lib/mongooseConection");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Titulo personalizado del sitio
app.locals.title = "Nodepop";

//Setup i18n
const i18n = require("./lib/i18nConfig");
app.use(i18n.init);

app.use(
  session({
    name: "nodeapi-session",
    secret: "B6%Lm%jgZPKtxL_&7y25at*F$XsFG7QK",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, // 2 dias de inactividad
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    }),
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

const loginController = new LoginController();

// Rutas de mi Api
app.use("/api/anuncios", jwtAuth, require("./routes/api/productos"));
app.use("/api/tags", jwtAuth, require("./routes/api/tags"));
app.post("/api/authenticate", loginController.postJWT);

// Rutas del website


app.use("/change-locale", require("./routes/change-locale"));
app.use("/users", usersRouter);
app.get("/login", loginController.index);
app.post("/login", loginController.post);

app.use("/", sessionAuth, indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
