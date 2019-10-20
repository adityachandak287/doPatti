import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./HomePage";
import { connect } from "react-redux";
import { sendAdressAction, onlineDeviceAction } from "./_actions/index";
import Web3 from "web3";
import Landing from "./Landing";
class App extends Component {
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
  componentWillMount = () => {
    const i = this.instantiateWeb3();
    i.eth.getAccounts().then(e => {
      console.log(e);
      this.props.sendAdressAction("addAddress", "newDevice", e[0]);
    });
    this.props.onlineDeviceAction("allDevice", "allDeviceReturn");
    // const i = this.instantiateWeb3();
    // i.eth.getAccounts().then(e => {
    //   console.log(e);
    //   this.props.sendAdressAction("addAddress", "newDevice", e[0]);
    // });
    // const address = "0xd9129a7455e96d67c0e2e29999603b655f292dd2";
    // const abi = [
    //   {
    //     constant: false,
    //     inputs: [
    //       {
    //         name: "_age",
    //         type: "uint256"
    //       }
    //     ],
    //     name: "setAge",
    //     outputs: [],
    //     payable: false,
    //     stateMutability: "nonpayable",
    //     type: "function"
    //   },
    //   {
    //     constant: true,
    //     inputs: [],
    //     name: "getAge",
    //     outputs: [
    //       {
    //         name: "",
    //         type: "uint256"
    //       }
    //     ],
    //     payable: false,
    //     stateMutability: "view",
    //     type: "function"
    //   }
    // ];
    // // const testContract = new i.eth.Contract(abi, address);
    // testContract.methods
    //   .getAge()
    //   .call()
    //   .then(e => {
    //     console.log(e);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    //this.props.onlineDeviceAction("allDevice", "allDeviceReturn");
  };
  componentDidMount = () => {};
  render() {
    return (
      <div data-test="AppComponent">
        <BrowserRouter>
          <div>
            <Route path="/" exact component={HomePage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  { sendAdressAction, onlineDeviceAction }
)(App);
