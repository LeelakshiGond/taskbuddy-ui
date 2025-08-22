/** @format */
import React from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Tablist({
  labels = [],
  onChange = () => {},
  value = 0,
}) {
  return (
    <Box
      sx={{
        marginBottom: "10px",
      }}
    >
      <Tabs
        value={value}
        onChange={onChange}
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {labels.map((l, index) => {
          return (
            <Tab
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                minWidth: "40px", // reduce minimum width
                paddingX: "8px",
              }}
              key={l}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {index === 0 ? (
                    <FormatListBulletedIcon fontSize="small" />
                  ) : (
                    <SpaceDashboardIcon fontSize="small" />
                  )}
                  {l}
                </Box>
              }
              {...a11yProps(index)}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
