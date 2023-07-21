import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TaskModal = ({
  showModal,
  handleCloseModal,
  newTask,
  setNewTask,
  priority,
  setPriority,
  handleAddTask
}) => {
  return (
    <Dialog open={showModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Task"
            variant="outlined"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
          onClick={handleCloseModal}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddTask}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
