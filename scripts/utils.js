define( function () {

    "use strict";

    var utils = {};

    /*
     * fail proof validation that a value is a number
     */
    utils.isNumber = function ( n ) {

        return !isNaN( parseFloat( n ) ) && isFinite( n );

    };

    return utils;

} );
