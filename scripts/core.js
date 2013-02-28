/*
 * core module
 *
 * Implements: 3 patterns of inheritance, pseudo classical, prototypal and composition
 * Dependencies: nothing
 */
define( function () {

    'use strict';

    var module = {};

    /// Prototypal Object Creation

    /*
     * Method: #1
     * Create object hierarchy using pseudo classical inheritance
     */

    module.method1 = {};

    var Person = function ( name, says ) {
        this.name = name;
        this.says = says;
    };
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.setName = function ( value ) {
        this.name = value;
    };
    Person.prototype.getSays = function () {
        return this.says;
    };
    Person.prototype.setSays = function ( value ) {
        this.says = value;
    };

    var Employee = function ( name, jobTitle, says ) {
        this.name = name;
        this.jobTitle = jobTitle;
        this.says = says;
    };
    Employee.prototype = new Person( "", "" ); /// this is worse than ugly... it is downright fugly!
    Employee.prototype.getJobTitle = function () {
        return this.jobTitle;
    };
    Employee.prototype.setJobTitle = function ( value ) {
        this.jobTitle = value;
    };

    module.method1.Employee = Employee;

    /*
     * Method: #2
     * Create object hierarchy by creating objects based
     * on a prototype and an arbitrary set of attributes.
     */

    module.method2 = {};

    /// Credit: Yehuda Katz
    /// see http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/
    var fromPrototype = function ( prototype, object ) {
        var prop;
        var newObject = Object.create( prototype );

        for ( prop in object ) {
            if ( object.hasOwnProperty( prop ) ) {
                newObject[prop] = object[prop];
            }
        }

        return newObject;
    };

    module.method2.fromPrototype = fromPrototype;

    // serves as employee's prototype
    var person = {
        getName : function () {
            return this.name;
        },
        setName : function ( value ) {
            this.name = value;
        },
        getSays : function () {
            return this.says;
        },
        setSays : function ( value ) {
            this.says = value;
        }
    };

    // uses person as its prototype
    module.method2.employee =  fromPrototype( person, {
        getJobTitle : function () {
            return this.jobTitle;
        },
        setJobTitle : function ( value ) {
            this.jobTitle = value;
        }
    } );

    /*
     * Method: #3
     * Create an object using a combination of modular,
     * parts and functional patterns which for brevity I
     * call composition.
     * Credit: Douglas Crockford and his seminal work,
     * "JavaScript, The Good Parts"
     */

    module.method3 = {};

    var createPerson = function ( spec ) {

        // this is what createPerson will return
        var person;

        // validate that a spec was provided
        if ( typeof spec === 'undefined' ) {
            throw 'createPerson requires spec';
        }

        // Person starts off as a literal object which we will compose on.
        // An object literal's prototype is assigned Object.prototype by
        // the JavaScript runtime - nice!
        person = {};

        // rough up spec
        spec.name = spec.name || '';
        spec.says = spec.says || '';

        // the exposed (public) api
        var getName = function () {
            return spec.name;
        };
        var setName = function ( value ) {
            spec.name = value;
        };
        var getSays = function () {
            return spec.says;
        };
        var setSays = function ( value ) {
            spec.says = value;
        };

        person.getName = getName;
        person.setName = setName;
        person.getSays = getSays;
        person.setSays = setSays;

        // we are done composing person so now return it
        return person;
    };

    module.method3.createEmployee = function ( spec ) {

        // this is what createEmployee returns
        var employee;

        // validate that spec was provided
        if ( typeof spec === 'undefined' ) {
            throw 'create Employee requires spec';
        }

        // employee inherits from person so make it so
        employee = createPerson( spec );

        // rough up spec
        spec.jobTitle = spec.jobTitle || '';

        // the exposed (public) api
        var getJobTitle = function () {
            return spec.jobTitle;
        };
        var setJobTitle = function ( value ) {
            spec.jobTitle = value;
        };

        employee.getJobTitle = getJobTitle;
        employee.setJobTitle = setJobTitle;

        // we are done composing employee so now return it
        return employee;
    };

    return module;

} );
