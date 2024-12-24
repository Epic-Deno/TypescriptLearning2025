/*
 * @Description: TS基础学习
 * @Author: zhang zhen
 * @Date: 2024-12-23 10:39:12
 * @LastEditors: zhang zhen
 * @LastEditTime: 2024-12-24 17:05:21
 * @FilePath: /TypescriptLearning2025/lesson_01.ts
 */


// 1. 原始数据类型

// 1.1 字符串 string
let myName: string = 'Pony zhang';

// 1.2 数字 number
let myAge: number = 18;

// 1.3 布尔 boolean
let isYoung: boolean = false;

// 1.4 undefined
let flag: undefined = undefined;

// 1.5 null
let timer: null = null; // this is nouse

// 1.6 空 void
function getName(str: string): void {
    console.log(str);
};

// 1.7 任意类型 any
let Pony: any;
Pony = 'dad';
Pony = 18;
Pony = () => {
    console.log('Pony');
}
Pony = {};
Pony = [];

// 1.8 never类型
function error(message: string): never {
    throw new Error(message);
}
// 1.9 推断的返回值类型为never
function fail() {
    return error('Something failed');
}
// 1.10 字面量
let dog: 'pet' | 'family';
dog = 'pet';
dog = 'family';
// dog = 'other'; // error

// 2. 复杂类型

// 2.1 数组
let arr: number[] = [1, 2, 3]; // if you want to use generic type, you can use Array<number>, when you want to use tuple, you can use [number, string]
let arr2: Array<number> = [1, 2, 3]; // generic type

// 2.2 元组 tuple
let arr3: [number, string] = [1, '2']; // tuple

// 2.3 接口 interface
interface Person {
    name: string;
    age: number;
    gender: string;
}

let lilei: Person = {
    name: 'lilei',
    age: 18,
    gender: 'man'
}

// 属性可选
interface Person2 {
    name: string;
    age?: number;
}

let hanmeimei: Person2 = {
    name: 'hanmeimei'
    // in this case, age is optional, you can not write age
};

// 只读
interface Person3 {
    readonly id: number;
    name: string;
}

let wubing: Person3 = {
    id: 1,
    name: 'wubing'
}
// wubing.id = 2; // error, when you want to change the value of id, you will get an error

// 2.4 类 class
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    run() {
        return `${this.name} is running`;
    }
}

// 2.5 函数 function
function greet(name: string): string {
    return `hello ${name}`;
}

greet('Pony'); // hello Pony
// greet(1); // error, you can not pass a number to greet function
// greet('pony', 1); // error, you can not pass two parameters to greet function

// 多个参数可选时候
function greet2(name: string, age?: number): string {
    return `hello ${name}`;
}
greet2('Pony'); // hello Pony
greet2('Pony', 18); // hello Pony

// 定义函数类型
const sum = (num1: number, num2: number): number => {
    return num1 + num2;
}
let mySum: (num1: number, num2: number) => number = sum;
// 采用type定义函数类型
type ISum = (num1: number, num2: number) => number;
let mySum2: ISum = sum;

// 2.6 联合类型 union type
let haha: string | number;
haha = 'haha';
haha = 18;
// haha = true; // error, you can not pass a boolean to haha

// 在没有赋值之前只能通过访问共同的属性和方法
let haha2: string | number;
// console.log(haha2.toString()); // error, you can not use toString method
// haha2.length // error, you can not use length property
haha2.valueOf(); // you can use valueOf method

// 2.7 对象类型 object
let personA: { name: string, age: number } = { name: 'Pony', age: 18 };
// personA = {name: 'Pony'}; // error, you must pass age property

// 2.8 断言 
// 我们就用 as 来进行断言
function getLength(target: string | number): number {
    const targetStr = target as string;
    return targetStr.length; // (<string>target).length is equal to (target as string).length
}
// 另一种写法是<类型>两者都一样
function getLength2(target: string | number): number {
    const targetStr = <string>target;
    return targetStr.length;
}
// 当你明确的知道一个联合类型的变量是一个共有的属性或方法时
function getLength3(target: string | number): number {
    if ((<string>target).length) {
        return (<string>target).length;
    } else {
        return target.toString().length;
    }
}

// 2.9 类型守卫 type guard
function getLength4(target: string | number): number {
    if (typeof target === 'string') {
        return target.length;
    } else {
        return target.toString().length;
    }
}
// instanceof
class Dog {
    wang() {
        console.log('wang');
    }
}
class Cat {
    miao() {
        console.log('miao');
    }
}
function getPet(pet: Dog | Cat) {
    if (pet instanceof Dog) {
        pet.wang();
    }
    if (pet instanceof Cat) {
        pet.miao();
    }
}


// 3.0 类 class
class Animal2 {
    name: string;
    private age: number;
    protected weight: number;
    constructor(name: string) {
        this.name = name;
    }
    run() {
        return `${this.name} is running`;
    }
}
class Dog2 extends Animal2 {
    private age2: string;
    private weight2: number;
    constructor(name: string) {
        super(name);
        this.weight2 = super.weight; // you can access weight property
        console.log(this.name, this.age2); // you can access name property
        // this.age2 = super.age; // error, you can not access age property
    }
    bark() {
        return `${this.name} is barking`;
    }
}

