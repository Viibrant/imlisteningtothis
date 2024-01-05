import { Box, Button, Center, HStack, Heading, VStack } from "@chakra-ui/react";
// import MyImage from "./components/MyImage";
import Header from "./components/Header";
import React from "react";

export default function Home() {
  return (
    <Box w="75%" m="auto">
      <VStack p={5}>
        <HStack>
          <Button colorScheme="blue">Authenticate</Button>
          <Button colorScheme="green">Get Song</Button>
        </HStack>
        <Box>
          <Heading>Generated image:</Heading>
          <Center>{/* <MyImage src="" alt="TEST" /> */}</Center>
        </Box>
      </VStack>
    </Box>
  );
}
