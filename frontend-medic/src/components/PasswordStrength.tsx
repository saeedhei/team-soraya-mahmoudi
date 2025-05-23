import React from "react";

interface PasswordStrengthProps{
    password:string;
}

const PasswordStrength= ({password}: PasswordStrengthProps)=>{
    const tests= [
        { regex: /.{6,}/, label: "At least 6 characters" },
        { regex: /[A-Z]/, label: "Uppercase letter" },
        { regex: /[0-9]/, label: "Number" },
        { regex: /[!@#$%^&*]/, label: "Special character" },
    ];
    const passedCount= tests.reduce(
        (count, test) => (test.regex.test(password) ? count + 1 : count),
    0
    );

    const getColor=(index:number)=>{
        if (passedCount >= tests.length) return "bg-green-500";
        if (passedCount >= index + 1) return "bg-yellow-400";
        return "bg-red-500";
    };

    return(
        <div className="flex space-x-2 mt-2">
      {tests.map((test, index) => (
        <div
          key={index}
          className={`w-6 h-6 rounded ${getColor(index)}`}
          title={test.label}
        ></div>
      ))}
      </div>
    )
}

export default PasswordStrength;