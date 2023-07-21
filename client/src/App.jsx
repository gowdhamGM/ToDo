import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleAddTask = async () => {
    try {
      if (!newTask.trim() || !priority) {
        setAlertMessage('Please enter the task title.');
        setAlertSeverity('error');
        setShowAlert(true);

        return;
      }

      const response = await axios.post('http://localhost:5000/tasks', {
        title: newTask,
        priority
      });

      setTasks([response.data, ...tasks]);
      setNewTask('');
      setPriority('low');
      setShowModal(false);
    } catch (error) {
      console.error('Error adding task:', error);
      alert('An error occurred while adding the task.');
    }
  };

  // ... (previous code)

  const handleEditTask = async (id, updatedData) => {
    const currentTask = tasks.find((t) => t.taskId === id);
    const payLoad = {
      priority: updatedData.priority || currentTask.priority,
      progress: updatedData.progress || currentTask.progress,
      status: updatedData.status || currentTask.status,
      title: updatedData.title || currentTask.title
    };

    if (payLoad.status === 'To Do' && payLoad.progress === 100) {
      console.log('!payLoad.progress === 0', !payLoad.progress === 0);
      payLoad.progress = 0;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${currentTask._id}`,
        payLoad
      );
      console.log('response', response);

      if (response.status === 200) {
        const updatedTasks = tasks.map((task) =>
          task.taskId === id ? { ...task, ...response.data } : task
        );
        setTasks(updatedTasks);
      } else {
        throw new Error('Failed to update task.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('An error occurred while updating the task.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      const updatedTasks = tasks.filter((task) => task.taskId !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('An error occurred while deleting the task.');
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management App
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => setShowModal(true)}
          >
            Add Task
          </Button>
        </Toolbar>
      </AppBar>
      {tasks.length || showModal ? (
        <>
          {' '}
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <TaskModal
              showModal={showModal}
              handleCloseModal={() => setShowModal(false)}
              newTask={newTask}
              setNewTask={setNewTask}
              priority={priority}
              setPriority={setPriority}
              handleAddTask={handleAddTask}
            />
            <TaskList
              tasks={tasks}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />

            <Snackbar
              open={showAlert}
              autoHideDuration={3000} // Duration for which the alert is shown (in milliseconds)
              onClose={() => setShowAlert(false)} // Called when the alert is closed
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position of the alert on the screen
            >
              <Alert
                onClose={() => setShowAlert(false)}
                severity={alertSeverity}
                sx={{ width: '100%' }}
              >
                {alertMessage}
              </Alert>
            </Snackbar>
          </Container>{' '}
        </>
      ) : (
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh', // Adjust the height as needed
            color: '#666' // Customize the color of the message
          }}
        >
          <Typography variant="h5">No tasks! Please add...</Typography>
        </Container>
      )}
    </>
  );
};

export default App;
