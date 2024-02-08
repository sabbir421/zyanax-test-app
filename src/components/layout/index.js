import React from "react";
import Navbar from "../Navbar";
import { Box, Grid } from "@mui/material";
import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        <Navbar />
        <Box>{children}</Box>
      </Grid>
    </Grid>
  );
};

export default Layout;
