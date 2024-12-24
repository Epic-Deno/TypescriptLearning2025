/*
 * @Description: TS基础学习
 * @Author: zhang zhen
 * @Date: 2024-12-23 10:39:12
 * @LastEditors: zhang zhen
 * @LastEditTime: 2024-12-24 17:23:41
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

// 3.1 抽象类 abstract class
abstract class Animal3 {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract run(): void;
}
class Dog3 extends Animal3 {
    run() {
        console.log(`${this.name} is running`);
    }
}

// 3.2 类实现接口 implements
interface Radio {
    switchRadio(): void;
}
interface Battery {
    checkBatteryStatus(): void;
}
class Car implements Radio {
    switchRadio() {
        console.log('switchRadio');
    }
}
// 接口可以多实现
class Cellphone implements Radio, Battery {
    switchRadio() {
        console.log('switchRadio');
    }
    checkBatteryStatus() {
        console.log('checkBatteryStatus');
    }
}

// 接口之前可以继承
interface RadioWithBattery extends Radio {
    checkBatteryStatus(): void;
}
class Cellphone2 implements RadioWithBattery {
    switchRadio() {
        console.log('switchRadio');
    }
    checkBatteryStatus() {
        console.log('checkBatteryStatus');
    }
}

// 3.3 枚举 enum

// 数字枚举
enum Direction {
    Up,
    Down,
    Left,
    Right
}
console.log(Direction.Up); // 0 直接访问
console.log(Direction[0]); // Up 下标访问

// 字符串枚举
enum Direction2 {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right'
}
console.log(Direction2.Up); // up 直接访问
console.log(Direction2['up']); // Up 下标访问

// 异构枚举
enum Direction3 {
    Up = 'up',
    Down = 1,
    Left,
    Right
}
console.log(Direction3.Up); // up 直接访问
console.log(Direction3[1]); // Down 下标访问

// 常量枚举
const enum Direction4 {
    Up = 'up',
    Down = 1,
    Left,
    Right
}
console.log(Direction4.Up); // up 直接访问
console.log(Direction4[1]); // Down 下标访问

// 3.4 泛型 generics
function createArray(length: number, value: any): Array<any> {
    return new Array(length).fill(value);
}
createArray(3, 'x'); // ['x', 'x', 'x']

// 用T来代表泛型'
function createArray2<T>(length: number, value: T): Array<T> {
    return new Array(length).fill(value);
}
createArray2(3, 'x'); // ['x', 'x', 'x']

// 多个泛型
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]

// 泛型约束
interface LengthWise {
    length: number;
}
function getLength5<T extends LengthWise>(target: T): number {
    return target.length;
}
getLength5('abc'); // 3
getLength5([1, 2, 3]); // 3
getLength5({ length: 3 }); // 3

// 类中使用泛型
class Queue<T> {
    private data = [];
    push(item: T) {
        return this.data.push(item);
    }
    pop(): T {
        return this.data.shift();
    }
}

// 接口中使用泛型‘
interface KeyPair<T, U> {
    key: T;
    value: U;
}
let kp1: KeyPair<number, string> = { key: 1, value: 'str' };
let kp2: KeyPair<string, string> = { key: 'str', value: 'str' };

// 数组中使用泛型
let arr4: number[] = [1, 2, 3];
let arr5: Array<number> = [1, 2, 3];
let arr6: Array<any> = [1, '2', true];

// 3.5 类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName6(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}

// 3.6 交叉类型
interface DogInterface {
    run(): void;
}
interface CatInterface {
    jump(): void;
}
let pet: DogInterface & CatInterface = {
    run() { },
    jump() { }
}

// 3.7 联合类型
let a: string | number = 'a';
let b: 'a' | 'b' | 'c';
let c: 1 | 2 | 3;