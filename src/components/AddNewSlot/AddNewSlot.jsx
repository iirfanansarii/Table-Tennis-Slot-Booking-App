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
import React from 'react';

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
});

export default function AddNewSlot({ handleClose, open }) {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        <Typography className={classes.headingText}>
          Add New Game Slot
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Card className={classes.addSlotCard}>
          <CardContent>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    autoComplete="gname"
                    name="Game Name"
                    variant="outlined"
                    required
                    fullWidth
                    id="gamename"
                    label="Game Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="slotStartTime"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    name="Slot Start Time"
                    autoComplete="slotStartTime"
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
                    id="duration"
                    autoComplete="duration"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoComplete="description"
                    name="Description"
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    autoFocus
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
  );
}
