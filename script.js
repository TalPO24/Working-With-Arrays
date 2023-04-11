'use strict';


//* BANKIST APP

//* Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//* Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


/*
//* Simple array methods
let arr = ['a', 'b', 'c', 'd', 'e']

// SLICE
//* The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.
console.log(arr.slice(2)) // The third element in the array.
console.log(arr.slice(2, 4))
console.log(arr.slice(-2))
console.log(arr.slice(-1)) // The last element in the array.
console.log(arr.slice(1, -2))
console.log(arr.slice()) // 1) The same exact array (['a', 'b', 'c', 'd', 'e'])
console.log([...arr]) // 2) The same exact array (['a', 'b', 'c', 'd', 'e'])

// SPLICE
//* The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements
// console.log(arr.splice(2))
arr.splice(-1)
arr.splice(1, 2)
console.log(arr)

// REVERSE
//* The reverse() method reverses an array in place and returns the reference to the same array, the first array element now becoming the last, and the last array element becoming the first. In other words, elements order in the array will be turned towards the direction opposite to that previously stated.
arr = ['a', 'b', 'c', 'd', 'e']
const arr2 = ['j', 'i', 'h', 'g', 'f']
console.log(arr2.reverse())
console.log(arr2)

// CONCAT
//* The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
const letters = arr.concat(arr2)
console.log(letters)

console.log([...arr, ...arr2]) // this gives us the exact same result and it also does not mutate any of the involved arrays.

// JOIN
//* The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator
console.log(letters.join('-'))
*/

/*
//* The new at method
//* The at() method takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.
const arr = [23, 11, 64]
console.log(arr[0])
console.log(arr.at(0))

console.log(arr.at(-1))

console.log('jonas'.at(0))
console.log('jonas'.at(-1))
*/

/*
//* Looping Arrays: forEach
//* The forEach() method executes a provided function once for each array element.
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
    if (movement > 0) {
        console.log(`You deposited ${movement}`)
    } else {
        console.log(`You withdraw ${Math.abs(movement)}`) // The Math.abs() static method returns the absolute value of a number.
    }
}


console.log('----- forEach -----')
movements.forEach(function(movement, index, array) {
    if (movement > 0) {
        console.log(`Movment${index + 1}: You deposited ${movement}`)
    } else {
        console.log(`Movment${index + 1}: You withdraw ${Math.abs(movement)}`)
    }
})
*/

//* forEach With Maps and Sets

//* MAP
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map) {
    console.log(`${key}: ${value}`)
})

//* SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR'])
console.log(currenciesUnique)
currenciesUnique.forEach(function(value, _, map) {
    console.log(`${value}: ${value}`)
})