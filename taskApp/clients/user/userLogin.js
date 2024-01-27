import readlineSync from "readline-sync";
import createTask from "./addingTask.js";
import updateTask from "./updatingTask.js";
import deleteTask from "./deletingTask.js";
import viewTasks from "./readingTask.js";
import fs from "fs/promises"
import axios from "axios";
import chalk from "chalk";

async function userLogin() {
    try {
        console.clear();
        console.log(chalk.green(`****************************************`))
        console.log(chalk.yellow("\tWelcome to Login"))
        console.log(chalk.green(`****************************************`))

        let email = readlineSync.question('Enter your E-mail :')
        while (!email) {
            email = readlineSync.question('Enter your E-mail :');
        }
        let password = readlineSync.question('Enter your Password :', {
            hideEchoBack: true,
        })
        while (!password) {
            password = readlineSync.question('Enter your Password :', {
                hideEchoBack: true,
            })
        }

        let userData = { email, password }
        console.log(userData);
        let response = await axios.post('http://172.26.248.114:6004/api/user/login', userData);
        console.log(response.data);
        console.log("User Logged in Successfully")
        await fs.writeFile('token.txt', response.data.token);
        await CRUDoperations()



    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            console.error(chalk.red(error.response.data.error));
        } else {
            console.error(error);
        }
    }
}

async function CRUDoperations() {

    try {

        console.clear();
        console.log(chalk.green("***********************************"));
        console.log(chalk.yellow("\t CRUD Operations"));
        console.log(chalk.green("***********************************"));
        console.log(`
        Press 1 to Create Task
        Press 2 to Update Task
        Press 3 to Delete a Task
        Press 4 to View Tasks
        press 5 to Log Out
        Press 0 to Exit
        `)
        let option = readlineSync.questionInt("Please Enter your Choice : ");
        switch (option) {
            case 0:
                return console.log(chalk.red("EXIT"));
            case 1:
                await createTask();
                break;
            case 2:
                await updateTask();
                break;
            case 3:
                await deleteTask();
                break;
            case 4:
                await viewTasks();
                break;
            case 5:
                fs.unlink("token.txt");
                console.log(chalk.yellow("Logged Out Successfully"));
            default:
                console.log(chalk.red("Invalid Option"));
        }
        let shouldContinue = readlineSync.question(chalk.blue
            ("Do you want to continue ? (Y/n) : ")
        );
        if (
            shouldContinue === "y" ||
            shouldContinue === "Y" ||
            shouldContinue === "yes"
        ) {
            await CRUDoperations();
        } else {
            console.log(chalk.green("Returning to Main Menu!"))
        }
    } catch (error) {
        return res.status(401).json({ error: `Unauthorized Access` })
    }
}
export default userLogin