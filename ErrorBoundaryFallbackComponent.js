"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ErrorBoundaryFallbackComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var Sentry = _interopRequireWildcard(require("@sentry/browser"));

var ErrorBoundaryFallbackComponent = function ErrorBoundaryFallbackComponent() {
  return _react.default.createElement("div", null, _react.default.createElement("h1", null, "An error is occured."), _react.default.createElement("a", {
    onClick: function onClick() {
      return Sentry.showReportDialog();
    }
  }, "Report feedback"));
};

exports.ErrorBoundaryFallbackComponent = ErrorBoundaryFallbackComponent;