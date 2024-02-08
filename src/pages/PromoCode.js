import React, { useEffect } from "react";
import Layout from "../components/layout";
import { Grid, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProdmoList } from "../state/promo/promoSlice";
import { Container } from "@mui/system";

const PromoCode = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProdmoList());
  }, [dispatch]);

  const promoList = useSelector((state) => state.promos?.promos) || [];
  console.log(promoList);

  return (
    <Layout>
      <Container>
        <Grid container spacing={2} style={{marginTop:"10px"}}>
          {promoList.map((promo) => (
            <Grid item xs={12} key={promo?.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid gray",
                  justifyContent: "space-around",
                }}
              >
                <Typography>{promo?.promocode}</Typography>
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    style={{
                      marginLeft: "2px",
                      padding: "5px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: "orange",
                    }}
                  >
                    Edit
                  </Button>
                  {promo?.status==="INACTIVATE"? <Button
                    style={{
                      marginLeft: "2px",
                      padding: "5px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: "green",
                    }}
                  >
                    Activate
                  </Button>:<Button
                    style={{
                      marginLeft: "2px",
                      padding: "5px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: "red",
                    }}
                  >
                    Deactivate
                  </Button>}
                 
                  
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Typography>Created at : {promo?.createdOn}</Typography>
                <Typography>Uses : {promo?.useTime}</Typography>
                <Typography>Discount rate : {promo?.discountRate}</Typography>
                <Typography>Start date : {promo?.StartDtae}</Typography>
                <Typography>End date : {promo?.EndDate}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default PromoCode;
