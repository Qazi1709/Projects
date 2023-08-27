import readlineSync from "readline-sync";
import userRegistration from "./user/userRegistration.js";
import userLogin from "./user/userLogin.js";
import chalk from "chalk";


async function displayMenu() {
    try {
        console.clear();
        console.log(chalk.green("***********************************"));
        console.log(chalk.yellow(`\t Our TODO CLI APP`));
        console.log(chalk.green("***********************************"));
        console.log(` 
        Press 1 to Create User
        Press 2 to Login
        Press 0 to Exit
        `);

        let option = readlineSync.questionInt("\nPlease Enter your Choice:")
        switch (option) {
            case 0:
                return console.log(chalk.red('Exit'));
            case 1:
                await userRegistration()
                break;
            case 2:
                await userLogin();
                break;

            default:
                console.log(chalk.red("Invalid Opiton"));
        }
        let shouldContinue = readlineSync.question(
            "Do you want to continue ? (y/n): "
        );
        if (shouldContinue === "Y" || shouldContinue === "y" || shouldContinue === "yes") {
            displayMenu();
        } else {
            console.log(chalk.yellow("Thank you for Using, Bye!"));

        }
    } catch (error) {
        console.error(error);
    }
}
displayMenu();
