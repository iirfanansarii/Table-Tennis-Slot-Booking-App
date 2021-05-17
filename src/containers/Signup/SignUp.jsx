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

export default function SignUp() {
  const [firstname, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userReducer = useSelector((rootReducer) => rootReducer.userReducer);
  const { error, message, loading } = userReducer;
  // const [messages, setMessages] = useState({ ...userReducer });
  const handleClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    handleClose: handleClose,
    severity: severities.info,
    message: 'Oops! something went wrong',
  });
let option = {
  ...snackbar,
};
  if (!userReducer.loading && userReducer.error && userReducer.error !== '') {
    option.open = true;
    option.message = 'Loading...';
    option.severity = severities.info;  
  }

  const handleMessages = () => {
    let option = {
      ...snackbar,
    };
    if (loading) {
      option.open = true;
      option.message = 'Loading...';
      option.severity = severities.info;
    } else if (error) {
      option.open = true;
      option.message = error;
      option.severity = severities.warning;
    } else if (message) {
      option.open = true;
      option.message = message;
      option.severity = severities.success;
    }
    setSnackbar(option);
  };
  

  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstname,
      username,
      password,
    };
    dispatch(signup(user)).then(() => {
      setSnackbar(option);
      handleMessages();
    });
  };
  const classes = useStyles();
  return (
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
  );
}
