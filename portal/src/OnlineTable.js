import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: "50px"
  },
  paper: {
    marginTop: theme.spacing(2),
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 440
  },
  head: {
    backgroundColor: "#23344e",
    color: "#fafafa"
  },
  represent: {
    backgroundColor: "#23344e"
  }
}));

function DenseTable(props) {
  const classes = useStyles();
  const { Winner, Pot, Gained, Total } = props.report;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.head}>Detail</TableCell>
              <TableCell className={classes.head}>Token</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Total Pot</TableCell>
              <TableCell> {Pot}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Winner</TableCell>
              <TableCell>{Winner}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gained</TableCell>
              <TableCell>{Gained}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{Total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
const MapStateToProp = state => {
  return {
    report: state.report.report
  };
};
export default connect(MapStateToProp)(DenseTable);
