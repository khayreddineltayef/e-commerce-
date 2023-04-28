import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import {
  AppBar,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Toolbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createOrder } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";

export default function AddressForm() {
  const user = useSelector((state) => state.reducer.users);
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(user.phone || "");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [card, setCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const total = useSelector((state) => state.totalReducer.total);

  const error = useSelector((state) => state.orderReducer.error);
  console.log(error);
  const handleSubmit = () => {
    const orderData = {
      userId: user._id,
      firstName: user.fullName,
      lastName,
      phone,
      city,
      country,
      card,
      cardNumber,
      amount: total,
    };
    dispatch(createOrder(orderData));
  };
  const order = useSelector((state) => state.orderReducer.order);
  if (order) {
    Navigate("/sucess");
  }
  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Link to="/">
            {" "}
            <Typography variant="h6" color="inherit" noWrap>
              <span style={{ color: "red" }}>KhayriShop</span>
            </Typography>{" "}
          </Link>
        </Toolbar>
      </AppBar>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="firstName"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={user.fullName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name=""
            label="lastName"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="add"
            name="address1"
            label="phone"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <h6>Paying methode:</h6>
            <RadioGroup
              aria-label="payment method"
              name="paymentMethod"
              value={card}
              onChange={(e) => setCard(e.target.value)}
            >
              <FormControlLabel value="visa" control={<Radio />} label="Visa" />
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="PayPal"
              />
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cart Number"
            name="city"
            label="Cart Number"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            disabled={card === "cash"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Amount "
            fullWidth
            variant="standard"
            value={total}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            label="City"
            fullWidth
            variant="standard"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            variant="standard"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button
        style={{ marginTop: "25px", marginLeft: "600px" }}
        variant="contained"
        onClick={() => handleSubmit()}
      >
        Create order
      </Button>
    </React.Fragment>
  );
}
