See **ES6** branch for ES6 syntax and **ES5** branch for ES5 syntax.

## Problem

How to stub a function to hard code the response from the function and spy on the arguments passed to the function.

**Example**

ES5

	foo: (value) => {
		return 'bar';
	}


ES6

	class Foo {
		bar(value) {
			return 'bar';
		}
	}


In the test I want to return *'something else'* and confirm value.
