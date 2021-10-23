import { Flex, Text, Image } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { ShapeType } from "../constants";
import Square from "../assets/square.png";
import Circle from "../assets/circle.png";
import Triangle from "../assets/triangle.png";
import "../index.css";

const Shape = ({ id, index, mobility, type, offsetTop, weight }) => {
  const createElementShape = useMemo(() => {
    switch (type) {
      case ShapeType.TRIANGLE:
        return Triangle;
      case ShapeType.CIRCLE:
        return Circle;
      case ShapeType.SQUARE:
        return Square;
      default:
        break;
    }
  }, [type]);

  return (
    <>
      <Flex
        transition="all ease 0.5s"
        position={mobility ? "absolute" : "initial"}
        top={mobility ? `${offsetTop}%` : "initial"}
        bg="orange.100"
        borderRadius="8px"
        p="4px"
        width="fit-content"
        alignSelf="center"
        mb="8px"
      >
        <Image w="24px" h="24px" src={createElementShape} mr="4px" />
        <Text fontSize="sm">{weight}kg</Text>
      </Flex>
    </>
  );
};

export default Shape;
