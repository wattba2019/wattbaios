"use strict";

exports.__esModule = true;
exports.print = void 0;

var printers = _interopRequireWildcard(require("./index"));

var _options = require("../options");

var _env = require("../env");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Please add only built-in type references
const identifiers = Object.create(null);
Object.assign(identifiers, {
  ReadonlyArray: "$ReadOnlyArray",
  ReadonlySet: "$ReadOnlySet",
  ReadonlyMap: "$ReadOnlyMap",
  Readonly: "$ReadOnly",
  NonNullable: "$NonMaybeType",
  Partial: ([type]) => {
    const isInexact = (0, _options.opts)().inexact;
    return `$Rest<${printers.node.printType(type)}, {${isInexact ? "..." : ""}}>`;
  },
  ReturnType: typeArguments => {
    return `$Call<<R>((...args: any[]) => R) => R, ${printers.node.printType(typeArguments[0])}>`;
  },
  Record: ([key, value]) => {
    const isInexact = (0, _options.opts)().inexact;
    return `{[key: ${printers.node.printType(key)}]: ${printers.node.printType(value)}${isInexact ? ", ..." : ""}}`;
  }
});
const print = (0, _env.withEnv)((env, kind) => {
  if (env.classHeritage) return kind;
  return identifiers[kind] || kind;
});
exports.print = print;