"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.wrapRootElement = exports.onClientEntry = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var Sentry = _interopRequireWildcard(require("@sentry/browser"));

var _ErrorBoundaryFallbackComponent = require("./ErrorBoundaryFallbackComponent");

var onClientEntry = function onClientEntry(_, pluginParams) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init(pluginParams);
  }
};

exports.onClientEntry = onClientEntry;

var wrapRootElement = function wrapRootElement(_ref) {
  var element = _ref.element;

  if (process.env.NODE_ENV === 'production') {
    return _react.default.createElement(ErrorBoundary, {
      onError: errorHandler,
      FallbackComponent: _ErrorBoundaryFallbackComponent.ErrorBoundaryFallbackComponent
    }, element);
  } else {
    return element;
  }
};

exports.wrapRootElement = wrapRootElement;

var errorHandler = function errorHandler(error, componentStack) {
  Sentry.withScope(function (scope) {
    scope.setExtra('componentStack', componentStack);
    Sentry.captureException(error);
  });
};

var ErrorBoundary =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ErrorBoundary, _React$Component);

  function ErrorBoundary() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      error: null,
      info: null
    });
    return _this;
  }

  var _proto = ErrorBoundary.prototype;

  _proto.componentDidCatch = function componentDidCatch(error, info) {
    var onError = this.props.onError;

    if (typeof onError === 'function') {
      try {
        /* istanbul ignore next: Ignoring ternary; can’t reproduce missing info in test environment. */
        errorHandler.call(this, error, info ? info.componentStack : '');
      } catch (ignoredError) {}
    }

    this.setState({
      error: error,
      info: info
    });
  };

  _proto.render = function render() {
    var children = this.props.children;
    var _this$state = this.state,
        error = _this$state.error,
        info = _this$state.info;

    if (error !== null) {
      return _react.default.createElement(_ErrorBoundaryFallbackComponent.ErrorBoundaryFallbackComponent, {
        componentStack: // istanbul ignore next: Ignoring ternary; can’t reproduce missing info in test environment.
        info ? info.componentStack : '',
        error: error
      });
    }

    return children;
  };

  return ErrorBoundary;
}(_react.default.Component);