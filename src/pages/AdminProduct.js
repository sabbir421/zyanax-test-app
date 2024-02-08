import { Box, Button, Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Layout from "../components/layout";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../state/product/productSlice";

const AdminProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList?.data);
  return (
    <Layout>
      <div style={{ marginTop: "20px" }}>
        <NavLink
          style={{
            textDecoration: "none",
            backgroundColor: "orange",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
          to="/create/product"
        >
          ADD PRODUCT
        </NavLink>
      </div>

      <Container style={{ marginTop: "65px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {productList?.map((product) => (
              <Grid
                item
                xs={2}
                sm={2.4}
                md={2}
                key={product._id}
                style={{
                  position: "relative",
                  border: "1px solid #ddd", // Add border
                  borderRadius: "10px", // Add border radius
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow
                  margin: "10px", // Add margin
                }}
              >
                <div>
                  {product.image && (
                    <>
                      <img
                        src={`data:image/png;base64,${product.image}`}
                        alt=""
                        style={{
                          width: "100%",
                          height: "150px",

                          borderRadius: "10px",
                        }}
                      />
                      <p style={{ marginLeft: "10%" }}>{product.productName}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <h6>BDT.{product.price}</h6>
                        <h6
                          style={{
                            backgroundColor: "orange",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          {product.offer}%
                        </h6>
                      </div>
                    </>
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default AdminProduct;
