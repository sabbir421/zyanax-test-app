import React, { useEffect } from "react";
import Layout from "../components/layout";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  confirmOrder,
  fetchOrder,
} from "../state/order/orderSlice";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state?.orders);

  const handleConfirm = (order) => {
    dispatch(confirmOrder(order._id)).then(() => {
      dispatch(fetchOrder());
    });
  };
  const handleCancel = (order) => {
    dispatch(cancelOrder(order._id)).then(() => {
      dispatch(fetchOrder());
    });
  };

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  console.log(orders);
  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SL</TableCell>
              <TableCell align="right">ORDER NO</TableCell>
              <TableCell align="right">ITEM PRICE</TableCell>
              <TableCell align="right">ACTION</TableCell>
              <TableCell align="right">STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">{order?.totalPayable}</TableCell>
                <TableCell align="right">
                  {order.status == "PENDING" && (
                    <div>
                      <Button
                        onClick={() => handleConfirm(order)}
                        style={{
                          backgroundColor: "#F7763F",
                          padding: "5px",
                          borderRadius: "5px",
                          color: "white",
                          marginRight: "2px",
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={() => handleCancel(order)}
                        style={{
                          backgroundColor: "red",
                          padding: "5px",
                          borderRadius: "5px",
                          color: "white",
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </TableCell>
                <TableCell align="right">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default OrderPage;
