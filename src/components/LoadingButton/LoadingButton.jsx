import React from "react";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoopIcon from "@material-ui/icons/Loop";

const styles = {
  root: {
    marginRight: 5
  }
};

const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress className={props.classes.spinner} size={20} />
));

export const LoadingButton = props => {
  const { dollar, loading, className, ...rest } = props;
  return (
    <Button
      {...rest}
      variant="contained"
      className={className}
      color={dollar ? "primary" : "secondary"}
    >
      {loading ? <SpinnerAdornment {...rest} /> : <LoopIcon />}
    </Button>
  );
};
