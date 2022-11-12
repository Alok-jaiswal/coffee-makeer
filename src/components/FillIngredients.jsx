import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { Component } from "react";

export default class FillIngredients extends Component {
  state = {
    milk: false,
    water: false,
    sugar: false,
    coffee: false,
    tea: false,
    showMassage: false,
    limitSet: false,
    ingredients: {
      allFill: false,
      tea: 0,
      water: 0,
      milk: 0,
      sugar: 0,
      coffee: 0,
    },
    ingredientsInSubUnit: {
      allFill: false,
      tea: 0,
      water: 0,
      milk: 0,
      sugar: 0,
      coffee: 0,
    },
    coffeeArray: JSON.parse(localStorage.getItem("storeIngredients") || "[]"),
  };
  addData = () => {
    if (this.state.ingredients.coffee === 0) {
      this.setState({
        showMassage: true,
        coffee: true,
        sugar: false,
        milk: false,
        tea: false,
        water: false,
      });
    } else if (this.state.ingredients.sugar === 0) {
      this.setState({
        showMassage: true,
        coffee: false,
        sugar: true,
        milk: false,
        tea: false,
        water: false,
      });
    } else if (this.state.ingredients.milk === 0) {
      this.setState({
        showMassage: true,
        coffee: false,
        sugar: false,
        milk: true,
        tea: false,
        water: false,
      });
    } else if (this.state.ingredients.tea === 0) {
      this.setState({
        showMassage: true,
        coffee: false,
        sugar: false,
        milk: false,
        tea: true,
        water: false,
      });
    } else if (this.state.ingredients.water === 0) {
      this.setState({
        showMassage: true,
        coffee: false,
        sugar: false,
        milk: false,
        tea: false,
        water: true,
      });
    }
    localStorage.setItem("ingredients", JSON.stringify(this.state.ingredients));
    localStorage.setItem(
      "ingredientsInSubUint",
      JSON.stringify(this.state.ingredientsInSubUnit)
    );
  };
  handleChange = (e) => {
    this.handleChangeIngredients(e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChangeIngredients = (e) => {
    if (e.target.value > 10) {
      this.setState({ limitSet: true });
    } else {
      this.setState((prevState) => ({
        ingredients: {
          ...prevState.ingredients,
          allFill: true,
          [e.target.name]: e.target.value,
        },
      }));
      console.log(this.state.ingredients);
      localStorage.setItem(
        "ingredients",
        JSON.stringify(this.state.ingredients)
      );

      this.setState((prevState) => ({
        ingredientsInSubUnit: {
          ...prevState.ingredientsInSubUnit,
          allFill: true,
          coffee: parseInt(this.state.ingredients.coffee) * 1000,
          milk: parseInt(this.state.ingredients.milk) * 1000,
          water: parseInt(this.state.ingredients.water) * 1000,
          tea: parseInt(this.state.ingredients.tea) * 1000,
          sugar: parseInt(this.state.ingredients.sugar) * 1000,
        },
      }));
      if (e.target.name === "tea") {
        this.setState((prevState) => ({
          ingredientsInSubUnit: {
            ...prevState.ingredientsInSubUnit,
            tea: e.target.value * 1000,
          },
        }));
      }
      localStorage.setItem(
        "ingredientsInSubUint",
        JSON.stringify(this.state.ingredientsInSubUnit)
      );
    }
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
      <>
        <div style={{ marginTop: 100 }}>
          <TextField
            label="Add Milk(in L)"
            name="milk"
            onChange={this.handleChange}
          />
          <TextField
            label="Add Water (in L)"
            name="water"
            onChange={this.handleChange}
          />
          <TextField
            label="Add Sugar (in kg)"
            name="sugar"
            onChange={this.handleChange}
          />
          <TextField
            label="Add Coffee (in kg)"
            name="coffee"
            onChange={this.handleChange}
          />
          <TextField
            label="Add Tea (in kg)"
            name="tea"
            onChange={this.handleChange}
          />
          <Button onClick={this.addData}> Fill Data </Button>
        </div>
        <Modal
          open={this.state.showMassage}
          onClose={() => {
            this.setState({ showMassage: !this.state.showMassage });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h3" component="h3">
              {this.state.coffee && "Fill the coffee"}
              {this.state.sugar && "Fill the sugar"}
              {this.state.milk && "Fill the milk"}
              {this.state.tea && "Fill the tea"}
              {this.state.water && "Fill the water"}
            </Typography>
            <Button
              onClick={() => {
                this.setState({ showMassage: !this.state.showMassage });
              }}
            >
              ok
            </Button>
          </Box>
        </Modal>
        <Modal
          open={this.state.limitSet}
          onClose={() => {
            this.setState({ limitSet: !this.state.limitSet });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h3" component="h3">
              You can put only 10 unit of ingredients
            </Typography>
            <Button
              onClick={() => {
                this.setState({ limitSet: !this.state.limitSet });
              }}
            >
              ok
            </Button>
          </Box>
        </Modal>
      </>
    );
  }
}
