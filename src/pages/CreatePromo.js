import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { createPromocode } from "./actions/promocodeActions";

const CreateProduct = () => {
  const [promocode, setPromocode] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [useTime, setUseTime] = useState("");
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      promocode,
      discountRate,
      startDate,
      endDate,
      useTime,
      isActive,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ width: "30%", marginLeft: "35%" }}>
        <Grid item xs={12}>
          <Typography variant="h6">Create Promocode</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Promocode"
            value={promocode}
            onChange={(e) => setPromocode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            type="date"
            style={{ width: "100%" }}
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            style={{ width: "100%" }}
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Discount rate"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Use Time"
            value={useTime}
            onChange={(e) => setUseTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <label>Status</label>
          <Switch onChange={handleSwitch} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateProduct;
