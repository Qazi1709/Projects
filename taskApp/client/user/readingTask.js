import fs from "fs/promises"
import axios from 'axios'
import chalk from 'chalk'




async function viewTasks() {
    try {
        let token = await fs.readFile("token.txt")
        let tokenresponse= await axios.get("http://172.26.248.114:6004/api/task/auth",{
            headers:{
                'auth-token':token
            }
        })
        
        console.clear();
        console.log(chalk.green(`****************************************`))
        console.log(chalk.yellow("\tRead Tasks"))
        console.log(chalk.green(`****************************************`))

        let response = await axios.get("http://172.26.248.114:6004/api/task/", {
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
export default viewTasks