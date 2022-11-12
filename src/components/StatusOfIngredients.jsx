import { Grid, Typography } from "@mui/material";
import React, { Component } from "react";

export default class StatusOfIngredients extends Component {
  state = {
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
    if (this.state.AmountOfIngredients) {
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
          remWater: this.state.AmountOfIngredients.water - water,
          remTea: this.state.AmountOfIngredients.tea - tea,
          remMilk: this.state.AmountOfIngredients.milk - milk,
          remSugar: this.state.AmountOfIngredients.sugar - sugar,
          remCoffee: this.state.AmountOfIngredients.coffee - coffee,
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
  render() {
    return (
      <div>
        <Grid
          container
          spacing={2}
          style={{
            marginTop: "100px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid item>
            <Typography>
              Remaining Milk : {this.state.remMilk + " ml"}{" "}
              {this.state.statusM && "   is remain less than 20%"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Remaining Water : {this.state.remWater + " ml"}
              {this.state.statusW && "   is remain less than 20%"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Remaining Sugar : {this.state.remSugar + " grm"}
              {this.state.statusS && "   is remain less than 20%"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Remaining Coffee : {this.state.remCoffee + " grm"}
              {this.state.statusC && "   is remain less than 20%"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Remaining Tea : {this.state.remTea + " grm"}
              {this.state.statusT && "   is remain less than 20%"}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}
