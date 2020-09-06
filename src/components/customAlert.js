import React from "react";
import { PropTypes } from "prop-types";
import { Snackbar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  danger: {
    backgroundColor: "#ff8565",
    color: "white",
  },
  whiteText: {
    color: "white",
  },
  success: {
    backgroundColor: "#60b8fd",
    color: "white",
  },
}));

const CustomAlert = (props) => {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={props.open}
      ContentProps={{
        className: props.carrasco ? classes.danger : classes.success,
      }}
      autoHideDuration={2500}
      onClose={props.handleClose}
      message={props.message}
      action={
        <React.Fragment>
          <IconButton onClick={props.handleClose}>
            <CloseIcon className={classes.whiteText} />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

CustomAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default CustomAlert;
