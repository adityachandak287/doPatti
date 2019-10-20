import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import AppBar from "./AppBar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { sendAdressAction } from "./_actions";
import { connect } from "react-redux";
import OnlineTable from "./OnlineTable";
import Web3 from "web3";
import Card from "./MyCard";
import OpCard from "./OpCard";
class HomePage extends Component {
  instantiateWeb3 = () => {
    var web3;
    if (typeof web3 !== "undefined") {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
    return web3;
  };
  componentDidMount = () => {};
  render() {
    return (
      <div>
        <Grid item xs={12}>
          <AppBar heading="Your Playgroud" />
        </Grid>
        <Grid container spacing={3}>
          <Grid item>
            <Card />
          </Grid>
          <Grid item>
            <OpCard />
          </Grid>
          <Grid item xs={4}>
            <OnlineTable />
          </Grid>
        </Grid>
      </div>
    );
  }
}
const MapStateToProp = state => {
  return {
    address: state.address.deviceAddr
  };
};
export default connect(
  MapStateToProp,
  { sendAdressAction }
)(HomePage);
