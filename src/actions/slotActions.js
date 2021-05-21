import axios from '../helpers/axios';
import { addSlotConstants, gameSlotConstants } from './constants';

// add slot actions
export const addSlot = (slot) => {
  return async (dispatch) => {
    dispatch({ type: addSlotConstants.SLOT_BOOK_REQUEST });
    let actionResponse = {
      status: 0,
      message: '',
      data: '',
      res: '',
    };
    try {
      const res = await axios.post(`/book/new/slot`, { ...slot });
      actionResponse.res = res;
      const { status } = res;
      const statusCode = status;
      if (statusCode === 200) {
        const { slot, message } = res.data;
        actionResponse.status = statusCode;
        actionResponse.message = message;
        dispatch({
          type: addSlotConstants.SLOT_BOOK_SUCCESS,
          payload: {
            slot: slot,
            message: message,
          },
        });
      }
      return actionResponse;
    } catch (error) {
      const { response } = error;
      const statusCode = response.status;
      const { message } = response.data;
      actionResponse.status = statusCode;
      actionResponse.message = message;
      dispatch({
        type: addSlotConstants.SLOT_BOOK_FAILURE,
        payload: { message: message ? message : 'Something went wrong' },
      });
      return actionResponse;
    }
  };
};

export const getInitialSlotData = (userId) => {
  return async (dispatch) => {
    dispatch({ type: gameSlotConstants.GET_SLOTS_DATA_REQUEST });
    try {
      const res = await axios.get(`/game/slots/${userId}`);
      const { status } = res;
      const statusCode = status;

      if (statusCode === 200) {
        const { slots } = res.data;
        dispatch({
          type: gameSlotConstants.GET_SLOTS_DATA_SUCCESS,
          payload: {
            slots: slots,
          },
        });
      }
    } catch (error) {
      const { response } = error;
      const { status } = response;
      const statusCode = status;
      switch (statusCode) {
        case 400:
          const { userIdNotFound, invalidUser } = response.data;
          break;
        case 500:
          const { error } = response.data;
          break;
        default:
          break;
      }
    }
  };
};
