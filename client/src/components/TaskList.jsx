import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  LinearProgress,
  Snackbar,
  Alert,
  Stack
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ tasks, handleEditTask, handleDeleteTask }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState('');
  const [editTaskTitle, setEditTaskTitle] = useState(null);
  const [editTaskPriority, setEditTaskPriority] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleOpenEditModal = (id, title, priority) => {
    setEditTaskId(id);
    setEditTaskTitle(title);
    setEditTaskPriority(priority);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveEditTask = () => {
    if (editTaskTitle === null) {
      setAlertMessage('Please enter the task title.');
      setAlertSeverity('error');
      return;
    }
    handleEditTask(editTaskId, {
      title: editTaskTitle,
      priority: editTaskPriority
    });

    setShowAlert(true);
    setShowEditModal(false);
  };

  const handleStatusChange = (id, status, progress) => {
    switch (status) {
      case 'To Do':
        handleEditTask(id, { status: 'In Progress', progress: 50 });
        break;
      case 'In Progress':
        handleEditTask(id, { status: 'Done', progress: 100 });
        break;
      case 'Done':
        handleEditTask(id, { status: 'To Do', progress: 0 });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <Card key={task.taskId} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5" component="h2" gutterBottom>
                  {task.title}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography variant="body1">
                      Priority: {task.priority}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      Status: {task.status}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      Progress: {task.progress}%
                    </Typography>
                  </Grid>
                </Grid>
                <LinearProgress
                  variant="determinate"
                  value={task.progress}
                  sx={{ my: 1 }}
                />
              </Grid>
              <Grid item>
                <ButtonGroup variant="contained" color="primary" sx={{ mt: 2 }}>
                  {task.status === 'To Do' && (
                    <Button
                      onClick={() =>
                        handleStatusChange(
                          task.taskId,
                          task.status,
                          task.progress
                        )
                      }
                    >
                      <PlayArrowIcon />
                      TO Do{' '}
                    </Button>
                  )}
                  {task.status === 'In Progress' && (
                    <Button
                      onClick={() =>
                        handleStatusChange(
                          task.taskId,
                          task.status,
                          task.progress
                        )
                      }
                    >
                      <CheckIcon />
                      In Progress
                    </Button>
                  )}
                  {task.status === 'Done' && (
                    <Button
                      onClick={() =>
                        handleStatusChange(
                          task.taskId,
                          task.status,
                          task.progress
                        )
                      }
                    >
                      <PlayArrowIcon />
                      Done
                    </Button>
                  )}
                  <Button
                    onClick={() =>
                      handleOpenEditModal(
                        task.taskId,
                        task.title,
                        task.priority
                      )
                    }
                  >
                    <EditIcon />
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteTask(task.taskId)}>
                    <DeleteIcon />
                    Delete
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <Dialog
        open={showEditModal}
        onClose={handleCloseEditModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Task"
              variant="outlined"
              fullWidth
              value={editTaskTitle}
              onChange={(e) => setEditTaskTitle(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={editTaskPriority}
                onChange={(e) => setEditTaskPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEditModal}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveEditTask}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
    </div>
  );
};

export default TaskList;
