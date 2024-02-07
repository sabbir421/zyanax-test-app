import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSummery,
  fetchCartList,
  updateCart,
} from "../state/cart/cartSlice";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkoutProduct } from "../state/product/productSlice";
import PrimarySearchAppBar from "../components/Navbar";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.user);
  const { cartList, summery } = useSelector((state) => state.cartList);
  const [localCartList, setLocalCartList] = useState([]);
  const [subTotal, setSubtotal] = useState(summery?.subTotal);
  const [promoCode, setPromoCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleCheck = (event) => {
    setIsChecked(event.target.checked);
    setShowError(false); // Reset error when checkbox state changes
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handleCheckout = () => {
    if (!isChecked) {
      setShowError(true);
    } else {
      dispatch(checkoutProduct({ Name: "shehab" }));
      dispatch(fetchCartList());
      dispatch(cartSummery());
      setShowModal(true);
    }
  };

  const checkLogin = () => {
    if (!data) {
      navigate("/user/signup");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <PrimarySearchAppBar />
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          {localCartList.length > 0 && (
            <Grid
              container
              spacing={2}
              style={{ justifyContent: "space-around" }}
            >
              <Grid item xs={8}>
                {localCartList?.map((cart, index) => (
                  <Grid
                    item
                    xs={12}
                    key={cart._id}
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
                        width: "100",
                        height: "80px",
                        marginTop: "1%",
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
                        <Button onClick={() => quantityDecress(index, cart)}>
                          -
                        </Button>
                        <Typography>{cart?.quantity}</Typography>
                        <Button onClick={() => quantityIncress(index, cart)}>
                          +
                        </Button>
                      </div>
                      <Typography>
                        Total Price:{" "}
                        {cart?.singlePrice * cart?.quantity +
                          cart?.shippingCharge}
                      </Typography>
                    </div>
                  </Grid>
                ))}
                <div>
                  {showError && (
                    <Typography style={{ color: "red" }}>
                      Please agree to the terms and conditions.
                    </Typography>
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox checked={isChecked} onChange={handleCheck} />
                    }
                    label="I agree with terms and conditions Privecy Policy and Refound policy"
                  />

                  <Button onClick={handleCheckout}>Checkout</Button>
                </div>
              </Grid>
              <Grid item xs={4} style={{ marginTop: "10px" }}>
                <Typography>Order summary</Typography>
                <p>
                  Sub total({summery?.totalProducts}):{subTotal}{" "}
                </p>
                <p>discount:0 </p>
                <p>Shipping Charge:{summery?.shippingCharge} </p>
                <p>Wallet Debit:0 </p>
                <div onClick={checkLogin}>
                  <input
                    type="text"
                    placeholder="use promo code"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                  />
                  <button>Apply</button>
                </div>
                <p>Total Payable : {subTotal + summery?.shippingCharge} </p>
              </Grid>
            </Grid>
          )}
        </Box>
        <Modal open={showModal} onClose={closeModal}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "300px",
              height: "300px",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant="h4">Checkout Confirm</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button onClick={() => navigate("/admin/login")}>
                Go to Admin
              </Button>
            </div>
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default Cart;
