import express from 'express';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        let { firstName, lastName, email, mobileNumber, password, password2, address } = req.body;
        if (password2 !== password) {
            return res.status(400).json({ error: "Passwords don't match please try again." });
        }
        // Use fs.readFile() method to read the file
        let fileData = await fs.readFile('data.json')
        fileData = JSON.parse(fileData)
        let findEmail = fileData.find((ele) => ele.email == email);
        if (findEmail) {
            return res.status(409).json({ error: 'Email already exists please login' });
        }
        password = await bcrypt.hash(password, 12);
        let userData = {
            firstName,
            lastName,
            email,
            password,
            mobileNumber,
            address,
            toDos: [],
        }
        fileData.push(userData);
        //fs.writeFile
        await fs.writeFile('data.json', JSON.stringify(fileData));
        return res.status(200).json({ success: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        // Use fs.readFile() method to read the file
        let fileData = await fs.readFile('data.json')
        fileData = JSON.parse(fileData);
        let findEmail = fileData.find((ele) => ele.email == req.body.email);
        if (!findEmail) {
            return res.status(401).json({ error: 'Unauthorised Access' });
        }
        const matchPassword = await bcrypt.compare(req.body.password, findEmail.password);
        if (!matchPassword) {
            return res.status(401).json({ error: 'Unauthorised Access' });
        }
        //Generate Access Token
        let payload = {
            email: req.body.email,
            role: 'user'
        }
        let privateKey = 'codeforindia'
        var token = jwt.sign(payload, privateKey, { expiresIn: '1hr' });
        // findEmail.token = token;
        // await fs.writeFile('data.json', JSON.stringify(fileData));
        return res.status(200).json({ success: 'User Logged in successfully', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router; 