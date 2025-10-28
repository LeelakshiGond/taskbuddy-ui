import React, { useState } from "react";
import { Avatar, Box, Button, Tab, Typography } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TabPanel from "../Tabs/TabPanel";
import Tablist from "../Tabs/Tablist";
import LogoutIcon from "@mui/icons-material/Logout";
import FilterPage from "../FilterPage";
import { doSignOut } from "../../auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { deepOrange, deepPurple } from "@mui/material/colors";
import CustomTable from "../form/CustomTable";

export default function Header() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = async () => {
    try {
      await doSignOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <AssignmentIndIcon />
          <Typography fontSize={15}>TaskBuddy</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar sx={{ width: 24, height: 24, bgcolor: deepPurple[500] }}>
            {currentUser?.displayName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography>{currentUser?.displayName}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tablist
          labels={["List", "Board"]}
          value={value}
          onChange={handleTabChange}
        />

        <Button
          variant="outlined"
          size="small"
          onClick={handleClick}
          endIcon={<LogoutIcon fontSize="small" />}
        >
          LogOut
        </Button>
      </Box>
      <FilterPage />
      <TabPanel index={0} value={value}>
        <CustomTable />
      </TabPanel>

      <TabPanel index={1} value={value}></TabPanel>
    </>
  );
}
