"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function getImageArray(props) {
	var src = props.src;
	var fallbackImage = props.fallbackImage;

	var source = Array.isArray(src) ? src : [src];
	return source.concat(fallbackImage).filter(function (x) {
		return !!x;
	});
}

var ReactImageFallback = (function (_Component) {
	_inherits(ReactImageFallback, _Component);

	function ReactImageFallback(props) {
		_classCallCheck(this, ReactImageFallback);

		_get(Object.getPrototypeOf(ReactImageFallback.prototype), "constructor", this).call(this, props);
		this.displayImage = new Image();
		this.state = {
			imageSource: props.initialImage,
			imageArray: getImageArray(props),
			imageIndex: -1,
			hasInitial: !!props.initialImage
		};
		this.setDisplayImage = this.setDisplayImage.bind(this);
	}

	_createClass(ReactImageFallback, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.setDisplayImage();
		}

		// 	componentWillReceiveProps(nextProps) {
		// 		// if (nextProps.src !== this.props.src) {
		// 		// 	this.setState({
		// 		// 		imageIndex: 0,
		// 		// 		imageArray: getImageArray(nextProps)
		// 		// 	}, this.setDisplayImage);
		// 		// }
		// 	}

	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.displayImage.onerror = null;
			this.displayImage.onload = null;
		}
	}, {
		key: "setDisplayImageSrc",
		value: function setDisplayImageSrc() {
			this.displayImage.src = this.state.imageSource;
		}
	}, {
		key: "setDisplayImage",
		value: function setDisplayImage() {
			var _this = this;

			this.displayImage.onerror = function () {
				var _state = _this.state;
				var imageArray = _state.imageArray;
				var imageIndex = _state.imageIndex;

				var nextIndex = imageIndex + 1;
				var callback = imageIndex < imageArray.length && _this.setDisplayImageSrc;
				_this.setState({
					imageSource: imageArray[nextIndex],
					imageIndex: nextIndex,
					broken: true
				}, callback);
			};

			this.displayImage.onload = function () {
				var _state2 = _this.state;
				var imageArray = _state2.imageArray;
				var imageIndex = _state2.imageIndex;
				var hasInitial = _state2.hasInitial;

				var callback = hasInitial && _this.setDisplayImageSrc;
				_this.setState({
					imageSource: imageArray[imageIndex],
					hasInitial: false,
					broken: false
				}, callback);
			};

			this.setDisplayImageSrc();
		}
	}, {
		key: "render",
		value: function render() {
			var _state3 = this.state;
			var imageSource = _state3.imageSource;
			var broken = _state3.broken;
			var hasInitial = _state3.hasInitial;

			return imageSource ? _react2["default"].createElement("img", _extends({}, this.props, { src: broken ? this.props.initialImage : imageSource })) : null;
		}
	}]);

	return ReactImageFallback;
})(_react.Component);

ReactImageFallback.displayName = "ReactImageFallback";

ReactImageFallback.propTypes = {
	src: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.string]).isRequired,
	fallbackImage: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.string]),
	initialImage: _react.PropTypes.string
};

ReactImageFallback.defaultProps = {
	fallbackImage: null,
	initialImage: null
};

module.exports = ReactImageFallback;