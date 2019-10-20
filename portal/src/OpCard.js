import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  onlineDeviceAction,
  genCardAction,
  cardTwoAction,
  reportAction
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
  state = { clicked: false };
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
    this.props.cardTwoAction(rank, suit);
    const { rank1, suit1 } = this.props.cardone;
    this.props.reportAction(rank1, suit1, rank, suit);
  };
  render() {
    console.log(this.props.gen);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.meta}>
          <Typography className={classes.heading} variant="h5">
            <u>Opponent Card</u>
          </Typography>
        </div>
        <Button
          variant="outlined"
          color="inherit"
          className={classes.button}
          size="medium"
          onClick={this.handleClick}
          disabled={this.state.clicked || !this.props.gen}
        >
          Show Opponent Card
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
              Click the button to see your opponent's card !{" "}
            </Typography>
          </div>
        )}
      </div>
    );
  }
}

const MapStateToProp = state => {
  return {
    gen: state.gen.gen,
    cardone: state.cards.cardone,
    cardtwo: state.cards.cardtwo
  };
};
const styledComponent = withStyles(styles, { withTheme: true })(CardWrapper);

export default connect(
  MapStateToProp,
  { onlineDeviceAction, genCardAction, cardTwoAction, reportAction }
)(styledComponent);
