import express from "express";
import userModel from "../../models/UserModel.js";


const router = express.Router();

function generatetaskId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 12;
    let taskId = '';
    for (let i = 0; i < length; i++) {
        taskId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return taskId;
}
router.post("/addTask", async (req, res) => {
    try {
      const { taskName, taskDescription } = req.body;
  
      if (!taskName || !taskDescription) {
        return res.status(400).json({ error: "Enter taskName and taskDescription to continue" });
      }
  
      const userEmail = req.query.email;
      const user = await userModel.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(401).json({ error: "Unauthorized Access" });
      }
  
      const taskId = generatetaskId();
  
      const taskDetails = {
        taskId,
        taskName,
        taskDescription
      };
  
      user.tasks.push(taskDetails); 
      await user.save(); 
  
      return res.status(200).json({ success: "Task details added successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.put('/editTask', async (req, res) => {
    try {
      const { taskName, taskDescription } = req.body;
      const taskId = req.query.taskId;
  
      if (!taskName || !taskDescription) {
        return res.status(400).json({ error: 'Incomplete task data' });
      }
      
      const userEmail = req.query.email;
      const user = await userModel.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(401).json({ error: "Unauthorized Access" });
      }
  
      const task = user.tasks.find(t => t.taskId === taskId);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found. Task Details Not Updated' });
      }
  
      task.taskName = taskName;
      task.taskDescription = taskDescription;
  
      await user.save(); 
  
      return res.status(200).json({ success: 'Task Details Updated Successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete Task
  router.delete('/delete', async (req, res) => {
    try {
       const taskId = req.query.taskId; 
       const userEmail = req.query.email;
       const user = await userModel.findOne({ email: userEmail });
   
       if (!user) {
         return res.status(401).json({ error: "Unauthorized Access" });
       }
   
       const taskIndex = user.tasks.findIndex((t) => t.taskId === taskId);
   
       if (taskIndex === -1) {
         return res.status(404).json({ error: 'Task not found. Task not deleted.' });
       }
   
       user.tasks.splice(taskIndex, 1);
   
       await user.save();
   
       return res.status(200).json({ success: 'Task is deleted' });
    } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'Internal Server Error' });
    }
   });
  
  
  router.get('/allTasks',  async (req, res) => {
    try {
      
      const userEmail = req.query.email;
      const user = await userModel.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(401).json({ error: "Unauthorized Access" });
      }
  
      const allTasks = user.tasks;
  
      return res.status(200).json({ allTasks });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  router.get('/indiTask', async (req, res) => {
    try {
      const taskId = req.query.taskId;
      const user = await userModel.findOne({ email: req.payload.email });
  
      if (!user) {
        return res.status(401).json({ error: "Unauthorized Access" });
      }
  
      const task = user.tasks.find(t => t.taskId === taskId);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
      }
  
      return res.status(200).json({ task });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
  export default router;