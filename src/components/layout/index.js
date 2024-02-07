import React from "react";
import Navbar from "../Navbar";
import { Box, Grid } from "@mui/material";


const Layout = ({ children }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Navbar />
        <Box>{children}</Box>
      </Grid>
    </Grid>
  );
};

export default Layout;
