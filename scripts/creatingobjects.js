(function ( ) {

    "use strict";

    /// Prototypal Object Creation

    /*
     * Method: #1
     * Create object hierarchy using class-based-like superclass and only new
     */
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

//    var tommy =  new Employee( 'Tommy San', 'Top Cat', 'Meow' );
//    console.log( tommy.getName() );
//    console.log( tommy.getJobTitle() );
//    console.log( tommy.getSays() );
//    tommy.setName( 'Mister Tommy' );
//    tommy.setJobTitle( 'CIO' );
//    tommy.setSays( 'Yada Yada' );
//    console.log( tommy.getName() );
//    console.log( tommy.getJobTitle() );
//    console.log( tommy.getSays() );

    /*
     * Method: #2
     * Create object hierarchy by creating objects based on a prototype and an arbitrary set of attributes
     */

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
    var employee = fromPrototype( person, {
        getJobTitle : function () {
            return this.jobTitle;
        },
        setJobTitle : function ( value ) {
            this.jobTitle = value;
        }
    } );

    // create an instance of employee
//    var tommy2 = fromPrototype( employee, {
//        name     : 'Tommy San',
//        jobTitle : 'Top Cat',
//        says     : 'Meow'
//    } );

//    console.log( tommy2.getName() ); // outputs Jeff Schwartz
//    console.log( tommy2.getJobTitle() ); // outputs Web Provocateur
//    console.log( tommy2.getSays() ); // outputs Web Provocateur
//    tommy2.setName( 'Mister Tommy' );
//    tommy2.setJobTitle( 'CIO' );
//    tommy2.setSays( 'Yada Yada' );
//    console.log( tommy2.getName() );
//    console.log( tommy2.getJobTitle() );
//    console.log( tommy2.getSays() ); // outputs Web Provocateur

    /// Composing Object

    /*
     * Method: #3
     * Create an object using a combination of modular, parts and functional patterns which for brevity I call composition.
     * Credit: Douglas Crockford and his seminal work, "JavaScript, The Good Parts"
     */

    var createPerson = function ( spec ) {

        // this is what createPerson will return
        var person;

        // validate that a spec was provided
        if ( typeof spec === 'undefined' ) {
            throw 'createPerson requires spec';
        }

        // person starts off as a literal object which we will compose on
        person = {}; // an object literal's prototype is assigned Object.prototype by the JavaScript runtime - nice!

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

    var createEmployee = function ( spec ) {

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

//    var tommy3 = createEmployee( {name : 'Tommy San', jobTitle : 'Top Cat', says : 'Meow'} );
//    console.log( tommy3.getName() ); // outputs Jeff Schwartz
//    console.log( tommy3.getJobTitle() ); // outputs Web Provocateur
//    console.log( tommy3.getSays() ); // outputs Web Provocateur
//    tommy3.setName( 'Mister Tommy' );
//    tommy3.setJobTitle( 'CIO' );
//    tommy3.setSays( 'Yada Yada' );
//    console.log( tommy3.getName() );
//    console.log( tommy3.getJobTitle() );
//    console.log( tommy3.getSays() ); // outputs Web Provocateur


    /// Benchmark The 3 Methods for
    var i = 1000000, // create 1,000,000 objects
        ii,
        o;

    /*
     * Benchmark Method #1
     */
    ii = i;
    console.time('Benchmark Method #1');
    while(ii){
        o = new Employee( 'Tommy San', 'Top Cat', 'Meow' );
        ii -= 1;
    }
    console.timeEnd('Benchmark Method #1');

    /*
     * Benchmark Method #2
     */
    ii = i;
    console.time('Benchmark Method #2');
    while(ii){
        o = fromPrototype( employee, {
            name     : 'Tommy San',
            jobTitle : 'Top Cat',
            says     : 'Meow'
        } );
        ii -= 1;
    }
    console.timeEnd('Benchmark Method #2');

    /*
     * Benchmark Method #3
     */
    ii = i;
    console.time('Benchmark Method #3');
    while(ii){
        o = createEmployee( {name : 'Tommy San', jobTitle : 'Top Cat', says : 'Meow'} );
        ii -= 1;
    }
    console.timeEnd('Benchmark Method #3');

} (  ) );
