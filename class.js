/** Class Definition using ECMA5 prototype chain */

function inherit(dest, src, noParent) {
    while (src && src !== Object.prototype) {
        Object.getOwnPropertyNames(src).forEach(function (name) {
            if (!dest.hasOwnProperty(name)) {
                var desc = Object.getOwnPropertyDescriptor(src, name);
                Object.defineProperty(dest, name, desc);
            }
        });
        if (noParent) {
            break;
        }
        src = src.__proto__;
    }
    return dest;
}

var Class = function (base, proto, options) {
    if (typeof(base) != 'function') {
        options = proto;
        proto = base;
        base = Object;
    }
    if (!proto) {
        proto = {};
    }
    if (!options) {
        options = {};
    }
    var classProto = Class.clone(proto);
    if (options.implements) {
        (Array.isArray(options.implements) ? options.implements : [options.implements])
            .forEach(function (implementedType) {
                if (typeof(implementedType) == 'function' && implementedType.prototype) {
                    Class.extend(classProto, implementedType.prototype);
                }
            });
    }
    classProto.__proto__ = base.prototype;
    var theClass = function () {
        if (typeof(this.constructor) == 'function') {
            this.constructor.apply(this, arguments);
        }
    };
    theClass.prototype = classProto;
    if (options.statics) {
        Class.extend(theClass, options.statics);
    }
    return theClass;
};

Class.extend = inherit;

Class.clone = function (object) {
    return inherit({}, object);
};

module.exports = Class;