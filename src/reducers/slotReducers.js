import { addSlotConstants, gameSlotConstants } from '../actions/constants';
const initState = {
  loading: false,
  slots: [],
  message: '',
};

const slotReducer = (state = initState, action) => {
  switch (action.type) {
    case addSlotConstants.SLOT_BOOK_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case addSlotConstants.SLOT_BOOK_SUCCESS:
      const { slot, message } = action.payload;
      state = {
        ...state,
        slots: slot ? [...state.slots, slot] : [...state.slots],
        loading: false,
        message: message,
      };
      break;
    case addSlotConstants.SLOT_BOOK_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case gameSlotConstants.GET_SLOTS_DATA_REQUEST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case gameSlotConstants.GET_SLOTS_DATA_SUCCESS:
      state = {
        ...state,
        slots: action.payload.slots,
        loading: false,
      };
      break;
    case gameSlotConstants.GET_SLOTS_DATA_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    default:
      break;
  }
  return state;
};

export default slotReducer;
