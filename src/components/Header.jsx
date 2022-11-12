import React, { Component } from "react";
import { Link } from "react-router-dom";
import coffeeCup from "../Assets/Images/cup-of-drink.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import Grid from "@mui/material/Grid";
export default class Header extends Component {
  render() {
    return (
      <div className="headerWrapper">
        {/* <nav style={{ padding: 10 }}>
        <Container>
          <Row>
            <Col xs={6}>
              <img src={coffeeCup} width="20px" />
            </Col>

            <Col xs={6}>
              <Link to="/placeOrder" className="linkTag">
                Place Order
              </Link>
              <Link to="/status" className="linkTag">
                Status Of Ingredients
              </Link>
              <Link to="/fill" className="linkTag">
                Fill Ingredients
              </Link>
              <Link to="/profit" className="linkTag">
                Profit and Loss
              </Link>
            </Col>
          </Row>
        </Container>
        </nav> */}
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Link to="/">
                <img src={coffeeCup} width="30px" className="coffeeCupImg" />
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Link to="/placeOrder" className="linkTag">
                Place Order
              </Link>
              <Link to="/status" className="linkTag">
                Status Of Ingredients
              </Link>
              <Link to="/fill" className="linkTag">
                Fill Ingredients
              </Link>

              <Link to="/profit" className="linkTag">
                Profit and Loss
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
