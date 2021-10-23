import "./App.css";
import TeetorTotter from "./TeetorTotter";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bg="gray.300"
      flexDir="column"
    >
      <TeetorTotter />
    </Flex>
  );
}

export default App;
