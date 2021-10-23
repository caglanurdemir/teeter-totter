import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Position, ShapeType, ShapeWeight } from "../constants";
import {
  addNewElement,
  restartGame,
  setMovingItem,
  startGame,
  updateElementIndex,
  updateElementOffset,
  updateMobility,
} from "../redux/action";
import { randomIntFromInterval, shapePosition } from "../utils/commonFunctions";

const StartButton = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.isPlaying);
  const movingItem = useSelector((state) => state.movingItem);

  const handleOnKeyDown = (e) => {
    if (movingItem?.offsetTop < 50) {
      switch (e.keyCode) {
        case 39:
          if (movingItem?.index < 5) {
            dispatch(
              updateElementIndex({
                id: movingItem.id,
                index: movingItem.index + 1,
              })
            );
          }
          break;
        case 37:
          if (movingItem?.index > 1) {
            dispatch(
              updateElementIndex({
                id: movingItem.id,
                index: movingItem.index - 1,
              })
            );
          }
          break;
        default:
          return true;
      }
    }
  };

  const getShape = () => {
    const shapeType =
      ShapeType[Object.keys(ShapeType)[randomIntFromInterval(0, 2)]];
    return { weight: ShapeWeight[shapeType], type: shapeType };
  };

  useEffect(() => {
    if (movingItem?.mobility) {
      let interval;

      interval = setInterval(() => {
        if (movingItem?.offsetTop < 50 && movingItem?.mobility) {
          dispatch(
            updateElementOffset({
              id: movingItem?.id,
              offsetTop: movingItem?.offsetTop + 10,
            })
          );
        } else if (movingItem?.offsetTop === 50) {
          dispatch(updateMobility({ id: movingItem?.id }));

          const shapeSpecs = getShape();
          const leftItem = {
            id: uuidv4(),
            position: Position.LEFT,
            index: 3,
            offsetTop: 10,
            mobility: true,
            ...shapeSpecs,
          };

          dispatch(addNewElement(leftItem));
          dispatch(setMovingItem(leftItem));
        }
      }, 1000);

      document.addEventListener("keydown", (e) => handleOnKeyDown(e));

      return () => {
        clearInterval(interval);
        document.removeEventListener("keydown", handleOnKeyDown);
      };
    }
  }, [movingItem]);

  const handleStartGameClick = () => {
    if (!isPlaying) {
      const itemCountToBeInRight = randomIntFromInterval(1, 3);
      let itemsToBeInRight = [];

      for (let i = 0; i < itemCountToBeInRight; i++) {
        const shapeSpecs = getShape();

        itemsToBeInRight.push({
          id: uuidv4(),
          position: Position.RIGHT,
          index: randomIntFromInterval(1, 5),
          offsetTop: 50,
          mobility: false,
          ...shapeSpecs,
        });
      }

      itemsToBeInRight.map((item) => dispatch(addNewElement(item)));

      const shapeSpecs = getShape();
      const leftItem = {
        id: uuidv4(),
        position: Position.LEFT,
        index: 3,
        offsetTop: 10,
        mobility: true,
        ...shapeSpecs,
      };

      dispatch(addNewElement(leftItem));
      dispatch(setMovingItem(leftItem));
      dispatch(startGame());
    } else {
      dispatch(restartGame());
    }
  };

  return (
    <>
      <Button onClick={handleStartGameClick} colorScheme="blue">
        {isPlaying ? "🛑" : "🎬"}
      </Button>
    </>
  );
};

export default StartButton;
