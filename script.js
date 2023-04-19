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


const displayMovments = function(movements, sort = false) {
    containerMovements.innerHTML = ''

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

    movs.forEach(function(mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal'

        const html = `
        <div class="movements">
        <div class="movements__row">
            <div class="movements__type--${type} movements__type--deposit">${i+1} ${type}</div>
            <div class="movements__value">${mov}</div>
        </div>
    `
        containerMovements.insertAdjacentHTML('afterbegin', html)
    })
}


const calcDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
    labelBalance.textContent = `${acc.balance}€ `
}

const calcDisplaySummary = function(acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0)
    labelSumIn.textContent = `${incomes}€ `

    const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
    labelSumOut.textContent = `${Math.abs(out)}€`

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            // console.log(arr)
            return int >= 1
        })
        .reduce((acc, int) => acc + int, 0)
    labelSumInterest.textContent = `${interest}€ `

}

//* Cumputing UserNames
const createUsernames = function(accs) {
    accs.forEach(function(acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};
createUsernames(accounts);

const updateUI = function(acc) {
    // Display movments
    displayMovments(acc.movements)
        // Display balance
    calcDisplayBalance(acc)
        // Display summary
    calcDisplaySummary(acc)
}


//* Implementing Login
//Event handlers
let currentAccount;
btnLogin.addEventListener('click', function(e) {
    // Prevent form from submitting
    e.preventDefault()

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
    console.log(currentAccount)

    if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = 100
            // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur()
            // Update UI
        updateUI(currentAccount)
    }
})

btnTransfer.addEventListener('click', function(e) {
    e.preventDefault()
    const amount = Number(inputTransferAmount.value)
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
    inputTransferAmount.value = inputTransferTo.value = ''


    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc.username !== currentAccount.username) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        // Update UI
        updateUI(currentAccount)
    }
})

btnLoan.addEventListener('click', function(e) {
    e.preventDefault()

    const amount = Number(inputLoanAmount.value)

    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        //Add movement
        currentAccount.movements.push(amount)

        // Update UI
        updateUI(currentAccount)
    }
    inputLoanAmount.value = ''
})


//* The FindIndex method
btnClose.addEventListener('click', function(e) {
    e.preventDefault()

    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username)
        console.log(index)

        // Delete account 
        accounts.splice(index, 1)

        // Hide UI 
        containerApp.style.opacity = 0

    } else {
        console.log('not correct')
    }
    inputCloseUsername.value = inputClosePin.value = ''
})

let sorted = false
btnSort.addEventListener('click', function(e) {
    e.preventDefault()
    displayMovments(currentAccount.movements, !sorted)
    sorted = !sorted
})

/*
//* Challenge #1
const juliaData = [3, 5, 2, 12, 7]
const kateData = [4, 1, 15, 8, 3]

const checkDogs = function() {
    const juliaCorrect = juliaData.slice(1, -2)
    const kate = kateData
    const allDogs = juliaCorrect.concat(kate)
    console.log(allDogs)

    allDogs.forEach(function(dogs, index) {
        if (dogs >= 3) {
            console.log(`Dog number ${index + 1} is an adult and is ${dogs} years old`)
        } else {
            console.log(`Dog number ${index +1} is still a puppy`)
        }
    })
}
checkDogs()
*/

// movements.forEach(function(movement, index, array) {
//     if (movement > 0) {
//         console.log(`Movment${index + 1}: You deposited ${movement}`)
//     } else {
//         console.log(`Movment${index + 1}: You withdraw ${Math.abs(movement)}`)
//     }
// })

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


/*
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
*/


//* Data Transformation: map, filter, reduce.
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
//* The Map method
const eurToUsd = 1.1

// const movmentsUSD = movements.map(function(mov) {
//     return Math.trunc(mov * eurToUsd)
// })
console.log(movements)
    // console.log(movmentsUSD)

const movmentsUSDfor = movements.map(mov => mov * eurToUsd)
console.log(movmentsUSDfor)

const movmentsDescriptions = movements.map((mov, i, arr) =>
    `Movment ${i + 1}: You ${mov > 0 ? 'deposited': 'withdraw'} ${Math.abs(mov)}`

    // ⬆️ // the function below is the same function as the function above.
    // if (mov > 0) {
    //     return `Movment${i + 1}: You deposited ${mov}`
    // } else {
    //     return `Movment${i + 1}: You withdraw ${Math.abs(mov)}`
    // }
)
console.log(movmentsDescriptions)
*/

/*
//* The Filter method
const deposits = movements.filter(function(mov) {
    return mov > 0;
})
console.log(movements)
console.log(deposits)
    // ⬆️ // the function below is the same function as the function above.
const depositsFor = []
for (const mov of movements)
    if (mov > 0) {
        depositsFor.push(mov)
    }
console.log(depositsFor)

//* mini-challenge
const withdrawl = movements.filter(function(mov) {
    return mov < 0
})
console.log(withdrawl)
    // ⬆️ // the function below is the same function as the function above. // ARROW FUNCTION
const withdrawls = movements.filter(mov => mov < 0)
console.log(withdrawls)
*/

/*
//* The Reduce method
//* The reduce() method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

console.log(movements)
    // accumulator -> SNOWBALL

const balance = movements.reduce(function(acc, cur, i, arr) {
    console.log(`Iteration ${i}: ${acc}`)
    return acc + cur
}, 0)
console.log(balance)

const balance = movements.reduce((acc, cur) => acc + cur, 0)
console.log(balance)

let balance2 = 0
for (const mov of movements) balance2 += mov;
console.log(balance2)

//Maximum value
const max = movements.reduce((acc, mov) => {
    if (acc > mov) {
        return acc
    } else
        return mov
}, movements[0])
console.log(max)
*/
/*
//* Challeng2 #2
const calcAverageHumanAge = function(ages) {
    const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
    const adults = humanAges.filter(age => age >= 18);
    const average = adults.reduce((acc, age) => acc + age, 0) / adults.length
    return average;
}
const average1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
const average2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
console.log(average1, average2)
*/

/*
//* The Magic of Chaining Methods
// PIPELINE 
const eurToUsd = 1.1
console.log(movements)
const totalDepositsUSD = movements.filter(mov => mov > 0)
    .map((mov, i, arr) => {
        // console.log(arr)
        return mov * eurToUsd
    })
    // .map(mov => mov * eurToUsd)
    .reduce((acc, mov) => acc + mov, 0)
console.log(totalDepositsUSD)
*/
/*
//* Challenge #3
const calcAverageHumanAge = ages =>
    ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0)

const average1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
const average2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
console.log(average1, average2)
*/

/*
//* The Find Method
const firstWithdrawal = movements.find(mov => mov < 0)
console.log(movements)
console.log(firstWithdrawal)

console.log(accounts)

const account = accounts.find(acc => acc.owner === 'Jessica Davis')
console.log(account)
*/

/*
//* Some and Every
console.log(movements)

// EQUALITY     
console.log(movements.includes(-130))

// SOME: CONDITION
console.log(movements.some(mov => mov === -130))

const anyDeposits = movements.some(mov => mov > 1500)
console.log(anyDeposits)

// EVERY
console.log(movements.every(mov => mov > 0))
console.log(account4.movements.every(mov => mov > 0))

// Separate callback
const deposit = mov => mov > 0
console.log(movements.some(deposit))
console.log(movements.every(deposit))
console.log(movements.filter(deposit))
*/

/*
//* Flat and FlatMap
// The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
const arr = [
    [1, 2, 3],
    [4, 5, 6], 7, 8
]
console.log(arr.flat()) // 1 level deep


const arrDeep = [
    [
        [1, 2], 3
    ],
    [4, [5, 6]], 7, 8
]
console.log(arrDeep.flat(2)) // 2 level deep

// const accountMovements = accounts.map(acc => acc.movements)
// console.log(accountMovements)

// const allMovements = accountMovements.flat()
// console.log(allMovements)

// const overallBalacne = allMovements.reduce((acc, mov) => acc + mov, 0)

const overallBalacne = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0)
console.log(overallBalacne)

The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level
const overallBalacne2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0)
console.log(overallBalacne2)
*/

/*
//* Sorting Arrays
// The sort() method sorts the elements of an array in place and returns the reference to the same array, now sorted.

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha']
console.log(owners.sort())
console.log(owners)

// Numbers
console.log(movements)

// return < 0, A,B (keep order)
// return > 0, B,A (switch order)

// Ascending 
// movements.sort((a, b) => {
//     if (a > b)
//         return 1;
//     if (a < b)
//         return -1
// })
movements.sort((a, b) => a - b)
console.log(movements)

// Descending
// movements.sort((a, b) => {
//     if (a > b)
//         return -1;
//     if (a < b)
//         return 1
// })
movements.sort((a, b) => b - a)
console.log(movements)
*/

/*
//* More Ways of Creating and Filling Arrays
const arr = [1, 2, 3, 4, 5, 6, 7]
console.log(new Array(1, 2, 3, 4, 5, 6, 7))

// Empty arrays + fill method 
const x = new Array(7)
console.log(x)
    // console.log((x.map(() => 5)))
x.fill(1, 3, 5)
x.fill(1)
console.log(x)

arr.fill(23, 2, 6)
console.log(arr)

// Array.from
const y = Array.from({ length: 7 }, () => 1)
console.log(y)

const z = Array.from({ length: 7 }, (_, i) => i + 1)
console.log(z)


//* challenge
// const dice = Array.from({ length: 100 }, (_, i) => Math.trunc(Math.random(i) * 100))
// console.log(dice)



labelBalance.addEventListener('click', function() {
    const movementsUI = Array.from(
        document.querySelectorAll('.movements__value'),
        el => Number(el.textContent.replace('€', ''))
    )
    console.log(movementsUI)
})
*/

//* Array Methods Practice

// 1.
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((acc, i, arr) => acc + i, 0)
console.log('1.', bankDepositSum)

//2.
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(acc => acc >= 1000).length
// console.log(numDeposits1000)

const numDeposits1000 = accounts.flatMap(acc => acc.movements)
    // .reduce((count, cur) => cur >= 1000 ? count + 1 : count, 0)
    .reduce((count, cur) => cur >= 1000 ? ++count : count, 0)
console.log('2.', numDeposits1000)

// Prefixed ++ operator
let a = 10
console.log(++a)
console.log(a)

// 3.
const { deposits, withdrawals } = accounts
    .flatMap(acc => acc.movements)
    .reduce((sums, cur) => {
        // cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
        sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur
        return sums
    }, { deposits: 0, withdrawals: 0 })
console.log('3.', deposits, withdrawals)

// 4. 
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function(title) {
    const capitalize = str => str[0].toUpperCase() + str.slice(1)

    const exceptions = ['a', 'an', 'but', 'or', 'and', 'on', 'in', 'with']
    const titleCase = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitalize(word)).join(' ')
    return capitalize(titleCase)
}
console.log(convertTitleCase('this is a nice title'))
console.log(convertTitleCase('this is a LONG title but not too long'))
console.log(convertTitleCase('and here is another title with an EXAMPLE'))

//* Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:

GOOD LUCK 😀
*/
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
];

//1.
const dogRecFood = dogs.forEach(dog => (dog.recFood = dog.weight ** 0.75 * 28))
console.log(dogs)

//2.
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'))
if (sarahDog.curFood > dogRecFood) {
    console.log('The dog is eating too much')
} else {
    console.log('The dog is eating too little')
}
console.log(sarahDog)


//3.
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners)
console.log(ownersEatTooMuch)

const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners)
console.log(ownersEatTooLittle)

//4.
// "Matilda and Alice and Bob's dogs eat too much!"
//  and 
//  "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`)
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`)

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood))

//6.
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = dog =>
    dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.
// sort it by recommended food portion in an ascending order [1,2,3]
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);