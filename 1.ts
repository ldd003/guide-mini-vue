let s: string = "hello";

class User {
  constructor(
    name,
    public age?,
  ) {
    this.name = name;
  }
}

let u1 = new User("tom1", 12);
console.log(u1);
console.log(u1.name);
console.log(u1.age);
// console.log(User.age);
