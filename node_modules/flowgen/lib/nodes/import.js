"use strict";

exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(require("./node"));

var printers = _interopRequireWildcard(require("../printers"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Import extends _node.default {
  constructor(node) {
    super(node);
  }

  print() {
    //TODO: move to printers
    if (this.raw.importClause) {
      const bindings = this.raw.importClause.namedBindings;
      const name = this.raw.importClause.name;
      const isTypeImport = this.raw.importClause.isTypeOnly;

      if (name && bindings) {
        const elements = bindings.elements;

        if (elements) {
          return `import${this.module === "root" && !isTypeImport ? "" : " type"} ${name.text}, {
          ${elements.map(node => printers.node.printType(node))}
        } from '${this.raw.moduleSpecifier.text}';\n`;
        } else {
          const namespace = bindings.name.text;
          return `import${this.module === "root" ? "" : " typeof"} ${name.text}, * as ${namespace} from '${this.raw.moduleSpecifier.text}';\n`;
        }
      }

      if (name) {
        return `import${this.module === "root" ? "" : " typeof"} ${name.text} from '${this.raw.moduleSpecifier.text}';\n`;
      }

      if (bindings) {
        const elements = bindings.elements;

        if (elements) {
          return `import${this.module === "root" && !isTypeImport ? "" : " type"} {
          ${elements.map(node => printers.node.printType(node))}
        } from '${this.raw.moduleSpecifier.text}';\n`;
        } else {
          const name = bindings.name.text;
          return `import${this.module === "root" ? "" : " typeof"} * as ${name} from '${this.raw.moduleSpecifier.text}';\n`;
        }
      }
    }

    return this.module === "root" ? `import '${this.raw.moduleSpecifier.text}';\n` : "";
  }

}

exports.default = Import;