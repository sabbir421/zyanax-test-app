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
import { fetchProdmoList } from "../state/promo/promoSlice";

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
  const [discount, setDiscount] = useState(0);
  const [totalPayable, setTotalPayable] = useState(
    (subTotal || summery?.subTotal) + summery?.shippingCharge
  );

  useEffect(() => {
    dispatch(fetchCartList());
    dispatch(cartSummery());
    dispatch(fetchProdmoList())
  }, [dispatch]);

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
    setTotalPayable(totalPayable + cart.singlePrice);
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
      setTotalPayable(totalPayable - cart.singlePrice);
      setLocalCartList(updatedCartList);
      dispatch(updateCart(updatedCartList[index]));
    }
  };

  const handleCheck = (event) => {
    setIsChecked(event.target.checked);
    setShowError(false);
  };
  const promoList = useSelector((state) => state.promos?.promos) || [];
  const handlePromoCodeChange = (event) => {
    const inputPromoCode = event.target.value;
    setPromoCode(inputPromoCode);
  };
  const handleApplyPromo = () => {
    const filteredPromos = promoList.filter((promo) => promo.promocode === promoCode);
  
    if (filteredPromos.length > 0) {
      const promocode = filteredPromos[0];
      const subTotal = summery.subTotal;
  
      const promoDiscount = subTotal * (promocode.discountRate / 100);
      const discountedSubTotal = subTotal - promoDiscount;
  
      setDiscount(promoDiscount);
      setSubtotal(discountedSubTotal);
      setTotalPayable(discountedSubTotal + summery.shippingCharge);
  
      console.log("Promo Discount:", promoDiscount);
      console.log("Total Payable:", discountedSubTotal + summery.shippingCharge);
    } else {
      console.log("Invalid promo code");
    }
  };
  

  const handleCheckout = () => {
    if (!isChecked) {
      setShowError(true);
    } else {
      dispatch(checkoutProduct({ totalPayable, discount,subTotal,...summery }));
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
                  Sub total({summery?.totalProducts}):
                  {subTotal || summery?.subTotal}{" "}
                </p>
                <p>discount:{discount} </p>
                <p>Shipping Charge:{summery?.shippingCharge} </p>
                <p>Wallet Debit:0 </p>
                <div onClick={checkLogin}>
                  <input
                    type="text"
                    placeholder="use promo code"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                  />
                  <button onClick={handleApplyPromo}>Apply</button>
                </div>
                <p>Total Payable : {totalPayable} </p>
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
