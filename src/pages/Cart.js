import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSummery,
  fetchCartList,
  updateCart,
  updateQuantity,
} from "../state/cart/cartSlice";
import { Button, Container, Typography } from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartList, summery } = useSelector((state) => state.cartList);
  const [localCartList, setLocalCartList] = useState([]);
  const [subTotal, setSubtotal] = useState(summery.subTotal);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    dispatch(fetchCartList());
    dispatch(cartSummery());
  }, [dispatch, subTotal]);

  useEffect(() => {
    setLocalCartList(cartList);
  }, [cartList]);

  const quantityIncress = (index, cart) => {
    const updatedCartList = [...localCartList];
    updatedCartList[index] = {
      ...updatedCartList[index],
      quantity: updatedCartList[index].quantity + 1,
    };
    setSubtotal(subTotal + cart.singlePrice);
    setLocalCartList(updatedCartList);
    dispatch(updateCart(updatedCartList[index]));
  };

  const quantityDecress = (index, cart) => {
    const updatedCartList = [...localCartList];
    if (updatedCartList[index].quantity > 1) {
      updatedCartList[index] = {
        ...updatedCartList[index],
        quantity: updatedCartList[index].quantity - 1,
      };
      setSubtotal(subTotal - cart.singlePrice);
      setLocalCartList(updatedCartList);
      dispatch(updateCart(updatedCartList[index]));
    }
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
    console.log(promoCode);
  };
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {}
          {localCartList.length > 0 &&
            localCartList?.map((cart, index) => (
              <Grid item xs={8} key={cart._id}>
                <Grid
                  item
                  xs={12}
                  style={{
                    border: "1px solid gray",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <img
                    src={`data:image/png;base64,${cart?.image}`}
                    alt=""
                    style={{
                      width: "60",
                      height: "60px",
                    }}
                  />
                  <div>
                    <Typography variant="h6">{cart?.productName}</Typography>
                    <Typography variant="h6">Color: {cart?.color}</Typography>
                    <Typography variant="h6">Price: {cart?.price}</Typography>
                  </div>
                  <div>
                    <Typography>Shipping Method: EMS</Typography>
                    <Typography>
                      Shipping charge: {cart?.shippingCharge}
                    </Typography>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#F9F7F7",
                        borderRadius: "5px",
                      }}
                    >
                      <Button onClick={() => quantityIncress(index, cart)}>
                        +
                      </Button>
                      <Typography>{cart?.quantity}</Typography>
                      <Button onClick={() => quantityDecress(index, cart)}>
                        -
                      </Button>
                    </div>
                    <Typography>
                      Total Price:{" "}
                      {cart?.singlePrice * cart?.quantity +
                        cart?.shippingCharge}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            ))}

          <Grid item xs={4} style={{ marginTop: "-100px" }}>
            <Typography>Order summary</Typography>
            <p>
              Sub total({summery.totalProducts}):{subTotal}{" "}
            </p>
            <p>discount:0 </p>
            <p>Shipping Charge:{summery.shippingCharge} </p>
            <p>Wallet Debit:0 </p>
            <input
              type="text"
              placeholder="use promo code"
              value={promoCode}
              onChange={handlePromoCodeChange}
            />
            <button>Apply</button>
            <p>Total Payable : {subTotal + summery.shippingCharge} </p>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Cart;
