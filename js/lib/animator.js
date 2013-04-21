/**
 * Animator Core
 *
 * This software is used to create parallaxes, scroll stories, and scroll
 * based animations either horizontally or vertically.
 *
 * TimingEngines may change how animations are timed for instance this one
 * is based off scroll position as a percentage but could be mouse x along
 * a container. A duration, a queue of animations based on an event, just 
 * about anything you would like to animate with a definite start and stop.
 * 
 * The glue that contains the basis for how each and every component will
 * fit together to help solve the problem.
 *
 * Requires: jQuery, Underscore
 *
 * TODO: Convert modules to AMD format for require
 * TODO: Compile modules into 1 file with r.js
 *
 * Author: Jay Zawrotny <jayzawrotny@gmail.com>
 * Website: jayzawrotny.com
 * License: MIT License
 *
 * Copyright (c) 2013 Jay Zawrotny
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included 
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE 
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var Animator = (function ($, _) {

    var extend = $.extend;

    /**
     * Allocate a namespace
     * @param  {String} ns_string A string containing a tree of namespaces.
     *                            Example: 'Animator.modules.mediator'
     * @return {Object}           A clean object to be worked on.
     *
     * TODO: Use extends with submodules.
     */
    function publicNamespace( ns_string ) {
        var parts = ns_string.split("."),
            parent = Animator,
            pl;

        pl = parts.length;

        for ( var i = 0; i < pl; i++ ) {
            // create a property if it doesn't exist
            if ( typeof parent[parts[i]] === "undefined" ) {
                parent[parts[i]] = {};
            }

            parent = parent[parts[i]];
        }

        return parent;
    }

    return {
        extend: extend,
        namespace: publicNamespace
    };
}(jQuery, _));