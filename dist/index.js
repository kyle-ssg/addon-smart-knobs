"use strict";
const each = require('lodash/each');
const propTypes = require('prop-types');

const propTypesMap = new Map();

Object.keys(propTypes).forEach(typeName => {
  // @ts-ignore
  const type = propTypes[typeName];

  propTypesMap.set(type, typeName);
  propTypesMap.set(type.isRequired, typeName);
});



var getPropTypes = (type) => {
  const props = {};

  if (type.propTypes) {
    Object.keys(type.propTypes).forEach(property => {
      const typeInfo = type.propTypes[property];
      const required = typeInfo.isRequired === undefined;
      const docgenInfo =
        type.__docgenInfo && type.__docgenInfo.props && type.__docgenInfo.props[property];
      const description = docgenInfo ? docgenInfo.description : null;
      let propType = propTypesMap.get(typeInfo) || 'other';
      if (propType === 'node') {
        propType = 'object';
      }
      if (propType === 'other') {
        if (docgenInfo && docgenInfo.type) {
          propType = docgenInfo.type.name;
        }
      }

      props[property] = { name: property, type: propType, required, description };
    });
  }
  if (type.defaultProps) {
    Object.keys(type.defaultProps).forEach(property => {
      const value = type.defaultProps[property];

      if (value === undefined) {
        return;
      }

      if (!props[property]) {
        props[property] = { name: property, type: 'any', required: false };
      }

      props[property].defaultValue = value;
    });
  }

  return Object.values(props);
};

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSmartKnobs = exports.propTypeKnobResolver = exports.addKnobResolver = void 0;

var _react = require("react");

var _addonActions = require("@storybook/addon-actions");

var _clientLogger = require("@storybook/client-logger");

var _addonKnobs = require("@storybook/addon-knobs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var knobResolvers = {};

var addKnobResolver = function addKnobResolver(_ref) {
  var name = _ref.name,
      resolver = _ref.resolver,
      _ref$weight = _ref.weight,
      weight = _ref$weight === void 0 ? 0 : _ref$weight;
  return knobResolvers[name] = {
    name: name,
    resolver: resolver,
    weight: weight
  };
};
/*
 * Register default knob resolvers.
 * --------------------------------
 */


exports.addKnobResolver = addKnobResolver;

var propTypeKnobResolver = function propTypeKnobResolver(name, knob) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return function (propName, propType, value, propTypes, defaultProps) {
    return propType.type.name === name ? knob.apply(void 0, [propName, value].concat(args)) : undefined;
  };
};

exports.propTypeKnobResolver = propTypeKnobResolver;
var flowTypeKnobsMap = [{
  name: 'signature',
  knob: function knob(name, value) {
    return value || (0, _addonActions.action)(name);
  }
}, {
  name: 'boolean',
  knob: _addonKnobs["boolean"]
}];
/* eslint-disable no-multi-spaces */
// Default simple PropType based knob map.

var propTypeKnobsMap = [{
  name: 'string',
  knob: _addonKnobs.text
}, {
  name: 'number',
  knob: _addonKnobs.number
}, {
  name: 'bool',
  knob: _addonKnobs["boolean"]
}, {
  name: 'func',
  knob: function knob(name, value) {
    return value || (0, _addonActions.action)(name);
  }
}, {
  name: 'object',
  knob: _addonKnobs.object
}, {
  name: 'node',
  knob: _addonKnobs.text
}, {
  name: 'element',
  knob: _addonKnobs.text
}, {
  name: 'array',
  knob: _addonKnobs.object
}];
var typeKnobsMap = [].concat(flowTypeKnobsMap, propTypeKnobsMap);
typeKnobsMap.forEach(function (_ref2, weight) {
  var name = _ref2.name,
      knob = _ref2.knob,
      _ref2$args = _ref2.args,
      args = _ref2$args === void 0 ? [] : _ref2$args;
  return addKnobResolver({
    weight: weight * 10,
    name: "PropTypes.".concat(name),
    resolver: propTypeKnobResolver.apply(void 0, [name, knob].concat(_toConsumableArray(args)))
  });
});

var optionsReducer = function optionsReducer(res, value) {
  return _objectSpread({}, res, _defineProperty({}, value, value));
};

var withDefaultOption = function withDefaultOption(options) {
  return _objectSpread({
    '': '--'
  }, options);
};

var createSelect = function createSelect(propName, elements, defaultProps) {
  try {
    var options = elements // Cleanup string quotes, if any.
    .map(function (value) {
      return value.value.replace(/^['"](.*)['"]$/, '$1');
    }).reduce(optionsReducer, {});
    return (0, _addonKnobs.select)(propName, withDefaultOption(options), defaultProps[propName]);
  } catch (e) {}
}; // Register 'oneOf' PropType knob resolver.


addKnobResolver({
  name: 'PropTypes.oneOf',
  resolver: function resolver(propName, propType, value, propTypes, defaultProps) {
    if (propType.type.name === 'enum' && propType.type.value.length) {
      return createSelect(propName, propType.type.value, defaultProps);
    } // for flow support


    if (propType.type.name === 'union' && propType.type.elements) {
      return createSelect(propName, propType.type.elements, defaultProps);
    }
  }
});

var ensureType = function ensureType(item) {
  return item.flowType ? _objectSpread({}, item, {
    type: item.flowType
  }) : item;
};

var withSmartKnobs = function withSmartKnobs(story, context) {
  var component = story(context);
  var target = component.props.components && component.props.propTables && component.props.propTablesExclude ? component.props.children : component;
  var _target$type$__docgen = target.type.__docgenInfo;
  _target$type$__docgen = _target$type$__docgen === void 0 ? {
    props: {}
  } : _target$type$__docgen;
  var props = _target$type$__docgen.props;
  if (!target.type.__docgenInfo) {
    props = {};
    const theTypes = getPropTypes(target.type);
    each(theTypes, function(type) {
      props[type.name] = {
        defaultValue: type.defaultValue,
        type: {name:type.type},
        required: type.required
      }
    })
  }
  var defaultProps = _objectSpread({}, target.type.defaultProps || {}, {}, target.props);

  var finalProps = props ? Object.keys(props).reduce(function (acc, n) {
    var item = ensureType(props[n]);

    if (!item.type) {
      var defaultValue = item.defaultValue ? item.defaultValue.value : 'Unknown';

      _clientLogger.logger.warn("There is a prop with defaultValue ".concat(defaultValue, " but it wasn't specified on element.propTypes. Check story: \"").concat(context.kind, "\"."));

      return acc;
    }

    return _objectSpread({}, acc, _defineProperty({}, n, item));
  }, {}) : {};
  var newProps = resolvePropValues(finalProps, defaultProps);

  if (component.props.components) {
    return (0, _react.cloneElement)(component, _objectSpread({}, component.props, {
      children: (0, _react.cloneElement)(component.props.children, newProps)
    }));
  }

  return (0, _react.cloneElement)(component, newProps);
};

exports.withSmartKnobs = withSmartKnobs;

var resolvePropValues = function resolvePropValues(propTypes, defaultProps) {
  var propNames = Object.keys(propTypes);
  var resolvers = Object.keys(knobResolvers).sort(function (a, b) {
    return knobResolvers[a].weight < knobResolvers[b].weight;
  }).map(function (name) {
    return knobResolvers[name].resolver;
  });
  return propNames.map(function (propName) {
    return resolvers.reduce(function (value, resolver) {
      return value !== undefined ? value : resolver(propName, propTypes[propName], defaultProps[propName], propTypes, defaultProps);
    }, undefined);
  }).reduce(function (props, value, i) {
    return _objectSpread({}, props, _defineProperty({}, propNames[i], value !== undefined ? value : defaultProps[propNames[i]]));
  }, defaultProps);
};
