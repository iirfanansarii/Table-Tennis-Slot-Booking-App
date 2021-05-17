import { Snackbar } from '@material-ui/core';
import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { severities } from '../../utils/constants';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function CustomSnackbar({ open, handleClose, severity, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={severity ? severity : severities.success}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
