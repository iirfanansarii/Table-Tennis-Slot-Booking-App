import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    background: '#4A3F3F',
    position: 'fixed',
    left: 0,
    bottom: 0,
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: '30%',
    fontSize: '15px',
  },
});

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
    <Typography className={classes.footerText}>Stay Safe | Stay Happy  </Typography>
    </BottomNavigation>
  );
}
