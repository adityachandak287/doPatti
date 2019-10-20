import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Draw from "./Draw";
const styles = theme => ({
  pic: {
    marginTop: "23px",
    marginLeft: "57px"
  }
});
class Landing extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.pic}>
        <Draw className={classes.pic} />
      </div>
    );
  }
}
const styledComponent = withStyles(styles, { withTheme: true })(Landing);

export default connect(null)(styledComponent);
