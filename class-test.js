var assert = require('assert');
    Class  = require('./class');

describe('Class', function () {
    describe('Basic features', function () {
        it('#constructor', function () {
            var MyClass = Class({
                constructor: function () {
                    this.value = 1234;
                }
            });
            var object = new MyClass();
            assert.equal(object.value, 1234);
        });
        
        it('methods', function () {
            var MyClass = Class({
                constructor: function () {
                    this.value = 4321;
                },
                
                method: function () {
                    return this.value;
                }
            });
            var object = new MyClass();
            assert.equal(object.method(), 4321);
        });
        
        it('getters', function () {
            var MyClass = Class({
                constructor: function () {
                    this.value = 5678;
                },
                
                get val () {
                    return this.value;
                }
            });
            var object = new MyClass();
            assert.equal(object.val, 5678);
        });
        
        it('setters', function () {
            var MyClass = Class({
                constructor: function () {
                    this.value = 6789;
                },
                
                set val (value) {
                    this.value = value;
                    return value;
                }
            });
            var object = new MyClass();
            object.val = 3456;
            assert.equal(object.value, 3456);
        });
        
        it('static methods', function () {
            var MyClass = Class({
                
            }, {
                statics: {
                    method: function () {
                        return 'abc';
                    }
                }
            });
            assert.equal(MyClass.method(), 'abc');
        });
        
        it('static getters', function () {
            var MyClass = Class({
                
            }, {
                statics: {
                    get val () {
                        return 56;
                    }
                }
            });
            assert.equal(MyClass.val, 56);
        });
        
        it('static setters', function () {
            var MyClass = Class({
                
            }, {
                statics: {
                    set val (value) {
                        MyClass.value = value;
                        return value;
                    }
                }
            });
            MyClass.val = 78;
            assert.equal(MyClass.value, 78);
        });
    });
    
    describe('Inheritance', function () {
        it('#instanceof', function () {
            var BaseClass = Class({});
            var SubClass = Class(BaseClass, {});
            
            assert.ok(new SubClass() instanceof SubClass);
            assert.ok(new SubClass() instanceof BaseClass);
            assert.ok(new BaseClass() instanceof BaseClass);
            assert.equal(new BaseClass() instanceof SubClass, false);
            assert.ok(new SubClass() instanceof Object);
        });
        
        it('super constructor', function () {
            var BaseClass = Class({
                constructor: function () {
                    this.value = 1;
                }
            });
            var Sub1Class = Class(BaseClass, {
                constructor: function () {
                    BaseClass.prototype.constructor.call(this);
                    this.value ++;
                }
            });
            var Sub2Class = Class(Sub1Class, {
                constructor: function () {
                    Sub1Class.prototype.constructor.call(this);
                    this.value ++;
                }
            });
            assert.equal(new BaseClass().value, 1);
            assert.equal(new Sub1Class().value, 2);
            assert.equal(new Sub2Class().value, 3);
        });
        
        it('overrides', function () {
            var BaseClass = Class({
                method: function () {
                    return 1;
                }
            });
            var Sub1Class = Class(BaseClass, {
                method: function () {
                    return -1;
                }
            });
            var Sub2Class = Class(BaseClass, {
                method: function () {
                    return BaseClass.prototype.method.call(this) + 1;
                }
            });
            assert.equal(new BaseClass().method(), 1);
            assert.equal(new Sub1Class().method(), -1);
            assert.equal(new Sub2Class().method(), 2);
        });
        
        it('implements', function () {
            var Base1Class = Class({
                method1: function () {
                    return 1;
                }
            });
            var Base2Class = Class({
                method2: function () {
                    return 2;
                }
            });
            var Base3Class = Class({
                method3: function () {
                    return 3;
                }
            });
            var SubClass = Class(Base1Class, {
                
            }, {
                implements: [Base2Class, Base3Class]
            });
            
            var object = new SubClass();
            assert.ok(object.method1);
            assert.ok(object.method2);
            assert.ok(object.method3);
            assert.equal(object.method1(), 1);
            assert.equal(object.method2(), 2);
            assert.equal(object.method3(), 3);
        });
        
        it('implements and override', function () {
            var Base1Class = Class({
                method1: function () {
                    return 1;
                }
            });
            var Base2Class = Class({
                method2: function () {
                    return 2;
                }
            });
            var SubClass = Class(Base1Class, {
                method2: function () {
                    return -2;
                }
            }, {
                implements: [Base2Class]
            });
            
            var object = new SubClass();
            assert.ok(object.method1);
            assert.ok(object.method2);
            assert.equal(object.method1(), 1);
            assert.equal(object.method2(), -2);
        });
    });
});