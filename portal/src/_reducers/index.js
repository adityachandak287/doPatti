import { combineReducers } from "redux";
import {
  SET_ADDRESS,
  ONLINE_DEVICES,
  DRAW_CARD,
  GEN_CARD,
  CARD_ONE,
  CARD_TWO,
  REPORT_GEN
} from "../_actions/types";
import { async } from "q";

export const addrReducer = (
  state = { deviceAddr: "", drawStatus: false },
  action
) => {
  switch (action.type) {
    case SET_ADDRESS:
      return {
        deviceAddr: action.payload,
        drawStatus: state.drawStatus
      };
    case DRAW_CARD:
      return {
        deviceAddr: state.deviceAddr,
        drawStatus: true
      };
    default:
      return state;
  }
};
export const deviceReducer = (state = { onlineDevices: [] }, action) => {
  switch (action.type) {
    case ONLINE_DEVICES:
      return {
        onlineDevices: action.payload
      };
    default:
      return state;
  }
};
export const cardReducer = (state = { gen: false }, action) => {
  switch (action.type) {
    case GEN_CARD:
      return {
        gen: action.payload
      };
    default:
      return state;
  }
};

export const cardStorer = (state = { cardone: {}, cardtwo: {} }, action) => {
  switch (action.type) {
    case CARD_ONE:
      return {
        cardone: action.payload,
        cardtwo: state.cardtwo
      };
    case CARD_TWO:
      return {
        cardone: state.cardone,
        cardtwo: action.payload
      };
    default:
      return state;
  }
};

export const reportReducer = (
  state = { report: { Winner: "", Pot: "180", Gained: "", Total: "110" } },
  action
) => {
  switch (action.type) {
    case REPORT_GEN:
      return {
        report: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  address: addrReducer,
  onlineDevices: deviceReducer,
  gen: cardReducer,
  cards: cardStorer,
  report: reportReducer
});
