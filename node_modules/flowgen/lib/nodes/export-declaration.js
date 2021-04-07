"use strict";

exports.__esModule = true;
exports.default = void 0;

var printers = _interopRequireWildcard(require("../printers"));

var _node = _interopRequireDefault(require("./node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class ExportDeclaration extends _node.default {
  constructor(node) {
    super(node);
  }

  print() {
    //TODO: move to printers
    if (this.raw.exportClause) {
      // @ts-expect-error todo(flow->ts)
      const elements = this.raw.exportClause.elements;
      let specifier = "";
      if (this.raw.moduleSpecifier) specifier = `from '${this.raw.moduleSpecifier.text}';`;
      return `declare export {
        ${elements.map(node => printers.node.printType(node))}
      }${specifier}\n`;
    } else {
      return `declare export * from '${this.raw.moduleSpecifier.text}';\n`;
    }
  }

}

exports.default = ExportDeclaration;