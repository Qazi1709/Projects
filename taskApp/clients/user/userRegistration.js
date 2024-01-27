import readlineSync from "readline-sync";
import axios from "axios";
import chalk from "chalk";

async function userRegistration() {
    try {
        console.clear();
        console.log(chalk.green(`****************************************`))
        console.log(chalk.yellow("\tRegister New User"))
        console.log(chalk.green(`****************************************`))

        let firstName = readlineSync.question('Enter your First Name:')
        while (!firstName) {
            firstName = readlineSync.question('Enter your First Name:')
        }
        let lastName = readlineSync.question('Enter your Last Name :')
        while (!lastName) {
            lastName = readlineSync.question("Enter your Last Name:");
        };
        let email = readlineSync.questionEMail('Enter your Email :');
        let mobileNumber = readlineSync.question('Enter your Mobile Number :')
        while (!mobileNumber) {
            mobileNumber = readlineSync.question('Enter your Mobile Number: ')
        }
        let password = readlineSync.question('Enter your Password :', {
            hideEchoBack: true,
        })
        let password2 = readlineSync.question('Re-Enter your Password :', {
            hideEchoBack: true,
        })

        while (password != password2) {
            console.log(chalk.red("Password do Not Match"));
            password = readlineSync.question('Enter your Password :', {
                hideEchoBack: true,
            })
            password2 = readlineSync.question('Re-Enter your Password :', {
                hideEchoBack: true,
            })
        }
        let address = readlineSync.question("Enter your address : ");
        while (!address) {
            address = readlineSync.question("Please Enter a Valid address : ");
        }
        let userData = { firstName, lastName, email, mobileNumber, address, password, password2 }
        console.log(userData);
        let response = await axios.post('http://172.26.248.114:6004/api/user/register', userData);
        console.log(response);
        console.log(chalk.green("User Registered Successfully"))






    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            console.error(chalk.red(error.response.data.error));
        } else {
            console.error(error);
        }
    }
}
export default userRegistration