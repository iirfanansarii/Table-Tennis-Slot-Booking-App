import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

function SlotCard() {
  const classes = useStyles();
  return (
    <Card className={classes.slotCard}>
      <CardContent className={classes.slotCardContent}>
        <Typography className={classes.gameHeadingText}>
          Game Heading Line
        </Typography>
        <Box className={classes.durationDayTimestap}>
          <Typography className={classes.durationDayTimestapText}>
            60 mins,
          </Typography>
          <Typography className={classes.durationDayTimestapText}>
            Sunday,
          </Typography>
          <Typography className={classes.durationDayTimestapText}>
            24/05/202:00:00:00
          </Typography>
        </Box>
        <Typography className={classes.aboutMatchBoxText}>
          Tomorrow morning after excercise
        </Typography>
        <Box className={classes.cardButtonBox}>
          <Button className={classes.editButton}>Edit</Button>
          <Button className={classes.editButton}>Cancel</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SlotCard;
