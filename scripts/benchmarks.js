/*
 * Benchmarks module
 *
 * Implements: 3 benchmarks, one each for pseudo classical, prototypal and composition
 * Dependencies: core and jquery
 */
define( ['core', 'jquery'], function ( core, $ ) {

    "use strict";

    /// Benchmark The 3 Methods for
    var i = 1000000, // create 1,000,000 objects
        ii,
        o,
        startTime,
        endTime,
        elapsedTime;

    var formatElapsedTime = function ( elapsedTime ) {
        return elapsedTime.getMinutes() + ':' + elapsedTime.getSeconds() + ':' + elapsedTime.getUTCMilliseconds();
    };

    /*
     * runBenchmarks
     * returns a promise
     */
    var runBenchmarks = function () {
        var deferred = $.Deferred();

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
            deferred.notify( 'Benchmark Method #1 - using pseudo classical inheritance... aproximate elapsed time: ' + formatElapsedTime( elapsedTime ) );

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
            deferred.notify( 'Benchmark Method #2 - using prototypal inheritance... approximate elapsed time: ' + formatElapsedTime( elapsedTime ) );

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
            deferred.notify( 'Benchmark Method #3 - using compositional inheritance completed... approximate elapsed time: ' + formatElapsedTime( elapsedTime ) );

            deferred.resolve();

        }, 100 );

        return deferred;
    };

    return {run : runBenchmarks};
} );
