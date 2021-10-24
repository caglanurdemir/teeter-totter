import {
  ADD_NEW_ELEMENT,
  RESTART_GAME,
  START_GAME,
  UPDATE_ELEMENT_INDEX,
  UPDATE_ELEMENT_OFFSET,
  UPDATE_MOBILITY,
  SET_MOVING_ITEM,
  END_GAME,
} from "../action/actionTypes";

const initialState = {
  isPlaying: false,
  elements: [],
  movingItem: {},
  isGameEnded: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_ELEMENT:
      return {
        ...state,
        elements: [...state.elements, action.data],
      };
    case UPDATE_ELEMENT_INDEX: {
      const newElements = [...state.elements];
      // eslint-disable-next-line array-callback-return
      const currentItem = newElements.find((element) => {
        if (element.id === action.data.id) return element;
      });

      const currentItemIndex = newElements.indexOf(currentItem);
      newElements[currentItemIndex].index = action.data.index;

      return {
        ...state,
        elements: [...newElements],
      };
    }
    case UPDATE_ELEMENT_OFFSET: {
      const newElements = [...state.elements];
      // eslint-disable-next-line array-callback-return
      const currentItem = newElements.find((element) => {
        if (element.id === action.data.id) return element;
      });

      const currentItemIndex = newElements.indexOf(currentItem);
      newElements[currentItemIndex].offsetTop = action.data.offsetTop;

      return {
        ...state,
        elements: [...newElements],
      };
    }
    case UPDATE_MOBILITY: {
      const newElements = [...state.elements];
      // eslint-disable-next-line array-callback-return
      const currentItem = newElements.find((element) => {
        if (element.id === action.data.id) return element;
      });
      const currentItemIndex = newElements.indexOf(currentItem);
      newElements[currentItemIndex].mobility =
        !newElements[currentItemIndex].mobility;

      return {
        ...state,
        elements: [...newElements],
      };
    }
    case SET_MOVING_ITEM:
      return {
        ...state,
        movingItem: action.data,
      };
    case START_GAME: {
      return { ...state, isPlaying: true };
    }
    case END_GAME: {
      return { ...state, isGameEnded: true };
    }
    case RESTART_GAME: {
      return initialState;
    }
    default:
      return state;
  }
}
