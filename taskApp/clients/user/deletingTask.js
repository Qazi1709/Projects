import readlineSync from 'readline-sync'
import fs from "fs/promises"
import axios from 'axios'
import chalk from 'chalk'



async function deleteTask() {
    try {
        let token = await fs.readFile("token.txt")
        let tokenresponse= await axios.get("http://172.26.248.114:6004/api/task/auth",{
            headers:{
                'auth-token':token
            }
        })

        console.clear();
        console.log(chalk.green(`****************************************`))
        console.log(chalk.yellow("\tDelete Task"))
        console.log(chalk.green(`****************************************`))
        let taskId = readlineSync.question("Enter Task ID :")
        while (!taskId) {
            taskId = readlineSync.question("Enter Task ID :")
        }

        let response = await axios.delete("http://172.26.248.114:6004/api/task/", {
            data: {
                taskId: taskId
            },
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
export default deleteTask