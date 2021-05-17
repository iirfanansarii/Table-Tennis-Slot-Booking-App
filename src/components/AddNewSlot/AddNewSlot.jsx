import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSlot } from '../../actions/slotActions';
import { severities } from '../../utils/constants';
import CustomSnackbar from '../CustomSnackbar';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  addSlotCard: {
    margin: '30px',
    marginTop: '0',
    padding: '40px',
  },
  headingText: {
    textAlign: 'center',
    margin: '10px',
  },
  submit: {
    marginTop: '10px',
  },
  heading: {
    '& .MuiTypography-h6': {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      '& p': {
        display: 'block',
        textAlign: 'center',
        width: '100%',
      },
      '& svg': {
        marginRight: '30px',
        cursor: 'pointer',
        color: '#4A3F3F',
      },
    },
  },
});
export default function AddNewSlot({ handleClose, open }) {
  const classes = useStyles();
  const userId = window.localStorage.getItem('userId');
  const [duration, setDuration] = useState('');
  const [bookingDateTime, setBookingDateTime] = useState('');
  const [gameName, setGamename] = useState('');
  const [description, setDescription] = useState();
  const dispatch = useDispatch();
  const bookSlot = (e) => {
    e.preventDefault();
    const slot = {
      userId,
      duration,
      bookingDateTime,
      gameName,
      description,
    };
    dispatch(addSlot(slot)).then((resp) => {
      const { status, message } = resp;
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
  //error handling 
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
      >
        <DialogTitle id="simple-dialog-title" className={classes.heading}>
          <Typography className={classes.headingText}>
            Add New Game Slot
          </Typography>
          <CloseIcon onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <Card className={classes.addSlotCard}>
            <CardContent>
              <form noValidate onSubmit={bookSlot}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      autoComplete="gname"
                      name="Game Name"
                      variant="outlined"
                      required
                      fullWidth
                      value={gameName}
                      label="Game Name"
                      autoFocus
                      onChange={(e) => setGamename(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      name="Slot Start Time"
                      value={bookingDateTime}
                      autoComplete="slotStartTime"
                      onChange={(e) => setBookingDateTime(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="duration"
                      label="Duration"
                      type="number"
                      value={duration}
                      autoComplete="duration"
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      autoComplete="description"
                      name="Description"
                      variant="outlined"
                      required
                      fullWidth
                      label="Description"
                      value={description}
                      autoFocus
                      onChange={(e) => setDescription(e.target.value)}
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
                  Add New Slot
                </Button>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}
