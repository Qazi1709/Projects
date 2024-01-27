import readlineSync from 'readline-sync'
import fs from "fs/promises"
import axios from 'axios'
import chalk from 'chalk'

async function createTask() {
    try {
        let token = await fs.readFile("token.txt")
        let tokenresponse= await axios.get("http://172.26.248.114:6004/api/task/auth",{
            headers:{
                'auth-token':token
            }
        })


        console.clear();
        console.log(chalk.green(`****************************************`))
        console.log(chalk.yellow("\tCreate Task"))
        console.log(chalk.green(`****************************************`))
        let taskName = readlineSync.question("Enter your Task Name :")
        if (!taskName) {
            taskName = readlineSync.question("Enter your Task Name :")
        }

        let taskDescription = readlineSync.question("Enter your Task Discription :")
        let response = await axios.post('http://172.26.248.114:6004/api/task/', {
            taskName: taskName,
            taskDescription: taskDescription,
        }, {
            headers: { 'auth-token': token }
        })
        console.log(response.data);

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            console.error(chalk.red(error.response.data.error));
        } else {
            console.error(error);
        }
    }
}
export default createTask