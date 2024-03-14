// Generated by CoffeeScript 1.10.0
(function() {
  var Doc, Node, Parameter, VirtualMethod, _,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Node = require('./node');

  Parameter = require('./parameter');

  Doc = require('./doc');

  _ = require('underscore');

  _.str = require('underscore.string');

  module.exports = VirtualMethod = (function(superClass) {
    extend(VirtualMethod, superClass);

    function VirtualMethod(entity, doc, options) {
      this.entity = entity;
      this.doc = doc;
      this.options = options;
    }

    VirtualMethod.prototype.getType = function() {
      if (!this.type) {
        if (this.doc.signature.substring(0, 1) === '.') {
          this.type = 'instance';
        } else if (this.doc.signature.substring(0, 1) === '@') {
          this.type = 'class';
        } else {
          this.type = 'mixin';
        }
      }
      return this.type;
    };

    VirtualMethod.prototype.getDoc = function() {
      return this.doc;
    };

    VirtualMethod.prototype.getSignature = function() {
      var error, error1, i, len, param, params, ref;
      try {
        if (!this.signature) {
          this.signature = (function() {
            switch (this.getType()) {
              case 'class':
                return '+ ';
              case 'instance':
                return '- ';
              default:
                return '? ';
            }
          }).call(this);
          if (this.getDoc()) {
            this.signature += this.getDoc().returnValue ? "(" + (_.str.escapeHTML(this.getDoc().returnValue.type)) + ") " : "(void) ";
          }
          this.signature += "<strong>" + (this.getName()) + "</strong>";
          this.signature += '(';
          params = [];
          ref = this.getParameters();
          for (i = 0, len = ref.length; i < len; i++) {
            param = ref[i];
            params.push(param.name);
          }
          this.signature += params.join(', ');
          this.signature += ')';
        }
        return this.signature;
      } catch (error1) {
        error = error1;
        if (this.options.verbose) {
          return console.warn('Get method signature error:', this.node, error);
        }
      }
    };

    VirtualMethod.prototype.getShortSignature = function() {
      var error, error1;
      try {
        if (!this.shortSignature) {
          this.shortSignature = (function() {
            switch (this.getType()) {
              case 'class':
                return '@';
              case 'instance':
                return '.';
              default:
                return '';
            }
          }).call(this);
          this.shortSignature += this.getName();
        }
        return this.shortSignature;
      } catch (error1) {
        error = error1;
        if (this.options.verbose) {
          return console.warn('Get method short signature error:', this.node, error);
        }
      }
    };

    VirtualMethod.prototype.getName = function() {
      var error, error1, name;
      try {
        if (!this.name) {
          if (name = /[.#]?([$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)/i.exec(this.doc.signature)) {
            this.name = name[1];
          } else {
            this.name = 'unknown';
          }
        }
        return this.name;
      } catch (error1) {
        error = error1;
        if (this.options.verbose) {
          return console.warn('Get method name error:', this.node, error);
        }
      }
    };

    VirtualMethod.prototype.getParameters = function() {
      return this.doc.params || [];
    };

    VirtualMethod.prototype.getCoffeeScriptSource = function() {};

    VirtualMethod.prototype.getJavaScriptSource = function() {};

    return VirtualMethod;

  })(Node);

}).call(this);
