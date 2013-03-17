Benchmarking Browser Object Creation In Chrome, Firefox and Safari
==================================================================
JavaScript (ES5) can accommodate constructing objects and object hierarchies using pseudo classical, prototypal and composition/modular. I’ve often wondered what the ramifications are in terms of browser performance and resources these methods have. In order to find out, I created a simple hierarchy consisting of a person and an employee with person being at the root of the hierarchy and employee inheriting from person. I then modeled this hierarchy using each of the 3 methods, ran each of the methods through a benchmark that consisted of creating 1,000,000 object instances and recorded the time to completion.

[Read the full article here(http://adoseofjavascript.wordpress.com/2013/02/28/object-creation-not-all-browsers-are-created-equal/]

