/*
 * main module
 *
 * Implements: sets up the page for resizing and handling benchmarks button clicks and
 * then runs 3 example - 1 each for pseudo classical, prototypal and composition and
 * outputs their results to the page
 * Dependencies: core, benchmarks and jquery
 */
require( ['core', 'benchmarks', 'jquery', 'utils'], function ( core, benchmarks, $, utils ) {

    "use strict";

    $( function () {

        var tommy, tommy2, tommy3,
            $benchmarkresultfor = $( '#benchmarkresultfor' ),
            $runbenchmarksmemo = $( '#runbenchmarksmemo' ),
            $repetitionsTxt = $( '#repetitionsTxt' ),
            $runbtn = $( '#runbenchmarks' ),
            $status = $( '#status' ),
            $results = $( '#results' ),
            $page = $( '#page' ),
            $generatingbenchmarks = $( '#generatingbenchmarks' ),
            $benchmarksavailable = $( '#benchmarksavailable' ),
            $sampleoutput = $( '#sampleoutput' ),
            $headercontainer = $( '#header_container' ),
            prompt = 'Please enter a valid number for repetitions',
            subjects = [
                'Employee Name: ',
                'Employee Title: ',
                'Employee Says: ',
                'Employee Name After Promotion: ',
                'Employee Title After Promotion: ',
                'Employee Says After Promotion: '
            ];

        /*
         * event handlers
         */

        /// window resize event handler - recalculate padding-top for page container
        $( window ).resize( function () {
            setTimeout( function () {
                $page.css( 'padding-top', $headercontainer.outerHeight() );
            }, 100 );
        } );

        /// handle change events on the textbox
        $repetitionsTxt.change( function () {

            var val = $( this ).val(),
                fmt;

            if ( !val ) {
                return;
            }
            if ( utils.isNumber( val ) ) {
                fmt = Number( val ).toLocaleString();
                $runbenchmarksmemo.html( 'each method x ' + fmt + ' times' );
            } else {
                fixInput();
            }

        } );

        /// handle the run benchmark test button click
        $runbtn.click( function () {

            var promise,
                that = this,
                reps;

            if ( $repetitionsTxt.val() ) {
                if ( !utils.isNumber( $repetitionsTxt.val() ) ) {
                    fixInput();
                    return;
                }
                reps = Number( $repetitionsTxt.val() );
            }

            // prevent repetitive clicking of this button
            $( this ).attr( 'disabled', 'disabled' );
            // change the mouse cursor to show were in progress
            $page.addClass( 'showProgressCursor' );
            $( this ).addClass( 'showProgressCursor' );
            // other setup for displaying feedback on the page
            $results.html( '' );
            $benchmarksavailable.hide();
            $generatingbenchmarks.show();
            $status.hide();
            // when shown show either the value the user entered in the textbox or the default value
            $benchmarkresultfor.html( 'Benchmark Results For Generating ' + ( reps ? Number( reps ).toLocaleString() : Number( 1000000 ).toLocaleString() ) + ' Objects' );
            /// The browsers sometimes wont show the progress cursor if you don't yield to the gui so
            /// this timeout is to give the gui a chance to respond to the new class on the button and page
            setTimeout( function () {

                // get the promise for the results
                promise = reps ? benchmarks.run( reps ) : benchmarks.run();

                // this is what we will do when the promise is resolved
                promise.done( function () {

                    $page.removeClass( 'showProgressCursor' );
                    $( that ).removeClass( 'showProgressCursor' );
                    $( that ).removeAttr( 'disabled' );
                    $generatingbenchmarks.hide();
                    $benchmarksavailable.show();
                    $repetitionsTxt.focus();
                    $repetitionsTxt.select();

                } );

                // this is what we will do when we receive notifications from the promise
                promise.progress( function ( notice ) {

                    if ( !$status.is( ':visible' ) ) {
                        $status.show();
                    }
                    $results.append( '<li>' + notice + '</li>' );

                } );

            }, 1000 );

        } );

        // trigger a window resize event to adjust the padding on the body container
        $( window ).resize();

        /*
         * internal implementations
         */

        /// a convenience function for formatting our sample output
        var sampleOut = function ( i, txt ) {
            return  '<li>' + subjects[i] + txt + '</li>';
        };

        /// a convenience function for when an invalid value is entered into the text box
        var fixInput = function () {

            alert( prompt );
            $repetitionsTxt.val( '' );
            $repetitionsTxt.focus();

        };

        /// a function that creates convenience functions
        /// for appending to an element $el is a dom element.
        /// $el is a jquery object.
        var appendToElement = function ( $el ) {
            // guard against inappropriate argument
            if ( !($el instanceof $) ) {
                throw new Error( 'appendToElement expects an instance of jQuery' );
            }
            return function ( s ) {
                $el.append( s );
            };
        };

        // now lets create an append function for the sample output
        var append = appendToElement( $sampleoutput );

        /*
         * Show sample output
         */

        /*
         * Example Of Method #1 - using pseudo classical inheritance
         */

        /// create an instance of employee
        tommy = new core.method1.Employee( 'Tommy San', 'Top Cat', 'Meow' );

        /// output some useful information to the page
        append( '<h1>Sample output of Method #1 - using pseudo classical inheritance...</h1>' );
        append( '<ul>' );
        append( sampleOut( 0, tommy.getName() ) );
        append( sampleOut( 1, tommy.getJobTitle() ) );
        append( sampleOut( 2, tommy.getSays() ) );
        tommy.setName( 'Mister Tommy' );
        tommy.setJobTitle( 'CIO' );
        tommy.setSays( 'Yada Yada' );
        append( sampleOut( 3, tommy.getName() ) );
        append( sampleOut( 4, tommy.getJobTitle() ) );
        append( sampleOut( 5, tommy.getSays() ) );
        append( '</ul>' );
        append( '<br>' );

        /*
         * Example Of Method #2 - using prototypal inheritance
         */

        /// create an instance of employee
        tommy2 = core.method2.fromPrototype( core.method2.employee, {
            name     : 'Tommy San',
            jobTitle : 'Top Cat',
            says     : 'Meow'
        } );

        /// output some useful information to the page
        append( '<h1>Sample output of Method #2 - using prototypal inheritance...</h1>' );
        append( '<ul>' );
        append( sampleOut( 0, tommy2.getName() ) ); // outputs Jeff Schwartz
        append( sampleOut( 1, tommy2.getJobTitle() ) ); // outputs Web Provocateur
        append( sampleOut( 2, tommy2.getSays() ) ); // outputs Web Provocateur
        tommy2.setName( 'Mister Tommy' );
        tommy2.setJobTitle( 'CIO' );
        tommy2.setSays( 'Yada Yada' );
        append( sampleOut( 3, tommy2.getName() ) );
        append( sampleOut( 4, tommy2.getJobTitle() ) );
        append( sampleOut( 5, tommy2.getSays() ) ); // outputs Web Provocateur
        append( '</ul>' );
        append( '<br>' );

        /*
         * Example of Method #3 - using compositional inheritance
         */

        /// create an instance of employee
        tommy3 = core.method3.createEmployee( {name : 'Tommy San', jobTitle : 'Top Cat', says : 'Meow'} );

        /// output some useful information to the page
        append( '<h1>Sample output of Method #3 - using compositional inheritance...</h1>' );
        append( '<ul>' );
        append( sampleOut( 0, tommy3.getName() ) ); // outputs Jeff Schwartz
        append( sampleOut( 1, tommy3.getJobTitle() ) ); // outputs Web Provocateur
        append( sampleOut( 2, tommy3.getSays() ) ); // outputs Web Provocateur
        tommy3.setName( 'Mister Tommy' );
        tommy3.setJobTitle( 'CIO' );
        tommy3.setSays( 'Yada Yada' );
        append( sampleOut( 3, tommy3.getName() ) );
        append( sampleOut( 4, tommy3.getJobTitle() ) );
        append( sampleOut( 5, tommy3.getSays() ) ); // outputs Web Provocateur
        append( '</ul>' );

    } );

} );
