import { Flex, Grid } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Position } from "../constants";
import { Shape } from "./";

const RightContainer = () => {
  const elements = useSelector((state) => state.elements);

  const elementsOnRight = useMemo(() => {
    // eslint-disable-next-line array-callback-return
    return elements.map((element) => {
      if (element.position === Position.RIGHT) return element;
    });
  }, [elements]);

  return (
    <Grid templateColumns="repeat(5, 1fr)">
      {[1, 2, 3, 4, 5].map((currentIndex) => {
        return (
          <Flex justifyContent="center" flexDir="column">
            {elementsOnRight.map((element) => {
              if (element?.index === currentIndex) {
                return <Shape {...element} key={element.id} />;
              } else {
                return null;
              }
            })}
          </Flex>
        );
      })}
    </Grid>
  );
};

export default RightContainer;
