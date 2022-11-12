import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { Component } from "react";

export default class ProfitLoss extends Component {
  state = {
    orders: JSON.parse(localStorage.getItem("storeOrders") || "[]"),
    totalOrder: 0,
    loss:0,
  };
  componentDidMount() {
    let qut = 0;
    this.state.orders.forEach((item) => {
      qut = qut + parseInt(item.quantity);
    });
    this.setState({ totalOrder: qut,loss:this.state.orders.length * 5 });
  }
  render() {
    return (
      <div style={{ marginTop: 80 }}>
        <Grid>
          <h2>No of Orders : {this.state.totalOrder} </h2>
        </Grid>
        <Grid>
          <h2>Wastage & loss : {this.state.loss} % </h2>
        </Grid>
        <Grid item sm={12}>
          <Paper elevation={1}>
            <TableContainer>
              <Table size="small" stickyHeader aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. no.</TableCell>
                    <TableCell>Order Name</TableCell>
                    <TableCell>Order Qut.</TableCell>
                    <TableCell>Coffee/Tea Qut.</TableCell>
                    <TableCell>Water Qut.</TableCell>
                    <TableCell>Milk Qut.</TableCell>
                    <TableCell>Sugar Qut.</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orders.map((orders, index) => (
                    <TableRow key={index}>
                      <TableCell>{index}</TableCell>
                      <TableCell>{orders?.type}</TableCell>
                      <TableCell>{orders?.quantity}</TableCell>
                      <TableCell>{orders?.totalPowder}</TableCell>
                      <TableCell>{orders?.totalWater}</TableCell>
                      <TableCell>{orders?.totalMilk}</TableCell>
                      <TableCell>{orders?.totalSugar}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </div>
    );
  }
}
