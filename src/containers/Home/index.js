import { Grid } from '@material-ui/core';
import React from 'react';
import SlotCard from '../../components/BookingSlotCard/SlotCard';
import Layout from '../../components/Layout';
import useStyles from '../../Styles/home';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialSlotData } from '../../actions/slotActions';
function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const slotReducer = useSelector((rootReducer) => rootReducer.slotReducer);

  const userId = localStorage.getItem('userId');

  const slots = slotReducer.slots;
  React.useEffect(() => {
    dispatch(getInitialSlotData(userId));
  }, []);

  const renderSlots = () => {
    return slots.map((slot, i) => (
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={i}>
        <SlotCard slot={slot} />
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
