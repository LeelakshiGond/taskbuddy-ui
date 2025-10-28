import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function createData(name, dueOn, status, category) {
  return { name, dueOn, status, category };
}

const rows = [
  createData("Storing Book", "12/05/2025", "TODO", "NOT DONE"),
  createData("Reading Notes", "15/05/2025", "IN PROGRESS", "ONGOING"),
];

export default function CustomTable() {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="custom table">
          {/* ✅ Table Head only once */}
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell align="left">Due On</TableCell>
              <TableCell align="left">Task Status</TableCell>
              <TableCell align="left">Task Category</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              {/* Accordion spans full row */}
              <TableCell colSpan={5} sx={{ p: 0 }}>
                <Accordion elevation={0}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">TODO 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    {/* ✅ Keep table structure so columns align */}
                    <Table size="small">
                      <TableBody>
                        {rows.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.dueOn}</TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell align="left">{row.category}</TableCell>
                            <TableCell align="left">...</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
