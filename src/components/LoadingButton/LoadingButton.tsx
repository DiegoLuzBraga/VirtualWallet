import React from "react";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoopIcon from "@material-ui/icons/Loop";
import { WithStyles } from "@material-ui/core/styles/withStyles";

interface Props {
  loading: boolean;
  className: string;
  children: React.ReactNode;
  onClick(): Promise<void>;
}

const styles = {
  root: {
    marginRight: 5
  }
};

const SpinnerAdornment = withStyles(styles)((props: WithStyles) => (
  <CircularProgress className={props.classes.spinner} size={20} />
));

export const LoadingButton = (props: Props) => {
  const { children, loading, className, ...rest } = props;
  return (
    <Button {...rest} variant="contained" className={className} color="primary">
      {loading && <SpinnerAdornment {...rest} />}
      {!loading && <LoopIcon />}
      {children}
    </Button>
  );
};
