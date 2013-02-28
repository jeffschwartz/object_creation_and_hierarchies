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
        o;

    /*
     * runBenchmarks
     * returns a promise
     */
    var runBenchmarks = function () {
        var deferred = $.Deferred();

        setTimeout( function () {

            /*
             * Benchmark Method #1
             */
            ii = i;
            console.time( 'Benchmark Method #1 - using pseudo classical inheritance' );
            while ( ii ) {
                o = new core.method1.Employee( 'Tommy San', 'Top Cat', 'Meow' );
                ii -= 1;
            }
            console.timeEnd( 'Benchmark Method #1 - using pseudo classical inheritance' );

            /*
             * Benchmark Method #2
             */
            ii = i;
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

            /*
             * Benchmark Method #3
             */
            ii = i;
            console.time( 'Benchmark Method #3 - using compositional inheritance' );
            while ( ii ) {
                o = core.method3.createEmployee( {name : 'Tommy San', jobTitle : 'Top Cat', says : 'Meow'} );
                ii -= 1;
            }
            console.timeEnd( 'Benchmark Method #3 - using compositional inheritance' );

            deferred.resolve();

        }, 5000 );

        return deferred;
    };

    return {run : runBenchmarks};
} );
