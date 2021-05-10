import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  slotCard: {},
  gameHeading: {
    width: '98%',
    height: '25px',
  },
  gameHeadingText: {
    fontSize: '16px',
    padding: '5px',
    color: '#4A3F3F',
    fontWeight: 800,
  },
  durationDayTimestap: {
    display: 'flex',
    alignItems: 'center',
  },
  durationDayTimestapText: {
    color: '#4A3F3F',
    fontSize: '15px',
  },
  aboutMatchBoxText: {
    color: '#4A3F3F',
    fontSize: '15px',
    marginTop: '-5px',
  },
  cardButtonBox: {
    display: 'flex',
    margin:'0',
  },
  editButton: {
    height: '30px',
    width: '46%',
    color: '#4A3F3F',
    fontSize: '15px',
    fontWeight: '800',
  },
}));
