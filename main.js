// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

//initiate supplies
let machineState = {
    "waterSupply": 400,
    "milkSupply": 540,
    "coffeeBeanSupply": 120,
    "cupSupply": 9,
    "moneyBalance": 550
}

while (true) {
    //prompt command
    console.log("Write action (buy, fill, take, remaining, exit, destroy):");
    let action = input();
    console.log();
    //activate command
    if (action === "buy") {
        machineState = buyCoffee(machineState);
    } else if (action === "fill") {
        machineState = fillCoffee(machineState);
    } else if (action === "take") {
        machineState = takeMoney(machineState);
    } else if (action === "remaining") {
        reportMachineState(machineState);
    } else if (action === "exit") {
        break;
    } else if (action === "destroy") {
        let help = 1 / 0;
        console.log(help);
    } else {
        console.log("Invalid command");
    }
}

function reportMachineState (machineState) {
    console.log("The coffee machine has:");
    console.log(`${machineState.waterSupply} ml of water`);
    console.log(`${machineState.milkSupply} ml of milk`);
    console.log(`${machineState.coffeeBeanSupply} g of coffee beans`);
    console.log(`${machineState.cupSupply} disposable cups`);
    console.log(`$${machineState.moneyBalance} of money\n`);
}

function buyCoffee (machineState) {
    console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:");
    let espresso = {
        "water": 250,
        "beans": 16,
        "money": 4
    }
    let latte = {
        "water": 350,
        "milk": 75,
        "beans": 20,
        "money": 7
    }
    let cappuccino = {
        "water": 200,
        "milk": 100,
        "beans": 12,
        "money": 6
    }

    let coffeeChoice = input();

    if (coffeeChoice === "back") {
        return machineState;
    }

    coffeeChoice = Number(coffeeChoice);

    function reject(resource) {
        console.log(`Sorry, not enough ${resource}!`);
    }

    function accept() {
        console.log("I have enough resources, making you a coffee!\n");
    }

    if (coffeeChoice === 1) {
        if (machineState.waterSupply - espresso.water < 0) {
            reject("water");
            return machineState;
        } else if (machineState.coffeeBeanSupply - espresso.beans < 0) {
            reject("coffee beans");
            return machineState;
        } else {
            accept();
            machineState.cupSupply -= 1;
        }
        machineState.waterSupply -= espresso.water;
        machineState.coffeeBeanSupply -= espresso.beans;
        machineState.moneyBalance += espresso.money;
    } else if (coffeeChoice === 2) {
        if (machineState.waterSupply - latte.water < 0) {
            reject("water");
            return machineState;
        } else if (machineState.coffeeBeanSupply - latte.beans < 0) {
            reject("coffee beans");
            return machineState;
        } else if (machineState.milkSupply - latte.milk < 0) {
            reject("milk");
            return machineState
        } else {
            accept();
            machineState.cupSupply -= 1;
        }
        machineState.waterSupply -= latte.water
        machineState.milkSupply -= latte.milk
        machineState.coffeeBeanSupply -= latte.beans
        machineState.moneyBalance += latte.money
    } else if (coffeeChoice === 3) {
        if (machineState.waterSupply - cappuccino.water < 0) {
            reject("water");
            return machineState;
        } else if (machineState.coffeeBeanSupply - cappuccino.beans < 0) {
            reject("coffee beans");
            return machineState;
        } else if (machineState.milkSupply - cappuccino.milk < 0) {
            reject("milk");
            return machineState
        } else {
            accept();
            machineState.cupSupply -= 1;
        }
        machineState.waterSupply -= cappuccino.water
        machineState.milkSupply -= cappuccino.milk
        machineState.coffeeBeanSupply -= cappuccino.beans
        machineState.moneyBalance += cappuccino.money
    } else {
        console.log("Invalid coffee choice");
    }

    return machineState;
}

function fillCoffee(machineState) {
    console.log("Write how many ml of water you want to add:");
    machineState.waterSupply += Number(input());
    console.log("Write how many ml of milk you want to add:");
    machineState.milkSupply += Number(input());
    console.log("Write how many grams of coffee beans you want to add:");
    machineState.coffeeBeanSupply += Number(input());
    console.log("Write how many disposable coffee cups you want to add:");
    machineState.cupSupply += Number(input());

    return machineState;
}

function takeMoney(machineState) {
    console.log(`I gave you $${machineState.moneyBalance}`);
    machineState.moneyBalance = 0;
    return machineState;
}

