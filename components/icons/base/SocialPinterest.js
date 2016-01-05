'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormattedMessage = require('../../../components/FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "control-icon";

var Icon = (function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT, CLASS_ROOT + '-social-pinterest'];
      if (this.props.size) {
        classes.push(CLASS_ROOT + "--" + this.props.size);
      } else if (this.props.large) {
        classes.push(CLASS_ROOT + "--large");
      }
      if (this.props.colorIndex) {
        classes.push("color-index-" + this.props.colorIndex);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-pinterest";
      var a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', className: classes.join(' '), 'aria-labelledby': this.props.a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: this.props.a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { id: 'social-pinterest' },
          _react2.default.createElement('rect', { id: '_x2E_svg_283_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { d: 'M3.5749,9.7809c0-0.9238,0.1943-1.8403,0.5829-2.7495c0.3886-0.9092,0.9458-1.7523,1.6717-2.5295\r s1.679-1.4077,2.8594-1.8916s2.4892-0.7259,3.9262-0.7259c2.3315,0,4.2452,0.7185,5.7409,2.1556s2.2436,3.1307,2.2436,5.081\r c0,2.5075-0.6342,4.5788-1.9026,6.2138s-2.9071,2.4525-4.916,2.4525c-0.6599,0-1.2794-0.154-1.8586-0.4619\r c-0.5792-0.3079-0.9861-0.6819-1.2208-1.1218l-0.8798,3.4753c-0.0733,0.2786-0.1686,0.5609-0.2859,0.8468\r c-0.1173,0.2859-0.2456,0.5609-0.3849,0.8248c-0.1393,0.2639-0.2786,0.5132-0.4179,0.7479\r c-0.1393,0.2346-0.2786,0.4546-0.4179,0.6599c-0.1393,0.2053-0.2603,0.3776-0.3629,0.5169\r c-0.1026,0.1393-0.198,0.2603-0.2859,0.3629l-0.132,0.176c-0.044,0.0587-0.1026,0.0807-0.176,0.066\r c-0.0733-0.0147-0.1173-0.0587-0.132-0.132c0-0.0147-0.011-0.1173-0.033-0.3079c-0.022-0.1906-0.044-0.3923-0.066-0.6049\r c-0.022-0.2126-0.044-0.4876-0.066-0.8248c-0.022-0.3373-0.0293-0.6635-0.022-0.9788c0.0073-0.3153,0.0293-0.6635,0.066-1.0448\r c0.0367-0.3813,0.0916-0.7332,0.165-1.0558c0.1613-0.6892,0.7039-2.9841,1.6277-6.8846c-0.1173-0.2346-0.2126-0.5169-0.2859-0.8468\r c-0.0733-0.3299-0.11-0.5975-0.11-0.8028l-0.022-0.3299c0-0.9385,0.2383-1.7193,0.7149-2.3425s1.0521-0.9348,1.7267-0.9348\r c0.5426,0,0.9641,0.1796,1.2647,0.5389c0.3006,0.3593,0.4509,0.8102,0.4509,1.3527c0,0.3373-0.0623,0.7515-0.187,1.2428\r c-0.1246,0.4912-0.2896,1.0558-0.4949,1.6937c-0.2053,0.6379-0.3519,1.1548-0.4399,1.5507\r c-0.1466,0.6599-0.0183,1.2318,0.3849,1.7157c0.4033,0.4839,0.9421,0.7259,1.6167,0.7259c1.1584,0,2.1152-0.6562,2.8704-1.9686\r c0.7552-1.3124,1.1328-2.8998,1.1328-4.762c0-1.4224-0.4619-2.5845-1.3857-3.4863C15.2105,4.4909,13.9201,4.04,12.2631,4.04\r c-1.8476,0-3.347,0.5939-4.4981,1.7816s-1.7267,2.6101-1.7267,4.2671c0,0.9825,0.2786,1.811,0.8358,2.4855\r c0.1906,0.22,0.2493,0.4546,0.176,0.7039c-0.0293,0.0733-0.0733,0.242-0.132,0.5059c-0.0587,0.2639-0.1026,0.4326-0.132,0.5059\r c-0.0293,0.1613-0.1026,0.2676-0.22,0.3189s-0.2493,0.0477-0.3959-0.011c-0.8652-0.3519-1.514-0.9568-1.9466-1.8146\r C3.7912,11.9254,3.5749,10.9246,3.5749,9.7809z' })
        )
      );
    }
  }]);

  return Icon;
})(_react.Component);

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  large: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
};

Icon.defaultProps = {
  a11yTitleId: '" + resolve.fileName + "-title'
};

Icon.icon = true;

module.exports = Icon;