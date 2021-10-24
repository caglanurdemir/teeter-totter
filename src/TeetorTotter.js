import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import TriangleFilled from "./assets/triangle-filled.png";
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
  const getGrid = (position) =>
    (position === "right" ? [1, 2, 3, 4, 5] : [5, 4, 3, 2, 1]).map(
      (currentIndex) => {
        return (
          <Box w="72px" h="4px" bg="gray.600" mr="4px">
            <Text fontSize="lg" textAlign="center">
              {currentIndex}
            </Text>
          </Box>
        );
      }
    );

  return (
    <>
      <Grid templateRows="repeat(2, 1fr)" height="100%" py="32px">
        <Grid
          templateColumns="repeat(3, 1fr)"
          alignItems="center"
          justifyItems="center"
        >
          <Text color="gray.500">{`Total Weight of Left: ${totalWeightOfLeft}`}</Text>
          <StartButton
            totalWeightOfLeft={totalWeightOfLeft}
            totalWeightOfRight={totalWeightOfRight}
          />
          <Text color="gray.500">{`Total Weight of Right: ${totalWeightOfRight}`}</Text>
        </Grid>
        <Flex alignItems="center" flexDir="column">
          <Flex alignItems="flex-end">
            <Flex flexDir="column">
              {isPlaying && <LeftContainer />}
              <Grid templateColumns="repeat(5, 1fr)">
                {getGrid(Position.LEFT)}
              </Grid>
            </Flex>
            <Flex flexDir="column">
              {isPlaying && <RightContainer />}
              <Grid templateColumns="repeat(5, 1fr)">
                {getGrid(Position.RIGHT)}
              </Grid>
            </Flex>
          </Flex>
          <Image w="48px" src={TriangleFilled} />
        </Flex>
      </Grid>
    </>
  );
};

export default TeetorTotter;
