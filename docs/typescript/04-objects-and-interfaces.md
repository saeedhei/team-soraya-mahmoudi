# Functions in TypeScript
   TypeScript allows you to add types to function parameters and return values for better safety and readability.

1. Typed Parameters and Return Type
     If you forget to return a number, TypeScript will throw an error.
     -----------------------------------
     function add(a: number, b: number): number {
        return a + b;
       }

2. Optional Parameters
    Use ? to make parameters optional.
    -----------------------------------
    function greet(name?: string): string {
        return name ? `Hello, ${name}` : "Hello!";
       }

3. Default Parameters
    You can assign default values to parameters.
    -----------------------------------
    function greet(name: string = "Guest"):    string {
         return `Hello, ${name}`;
       }

4. Named Functions vs Arrow Functions
    Both can have types:
    -----------------------------------
    // Named function
     function multiply(x: number, y: number):  number {
        return x * y;
     }

    // Arrow function
      const divide = (x: number, y: number): number => x / y;

5. Function Types
    You can define function types explicitly:
    -----------------------------------
    let calculator: (a: number, b: number) => number;
    calculator = (a, b) => a + b;

6. Rest Parameters
    Use ... to accept multiple arguments:
    -----------------------------------
    function sum(...numbers: number[]): number {
       return numbers.reduce((total, num) => total + num, 0);
      }

Conclusion
    Adding types to functions improves code quality, reduces bugs, and gives you better autocomplete and documentation in your editor.