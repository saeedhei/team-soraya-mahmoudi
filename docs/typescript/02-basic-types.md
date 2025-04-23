# Basic Types in TypeScript
   TypeScript adds type annotations to JavaScript. Here are the basic types you'll use in TypeScript.

1. string
    sed for text values.
    -----------------------------------
    let name: string = "Alice";

2. number
    Used for all numeric values, including integers and floating point numbers.
    -----------------------------------
    let age: number = 25;
    let price: number = 19.99;

3. boolean
    Used for true/false values.
    -----------------------------------
    let isActive: boolean = true;

4. array
    Used for arrays. You can specify the type of elements in the array.
    -----------------------------------
    let numbers: number[] = [1, 2, 3];
    let names: string[] = ["Alice", "Bob"];

  ***Alternatively, you can use the Array    generic type:
    -----------------------------------
    let numbers: Array<number> = [1, 2, 3];

5. tuple
    A fixed-length array with different types.
    -----------------------------------
    let person: [string, number] = ["Alice", 25];

6. any
    A fallback type that allows any value. Use sparingly.
    -----------------------------------
    let unknown: any = "Hello";
    unknown = 42;
    unknown = true;

7. void
    Used for functions that don't return a value
    -----------------------------------
    function logMessage(message: string): void {
       console.log(message);
     }

8. null and undefined
    null and undefined are types themselves, often used for uninitialized variables.
    -----------------------------------
    let value: null = null;
    let notDefined: undefined = undefined;

9. never
    Represents values that never occur (e.g., a function that always throws an error).
    -----------------------------------
    function throwError(message: string): never {
       throw new Error(message);
     }

     
Conclusion
  TypeScript's basic types help ensure variables are used correctly, reducing runtime errors by enforcing type checks during compile time.

