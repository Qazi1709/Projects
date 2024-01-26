import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar.jsx";

function MainPage() {
  const navigate = useNavigate();

  const [addTask, setAddTask] = useState({ taskName: "", taskDescription: "" });
  const [allTasks, setAllTasks] = useState([]);

  const [editingTask, setEditingTask] = useState({
    taskId: null,
    editedTaskName: "",
    editedTaskDescription: "",
  });

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    setAddTask({ ...addTask, [name]: value });
  };

  const enableEditTask = (task) => {
    setEditingTask({
      taskId: task.taskId,
      editedTaskName: task.taskName,
      editedTaskDescription: task.taskDescription,
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditingTask({ ...editingTask, [name]: value });
  };


  const saveEditedTask = async (task) => {
    try {
      const value = localStorage.getItem('token');
      console.log('Token:', value);
      let authResponse = await axios.get('/api/auth/verify', {
        headers: {
          token: value
        },
        responseType: 'json'
      });

      console.log(authResponse.data);

      let userPayload = authResponse.data.email;

      if (authResponse.status === 401) {
        navigate("/login");
      }

      const response = await axios.put(`/api/user/editTask`, {
        taskName: editingTask.editedTaskName,
        taskDescription: editingTask.editedTaskDescription,
      }, {
        params: {
          email: userPayload,
          taskId: task.taskId,
        }
      });

      if (response.status === 200) {
        window.alert("Task Details Updated Successfully!");
        fetchTasks();
      } else {
        window.alert("Failed to update task");
      }
      setEditingTask({ taskId: null, editedTaskName: "", editedTaskDescription: "" });
    } catch (error) {
      console.error(error);
      window.alert("Something went wrong!");
    }
  };

  const fetchTasks = async () => {
    try {

      const value = localStorage.getItem('token');
      let authResponse = await axios.get('/api/auth/verify', {
        headers: {
          token: value
        }
      });

      console.log(authResponse.data);
      let userPayload = authResponse.data.email

      if (authResponse.status === 401) {
        navigate("/login")
      }

      const response = await axios.get('/api/user/allTasks', {
        params: {
          email: userPayload
        }
      });

      if (response.status === 200) {
        setAllTasks(response.data.allTasks);
      } else {
        window.alert("Failed to Fetch All Tasks")
      }

    } catch (error) {
      console.error(error);
      window.alert("Something went wrong!");
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);


  const postData = async () => {
    try {
      const { taskName, taskDescription } = addTask;

      const value = localStorage.getItem('token');
      let authResponse = await axios.get('/api/auth/verify', {
        headers: {
          token: value
        }
      });

      console.log(authResponse.data);
      let userPayload = authResponse.data.email

      if (authResponse.status === 401) {
        navigate("/login")
      }


      const response = await axios.post("/api/user/addTask", {
        ...addTask,
      }, {
        params: {
          email: userPayload
        }
      });

      if (response.status === 200) {
        const { token } = response.data;
        window.alert("Task Added Successfully!");
        fetchTasks();
      } else {
        window.alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 400) {
        window.alert("Invalid Task Adding Request");
      } else {
        window.alert("Something went wrong!");
      }
    }
  };

  const deleteTask = async (taskIdtoDelete) => {
    try {
      const value = localStorage.getItem('token');
      let authResponse = await axios.get('/api/auth/verify', {
        headers: {
          token: value
        }
      });

      console.log(authResponse.data);
      let userPayload = authResponse.data.email

      if (authResponse.status === 401) {
        navigate("/login")
      }
      console.log("hi comming from frontend delete ");
      const response = await axios.delete(`/api/user/delete`, {
        params: {
          email: userPayload,
          taskId: taskIdtoDelete
        },
      });

      if (response.status === 200) {
        window.alert("Task deleted successfully!");
        fetchTasks();
      } else {
        window.alert("Failed to delete task");
      }
    } catch (error) {
      console.error(error);
      window.alert("Something went wrong!");
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    await postData();
  };

  return (
    <>
      <Navbar />
      <div className=" bg-blue-300">
        <br />
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 rounded lg:py-24 mx-auto shadow-md bg-blue-200 mt-20">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Add Task</h1>
          </div>

          <form
            method="POST"
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            onSubmit={handleSubmit}
          >

            <div>
              <label htmlFor="taskName" className="sr-only">
                Task Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Task Name"
                  name="taskName"
                  id="taskName"
                  autoComplete="off"
                  value={addTask.taskName}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Task Description"
                  name="taskDescription"
                  id="taskDescription"
                  autoComplete="off"
                  value={addTask.taskDescription}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <br />
              <button
                type="submit"
                className="inline-block  rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white mx-auto"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>

        <section className="bg-black-100 p-4 bg-blue-200 mt-40">
          <h2 className="text-2xl font-bold mb-4 text-center">Task List</h2>
          <table className="w-full border border-blue-500">
            <thead>
              <tr>
                <th className="p-2 border border-blue-500">Task Name</th>
                <th className="p-2 border border-blue-500">Task Description</th>
                <th className="p-2 border border-blue-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allTasks.map((task) => (
                <tr key={task.taskId} className="mb-4">
                  <td className="p-2 border border-blue-500">
                    {task.taskId === editingTask.taskId ? (
                      <input
                        type="text"
                        value={editingTask.editedTaskName}
                        name="editedTaskName"
                        onChange={handleEditChange}
                      />
                    ) : (
                      task.taskName
                    )}
                  </td>
                  <td className="p-2 border border-blue-500">
                    {task.taskId === editingTask.taskId ? (
                      <input
                        type="text"
                        value={editingTask.editedTaskDescription}
                        name="editedTaskDescription"
                        onChange={handleEditChange}
                      />
                    ) : (
                      task.taskDescription
                    )}
                  </td>
                  <td className="p-2 border border-blue-500">
                    {task.taskId === editingTask.taskId ? (
                      <button
                        className="text-green-600 cursor-pointer"
                        onClick={() => saveEditedTask(task)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="text-blue-600 cursor-pointer"
                        onClick={() => enableEditTask(task)}
                      >
                        Edit
                      </button>
                    )} <br />
                    <button
                      className="text-red-600 cursor-pointer"
                      onClick={() => deleteTask(task.taskId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default MainPage;
