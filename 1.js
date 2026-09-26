"use strict";
let s = "hello";
class User {
    age;
    constructor(name, age) {
        this.age = age;
        this.name = name;
    }
}
let u1 = new User("tom1", 12);
console.log(u1);
console.log(u1.name);
console.log(u1.age);
// console.log(User.age);
