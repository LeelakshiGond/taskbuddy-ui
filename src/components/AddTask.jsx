import React, { useState } from "react";
import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  IconButton,
} from "@mui/material";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "./themeData/theme";
import { CloseRounded } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  p: 2,
};

export default function AddTask() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "work",
    dueOn: "",
    taskStatus: "",
  });

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClick} variant="contained" size="small">
        Add Task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableEnforceFocus
        disablePortal
      >
        <Box sx={style}>
          <Grid container columnGap={1} rowGap={1}>
            <Grid size={{ xs: 12 }}>
              <Typography id="modal-title" variant="h6">
                Create New Task
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Task Title"
                name="title"
                size="small"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant="body2">Description</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={handleQuillChange}
                style={{ height: "110px", marginBottom: "50px" }}
              />
            </Grid>

            {/* Category Buttons */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                <Button
                  size="small"
                  variant={
                    formData.category === "work" ? "contained" : "outlined"
                  }
                  onClick={() => handleCategoryChange("work")}
                >
                  Work
                </Button>
                <Button
                  size="small"
                  variant={
                    formData.category === "personal" ? "contained" : "outlined"
                  }
                  onClick={() => handleCategoryChange("personal")}
                >
                  Personal
                </Button>
              </Box>
            </Grid>

            {/* Due Date */}
            <Grid size={{ xs: 12, sm: 3.8 }}>
              <FormControl fullWidth size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={date}
                    label="Date"
                    onChange={(newValue) => {
                      setDate(newValue);
                      setFormData({ ...formData, dueOn: newValue });
                    }}
                    slotProps={{
                      textField: { size: "small" },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            {/* Status Select */}
            <Grid size={{ xs: 12, sm: 3.8 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  name="taskStatus"
                  size="small"
                  value={formData.taskStatus}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": { borderColor: theme.palette.primary.main },
                  ...(dragActive && {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: "rgba(0,0,0,0.03)",
                  }),
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setSelectedFile(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => document.getElementById("file-upload").click()}
              >
                <Typography>
                  Drag & drop your file here or{" "}
                  <Typography
                    component="span"
                    sx={{
                      color: theme.palette.primary.main,
                      borderBottom: `1px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    Upload
                  </Typography>
                </Typography>

                <label htmlFor="file-upload">
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>

                {/* Image Preview */}
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              {selectedFile && selectedFile.type.startsWith("image") && (
                <Box
                  sx={{
                    mt: 2,
                    position: "relative",
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 2,
                      background: "rgba(255,255,255,0.7)",
                    }}
                    onClick={() => setSelectedFile(null)}
                  >
                    <CloseRounded
                      fontSize="small"
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </IconButton>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 120,
                      borderRadius: 8,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box
            mt={3}
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              color="error"
              size="small"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" size="small">
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
