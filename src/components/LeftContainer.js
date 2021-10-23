import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Shape } from "./";
import { Position } from "../constants";
import { Grid, Flex } from "@chakra-ui/react";

const LeftContainer = () => {
  const elements = useSelector((state) => state.elements);

  const elementsOnLeft = useMemo(() => {
    return elements.filter(({ position }) => position === Position.LEFT);
  }, [elements]);

  return (
    <Grid templateColumns="repeat(5, 1fr)">
      {[1, 2, 3, 4, 5].map((currentIndex) => {
        return (
          <Flex
            justifyContent="center"
            flexDir="column-reverse"
            alignSelf="flex-end"
          >
            {elementsOnLeft.map((element) => {
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

export default LeftContainer;
