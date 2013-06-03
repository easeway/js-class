# Define Classes in Javascript

This is a simple module providing a simple `Class` function to simplify class definition in Javascript.

## Install

For Node.js

```bash
npm install js-class
```

For browser, use `bower`

```bash
bower install js-class
```

To rebuild `js-class.min.js`, type:

```bash
npm install
npm run-script build
```

## How to Use

With Node.js:

```javascript
var Class = require('js-class');
```

In browser, just include `js-class.min.js`

#### Prototype
```javascript
Class(baseClass, prototype, options);
```

#### Parameters

- `baseClass`: baseClass type, optional, default is Object;
- `prototype`: the prototype for new class;
- `options`: other options like _implements_ and _statics_, see details below.

#### Returns

The newly defined class.

#### Details

A simple and quick sample:

```javascript
var Class = require('js-class');

var MyClass = Class({
  constructor: function (value) {
    // this is the constructor
    this._value = value;
  },
    
  print: function () {
    console.log(this._value);
  },
  
  // getter/setter is supported
  get value () {
    return this._value;
  },
  
  set value (value) {
    if (!isFinite(value)) {
      throw new Error('Bad Value');
    }
    this._value = value;
  }
});

var myObject = new MyClass(1);
myObject.print(); // get 1
myObject.value = myObject.value + 100;
myObject.print(); // get 101
```

A simple inheritance sample:

```javascript
var BaseClass = Class({
  constructor: function (value) {
    this.value = value;
  },
  
  print: function () {
    console.log('BaseClass: %d', this.value);
  }
});

var SubClass = Class(BaseClass, {
  constructor: function (val1, val2) {
    BaseClass.prototype.constructor.call(this, val1 + val2);
  },
  
  print: function () {
    console.log('SubClass');
    BaseClass.prototype.print.call(this);
  }
});

var myObject = new SubClass(1, 2);
myObject instanceof SubClass;   // true
myObject instanceof BaseClass;  // true
myObject.print();
// get
// SubClass
// BaseClass: 3
```

Multiple inheritance with _implements_

```javascript
var ActiveBuffer = Class(Buffer, {
  // override Clearable
  clear: function () {
    // TODO I hate to be cleared
    this.emit('cleared');
  }
}, {
  implements: [EventEmitter, Clearable]
});

var buffer = new ActiveBuffer().on('cleared', function () { console.log('CLEARED'); });
buffer.clear();

buffer instanceof Buffer; // true
buffer instanceof EventEmitter; // false
buffer instanceof Clearable;  // false
```

Static members

```javascript
var Singleton = Class({
  constructor: function () {
    // ...
  },
  
  work: function () {
    // ...
  }
}, {
  statics: {
    get instance () {
      if (!Singleton._instance) {
        Singleton._instance = new Singleton();
      }
      return Singleton._instance;
    }
  }
});

Singleton.instance.work();
```

### Type Information

The keyword `instanceof` can be used to check the type inherited directly. But it doesn't work with `implemented` types.
Use `Class.is` for all the cases:

```javascript
Class.is(object).typeOf(Type)
```

We also have two aliases:

```javascript
Class.is(object).a(Type)
Class.is(object).an(Object)
```

## License

MIT/X11 License