/*
 * Benchmarks module
 *
 * Implements: 3 benchmarks, one each for pseudo classical, prototypal and composition
 * Dependencies: core and jquery
 */
define( ['core', 'jquery', 'utils'], function ( core, $, utils ) {

    "use strict";

    /// Benchmark The 3 Methods for
    var i,
        ii,
        o,
        startTime,
        endTime,
        elapsedTime;

    /*
     * a convenience function for formatting the elapsed time
     */
    var formatElapsedTime = function ( elapsedTime ) {

        return elapsedTime.getMinutes() + ':' + elapsedTime.getSeconds() + ':' + elapsedTime.getUTCMilliseconds();

    };

    /*
     * runBenchmarks
     * returns a promise
     * you can pass a number as an argument to override the default
     */
    var runBenchmarks = function () {

        var deferred = $.Deferred();

        // default to 1,000,000 iterations
        i = 1000000;

        // if an arg was passed then validate it and if valid set i to it
        if ( arguments.length > 0 ) {
            if ( !utils.isNumber( arguments[0] ) ) {
                throw new Error( 'benchmarks.runBenchmarks() called with non number as an argument is not allowed' );
            }
            // use the number entered by the user instead of the default
            i = Number( arguments[0] );
        }

        setTimeout( function () {

            /*
             * Benchmark Method #1 - pseudo classical
             */
            ii = i;
            startTime = new Date();
            console.time( 'Benchmark Method #1 - using pseudo classical inheritance' );
            while ( ii ) {
                o = new core.method1.Employee( 'Tommy San', 'Top Cat', 'Meow' );
                ii -= 1;
            }
            console.timeEnd( 'Benchmark Method #1 - using pseudo classical inheritance' );
            endTime = new Date();
            elapsedTime = new Date( endTime - startTime );
            deferred.notify( 'Benchmark Method #1 - using pseudo classical inheritance... ' +
                'approximate elapsed time: ' + formatElapsedTime( elapsedTime ) );

            /*
             * Benchmark Method #2 - prototypal
             */
            ii = i;
            startTime = new Date();
            console.time( 'Benchmark Method #2 - using prototypal inheritance' );
            while ( ii ) {
                o = core.method2.fromPrototype( core.method2.employee, {
                    name     : 'Tommy San',
                    jobTitle : 'Top Cat',
                    says     : 'Meow'
                } );
                ii -= 1;
            }
            console.timeEnd( 'Benchmark Method #2 - using prototypal inheritance' );
            endTime = new Date();
            elapsedTime = new Date( endTime - startTime );
            deferred.notify( 'Benchmark Method #2 - using prototypal inheritance... ' +
                'approximate elapsed time: ' + formatElapsedTime( elapsedTime ) );

            /*
             * Benchmark Method #3 - composition
             */
            ii = i;
            startTime = new Date();
            console.time( 'Benchmark Method #3 - using compositional inheritance' );
            while ( ii ) {
                o = core.method3.createEmployee( {name : 'Tommy San', jobTitle : 'Top Cat', says : 'Meow'} );
                ii -= 1;
            }
            console.timeEnd( 'Benchmark Method #3 - using compositional inheritance' );
            endTime = new Date();
            elapsedTime = new Date( endTime - startTime );
            deferred.notify( 'Benchmark Method #3 - using compositional inheritance... ' +
                'approximate elapsed time: ' + formatElapsedTime( elapsedTime ) );

            deferred.resolve();

        }, 100 );

        return deferred;

    };

    return {run : runBenchmarks};

} );
