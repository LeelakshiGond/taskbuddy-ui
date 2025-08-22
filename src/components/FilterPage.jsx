import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Search } from "@mui/icons-material";
import AddTask from "./AddTask";

export default function FilterPage() {
  const [filter, setFilter] = useState("");
  const [date, setDate] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        {/* Left Filters */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography>Filter By:</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="category">Category</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={date}
                    label="Date"
                    onChange={(newValue) => setDate(newValue)}
                    slotProps={{
                      textField: { size: "small" },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <AddTask />
        </Box>
      </Box>

      <Divider sx={{ height: "10px", color: "gray", mt: 2 }} />
    </>
  );
}
