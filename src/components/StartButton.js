import { Button } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Position, ShapeType, ShapeWeight } from "../constants";
import {
  addNewElement,
  endGame,
  restartGame,
  setMovingItem,
  startGame,
  updateElementIndex,
  updateElementOffset,
  updateMobility,
} from "../redux/action";
import { randomIntFromInterval } from "../utils/commonFunctions";

const StartButton = ({ totalWeightOfLeft, totalWeightOfRight }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.isPlaying);
  const movingItem = useSelector((state) => state.movingItem);
  const elements = useSelector((state) => state.elements);
  const isGameEnded = useSelector((state) => state.isGameEnded);

  const elementsOnLeft = useMemo(() => {
    return elements.filter(({ position }) => position === Position.LEFT);
  }, [elements]);

  let countOf10KgsOnLeft = 0;
  let countOf10KgsOnRight = 0;

  const handleOnKeyDown = (e) => {
    if (movingItem && movingItem.offsetTop < 50) {
      switch (e.keyCode) {
        case 37:
          if (movingItem?.index < 5) {
            dispatch(
              updateElementIndex({
                id: movingItem.id,
                index: movingItem.index + 1,
              })
            );
          }
          break;
        case 39:
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
    if (movingItem?.mobility && !isGameEnded) {
      let interval;

      interval = setInterval(() => {
        if (!isGameEnded) {
          if (movingItem?.offsetTop < 50 && movingItem?.mobility) {
            dispatch(
              updateElementOffset({
                id: movingItem?.id,
                offsetTop: movingItem?.offsetTop + 10,
              })
            );
          } else if (movingItem?.offsetTop === 50) {
            if (totalWeightOfLeft >= totalWeightOfRight) {
              dispatch(endGame());
              clearInterval(interval);
            } else {
              if (!isGameEnded) {
                elementsOnLeft.forEach(({ weight }) => {
                  if (weight === 10) {
                    countOf10KgsOnLeft = countOf10KgsOnLeft + 1;
                  }
                });

                if (countOf10KgsOnLeft === 2) {
                  dispatch(endGame());
                  clearInterval(interval);
                } else {
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
              }
            }
          }
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

      itemsToBeInRight.forEach((element) => {
        if (element.weight === 10) {
          countOf10KgsOnRight = countOf10KgsOnRight + 1;
        }
      });

      if (countOf10KgsOnRight === 2) {
        dispatch(endGame());
      }

      dispatch(setMovingItem(leftItem));
      dispatch(startGame());
    } else {
      dispatch(restartGame());
    }
  };

  return (
    <>
      <Button onClick={handleStartGameClick} colorScheme="gray">
        {isPlaying ? "Stop 🛑" : "Start 🎬"}
      </Button>
    </>
  );
};

export default StartButton;
