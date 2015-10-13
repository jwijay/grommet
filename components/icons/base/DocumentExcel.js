// (C) Copyright 2014-2015 Hewlett-Packard Development Company

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string
  },

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'document-excel-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-document-excel';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "document-excel");

    return React.createElement(
      'svg',
      { version: '1.1', viewBox: '0 0 48 48', width: '48px', height: '48px', className: className, 'aria-labelledby': this.props.a11yTitleId },
      React.createElement(
        'title',
        { id: this.props.a11yTitleId },
        a11yTitle
      ),
      React.createElement(
        'g',
        { id: 'document-excel' },
        React.createElement('rect', { id: '_x2E_svg_279_', fill: 'none', width: '48', height: '48' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '16.5,21 16.5,13 29.5002,13 34.5,17.9999  34.5,35 15.5,35 \t' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '28.5,14 28.5,19 34.5,19 \t' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M27.5,19' }),
        React.createElement('path', { fill: '#231F20', d: 'M17.3305,27.3729l-3.0084-4.4232h2.314l1.877,2.9186l1.9156-2.9186h2.2502l-3.0084,4.3971l3.1368,4.6029 h-2.314l-2.0185-3.0856l-2.0315,3.0856h-2.2502L17.3305,27.3729z' })
      )
    );
  }

});

module.exports = Icon;