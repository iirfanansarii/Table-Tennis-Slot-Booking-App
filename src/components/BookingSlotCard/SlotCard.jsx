import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { formatDate } from '../../utils/helper';
import useStyles from './styles';

function SlotCard({ slot }) {
  const classes = useStyles();
  const { gameName, duration, slotStartTime, slotEndingTime, description } = slot;
  // const day = formatDate(slotStartTime).day;
  // const date = formatDate(slotStartTime).fullDate;
  return (
    <Card className={classes.slotCard}>
      <CardContent className={classes.slotCardContent}>
        <Typography className={classes.gameHeadingText}>{gameName}</Typography>
        <Box className={classes.durationDayTimestap}>
          <Typography className={classes.durationDayTimestapText}>
            {duration + ' min'}
          </Typography>
          {/* <Typography className={classes.durationDayTimestapText}>
            {day}
          </Typography> */}
          {/* <Typography className={classes.durationDayTimestapText}>
            {date}
          </Typography> */}
        </Box>
        <Typography className={classes.aboutMatchBoxText}>
          {description}
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
