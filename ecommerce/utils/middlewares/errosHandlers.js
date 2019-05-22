const Sentry = require("@sentry/node");
const boom = require("@hapi/boom");

const { config } = require("../../config");
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');

Sentry.init({
  dsn: config.sentryDsn
});

function withErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack }; // Object.assign({}, err, stack)
  }
}

function logErrors(err, req, res, next) {
  Sentry.captureException(err);

  console.log(err.stack);

  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function clientErrorHandlers(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err;

  // Catch errors for AJAX request or id an error ocurre while streaming
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(500).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err;

  res.status(statusCode || 500);
  res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  clientErrorHandlers,
  errorHandler,
  wrapErrors
};
