import { Grid } from '@material-ui/core';
import React from 'react';
import SlotCard from '../../components/BookingSlotCard/SlotCard';
import Layout from '../../components/Layout';
import useStyles from '../../Styles/home';

function Home() {
  const classes = useStyles();

  const slots = [
    {
      id: '1',
      heading: 'Game Heading Line1',
      duration: '60 mins',
      day: 'Sunday',
      date: '24/05/202:00:00:00',
    },
    {
      id: '2',
      heading: 'Game Heading Line2',
      duration: '60 mins',
      day: 'Sunday',
      date: '24/05/202:00:00:00',
    },
    {
      id: '3',
      heading: 'Game Heading Line3',
      duration: '60 mins',
      day: 'Sunday',
      date: '24/05/202:00:00:00',
    },
    {
      id: '4',
      heading: 'Game Heading Line4',
      duration: '60 mins',
      day: 'Sunday',
      date: '24/05/202:00:00:00',
    },
    {
      id: '5',
      heading: 'Game Heading Line5',
      duration: '60 mins',
      day: 'Sunday',
      date: '24/05/202:00:00:00',
    },
    {
      id: '6',
      heading: 'Game Heading Line6',
      duration: '60 mins',
      day: 'Sunday',
      date: '24/05/202:00:00:00',
    },
  ];

  const renderSlots = () => {
    return slots.map((slot, i) => (
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
        <SlotCard />
      </Grid>
    ));
  };

  return (
    <Layout>
      <Grid container spacing={3} className={classes.slotCardBox}>
        {renderSlots()}
      </Grid>
    </Layout>
  );
}

export default Home;
