/*
 * main module
 *
 * Implements: sets up the page for resizing and handling benchmarks button clicks and
 * then runs 3 example - 1 each for pseudo classical, prototypal and composition and
 * outputs their results to the page
 * Dependencies: core, benchmakrs and jquery
 */
require( ['core', 'benchmarks', 'jquery'], function ( core, benchmarks, $ ) {

    "use strict";

    $( function () {

        var tommy, tommy2, tommy3,
            $runbtn = $( '#runbenchmarks' ),
            $status = $( '#status' ),
            $page = $( '#page' ),
            $generatingbenchmarks = $( '#generatingbenchmarks' ),
            $benchmarksavailable = $( '#benchmarksavailable' ),
            $sampleoutput = $( '#sampleoutput' ),
            $headercontainer = $( '#header_container' ),
            subjects = [
                'Employee Name: ',
                'Employee Title: ',
                'Employee Says: ',
                'Employee Name After Promotion: ',
                'Employee Title After Promotion: ',
                'Employee Says After Promotion: '
            ];

        /*
         * recalculate padding-top for page container when the window is resized
         */
        $( window ).resize( function () {
            setTimeout( function () {
                $page.css( 'padding-top', $headercontainer.outerHeight() );
            }, 100 );
        } );

        // trigger a window resize event to adjust the padding on the body container
        $( window ).resize();

        var sampleOut = function ( i, txt ) {
            return  '<li>' + subjects[i] + txt + '</li>';
        };

        /*
         * Example Of Method #1 - using pseudo classical inheritance
         */

        /// create an instance of employee
        tommy = new core.method1.Employee( 'Tommy San', 'Top Cat', 'Meow' );

        $sampleoutput.append( '<h1>Example Of Method #1 - using pseudo classical inheritance...</h1>' );
        $sampleoutput.append( '<ul>' );
        $sampleoutput.append( sampleOut( 0, tommy.getName() ) );
        $sampleoutput.append( sampleOut( 1, tommy.getJobTitle() ) );
        $sampleoutput.append( sampleOut( 2, tommy.getSays() ) );
        tommy.setName( 'Mister Tommy' );
        tommy.setJobTitle( 'CIO' );
        tommy.setSays( 'Yada Yada' );
        $sampleoutput.append( sampleOut( 3, tommy.getName() ) );
        $sampleoutput.append( sampleOut( 4, tommy.getJobTitle() ) );
        $sampleoutput.append( sampleOut( 5, tommy.getSays() ) );
        $sampleoutput.append( '</ul>' );
        $sampleoutput.append( '<br>' );

        /*
         * Example Of Method #2 - using prototypal inheritance
         */

        /// create an instance of employee
        tommy2 = core.method2.fromPrototype( core.method2.employee, {
            name     : 'Tommy San',
            jobTitle : 'Top Cat',
            says     : 'Meow'
        } );

        $sampleoutput.append( '<h1>Example Of Method #2 - using prototypal inheritance...</h1>' );
        $sampleoutput.append( '<ul>' );
        $sampleoutput.append( sampleOut( 0, tommy2.getName() ) ); // outputs Jeff Schwartz
        $sampleoutput.append( sampleOut( 1, tommy2.getJobTitle() ) ); // outputs Web Provocateur
        $sampleoutput.append( sampleOut( 2, tommy2.getSays() ) ); // outputs Web Provocateur
        tommy2.setName( 'Mister Tommy' );
        tommy2.setJobTitle( 'CIO' );
        tommy2.setSays( 'Yada Yada' );
        $sampleoutput.append( sampleOut( 3, tommy2.getName() ) );
        $sampleoutput.append( sampleOut( 4, tommy2.getJobTitle() ) );
        $sampleoutput.append( sampleOut( 5, tommy2.getSays() ) ); // outputs Web Provocateur
        $sampleoutput.append( '</ul>' );
        $sampleoutput.append( '<br>' );

        /*
         * Example of Method #3 - using compositional inheritance
         */

        /// create an instance of employee
        tommy3 = core.method3.createEmployee( {name : 'Tommy San', jobTitle : 'Top Cat', says : 'Meow'} );

        $sampleoutput.append( '<h1>Example of Method #3 - using compositional inheritance...</h1>' );
        $sampleoutput.append( '<ul>' );
        $sampleoutput.append( sampleOut( 0, tommy3.getName() ) ); // outputs Jeff Schwartz
        $sampleoutput.append( sampleOut( 1, tommy3.getJobTitle() ) ); // outputs Web Provocateur
        $sampleoutput.append( sampleOut( 2, tommy3.getSays() ) ); // outputs Web Provocateur
        tommy3.setName( 'Mister Tommy' );
        tommy3.setJobTitle( 'CIO' );
        tommy3.setSays( 'Yada Yada' );
        $sampleoutput.append( sampleOut( 3, tommy3.getName() ) );
        $sampleoutput.append( sampleOut( 4, tommy3.getJobTitle() ) );
        $sampleoutput.append( sampleOut( 5, tommy3.getSays() ) ); // outputs Web Provocateur
        $sampleoutput.append( '</ul>' );

        /// show results available status
        $runbtn.click( function () {

            var promise,
                that = this;

            $( this ).attr( 'disabled', 'disabled' );
            $status.html( '' );
            $page.addClass( 'showProgressCursor' );
            $( this ).addClass( 'showProgressCursor' );
            $benchmarksavailable.addClass( 'hidden' );
            $generatingbenchmarks.removeClass( 'hidden' );
            promise = benchmarks.run();
            promise.done( function () {

                $page.removeClass( 'showProgressCursor' );
                $( that ).removeClass( 'showProgressCursor' );
                $( that ).removeAttr( 'disabled' );
                $generatingbenchmarks.addClass( 'hidden' );
                $benchmarksavailable.removeClass( 'hidden' );

            } );

        } );

    } );

} );
