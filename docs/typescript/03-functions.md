# Type Inference in TypeScript
   TypeScript can automatically **infer** the type of a variable based on its value.

1. Basic Inference
    When you declare a variable and assign a value, TypeScript infers the type.
    -----------------------------------
    let name = "Alice"; // inferred as string
    let age = 30;       // inferred as number
    let isOnline = true; // inferred as boolean

2. Function Return Types
    TypeScript can also infer return types from functions:
    -----------------------------------
    function greet(name: string) {
        return `Hello, ${name}`;
      }
    // inferred return type: string

   ***You can still specify the return type if you want:
   -----------------------------------
   function greet(name: string): string {
      return `Hello, ${name}`;
    }

3. Contextual Typing
    TypeScript infers types based on context, especially in event handlers or callbacks:
    -----------------------------------
    window.addEventListener("click", (event) => {
        console.log(event.clientX); // event inferred as MouseEvent
      });

4. Best Practice
     Rely on inference when it makes code cleaner and avoid using any. Add types when:

       It improves clarity
       The type isn't obvious
       You're building reusable APIs

Conclusion
TypeScript's type inference reduces the need for manual annotations while still keeping your code type-safe.