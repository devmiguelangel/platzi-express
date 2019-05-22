const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const boom = require('@hapi/boom');
const debug = require('debug')('app:server');

const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");
const apiAuthRouter = require('./routes/api/auth');

const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi");

const {
  logErrors,
  wrapErrors,
  clientErrorHandlers,
  errorHandler
} = require("./utils/middlewares/errosHandlers");

// App
const app = express();

// Middlewares
app.use(bodyParser.json());

const port = 3000;

// Static files
app.use("/static", express.static(path.join(__dirname, "public")));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Routes
app.get("/", (req, res, next) => res.redirect("/products"));

app.use("/products", productsRouter);
productsApiRouter(app);
app.use('/api/auth', apiAuthRouter);

app.use(function(req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload }
    } = boom.notFound();

    res.status(statusCode).json(payload);
  }

  res.status(404).render('404');
});

// Error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandlers);
app.use(errorHandler);

// Server
const server = app.listen(port, () => {
  debug(`Listening: http://127.0.0.1:${server.address().port}`);
});
