import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../state/product/productSlice";
import PrimarySearchAppBar from "../components/Navbar";
import { addToCart, fetchCartList } from "../state/cart/cartSlice";

const Product = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartList?.cartList);
  const [cartValue, setCartValue] = React.useState(cartData.length || 0);
  React.useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList?.data);
  const [hoveredProduct, setHoveredProduct] = React.useState(null);
  const handleAddToCart = (product) => {
    console.log("ADD CART", product);
    setCartValue(cartValue + 1);
    const productId = product._id;
    const productData = { productId, quantity: 1 };
    dispatch(addToCart(productData));
    dispatch(fetchCartList());
  };
  return (
    <>
      <PrimarySearchAppBar cartValue={cartValue} />
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
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  position: "relative",
                  border: "1px solid #ddd", // Add border
                  borderRadius: "10px", // Add border radius
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow
                  margin: "10px", // Add margin
                }}
              >
                <div
                  style={{
                    display: hoveredProduct === product._id ? "none" : "block",
                  }}
                >
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
                {hoveredProduct === product._id && (
                  <button
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "blue",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 16px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Product;
