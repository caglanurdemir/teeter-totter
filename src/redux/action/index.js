import {
  ADD_NEW_ELEMENT,
  RESTART_GAME,
  SET_MOVING_ITEM,
  START_GAME,
  UPDATE_ELEMENT_INDEX,
  UPDATE_ELEMENT_OFFSET,
  UPDATE_MOBILITY,
  END_GAME,
} from "./actionTypes";

export function addNewElement(data) {
  return {
    type: ADD_NEW_ELEMENT,
    data,
  };
}
export function updateElementIndex(data) {
  return {
    type: UPDATE_ELEMENT_INDEX,
    data,
  };
}
export function updateElementOffset(data) {
  return {
    type: UPDATE_ELEMENT_OFFSET,
    data,
  };
}
export function updateMobility(data) {
  return {
    type: UPDATE_MOBILITY,
    data,
  };
}
export function setMovingItem(data) {
  return {
    type: SET_MOVING_ITEM,
    data,
  };
}
export function restartGame() {
  return {
    type: RESTART_GAME,
  };
}
export function startGame() {
  return {
    type: START_GAME,
  };
}
export function endGame() {
  return {
    type: END_GAME,
  };
}
