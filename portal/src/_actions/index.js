import {
  ONLINE_DEVICES,
  SET_ADDRESS,
  DRAW_CARD,
  GEN_CARD,
  REPORT_GEN,
  CARD_ONE,
  CARD_TWO
} from "./types";
import openSocket from "socket.io-client";
const socket = openSocket(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"]
});

export const sendAdressAction = (speak, listen, addr) => {
  return async dispatch => {
    socket.on("connect", () => {
      socket.emit(speak, addr);
      socket.on(listen, data => {
        console.log("Send address " + data);
        dispatch({
          type: SET_ADDRESS,
          payload: data
        });
      });
    });
  };
};
export const onlineDeviceAction = (speak, listen) => {
  return async dispatch => {
    socket.on("connect", () => {
      socket.emit(speak);
      socket.on(listen, data => {
        console.log("Online device " + data);
        dispatch({
          type: ONLINE_DEVICES,
          payload: data
        });
      });
    });
  };
};
export const drawCardAction = (speak, listen, addr) => {
  return async dispatch => {
    socket.emit(speak, addr);
    socket.on(listen, data => {
      console.log("Card draw " + data);
      dispatch({
        type: DRAW_CARD,
        payload: data
      });
    });
  };
};
export const genCardAction = (speak, listen) => {
  console.log("Calllin");
  return async dispatch => {
    socket.emit(speak);
    socket.on(listen, data => {
      console.log("Generate Card ");
      dispatch({
        type: GEN_CARD,
        payload: data
      });
    });
  };
};

export const cardOneAction = (rank1, suit1) => {
  const ob = { rank1, suit1 };
  return {
    type: CARD_ONE,
    payload: ob
  };
};
export const cardTwoAction = (rank2, suit2) => {
  const ob = { rank2, suit2 };
  return {
    type: CARD_TWO,
    payload: ob
  };
};
const rankMap = {
  A: 13,
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  T: 9,
  J: 10,
  Q: 11,
  K: 12
};

function getWinner(r1, s1, r2, s2) {
  var c1 = rankMap[r1];
  var c2 = rankMap[r2];

  if (c1 < c2) return 2;
  else if (c1 > c2) return 1;
  else if (c1 === c2) return 0;
}
export const reportAction = (r1, s1, r2, s2) => {
  console.log(r1, s1, r2, s2);
  const winner = getWinner(r1, s1, r2, s2);
  var report = {};
  if (winner === 2) {
    report["Winner"] = "Card Two";
    report["Gained"] = "- 90";
    report["Total"] = "20";
  } else if (winner === 1) {
    report["Winner"] = "Card One";
    report["Gained"] = "+ 90";
    report["Total"] = " 200";
  } else {
    report["Winner"] = "Tie";
    report["Gained"] = " 0";
    report["Total"] = " 110";
  }

  report["Pot"] = " 180";
  return {
    type: REPORT_GEN,
    payload: report
  };
};
