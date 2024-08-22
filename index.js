#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.cyanBright(`\nWithdrawal of $${amount} Successfull..Remaining Balance is:$${this.balance}\n`));
        }
        else {
            console.log(chalk.redBright("Insufficient Balance..!"));
        }
    }
    // Credit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(chalk.green(`\nDeposit of $${amount} Successfull. Remaining Balance is $${this.balance}.\n`));
    }
    // Check Balance
    checkBalance() {
        console.log(chalk.yellowBright(`\nCurrent Balance: $${this.balance}.\n`));
    }
}
// Creating Customer Class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Creating Bank Accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
// Creating Customers
const Customers = [
    new Customer("Zaara", "Khan", "Female", 29, 132345678, accounts[0]),
    new Customer("Rabz", "Khan", "Female", 35, 162345678, accounts[1]),
    new Customer("Aira", "Khan", "Female", 20, 152345678, accounts[2])
];
// Function to interact with Bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: chalk.yellowBright("\nEnter Your Account Number:")
        });
        const customer = Customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.magenta(`\nWelcome, ${customer.firstName} ${customer.lastName}..!\n`));
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an Operation to perform",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.yellowBright("\nEnter the Amount to Deposit:")
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.yellowBright("\nEnter the Amount to Withdraw:")
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.red("\nExiting Bank Program...!"));
                    console.log(chalk.magentaBright("\n \tThank You For Using Our Bank Services.Have a Nice Day..!\n"));
                    return;
            }
        }
        else {
            console.log(chalk.red("\nInvalid Account Number."));
            console.log(chalk.cyan("\nCall Customer Service for Further Assistance."));
        }
    } while (true);
}
service();
