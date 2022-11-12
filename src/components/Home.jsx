import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
const Home = () => {
  const [age, setAge] = useState("");
  const [sugar, setSugar] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="HomeWrap">
      <Typography className="headingTag"> Welcome to Coffee Maker</Typography>
    </div>
  );
};

export default Home;
