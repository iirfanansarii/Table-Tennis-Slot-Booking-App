import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signup } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { severities } from '../../utils/constants';
import CustomSnackbar from '../../components/CustomSnackbar';
import { Dialog } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(25),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#4A3F3F',
  },
}));

export default function SignUp({ handleClose, open }) {
  const classes = useStyles();
  const [firstname, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // dispatch user data with signup action
  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstname,
      username,
      password,
    };
    dispatch(signup(user)).then((res) => {
      const { status, message } = res;
      if (status === 200) {
        handleClose();
        setSnackbar({
          ...snackbar,
          open: true,
          message,
          severity: severities.success,
        });
      }
      if (status === 400) {
        setSnackbar({
          ...snackbar,
          open: true,
          message,
          severity: severities.error,
        });
      }
    });
  };

  //error handling  start
  const closesSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    handleClose: closesSnackbar,
    severity: severities.info,
    message: 'Oops! something went wrong',
  });
  //error handling - end

  return (
    <>
      {snackbar.open && <CustomSnackbar {...snackbar} />}
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      ></Dialog>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={userSignup}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={firstname}
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={username}
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
        <CustomSnackbar {...snackbar} />
      </Container>
    </>
  );
}
