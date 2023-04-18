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


const displayMovments = function(movements) {
    containerMovements.innerHTML = ''
    movements.forEach(function(mov, i) {
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