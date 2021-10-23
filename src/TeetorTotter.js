import { Flex, Grid, Text, Box } from "@chakra-ui/react";
import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { LeftContainer, RightContainer, StartButton } from "./components";
import { Position } from "./constants";
import "./index.css";

const TeetorTotter = () => {
  const elements = useSelector((state) => state.elements);

  const getTotalWeightOf = useCallback(
    (position) => {
      let totalWeight = 0;
      elements.forEach((element) => {
        if (element.position === position) {
          totalWeight = totalWeight + element.index * element.weight;
        }
      });

      return totalWeight;
    },
    [elements]
  );

  const totalWeightOfRight = useMemo(
    () => getTotalWeightOf(Position.RIGHT),
    [getTotalWeightOf]
  );

  const totalWeightOfLeft = useMemo(
    () => getTotalWeightOf(Position.LEFT),
    [getTotalWeightOf]
  );

  const isPlaying = useSelector((state) => state.isPlaying);
  const grid = [1, 2, 3, 4, 5].map((currentIndex) => {
    return (
      <Box w="72px" h="4px" bg="gray.600" mr="4px">
        <Text fontSize="lg">{currentIndex}</Text>
      </Box>
    );
  });

  return (
    <>
      <StartButton />
      <>{`Total Weight of Left: ${totalWeightOfLeft}`}</>
      <>{`Total Weight of Right: ${totalWeightOfRight}`}</>
      <Flex alignItems="flex-end">
        <Flex flexDir="column">
          {isPlaying && <LeftContainer />}
          <Grid templateColumns="repeat(5, 1fr)">{grid}</Grid>
        </Flex>
        <Flex flexDir="column">
          {isPlaying && <RightContainer />}
          <Grid templateColumns="repeat(5, 1fr)">{grid}</Grid>
        </Flex>
      </Flex>
    </>
  );
};

export default TeetorTotter;
