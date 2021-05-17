import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TitleIcon from '@material-ui/icons/Title';
import { Box, Container, Link } from '@material-ui/core';
import { pagePaths } from '../../utils/constants';
import AddNewSlot from '../AddNewSlot/AddNewSlot';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titleIcon: {
    border: ' 2px solid white',
    borderRadius: '0',
    marginRight: '16px',
    fontSize: '20px',
    height: '40px',
    width: '40px',
  },
  title: {
    flexGrow: 1,
  },
  header: {
    background: '#4A3F3F',
  },
  slotHeadContainer: {
    height: '100px',
    width: '100%',
    border: '1px solid',
    background: 'white',
  },
  text: {
    color: '#4A3F3F',
    textAlign: 'left',
    margin: '30px 0px 0px 10px',
    fontSize: '20px',
    fontStyle: 'bold',
    fontWeight: '800',
  },
  button: {
    float: 'right',
    color: 'white',
    background: '#4A3F3F',
    height: '35px',
    marginTop: '-34px',
    width: '190px',
    marginRight: '20px',
    borderStyle: 'none',
    fontSize: '15px',
  },
  box: {
    fontSize: '14px',
    height: '30%',
    width: '30%',
    display: 'flex',
    justifyContent: 'space-between',
    background: 'white',
    color: '#4A3F3F',
    marginLeft: '10px',
  },
  linkText: {
    color: '#4A3F3F',
  },
}));

export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <IconButton
            edge="start"
            className={classes.titleIcon}
            color="inherit"
            aria-label="menu"
          >
            <TitleIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Table Tennis
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
        <Container
          className={classes.slotHeadContainer}
          disableGutters
          maxWidth={false}
        >
          <Typography className={classes.text}>
            My Table Tennis Bookings
          </Typography>
          <button className={classes.button} onClick={() => setOpen(true)}>
            + Book Game Slot
          </button>
          <Box className={classes.box}>
            <Link className={classes.linkText}>ALL Bookings</Link>
            <Link className={classes.linkText}>Old Bookings</Link>
            <Link className={classes.linkText}>Today’s Bookings</Link>
            <Link className={classes.linkText}>Upcoming Bookings</Link>
          </Box>
        </Container>
        <AddNewSlot open={open} handleClose={handleClose} />
      </AppBar>
    </div>
  );
}
