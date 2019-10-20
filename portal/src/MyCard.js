import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  onlineDeviceAction,
  genCardAction,
  cardOneAction
} from "./_actions/index";
import { Typography, Button } from "@material-ui/core";
import Web3 from "web3";
import Card from "react-playing-card";

const styles = theme => ({
  root: {
    marginLeft: 80,
    padding: theme.spacing(-200)
  },
  heading: {
    marginTop: 50,
    padding: theme.spacing(-20)
  },
  button: {
    marginTop: 20
  },
  card: {
    border: "3px solid",
    height: 80
  },
  meta: {
    marginLeft: "58px"
  },
  subhead: {
    marginTop: "35px"
  }
});
class CardWrapper extends Component {
  state = { clicked: false, rank: "", suit: "" };
  componentDidMount = () => {
    this.props.onlineDeviceAction("allDeviceReturn");
  };

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
  randomGen = (max, min) => {
    return Math.floor(Math.random() * (+max - +min)) + +min;
  };
  handleClick = () => {
    var ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "T",
      "J",
      "Q",
      "K"
    ];
    var suits = ["S", "H", "C", "D"];
    var rank = ranks[this.randomGen(ranks.length - 1, 0)];
    var suit = suits[this.randomGen(suits.length - 1, 0)];
    this.setState({ clicked: true, rank, suit });
    this.props.genCardAction("genCard", "isCard");
    this.props.cardOneAction(rank, suit);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.meta}>
          <Typography className={classes.heading} variant="h5">
            <u>My Card</u>
          </Typography>
        </div>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          size="medium"
          onClick={this.handleClick}
          disabled={this.state.clicked}
        >
          Generate Card
        </Button>

        {this.state.clicked ? (
          <div>
            <Card
              rank={this.state.rank}
              suit={this.state.suit}
              className={classes.subcard}
            />
          </div>
        ) : (
          <div>
            <br></br>
            <Typography variant="h6" className={classes.subhead}>
              Click the button to generate card !{" "}
            </Typography>
          </div>
        )}
      </div>
    );
  }
}

const MapStateToProp = state => {
  return {
    gen: state.gen.gen
  };
};
const styledComponent = withStyles(styles, { withTheme: true })(CardWrapper);

export default connect(
  MapStateToProp,
  { onlineDeviceAction, genCardAction, cardOneAction }
)(styledComponent);
