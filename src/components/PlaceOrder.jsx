import {
  Typography,
  Button,
  Modal,
  Box,
  Grid,
  TextField,
  Snackbar,
} from "@mui/material";
import React, { Component } from "react";

const coffeeMug =
  "https://img.freepik.com/free-psd/medium-size-paper-coffee-cup-mockup_358694-574.jpg?w=740&t=st=1665991845~exp=1665992445~hmac=c92e15baf3ae9084ffa87a47562a8c767199d1d2ec4c6c2bb2e3b1f203eb4d69";

export default class PlaceOrder extends Component {
  state = {
    showIngredientsPopup: false,
    showQutBox: false,
    selectedValue: false,
    type: "",
    quantity: 0,
    sugar: false,
    getData: [],
    ingredientsInSubUint: {},
    AmountOfIngredients: JSON.parse(
      localStorage.getItem("ingredientsInSubUint")
    ),
    orders: JSON.parse(localStorage.getItem("storeOrders") || "[]"),
    remWater: 0,
    remTea: 0,
    remMilk: 0,
    remSugar: 0,
    remCoffee: 0,
    statusT: false,
    statusM: false,
    statusS: false,
    statusW: false,
    statusC: false,
    statusOfIngredients: false,
  };
  componentDidMount() {
    const getData = JSON.parse(localStorage.getItem("storeOrders") || "[]");
    this.setState({ getData: getData });
    const getItemDetails = JSON.parse(localStorage.getItem("ingredients"));
    if (!getItemDetails?.allFill) {
      this.setState({ showIngredientsPopup: !this.state.showIngredientsPopup });
    }
    const ingredientsInSubUintOrigin = JSON.parse(
      localStorage.getItem("ingredientsInSubUint")
    );
    this.setState({
      ingredientsInSubUint: ingredientsInSubUintOrigin,
    });
    if (getItemDetails && getItemDetails?.allFill) {
      let milk = 0;
      let sugar = 0;
      let water = 0;
      let coffee = 0;
      let tea = 0;

      this.state.orders.forEach((item) => {
        milk = milk + item?.totalMilk;
        sugar = sugar + item?.totalSugar;
        water = water + item?.totalWater;
        if (item.type == "strong_coffee" || item.type == "light_coffee") {
          coffee = coffee + item?.totalPowder;
        }
        if (item.type == "strong_tea" || item.type == "light_tea") {
          tea = tea + item?.totalPowder;
        }
      });
      this.setState(
        {
          remWater: this.state.AmountOfIngredients?.water - water,
          remTea: this.state.AmountOfIngredients?.tea - tea,
          remMilk: this.state.AmountOfIngredients?.milk - milk,
          remSugar: this.state.AmountOfIngredients?.sugar - sugar,
          remCoffee: this.state.AmountOfIngredients?.coffee - coffee,
        },
        () => {
          let milkStatus =
            (this.state.remMilk / this.state.AmountOfIngredients.milk) * 100 -
            5 * this.state.quantity;
          if (milkStatus < 21) {
            this.setState({ statusM: true });
            localStorage.setItem(
              "statusOfIngredientsM",
              JSON.stringify({ status: "Milk", remQuit: milkStatus })
            );
          }
          let waterStatus =
            (this.state.remWater / this.state.AmountOfIngredients.water) * 100 -
            5 * this.state.quantity;
          if (waterStatus < 21) {
            this.setState({ statusW: true });
            localStorage.setItem(
              "statusOfIngredientsW",
              JSON.stringify({ status: "Water", remQuit: waterStatus })
            );
          }
          let teaStatus =
            (this.state.remTea / this.state.AmountOfIngredients.tea) * 100 -
            5 * this.state.quantity;
          if (teaStatus < 21) {
            this.setState({ statusT: true });
            localStorage.setItem(
              "statusOfIngredientsT",
              JSON.stringify({ status: "Tea", remQuit: teaStatus })
            );
          }
          let coffeeStatus =
            (this.state.remCoffee / this.state.AmountOfIngredients.coffee) *
              100 -
            5 * this.state.quantity;
          if (coffeeStatus < 21) {
            this.setState({ statusC: true });
            localStorage.setItem(
              "statusOfIngredientsC",
              JSON.stringify({ status: "Coffee", remQuit: coffeeStatus })
            );
          }
          let sugarStatus =
            (this.state.remSugar / this.state.AmountOfIngredients.sugar) * 100 -
            5 * this.state.quantity;
          if (sugarStatus < 21) {
            this.setState({ statusS: true });
            localStorage.setItem(
              "statusOfIngredientsS",
              JSON.stringify({ status: "Sugar", remQuit: sugarStatus })
            );
          }
        }
      );
    }
  }
  handleChange = (e) => {
    if (e.target.value > 10) {
      this.setState({ showQutBox: true });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  setData = () => {
    let powder = 0;
    let milk = 0;
    let water = 0;
    let sugarT = 0;
    if (this.state.type == "strong_coffee" || this.state.type == "strong_tea") {
      let valueStrPwCof = parseInt(this.state.quantity) * 30;
      let valueStrWaCof = parseInt(this.state.quantity) * 50;
      let valueStrMlCof = parseInt(this.state.quantity) * 150;
      let valueStrSuCof = parseInt(this.state.quantity) * 30;

      powder = valueStrPwCof;
      water = valueStrWaCof;
      milk = valueStrMlCof;
      sugarT = valueStrSuCof;
    } else if (
      this.state.type == "light_coffee" ||
      this.state.type == "light_tea"
    ) {
      let valueLigTea = 20 * parseInt(this.state.quantity);
      let valueLiWaCof = parseInt(this.state.quantity) * 50;
      let valueLiMlCof = parseInt(this.state.quantity) * 150;
      let valueLiSuCof = parseInt(this.state.quantity) * 30;
      powder = valueLigTea;
      water = valueLiWaCof;
      milk = valueLiMlCof;
      sugarT = valueLiSuCof;
    }
    this.placeOrder(powder, water, milk, sugarT);
  };
  placeOrder = (powder, water, milk, sugarT) => {
    const payload = {
      type: this.state.type,
      sugar: this.state.sugar ? 30 : 0,
      quantity: this.state.quantity,
      totalPowder: powder,
      totalWater: water,
      totalMilk: milk,
      totalSugar: sugarT > 0 ? sugarT : 0,
    };
    this.state.getData.push(payload);
    localStorage.setItem("storeOrders", JSON.stringify(this.state.getData));
    this.setState({ type: "", sugar: false, quantity: 0 });
  };
  render() {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      height: 200,
      bgcolor: "background.paper",
      borderRadius: 2,
      boxShadow: 24,
      p: 4,
      textAlign: "center",
    };
    return (
      <div className="container" style={{ marginTop: "100px" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div
              className="imgWrap"
              onClick={() => {
                this.setState({ selectedValue: true });
              }}
            >
              <img
                src={coffeeMug}
                alt="strong_tea"
                width="100%"
                height={120}
                onClick={() => {
                  this.setState({ type: "strong_tea" });
                }}
                className="imageCoffee"
              />
              <div
                className="middle"
                onClick={() => {
                  this.setState({ type: "strong_tea" });
                }}
              >
                <div className="text">Strong Tea</div>
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div
              className="imgWrap"
              onClick={() => {
                this.setState({ selectedValue: true });
              }}
            >
              <img
                src={coffeeMug}
                alt="strong_coffee"
                width="100%"
                className="imageCoffee"
                onClick={() => {
                  this.setState({ type: "strong_coffee" });
                }}
              />
              <div
                className="middle"
                onClick={() => {
                  this.setState({ type: "strong_coffee" });
                }}
              >
                <div className="text">Strong Coffee</div>
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div
              className="imgWrap"
              onClick={() => {
                this.setState({ selectedValue: true });
              }}
            >
              <img
                src={coffeeMug}
                alt="light_tea"
                width="100%"
                className="imageCoffee"
                onClick={() => {
                  this.setState({ type: "light_tea" });
                }}
              />
              <div
                className="middle"
                onClick={() => {
                  this.setState({ type: "light_tea" });
                }}
              >
                <div className="text">Light Tea</div>
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div
              className="imgWrap"
              onClick={() => {
                this.setState({ selectedValue: true });
              }}
            >
              <img
                src={coffeeMug}
                alt="light_coffee"
                width="100%"
                className="imageCoffee"
                onClick={() => {
                  this.setState({ type: "light_coffee" });
                }}
              />
              <div
                className="middle"
                onClick={() => {
                  this.setState({ type: "light_coffee" });
                }}
              >
                <div className="text">Light Coffee</div>
              </div>
            </div>
          </Grid>
        </Grid>
        <div>
          <TextField
            label="Quantity ( in Numbers )"
            name="quantity"
            value={this.state.quantity === 0 ? "" : this.state.quantity}
            onChange={this.handleChange}
          />
        </div>
        <Button onClick={this.setData}>Place Order</Button>

        <Modal
          open={this.state.selectedValue}
          onClose={() => {
            this.setState({ selectedValue: !this.state.selectedValue });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <Box sx={style}>
            <Typography>Do you want to add sugar ?</Typography>
            <Button
              onClick={() => {
                this.setState({ sugar: true, selectedValue: false });
              }}
              style={{ cursor: "pointer" }}
            >
              yes
            </Button>
            <Button
              onClick={() => {
                this.setState({ sugar: false, selectedValue: false });
              }}
              style={{ cursor: "pointer" }}
            >
              no
            </Button>
          </Box>
        </Modal>

        <Modal
          open={this.state.showIngredientsPopup}
          onClose={() => {
            this.setState({
              showIngredientsPopup: !this.state.showIngredientsPopup,
            });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h3" component="h3">
              Fill the Ingredients...
            </Typography>
            <a href="/fill">
              <Button
                onClick={() => {
                  this.setState({
                    showIngredientsPopup: !this.state.showIngredientsPopup,
                  });
                }}
              >
                ok
              </Button>
            </a>
          </Box>
        </Modal>

        <Modal
          open={this.state.showQutBox}
          onClose={() => {
            this.setState({ showQutBox: !this.state.showQutBox });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h3" component="h3">
              You can Place only 10 Orders at a time.
            </Typography>
            <Button
              onClick={() => {
                this.setState({ showQutBox: !this.state.showQutBox });
              }}
            >
              ok
            </Button>
          </Box>
        </Modal>
        {this.state.statusM && <div> Milk is less than 20 %</div>}
        {this.state.statusW && <div> water is less than 20 %</div>}
        {this.state.statusT && <div> Tea is less than 20 %</div>}
        {this.state.statusC && <div> Coffee is less than 20 %</div>}
        {this.state.statusS && <div> Sugar is less than 20 %</div>}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.statusM}
          color={"s"}
          onClose={() => {
            this.setState({ statusM: false });
          }}
          autoHideDuration={2000}
          message=" Milk is less than 20 %"
        ></Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.statusW}
          color={"s"}
          onClose={() => {
            this.setState({ statusW: false });
          }}
          autoHideDuration={2000}
          message=" water is less than 20 %"
        ></Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.statusT}
          color={"s"}
          onClose={() => {
            this.setState({ statusT: false });
          }}
          autoHideDuration={2000}
          message=" Tea is less than 20 %"
        ></Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.statusC}
          color={"s"}
          onClose={() => {
            this.setState({ statusC: false });
          }}
          autoHideDuration={2000}
          message="Coffee is less than 20 %"
        ></Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.statusS}
          color={"s"}
          onClose={() => {
            this.setState({ statusS: false });
          }}
          autoHideDuration={2000}
          message=" Sugar is less than 20 %"
        ></Snackbar>
      </div>
    );
  }
}
