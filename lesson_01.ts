/*
 * @Description: TS基础学习
 * @Author: zhang zhen
 * @Date: 2024-12-23 10:39:12
 * @LastEditors: zhang zhen
 * @LastEditTime: 2024-12-23 11:06:30
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