import express from 'express';
import fs from 'fs/promises';
import authMiddleware from '../middleware/auth/verifyToken.js'
let privateKey = "codeforindia"


const router = express.Router();


function generateTaskId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 12;
    let taskId = '';
    for (let i = 0; i < length; i++) {
        taskId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return taskId;
}

//task add

router.post('/', authMiddleware, async (req, res) => {
    try {
        let { taskName, taskDescription } = req.body;

        if (!taskName) {
            return res.status(400).json({ error: 'Enter taskName to continue' });
        }

        taskDescription = taskDescription || ' ';

        // Verify JWT token from request header
        const token = req.headers['auth-token'];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized Access' });
        }

        let fileData = await fs.readFile('data.json');
        let data = JSON.parse(fileData);
        let findEmail = data.find((ele) => ele.email === req.payload.email);

        if (!findEmail || findEmail.email !== req.payload.email) {
            return res.status(401).json({ error: 'Unauthorized Access' });
        }

        let taskDetails = {
            taskId: generateTaskId(),
            taskName,
            taskDescription
        };

        findEmail.toDos.push(taskDetails);

        await fs.writeFile('data.json', JSON.stringify(data));
        // console.log(req.payload); req.payload holds the payload data which was given to it in the middleware
        return res.status(200).json({ success: 'Task details updated successfully' });
        ;
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

//edit
router.put('/', authMiddleware, async (req, res) => {
    try {

        let { taskId, taskName, taskDescription } = req.body

        if (!taskId) {
            return res.status(400).json({ error: 'Enter taskId to continue' });
        }

        if (!taskName) {
            return res.status(400).json({ error: 'Enter taskName to continue' });
        }
        taskDescription = taskDescription || ' ';

        const token = req.headers["auth-token"]
        if (!token) {
            res.status(401).json({ error: "Unauthorized access" })
        }



        let fileData = await fs.readFile('data.json');
        let data = JSON.parse(fileData);
        let findEmail = data.find((ele) => ele.email === req.payload.email);
        let taskFound = false;

        for (let i = 0; i < findEmail.toDos.length; i++) {
            if (findEmail.toDos[i].taskId === req.body.taskId) {
                findEmail.toDos[i].taskName = req.body.taskName;
                findEmail.toDos[i].taskDescription = req.body.taskDescription;
                taskFound = true;
                break;
            }
        }

        if (taskFound) {
            res.send("Task updated successfully.");
        } else {
            res.status(404).send("Task ID not found. Task not updated.");
        }

        await fs.writeFile('data.json', JSON.stringify(data));
        return res.status(200).json({ success: 'task is updated' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})


//delete
router.delete('/', authMiddleware, async (req, res) => {
    try {

        let { taskId } = req.body

        if (!taskId) {
            return res.status(400).json({ error: 'Enter taskId to continue' });
        }

        const token = req.headers["auth-token"]
        if (!token) {
            res.status(401).json({ error: "Unauthorized Access" })
        }



        let fileData = await fs.readFile('data.json');
        let data = JSON.parse(fileData);
        let findEmail = data.find((ele) => ele.email === req.payload.email);

        const indexToDelete = findEmail.toDos.findIndex((todo) => todo.taskId === req.body.taskId);

        if (indexToDelete !== -1) {

            findEmail.toDos.splice(indexToDelete, 1);
            res.send("Task deleted successfully.");
        } else {
            res.status(404).send("Task ID not found. Task not deleted.");
        }


        await fs.writeFile('data.json', JSON.stringify(data));
        return res.status(200).json({ success: 'task is deleted' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})


//fetch
router.get('/', authMiddleware, async (req, res) => {
    try {
        const token = req.headers["auth-token"]
        if (!token) {
            res.status(401).json({ error: "Unauthorized Access" })
        }

        let fileData = await fs.readFile('data.json');
        fileData = JSON.parse(fileData);
        const findEmail = fileData.find((element) => element.email === req.payload.email);
        let allTasks = findEmail.toDos;
        return res.status(200).json({ allTasks });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
})

router.get('/auth', authMiddleware, (req, res) => {
    return res.status(200).json({ success: 'Token is valid' });
});

export default router;

